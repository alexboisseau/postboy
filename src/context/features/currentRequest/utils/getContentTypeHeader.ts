import { ContentType, ContentTypeHeader, CurrentRequestState } from "../types";

export default function getContentTypeHeader(
  contentType: ContentType,
  state: CurrentRequestState
): ContentTypeHeader | "" {
  if (contentType === "x-www-form-urlencoded") {
    return "application/x-www-form-urlencoded";
  } else if (contentType === "raw") {
    if (state.fields.body.raw.language === "json") {
      return "application/json";
    } else if (state.fields.body.raw.language === "xml") {
      return "application/xml";
    }
  }

  return "";
}
