import { PayloadAction } from "@reduxjs/toolkit";
import { CurrentRequestState } from "../types";
import { QueryParameter } from "@core/types/http-request";
import generateUrlWithQueryParameters from "../utils/generateUrlWithQueryParameters";

export default function updateQueryParameter(
  state: CurrentRequestState,
  action: PayloadAction<{
    queryParameter: QueryParameter;
    index: number;
  }>
): CurrentRequestState {
  const updatedQueryParameters = state.fields.queryParameters.map(
    (param, index) =>
      index === action.payload.index ? action.payload.queryParameter : param
  );

  return {
    ...state,
    fields: {
      ...state.fields,
      queryParameters: updatedQueryParameters,
      url: generateUrlWithQueryParameters(
        state.fields.url,
        updatedQueryParameters
      ),
    },
  };
}
