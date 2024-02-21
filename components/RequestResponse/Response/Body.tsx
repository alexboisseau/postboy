import ReactCodeMirror from "@uiw/react-codemirror";
import { useContext, useEffect, useState } from "react";
import { RequestResponseContext } from "../state/context";
import { githubLight } from "@uiw/codemirror-theme-github";
import {
  formatContent,
  getCodeMirrorLanguageFromContentTypeHeader,
} from "@/lib/code-mirror-utils";

export default function Body() {
  const {
    requestResponse: {
      response: { value },
    },
  } = useContext(RequestResponseContext);
  const [formattedContent, setFormattedContent] = useState<string | null>(null);

  const language = getCodeMirrorLanguageFromContentTypeHeader(
    value?.body.contentType || ""
  );

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
