import { xml } from "@codemirror/lang-xml";
import { json } from "@codemirror/lang-json";
import { html } from "@codemirror/lang-html";

import * as prettier from "prettier/standalone";
import babel from "prettier/plugins/babel";
import angularHtmlParser from "prettier/plugins/html";
import * as prettierPluginEstree from "prettier/plugins/estree";

export function getCodeMirrorLanguageFromContentTypeHeader(
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

export async function formatContent(contentType: string, content: string) {
  switch (contentType) {
    case "application/json":
      return prettier.format(content, {
        parser: "json",
        plugins: [babel, prettierPluginEstree],
      });
    case "application/xml":
      return prettier.format(content, {
        parser: "xml",
        plugins: [babel, prettierPluginEstree],
      });
    case "text/html":
      return prettier.format(content, {
        parser: "html",
        plugins: [angularHtmlParser, prettierPluginEstree],
      });
    default:
      return content;
  }
}
