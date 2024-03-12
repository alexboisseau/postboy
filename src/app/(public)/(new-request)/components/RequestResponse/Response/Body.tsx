import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { selectCurrentRequest } from "@context/features/currentRequest/currentRequestSelectors";
import { useAppSelector } from "@context/hooks/use-app-selector";
import ReactCodeMirror from "@uiw/react-codemirror";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";
import { getLanguageFromContentType } from "@libs/code-mirror/get-language-from-content-type";
import { formatContent } from "@libs/prettier/formatContent";

export default function Body() {
  const { theme } = useTheme();
  const { response } = useAppSelector(selectCurrentRequest);
  const [formattedContent, setFormattedContent] = useState<string | null>(null);
  const language = getLanguageFromContentType(
    response.value?.body.contentType || ""
  );

  useEffect(() => {
    formatContent(
      response.value?.body.contentType || "",
      response.value?.body.value || ""
    ).then((content) => {
      setFormattedContent(content);
    });
  }, [response.value?.body.contentType, response.value?.body.value]);

  return (
    <ReactCodeMirror
      value={formattedContent ?? response.value?.body.value}
      height="400px"
      extensions={language ? [language()] : []}
      theme={theme === "dark" ? githubDark : githubLight}
    />
  );
}
