"use client";
import { useContext } from "react";
import AdvancedConfiguration from "./AdvancedConfiguration/AdvancedConfiguration";
import RequestFormHttpMethodSelect from "./RequestFormHttpMethodSelect";
import RequestFormUrlInput from "./RequestFormUrlInput";
import { RequestResponseContext } from "../state/context";
import { Button } from "../../ui/button";

export default function RequestForm() {
  const {
    requestResponse: {
      request: { fields, isSubmitting },
    },
    handleSend,
  } = useContext(RequestResponseContext);

  return (
    <div className="flex flex-col gap-2">
      <p className="text-2xl font-semibold text-gray-800">Request</p>
      <div className="flex gap-1">
        <RequestFormHttpMethodSelect />
        <RequestFormUrlInput />
        <Button
          onClick={handleSend}
          disabled={isSubmitting || Boolean(fields.url) === false}
        >
          Send
        </Button>
      </div>
      <AdvancedConfiguration />
    </div>
  );
}
