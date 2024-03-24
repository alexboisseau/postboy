import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { selectCurrentRequestFields } from "@context/features/currentRequest/currentRequestSelectors";
import { updateAuthorizationApiKey } from "@context/features/currentRequest/currentRequestSlice";
import { useAppDispatch } from "@context/hooks/use-app-dispatch";
import { useAppSelector } from "@context/hooks/use-app-selector";

export default function ApiKeyAuthorization() {
  const {
    authorization: { apiKey },
  } = useAppSelector(selectCurrentRequestFields);
  const dispatch = useAppDispatch();

  const handleChange = (value: string, field: "key" | "value") => {
    dispatch(
      updateAuthorizationApiKey({
        key: field === "key" ? value : apiKey.key,
        value: field === "value" ? value : apiKey.value,
      })
    );
  };

  return (
    <div className="w-full flex flex-col gap-3 items-center">
      <div className="lg:w-3/6 w-4/6">
        <Label htmlFor="authorization-api-key-key">Key</Label>
        <Input
          value={apiKey.key}
          type="text"
          onChange={(e) => {
            handleChange(e.currentTarget.value, "key");
          }}
          id="authorization-api-key-key"
        />
      </div>
      <div className="lg:w-3/6 w-4/6">
        <Label htmlFor="authorization-api-key-value">Value</Label>
        <Input
          value={apiKey.value}
          type="text"
          onChange={(e) => {
            handleChange(e.currentTarget.value, "value");
          }}
          id="authorization-api-key-value"
        />
      </div>
    </div>
  );
}
