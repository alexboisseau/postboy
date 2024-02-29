import ReactCodeMirror from "@uiw/react-codemirror";
import { useContext, useEffect, useState } from "react";
import { RequestResponseContext } from "../state/context";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";

import { getLanguageFromContentType } from "@libs/code-mirror/get-language-from-content-type";
import { formatContent } from "@libs/prettier/formatContent";
import { useTheme } from "next-themes";

export default function Body() {
  const { theme } = useTheme();
  const {
    requestResponse: {
      response: { value },
    },
  } = useContext(RequestResponseContext);
  const [formattedContent, setFormattedContent] = useState<string | null>(null);

  const language = getLanguageFromContentType(value?.body.contentType || "");

  useEffect(() => {
    formatContent(value?.body.contentType || "", value?.body.value || "").then(
      (content) => {
        setFormattedContent(content);
      }
    );
  }, [value?.body.contentType, value?.body.value]);

  return (
    <ReactCodeMirror
      value={formattedContent ?? value?.body.value}
      height="400px"
      extensions={language ? [language()] : []}
      theme={theme === "dark" ? githubDark : githubLight}
    />
  );
}