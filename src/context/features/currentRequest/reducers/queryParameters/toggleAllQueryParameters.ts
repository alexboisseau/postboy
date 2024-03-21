import { PayloadAction } from "@reduxjs/toolkit";
import { CurrentRequestState } from "../../types";
import generateUrlWithQueryParameters from "../../utils/generateUrlWithQueryParameters";

export default function toggleAllQueryParameters(
  state: CurrentRequestState,
  action: PayloadAction<boolean>
): CurrentRequestState {
  const updatedQueryParameters = state.fields.queryParameters.map((param) => ({
    ...param,
    active: action.payload,
  }));

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
