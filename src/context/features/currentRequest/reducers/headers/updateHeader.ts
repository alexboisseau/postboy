import { PayloadAction } from "@reduxjs/toolkit";
import { CurrentRequestState } from "../../types";
import { Header } from "@core/types/http-request";

export default function updateHeader(
  state: CurrentRequestState,
  action: PayloadAction<{
    header: Header;
    index: number;
  }>
): CurrentRequestState {
  return {
    ...state,
    fields: {
      ...state.fields,
      headers: state.fields.headers.map((header, index) =>
        index === action.payload.index ? action.payload.header : header
      ),
    },
  };
}
