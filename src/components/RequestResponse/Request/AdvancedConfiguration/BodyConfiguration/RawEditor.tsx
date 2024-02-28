import { useContext } from "react";
import { json, jsonParseLinter } from "@codemirror/lang-json";
import { xml } from "@codemirror/lang-xml";
import ReactCodeMirror from "@uiw/react-codemirror";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";
import { linter, lintGutter, LintSource } from "@codemirror/lint";
import { xmlLinter } from "@libs/code-mirror/xml-linter";
import {
  RequestResponseActionTypes,
  SupportedRawLanguages,
} from "@components/RequestResponse/state/actions";
import { RequestResponseContext } from "@components/RequestResponse/state/context";
import { useTheme } from "next-themes";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const languageMap: Record<SupportedRawLanguages, () => any> = {
  json,
  xml,
};

const linterMap: Record<SupportedRawLanguages, LintSource> = {
  json: jsonParseLinter(),
  xml: xmlLinter(),
};

export default function RawEditor() {
  const { theme } = useTheme();
  const {
    requestResponse: {
      request: {
        fields: {
          body: { raw },
        },
      },
    },
    dispatchRequestResponseAction,
  } = useContext(RequestResponseContext);

  const handleChange = (value: string) => {
    dispatchRequestResponseAction({
      type: RequestResponseActionTypes.REQUEST_UPDATE_BODY_RAW_CONTENT,
      payload: value,
    });
  };

  const currentLinter = linter(linterMap[raw.language]);

  return (
    <ReactCodeMirror
      value={raw.value}
      height="250px"
      onChange={handleChange}
      extensions={[languageMap[raw.language](), currentLinter, lintGutter()]}
      theme={theme === "dark" ? githubDark : githubLight}
    />
  );
}
