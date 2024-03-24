import { PayloadAction } from "@reduxjs/toolkit";
import { CurrentRequestState } from "../../types";

export default function updateAuthorizationBearerToken(
  state: CurrentRequestState,
  action: PayloadAction<string>
) {
  const updatedHeaders = state.fields.headers.filter(
    (header) => header.key !== "Authorization"
  );

  updatedHeaders.push({
    key: "Authorization",
    value: `Bearer ${action.payload}`,
    active: true,
  });

  return {
    ...state,
    fields: {
      ...state.fields,
      headers: updatedHeaders,
      authorization: {
        ...state.fields.authorization,
        bearerToken: {
          token: action.payload,
        },
      },
    },
  };
}
