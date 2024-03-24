import { CurrentRequestState, SupportedRawLanguages } from "../../../types";
import getContentTypeHeader from "../../../utils/getContentTypeHeader";
import { PayloadAction } from "@reduxjs/toolkit";

export default function updateBodyRawLanguage(
  state: CurrentRequestState,
  action: PayloadAction<SupportedRawLanguages>
): CurrentRequestState {
  const updatedHeaders = state.fields.headers.filter(
    (header) => header.key !== "Content-Type"
  );

  const updatedState = {
    ...state,
    fields: {
      ...state.fields,
      body: {
        ...state.fields.body,
        raw: {
          ...state.fields.body.raw,
          language: action.payload,
        },
      },
    },
  };

  const contentTypeHeaderValue = getContentTypeHeader(
    state.fields.body.contentType,
    updatedState
  );

  updatedHeaders.push({
    key: "Content-Type",
    value: contentTypeHeaderValue,
    active: true,
  });

  return {
    ...updatedState,
    fields: {
      ...updatedState.fields,
      headers: updatedHeaders,
    },
  };
}
