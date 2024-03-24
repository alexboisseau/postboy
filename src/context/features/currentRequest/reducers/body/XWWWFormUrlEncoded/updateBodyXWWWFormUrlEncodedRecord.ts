import { PayloadAction } from "@reduxjs/toolkit";
import { CurrentRequestState } from "../../../types";
import { ActivatableKeyValue } from "@core/types/activatable-key-value";

export default function updateBodyXWWWFormUrlEncodedRecord(
  state: CurrentRequestState,
  action: PayloadAction<{ record: ActivatableKeyValue; index: number }>
): CurrentRequestState {
  const updatedRecords = state.fields.body.xWwwFormUrlencoded.map(
    (record, index) =>
      index === action.payload.index ? action.payload.record : record
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
