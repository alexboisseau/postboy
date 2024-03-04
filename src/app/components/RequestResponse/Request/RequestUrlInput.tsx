import { ChangeEvent, KeyboardEvent } from "react";
import { Input } from "@components/ui/input";
import { useAppSelector } from "@context/hooks/use-app-selector";
import { useAppDispatch } from "@context/hooks/use-app-dispatch";
import {
  submitCurrentRequest,
  updateUrl,
} from "@context/features/currentRequest/currentRequestSlice";
import { selectCurrentRequest } from "@context/features/currentRequest/currentRequestSelectors";

export default function RequestUrlInput() {
  const { fields, errors } = useAppSelector(selectCurrentRequest);
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateUrl(e.target.value));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submitCurrentRequest();
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <Input
        type="url"
        value={fields.url}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {errors.url && <span className="text-sm text-red-500">{errors.url}</span>}
    </div>
  );
}
