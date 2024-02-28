import { html } from "@codemirror/lang-html";
import { json } from "@codemirror/lang-json";
import { xml } from "@codemirror/lang-xml";

export function getLanguageFromContentType(
  contentType: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): (() => any) | null {
  switch (contentType) {
    case "application/json":
      return json;
    case "application/xml":
      return xml;
    case "text/html":
      return html;
    default:
      return null;
  }
}
