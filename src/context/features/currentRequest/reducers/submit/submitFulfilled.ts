import { HttpResponse } from "@core/types/http-response";
import { CurrentRequestState } from "../../types";
import { PayloadAction } from "@reduxjs/toolkit";

export default function submitFulfilled(
  state: CurrentRequestState,
  action: PayloadAction<HttpResponse>
): CurrentRequestState {
  return {
    ...state,
    isSubmitting: false,
    response: {
      value: action.payload,
      error: null,
    },
  };
}
