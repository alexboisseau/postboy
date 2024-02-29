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

import { useAppSelector } from "@context/hooks/use-app-selector";
import { useAppDispatch } from "@context/hooks/use-app-dispatch";
import {
  updateBodyContentType,
  updateBodyRawLanguage,
} from "@context/features/currentRequest/currentRequestSlice";
import {
  ContentType,
  SupportedRawLanguages,
} from "@context/features/currentRequest/types";
import { selectCurrentRequestFields } from "@context/features/currentRequest/currentRequestSelectors";

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
    body: {
      contentType,
      raw: { language: currentLanguageExtension },
    },
  } = useAppSelector(selectCurrentRequestFields);
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col gap-2 text-sm">
      <SelectContentType
        contentType={contentType}
        currentLanguageExtension={currentLanguageExtension}
        handleContentTypeChange={(value: ContentType) => {
          dispatch(updateBodyContentType(value));
        }}
        handleLanguageChange={(value: SupportedRawLanguages) => {
          dispatch(updateBodyRawLanguage(value));
        }}
      />
      {contentType === "none" && (
        <p className="text-center">This request does not have body</p>
      )}
      {contentType === "x-www-form-urlencoded" && <FormUrlEncoded />}
      {contentType === "raw" && <RawEditor />}
    </div>
  );
}
