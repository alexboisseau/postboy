import { PayloadAction } from "@reduxjs/toolkit";
import { CurrentRequestState } from "../../types";

export default function submitRejected(
  state: CurrentRequestState,
  action: PayloadAction<string>
): CurrentRequestState {
  return {
    ...state,
    isSubmitting: false,
    response: {
      value: null,
      error: action.payload,
    },
  };
}
