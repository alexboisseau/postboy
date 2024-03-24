import { PayloadAction } from "@reduxjs/toolkit";
import { CurrentRequestState } from "../../../types";

export default function toggleAllBodyXWwwFormUrlEncodedRecords(
  state: CurrentRequestState,
  action: PayloadAction<boolean>
): CurrentRequestState {
  const updatedRecords = state.fields.body.xWwwFormUrlencoded.map((record) => {
    return { ...record, active: action.payload };
  });

  return {
    ...state,
    fields: {
      ...state.fields,
      body: {
        ...state.fields.body,
        xWwwFormUrlencoded: updatedRecords,
      },
    },
  };
}
