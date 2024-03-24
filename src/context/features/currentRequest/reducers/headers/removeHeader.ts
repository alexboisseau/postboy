import { PayloadAction } from "@reduxjs/toolkit";
import { CurrentRequestState } from "../../types";

export default function removeHeader(
  state: CurrentRequestState,
  action: PayloadAction<number>
): CurrentRequestState {
  return {
    ...state,
    fields: {
      ...state.fields,
      headers: state.fields.headers.filter(
        (_, index) => index !== action.payload
      ),
    },
  };
}
