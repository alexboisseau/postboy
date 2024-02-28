import { useContext } from "react";
import { RadioGroup, RadioGroupItem } from "@components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import RawEditor from "./RawEditor";
import FormUrlEncoded from "./FormUrlEncoded";
import { RequestResponseContext } from "@/src/app/(routes)/(home)/_components/RequestResponse/state/context";
import {
  ContentType,
  RequestResponseActionTypes,
  SupportedRawLanguages,
} from "@/src/app/(routes)/(home)/_components/RequestResponse/state/actions";

function SelectContentType({
  contentType,
  currentLanguageExtension,
  handleContentTypeChange,
  handleLanguageChange,
}: {
  contentType: ContentType;
  currentLanguageExtension: SupportedRawLanguages;
  handleContentTypeChange: (value: ContentType) => void;
  handleLanguageChange: (value: SupportedRawLanguages) => void;
}) {
  return (
    <div className="flex gap-2">
      <RadioGroup
        className="flex gap-5"
        onValueChange={handleContentTypeChange}
        defaultValue={contentType}
      >
        <div className="flex gap-2 items-center">
          <RadioGroupItem value="none" id="content-type-none" />
          <label htmlFor="content-type-none">None</label>
        </div>
        <div className="flex gap-2 items-center">
          <RadioGroupItem
            value="x-www-form-urlencoded"
            id="content-type-x-www-form-urlencoded"
          />
          <label htmlFor="content-type-x-www-form-urlencoded">
            x-www-form-urlencoded
          </label>
        </div>
        <div className="flex gap-2 items-center">
          <RadioGroupItem value="raw" id="content-type-raw" />
          <label htmlFor="content-type-raw">Raw</label>
        </div>
      </RadioGroup>
      {contentType === "raw" && (
        <Select
          value={currentLanguageExtension}
          onValueChange={handleLanguageChange}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Content-Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="json">JSON</SelectItem>
            <SelectItem value="xml">XML</SelectItem>
          </SelectContent>
        </Select>
      )}
    </div>
  );
}

export default function BodyConfiguration() {
  const {
    requestResponse: {
      request: {
        fields: {
          body: {
            contentType,
            raw: { language: currentLanguageExtension },
          },
        },
      },
    },
    dispatchRequestResponseAction,
  } = useContext(RequestResponseContext);

  const handleContentTypeChange = (value: ContentType) => {
    dispatchRequestResponseAction({
      type: RequestResponseActionTypes.REQUEST_UPDATE_BODY_CONTENT_TYPE,
      payload: value,
    });
  };

  const handleRawLanguageChange = (value: SupportedRawLanguages) => {
    dispatchRequestResponseAction({
      type: RequestResponseActionTypes.REQUEST_UPDATE_BODY_RAW_LANGUAGE,
      payload: value,
    });
  };

  return (
    <div className="flex flex-col gap-2 text-sm">
      <SelectContentType
        contentType={contentType}
        currentLanguageExtension={currentLanguageExtension}
        handleContentTypeChange={handleContentTypeChange}
        handleLanguageChange={handleRawLanguageChange}
      />
      {contentType === "none" && (
        <p className="text-center">This request does not have body</p>
      )}
      {contentType === "x-www-form-urlencoded" && <FormUrlEncoded />}
      {contentType === "raw" && <RawEditor />}
    </div>
  );
}
