import { PayloadAction } from "@reduxjs/toolkit";
import { CurrentRequestState } from "../../types";

export default function updateAuthorizationApiKey(
  state: CurrentRequestState,
  action: PayloadAction<{
    key: string;
    value: string;
  }>
): CurrentRequestState {
  const lastKeyValue = state.fields.authorization.apiKey.key;
  const updatedHeaders = state.fields.headers.filter(
    (header) => header.key !== "Authorization" && header.key !== lastKeyValue
  );

  updatedHeaders.push({
    key: action.payload.key,
    value: action.payload.value,
    active: true,
  });

  return {
    ...state,
    fields: {
      ...state.fields,
      headers: updatedHeaders,
      authorization: {
        ...state.fields.authorization,
        apiKey: {
          key: action.payload.key,
          value: action.payload.value,
        },
      },
    },
  };
}
