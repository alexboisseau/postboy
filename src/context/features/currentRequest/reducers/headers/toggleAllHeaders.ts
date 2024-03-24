import { PayloadAction } from "@reduxjs/toolkit";
import { CurrentRequestState } from "../../types";

export default function toggleAllHeaders(
  state: CurrentRequestState,
  action: PayloadAction<boolean>
): CurrentRequestState {
  return {
    ...state,
    fields: {
      ...state.fields,
      headers: state.fields.headers.map((header) => ({
        ...header,
        active: action.payload,
      })),
    },
  };
}
