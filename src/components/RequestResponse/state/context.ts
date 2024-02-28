import { createContext } from "react";
import { initialRequestResponse } from "./reducer";
import { RequestResponse, RequestResponseAction } from "./actions";

type RequestResponseContextType = {
  requestResponse: RequestResponse;
  dispatchRequestResponseAction: (action: RequestResponseAction) => void;
  handleSend: () => Promise<void>;
};

const initialRequestResponseContext: RequestResponseContextType = {
  requestResponse: initialRequestResponse,
  dispatchRequestResponseAction: () => {},
  handleSend: async () => {},
};

export const RequestResponseContext = createContext<RequestResponseContextType>(
  initialRequestResponseContext
);
