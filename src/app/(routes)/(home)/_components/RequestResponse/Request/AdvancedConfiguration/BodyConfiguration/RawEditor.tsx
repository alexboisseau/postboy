import { json, jsonParseLinter } from "@codemirror/lang-json";
import { xml } from "@codemirror/lang-xml";
import ReactCodeMirror from "@uiw/react-codemirror";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";
import { linter, lintGutter, LintSource } from "@codemirror/lint";
import { xmlLinter } from "@libs/code-mirror/xml-linter";
import { useTheme } from "next-themes";
import { SupportedRawLanguages } from "@context/features/currentRequest/types";
import { useAppSelector } from "@context/hooks/use-app-selector";
import { useAppDispatch } from "@context/hooks/use-app-dispatch";
import { updateBodyRawValue } from "@context/features/currentRequest/currentRequestSlice";
import { selectCurrentRequestFields } from "@context/features/currentRequest/currentRequestSelectors";

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
    body: { raw },
  } = useAppSelector(selectCurrentRequestFields);
  const dispatch = useAppDispatch();
  const currentLinter = linter(linterMap[raw.language]);

  return (
    <ReactCodeMirror
      value={raw.value}
      height="250px"
      onChange={(value: string) => {
        dispatch(updateBodyRawValue(value));
      }}
      extensions={[languageMap[raw.language](), currentLinter, lintGutter()]}
      theme={theme === "dark" ? githubDark : githubLight}
    />
  );
}
