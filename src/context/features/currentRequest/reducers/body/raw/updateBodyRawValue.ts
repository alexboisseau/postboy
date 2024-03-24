import { CurrentRequestState } from "../../../types";
import { PayloadAction } from "@reduxjs/toolkit";

export default function updateBodyRawValue(
  state: CurrentRequestState,
  action: PayloadAction<string>
): CurrentRequestState {
  return {
    ...state,
    fields: {
      ...state.fields,
      body: {
        ...state.fields.body,
        raw: {
          ...state.fields.body.raw,
          value: action.payload,
        },
      },
    },
  };
}
