import { sendHttpRequest } from "@/app/actions/send-http-request";
import { RequestResponseActionTypes } from "./actions";
import { RequestResponseContext } from "./context";
import {
  initialRequestResponse,
  requestResponseReducer,
  validateRequestForm,
} from "./reducer";
import { useReducer } from "react";

export function RequestResponseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [requestResponse, dispatchRequestResponseAction] = useReducer(
    requestResponseReducer,
    initialRequestResponse
  );

  const handleSend = async () => {
    dispatchRequestResponseAction({
      type: RequestResponseActionTypes.REQUEST_SUBMIT_FORM,
    });

    const formValidation = validateRequestForm(requestResponse.request);

    if (formValidation.success === false) {
      dispatchRequestResponseAction({
        type: RequestResponseActionTypes.REQUEST_INVALID_FORM,
        payload: formValidation.errors,
      });

      return;
    }

    console.log(requestResponse.request.fields.headers);
    sendHttpRequest({
      headers: requestResponse.request.fields.headers,
      method: requestResponse.request.fields.httpMethod,
      url: requestResponse.request.fields.url,
    })
      .then((response) => {
        dispatchRequestResponseAction({
          type: RequestResponseActionTypes.RESPONSE_SUCCESS,
          payload: response,
        });
      })
      .catch((error) => {
        console.error(error);
        dispatchRequestResponseAction({
          type: RequestResponseActionTypes.RESPONSE_ERROR,
          payload: error.message,
        });
      });
  };

  return (
    <RequestResponseContext.Provider
      value={{
        requestResponse,
        dispatchRequestResponseAction,
        handleSend,
      }}
    >
      {children}
    </RequestResponseContext.Provider>
  );
}
