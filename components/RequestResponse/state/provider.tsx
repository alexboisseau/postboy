import { sendHttpRequest } from "@/app/actions/send-http-request";
import { RequestForm, RequestResponseActionTypes } from "./actions";
import { RequestResponseContext } from "./context";
import {
  initialRequestResponse,
  requestResponseReducer,
  validateRequestForm,
} from "./reducer";
import { useReducer } from "react";

function extractBodyFromRequestForm(form: RequestForm): string | null {
  switch (form.fields.body.contentType) {
    case "none":
      return null;
    case "x-www-form-urlencoded":
      return form.fields.body.xWwwFormUrlencoded.reduce((acc, field, index) => {
        if (field.active === false) return acc;
        const key = field.key;
        const value = field.value;

        if (index === form.fields.body.xWwwFormUrlencoded.length - 1) {
          return acc + `${key}=${value}`;
        } else {
          return acc + `${key}=${value}&`;
        }
      }, "");
    case "raw":
      return form.fields.body.raw.value;
    default:
      return null;
  }
}

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

    sendHttpRequest({
      body: extractBodyFromRequestForm(requestResponse.request),
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
