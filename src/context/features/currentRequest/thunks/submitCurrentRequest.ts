import { AppDispatch, AppGetState } from "../../../store";
import {
  invalidCurrentRequest,
  submitPending,
  submitFulfilled,
} from "../currentRequestSlice";
import validateCurrentRequest from "../utils/validateCurrentRequest";
import extractBodyFromCurrentRequest from "../utils/extractBodyFromCurrentRequest";
import { HttpResponse } from "@core/types/http-response";
import { sendHttpRequest } from "@server-actions/send-http-request";

export const submitCurrentRequest =
  () => async (dispatch: AppDispatch, getState: AppGetState) => {
    const currentRequest = getState().currentRequest;

    const formValidation = validateCurrentRequest(currentRequest);
    if (formValidation.success === false) {
      dispatch(invalidCurrentRequest(formValidation.errors));
      return;
    }

    dispatch(submitPending());

    try {
      const response: HttpResponse = await sendHttpRequest({
        body: extractBodyFromCurrentRequest(currentRequest),
        headers: currentRequest.fields.headers,
        method: currentRequest.fields.httpMethod,
        url: currentRequest.fields.url,
      });

      dispatch(submitFulfilled(response));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      dispatch(fail(error.message));
    }
  };
