"use client";
import AdvancedConfiguration from "./AdvancedConfiguration/AdvancedConfiguration";
import RequestHttpMethodSelect from "./RequestHttpMethodSelect";
import RequestUrlInput from "./RequestUrlInput";
import { Button } from "@components/ui/button";
import { useAppSelector } from "@context/hooks/use-app-selector";
import { selectCurrentRequest } from "@context/features/currentRequest/currentRequestSelectors";
import { useAppDispatch } from "@context/hooks/use-app-dispatch";
import { Send } from "lucide-react";
import { submitCurrentRequest } from "@context/features/currentRequest/thunks/submitCurrentRequest";

export default function Request() {
  const { fields, isSubmitting } = useAppSelector(selectCurrentRequest);
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col gap-2 py-5 px-6 bg-background border-[1px]">
      <p className="text-foreground font-semibold">Request</p>
      <div className="flex gap-1">
        <RequestHttpMethodSelect />
        <RequestUrlInput />
        <Button
          className="flex gap-2 items-center"
          onClick={() => {
            dispatch(submitCurrentRequest());
          }}
          disabled={isSubmitting || Boolean(fields.url) === false}
        >
          <Send size="16" />
          <span>Send</span>
        </Button>
      </div>
      <AdvancedConfiguration />
    </div>
  );
}
