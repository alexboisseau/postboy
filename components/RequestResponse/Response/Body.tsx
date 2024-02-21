import ReactCodeMirror from "@uiw/react-codemirror";
import { useContext, useEffect, useState } from "react";
import { RequestResponseContext } from "../state/context";
import { githubLight } from "@uiw/codemirror-theme-github";

import { getLanguageFromContentType } from "@/utils/code-mirror/get-language-from-content-type";
import { formatContent } from "@/utils/prettier/formatContent";

export default function Body() {
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
      height="200px"
      extensions={language ? [language()] : []}
      theme={githubLight}
    />
  );
}
