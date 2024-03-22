import { PayloadAction } from "@reduxjs/toolkit";
import { CurrentRequestState } from "../../types";

export default function updateAuthorizationBasic(
  state: CurrentRequestState,
  action: PayloadAction<{ username: string; password: string }>
): CurrentRequestState {
  const updatedHeaders = state.fields.headers.filter(
    (header) => header.key !== "Authorization"
  );

  updatedHeaders.push({
    key: "Authorization",
    value: `Basic ${btoa(
      `${action.payload.username}:${action.payload.password}`
    )}`,
    active: true,
  });

  return {
    ...state,
    fields: {
      ...state.fields,
      headers: updatedHeaders,
      authorization: {
        ...state.fields.authorization,
        basic: {
          username: action.payload.username,
          password: action.payload.password,
        },
      },
    },
  };
}
