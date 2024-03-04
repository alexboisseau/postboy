import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import BasicAuthorization from "./AuthorizationTypes/Basic";
import BearerTokenAuthorization from "./AuthorizationTypes/BearerToken";
import ApiKeyAuthorization from "./AuthorizationTypes/ApiKey";
import { useAppSelector } from "@context/hooks/use-app-selector";
import { useAppDispatch } from "@context/hooks/use-app-dispatch";
import { AuthorizationType } from "@context/features/currentRequest/types";
import { updateAuthorizationType } from "@context/features/currentRequest/currentRequestSlice";
import { selectCurrentRequestFields } from "@context/features/currentRequest/currentRequestSelectors";

function AuthorizationTypeSelector() {
  const {
    authorization: { type },
  } = useAppSelector(selectCurrentRequestFields);
  const dispatch = useAppDispatch();

  const handleChange = (value: AuthorizationType) => {
    dispatch(updateAuthorizationType(value));
  };

  return (
    <div>
      <div className="flex text-sm items-center justify-between gap-5 mb-2">
        <span className="font-semibold">Type</span>
        <Select value={type} onValueChange={handleChange}>
          <SelectTrigger className={`w-32`}>
            <SelectValue placeholder="HTTP Method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="no-auth">No auth</SelectItem>
            <SelectItem value="basic">Basic</SelectItem>
            <SelectItem value="bearer-token">Bearer</SelectItem>
            <SelectItem value="api-key">API Key</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <p className="text-sm">
        The authorization header will be automatically generated when you send
        the request.
      </p>
    </div>
  );
}

export default function AuthorizationConfiguration() {
  const {
    authorization: { type },
  } = useAppSelector(selectCurrentRequestFields);

  return (
    <div className="p-2 flex gap-36">
      <div className="w-2/6">
        <AuthorizationTypeSelector />
      </div>
      <div className="w-4/6 flex items-center justify-center">
        {type === "no-auth" && <p>No authorization</p>}
        {type === "api-key" && <ApiKeyAuthorization />}
        {type === "basic" && <BasicAuthorization />}
        {type === "bearer-token" && <BearerTokenAuthorization />}
      </div>
    </div>
  );
}
