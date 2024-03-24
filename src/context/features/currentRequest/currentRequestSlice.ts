import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HttpResponse } from "@core/types/http-response";
import { RequestErrors } from "./types";
import { AppDispatch, AppGetState } from "@context/store";
import { sendHttpRequest } from "@server-actions/send-http-request";
import validateCurrentRequest from "./utils/validateCurrentRequest";
import extractBodyFromCurrentRequest from "./utils/extractBodyFromCurrentRequest";
import createInitialState from "./utils/createInitialState";

/** REDUCERS */
import reducers from "./reducers";

export const submitCurrentRequest =
  () => async (dispatch: AppDispatch, getState: AppGetState) => {
    const currentRequest = getState().currentRequest;
    dispatch(submit());

    const formValidation = validateCurrentRequest(currentRequest);
    if (formValidation.success === false) {
      dispatch(invalid(formValidation.errors));
      return;
    }

    try {
      const response: HttpResponse = await sendHttpRequest({
        body: extractBodyFromCurrentRequest(currentRequest),
        headers: currentRequest.fields.headers,
        method: currentRequest.fields.httpMethod,
        url: currentRequest.fields.url,
      });

      dispatch(success(response));
      return response;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      dispatch(fail(error.message));
    }
  };

const initialState = createInitialState();

export const currentRequestSlice = createSlice({
  name: "currentRequest",
  initialState,
  reducers: {
    ...reducers,
    checkAllBodyXWwwFormUrlencodedRecords: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.fields.body.xWwwFormUrlencoded =
        state.fields.body.xWwwFormUrlencoded.map((record) => {
          return { ...record, active: action.payload };
        });
    },
    invalid: (state, action: PayloadAction<RequestErrors>) => {
      state.errors = action.payload;
      state.isSubmitting = false;
    },
    submit: (state) => {
      return {
        ...state,
        errors: {
          httpMethod: null,
          url: null,
        },
        isSubmitting: true,
        response: {
          value: null,
          error: null,
        },
      };
    },
    success: (state, action: PayloadAction<HttpResponse>) => {
      state.isSubmitting = false;
      state.response = {
        value: action.payload,
        error: null,
      };
    },
    fail: (state, action: PayloadAction<string>) => {
      state.isSubmitting = false;
      state.response = {
        value: null,
        error: action.payload,
      };
    },
  },
});

export const {
  updateHttpMethod,
  updateUrl,
  addQueryParameter,
  updateQueryParameter,
  removeQueryParameter,
  toggleAllQueryParameters,
  addHeader,
  removeHeader,
  updateHeader,
  toggleAllHeaders,
  updateAuthorizationType,
  updateAuthorizationBasic,
  updateAuthorizationBearerToken,
  updateAuthorizationApiKey,
  updateBodyContentType,
  updateBodyRawLanguage,
  updateBodyRawValue,
  addBodyXWWWFormUrlEncodedRecord,
  updateBodyXWWWFormUrlEncodedRecord,
  removeBodyXWWWFormUrlEncodedRecord,
  checkAllBodyXWwwFormUrlencodedRecords,
  invalid,
  submit,
  success,
  fail,
} = currentRequestSlice.actions;

export default currentRequestSlice.reducer;
