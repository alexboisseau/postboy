import { ContentType, RequestResponseState } from "./types";

export default function getContentTypeHeader(
  contentType: ContentType,
  state: RequestResponseState
): string {
  if (contentType === "x-www-form-urlencoded") {
    return "application/x-www-form-urlencoded";
  } else if (contentType === "raw") {
    if (state.request.fields.body.raw.language === "json") {
      return "application/json";
    } else if (state.request.fields.body.raw.language === "xml") {
      return "application/xml";
    }
  }

  return "";
}
