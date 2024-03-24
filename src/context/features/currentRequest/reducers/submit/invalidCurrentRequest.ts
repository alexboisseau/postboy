import { PayloadAction } from "@reduxjs/toolkit";
import { CurrentRequestState, RequestErrors } from "../../types";

export default function invalidCurrentRequest(
  state: CurrentRequestState,
  action: PayloadAction<RequestErrors>
) {
  return {
    ...state,
    errors: action.payload,
    isSubmitting: false,
  };
}
