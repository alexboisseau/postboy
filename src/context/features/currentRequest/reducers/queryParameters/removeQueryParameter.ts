import { PayloadAction } from "@reduxjs/toolkit";
import { CurrentRequestState } from "../../types";
import generateUrlWithQueryParameters from "../../utils/generateUrlWithQueryParameters";

export default function removeQueryParameter(
  state: CurrentRequestState,
  action: PayloadAction<number>
): CurrentRequestState {
  const updatedQueryParameters = state.fields.queryParameters.filter(
    (_, index) => index !== action.payload
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
