import { ChangeEvent, KeyboardEvent, useContext } from "react";
import { Input } from "@/components/ui/input";
import { RequestResponseActionTypes } from "../state/actions";
import { RequestResponseContext } from "../state/context";

export default function RequestUrlInput() {
  const {
    requestResponse: {
      request: {
        fields: { url },
        errors,
      },
    },
    dispatchRequestResponseAction,
    handleSend,
  } = useContext(RequestResponseContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatchRequestResponseAction({
      type: RequestResponseActionTypes.REQUEST_UPDATE_URL,
      payload: e.target.value,
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <Input
        type="url"
        value={url}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {errors.url && <span className="text-sm text-red-500">{errors.url}</span>}
    </div>
  );
}