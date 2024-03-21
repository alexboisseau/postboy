import { QueryParameter } from "@core/types/http-request";
import { CurrentRequestState } from "../types";
import { PayloadAction } from "@reduxjs/toolkit";

export default function updateUrl(
  state: CurrentRequestState,
  action: PayloadAction<string>
): CurrentRequestState {
  const url = action.payload;
  const disabledQueryParameters = state.fields.queryParameters.filter(
    (qp) => qp.active === false
  );
  const queryParametersString = action.payload.split("?")[1];

  if (!queryParametersString) {
    return {
      ...state,
      fields: {
        ...state.fields,
        url,
        queryParameters: disabledQueryParameters,
      },
    };
  }

  const queryParameters: QueryParameter[] = disabledQueryParameters;
  const urlSearchParams = new URLSearchParams(queryParametersString);
  const activeParameters = Array.from(urlSearchParams).map(([key, value]) => ({
    key,
    value,
    active: true,
  }));
  queryParameters.push(...activeParameters);

  return {
    ...state,
    fields: {
      ...state.fields,
      url,
      queryParameters,
    },
  };
}
