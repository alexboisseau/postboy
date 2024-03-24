import { PayloadAction } from "@reduxjs/toolkit";
import { CurrentRequestState } from "../../../types";

export default function removeBodyXWWWFormUrlEncodedRecord(
  state: CurrentRequestState,
  action: PayloadAction<number>
): CurrentRequestState {
  const updatedRecords = state.fields.body.xWwwFormUrlencoded.filter(
    (_, index) => index !== action.payload
  );

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
