import { PayloadAction } from "@reduxjs/toolkit";
import { ContentType, CurrentRequestState } from "../../types";
import getContentTypeHeader from "../../utils/getContentTypeHeader";

export default function updateBodyContentType(
  state: CurrentRequestState,
  action: PayloadAction<ContentType>
) {
  const updatedHeaders = state.fields.headers.filter(
    (header) => header.key !== "Content-Type"
  );

  if (action.payload !== "none") {
    const contentTypeHeader = getContentTypeHeader(action.payload, state);
    updatedHeaders.push({
      key: "Content-Type",
      value: contentTypeHeader,
      active: true,
    });
  }

  return {
    ...state,
    fields: {
      ...state.fields,
      body: {
        ...state.fields.body,
        contentType: action.payload,
      },
      headers: updatedHeaders,
    },
  };
}
