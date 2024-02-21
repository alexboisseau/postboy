import prettier from "prettier/standalone";
import prettierPluginEstree from "prettier/plugins/estree";
import babel from "prettier/plugins/babel";
import html from "prettier/plugins/html";

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
        plugins: [html, prettierPluginEstree],
      });
    default:
      return content;
  }
}
