import { createContext, useReducer } from "react";
import { sendHttpRequest } from "@/app/actions/send-http-request";
import { Response, initialResponse, responseReducer } from "./Response/reducer";
import {
  RequestFormAction,
  RequestFormActionTypes,
} from "./RequestForm/actions";
import {
  RequestForm,
  RequestFormReducer,
  initialRequestForm,
  validateRequestForm,
} from "./RequestForm/reducer";
import { ResponseActionTypes } from "./Response/actions";

export const RequestResponseContext = createContext<{
  httpRequestForm: RequestForm;
  response: Response;
  handleSend: () => Promise<void>;
  dispatchHttpRequestFormAction: (action: RequestFormAction) => void;
}>({
  httpRequestForm: initialRequestForm,
  response: initialResponse,
  handleSend: async () => {},
  dispatchHttpRequestFormAction: () => {},
});

export function RequestResponseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [response, dispatchResponseAction] = useReducer(
    responseReducer,
    initialResponse
  );
  const [httpRequestForm, dispatchHttpRequestFormAction] = useReducer(
    RequestFormReducer,
    initialRequestForm
  );

  const handleSend = async () => {
    dispatchHttpRequestFormAction({
      type: RequestFormActionTypes.SUBMIT_FORM,
    });

    dispatchResponseAction({
      type: ResponseActionTypes.CLEAR_BEFORE_REQUEST,
    });

    const formValidation = validateRequestForm(httpRequestForm);

    if (formValidation.success === false) {
      dispatchHttpRequestFormAction({
        type: RequestFormActionTypes.INVALID_FORM,
        payload: formValidation.errors,
      });

      return;
    }

    sendHttpRequest({
      method: httpRequestForm.fields.httpMethod,
      url: httpRequestForm.fields.url,
    })
      .then((response) => {
        dispatchHttpRequestFormAction({
          type: RequestFormActionTypes.UPDATE_IS_SUBMITTING,
          payload: false,
        });
        dispatchResponseAction({
          type: ResponseActionTypes.UPDATE_RESPONSE,
          payload: response,
        });
      })
      .catch((error) => {
        console.error(error);
        dispatchHttpRequestFormAction({
          type: RequestFormActionTypes.UPDATE_IS_SUBMITTING,
          payload: false,
        });
        dispatchResponseAction({
          type: ResponseActionTypes.UPDATE_ERROR,
          payload: error.message,
        });
      });
  };

  return (
    <RequestResponseContext.Provider
      value={{
        httpRequestForm,
        response,
        dispatchHttpRequestFormAction,
        handleSend,
      }}
    >
      {children}
    </RequestResponseContext.Provider>
  );
}
