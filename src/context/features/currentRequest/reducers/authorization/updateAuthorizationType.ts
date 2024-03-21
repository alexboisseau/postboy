import { PayloadAction } from "@reduxjs/toolkit";
import { AuthorizationType, CurrentRequestState } from "../../types";

export default function updateAuthorizationType(
  state: CurrentRequestState,
  action: PayloadAction<AuthorizationType>
): CurrentRequestState {
  // Remove the Authorization header if it exists
  let updatedHeaders = state.fields.headers.filter(
    (header) => header.key !== "Authorization"
  );

  if (state.fields.authorization.type === "api-key") {
    updatedHeaders = state.fields.headers.filter(
      (header) => header.key !== state.fields.authorization.apiKey.key
    );
  }

  const headerValue = (() => {
    if (action.payload === "basic") {
      return `Basic ${btoa(
        `${state.fields.authorization.basic.username}:${state.fields.authorization.basic.password}`
      )}`;
    } else if (action.payload === "bearer-token") {
      return `Bearer ${state.fields.authorization.bearerToken.token}`;
    }
    return "";
  })();

  return {
    ...state,
    fields: {
      ...state.fields,
      headers: [
        ...updatedHeaders,
        {
          key: "Authorization",
          value: headerValue,
          active: true,
        },
      ],
      authorization: {
        ...state.fields.authorization,
        type: action.payload,
      },
    },
  };
}
