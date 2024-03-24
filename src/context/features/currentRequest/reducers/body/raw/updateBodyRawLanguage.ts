import {
  CurrentRequestState,
  SupportedRawLanguages,
} from "@context/features/currentRequest/types";
import getContentTypeHeader from "@context/features/currentRequest/utils/getContentTypeHeader";
import { PayloadAction } from "@reduxjs/toolkit";

export default function updateBodyRawLanguage(
  state: CurrentRequestState,
  payload: PayloadAction<SupportedRawLanguages>
): CurrentRequestState {
  const updatedHeaders = state.fields.headers.filter(
    (header) => header.key !== "Content-Type"
  );

  const contentTypeHeaderValue = getContentTypeHeader(
    state.fields.body.contentType,
    state
  );

  updatedHeaders.push({
    key: "Content-Type",
    value: contentTypeHeaderValue,
    active: true,
  });

  return {
    ...state,
    fields: {
      ...state.fields,
      body: {
        ...state.fields.body,
        raw: {
          ...state.fields.body.raw,
          language: payload.payload,
        },
      },
      headers: updatedHeaders,
    },
  };
}
