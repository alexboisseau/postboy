import { Diagnostic, LintSource } from "@codemirror/lint";
import { ValidationError, XMLValidator } from "fast-xml-parser";

export const xmlLinter: () => LintSource = () => {
  return (view) => {
    const diagnostics: Diagnostic[] = [];
    const isValid = XMLValidator.validate(view.state.doc.toString());

    if (isValid !== true) {
      const {
        err: { msg, line },
      } = isValid as ValidationError;

      const lineErrorFrom = view.state.doc.line(line).from;

      diagnostics.push({
        from: lineErrorFrom,
        to: lineErrorFrom,
        message: msg,
        severity: "error",
      });
    }

    return diagnostics;
  };
};
