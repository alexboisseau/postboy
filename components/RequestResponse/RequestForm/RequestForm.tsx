"use client";
import { useContext } from "react";
import { RequestResponseContext } from "../state/context";
import AdvancedConfiguration from "./AdvancedConfiguration/AdvancedConfiguration";
import { Button } from "../../ui/button";
import RequestFormHttpMethodSelect from "./RequestFormHttpMethodSelect";
import RequestFormUrlInput from "./RequestFormUrlInput";

export default function RequestForm() {
  const {
    requestResponse: {
      request: { fields, isSubmitting },
    },
    handleSend,
  } = useContext(RequestResponseContext);

  return (
    <div>
      <p className="text-lg font-semibold text-gray-800 mb-1">Request</p>
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
