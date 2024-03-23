import { PayloadAction } from "@reduxjs/toolkit";
import { CurrentRequestState } from "../types";
import { HttpMethod } from "@core/types/http-method";

export default function updateHttpMethod(
  state: CurrentRequestState,
  action: PayloadAction<HttpMethod>
): CurrentRequestState {
  return {
    ...state,
    fields: {
      ...state.fields,
      httpMethod: action.payload,
    },
  };
}
