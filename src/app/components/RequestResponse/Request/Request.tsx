"use client";
import AdvancedConfiguration from "./AdvancedConfiguration/AdvancedConfiguration";
import RequestHttpMethodSelect from "./RequestHttpMethodSelect";
import RequestUrlInput from "./RequestUrlInput";
import { Button } from "../../../../../../components/ui/button";
import { useAppSelector } from "@context/hooks/use-app-selector";
import { selectCurrentRequest } from "@context/features/currentRequest/currentRequestSelectors";
import { submitCurrentRequest } from "@context/features/currentRequest/currentRequestSlice";
import { useAppDispatch } from "@context/hooks/use-app-dispatch";

export default function Request() {
  const { fields, isSubmitting } = useAppSelector(selectCurrentRequest);
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col gap-2">
      <p className="text-2xl font-semibold">Request</p>
      <div className="flex gap-1">
        <RequestHttpMethodSelect />
        <RequestUrlInput />
        <Button
          onClick={() => {
            dispatch(submitCurrentRequest());
          }}
          disabled={isSubmitting || Boolean(fields.url) === false}
          variant={"secondary"}
        >
          Send
        </Button>
      </div>
      <AdvancedConfiguration />
    </div>
  );
}
