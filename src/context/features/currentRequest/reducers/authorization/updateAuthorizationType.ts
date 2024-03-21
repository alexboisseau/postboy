import { PayloadAction } from "@reduxjs/toolkit";
import { AuthorizationType, CurrentRequestState } from "../../types";
import { Header } from "@core/types/http-request";

function generateAuthorizationHeaderValue(
  state: CurrentRequestState,
  type: AuthorizationType
): Header {
  switch (type) {
    case "basic":
      return {
        key: "Authorization",
        value: `Basic ${btoa(
          `${state.fields.authorization.basic.username}:${state.fields.authorization.basic.password}`
        )}`,
        active: true,
      };
    case "bearer-token":
      return {
        key: "Authorization",
        value: `Bearer ${state.fields.authorization.bearerToken.token}`,
        active: true,
      };
    case "api-key":
      return {
        key: state.fields.authorization.apiKey.key,
        value: state.fields.authorization.apiKey.value,
        active: true,
      };
    default:
      return {
        key: "Authorization",
        value: "",
        active: true,
      };
  }
}

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

  updatedHeaders.push(generateAuthorizationHeaderValue(state, action.payload));

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
