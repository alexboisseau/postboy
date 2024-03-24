import { PayloadAction } from "@reduxjs/toolkit";
import { AuthorizationType, CurrentRequestState } from "../../types";

export default function updateAuthorizationType(
  state: CurrentRequestState,
  action: PayloadAction<AuthorizationType>
): CurrentRequestState {
  // Remove the Authorization header if it exists
  const updatedHeaders = state.fields.headers.filter(
    (h) =>
      h.key !== "Authorization" &&
      h.key !== state.fields.authorization.apiKey.key
  );

  switch (action.payload) {
    case "basic":
      updatedHeaders.push({
        key: "Authorization",
        value: `Basic ${btoa(
          `${state.fields.authorization.basic.username}:${state.fields.authorization.basic.password}`
        )}`,
        active: true,
      });
      break;
    case "bearer-token":
      updatedHeaders.push({
        key: "Authorization",
        value: `Bearer ${state.fields.authorization.bearerToken.token}`,
        active: true,
      });
      break;
    case "api-key":
      updatedHeaders.push({
        key: state.fields.authorization.apiKey.key,
        value: state.fields.authorization.apiKey.value,
        active: true,
      });
      break;
  }

  return {
    ...state,
    fields: {
      ...state.fields,
      headers: updatedHeaders,
      authorization: {
        ...state.fields.authorization,
        type: action.payload,
      },
    },
  };
}
