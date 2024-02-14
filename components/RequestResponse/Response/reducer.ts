import { HttpResponse } from "@/core/types/http-response";
import { ResponseAction } from "./actions";

export type Response = {
  error: string | null;
  response: HttpResponse | null;
};

export function responseReducer(
  state: Response,
  action: ResponseAction
): Response {
  switch (action.type) {
    case "UPDATE_ERROR": {
      return {
        error: action.payload,
        response: null,
      };
    }

    case "UPDATE_RESPONSE": {
      return {
        error: null,
        response: action.payload,
      };
    }

    case "CLEAR_BEFORE_REQUEST": {
      return {
        error: null,
        response: null,
      };
    }

    default: {
      return state;
    }
  }
}

export const initialResponse: Response = {
  error: null,
  response: null,
};
