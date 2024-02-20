import { useContext } from "react";
import { json } from "@codemirror/lang-json";
import { xml } from "@codemirror/lang-xml";
import ReactCodeMirror from "@uiw/react-codemirror";
import { githubLight } from "@uiw/codemirror-theme-github";
import {
  RequestResponseActionTypes,
  SupportedRawLanguages,
} from "@/components/RequestResponse/state/actions";
import { RequestResponseContext } from "@/components/RequestResponse/state/context";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const languageMap: Record<SupportedRawLanguages, () => any> = {
  json,
  xml,
};

export default function RawEditor() {
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

  return (
    <ReactCodeMirror
      value={raw.value}
      height="200px"
      onChange={handleChange}
      extensions={[languageMap[raw.language]()]}
      theme={githubLight}
    />
  );
}
