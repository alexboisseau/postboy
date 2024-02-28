import {
  AuthorizationType,
  RequestResponseActionTypes,
} from "@/src/components/RequestResponse/state/actions";
import { RequestResponseContext } from "@/src/components/RequestResponse/state/context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { useContext } from "react";
import BasicAuthorization from "./AuthorizationTypes/Basic";
import BearerTokenAuthorization from "./AuthorizationTypes/BearerToken";
import ApiKeyAuthorization from "./AuthorizationTypes/ApiKey";

function AuthorizationTypeSelector() {
  const {
    requestResponse: {
      request: {
        fields: {
          authorization: { type },
        },
      },
    },
    dispatchRequestResponseAction,
  } = useContext(RequestResponseContext);

  const handleChange = (value: AuthorizationType) => {
    dispatchRequestResponseAction({
      type: RequestResponseActionTypes.REQUEST_UPDATE_AUTHORIZATION_TYPE,
      payload: value,
    });
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
    requestResponse: {
      request: {
        fields: {
          authorization: { type },
        },
      },
    },
  } = useContext(RequestResponseContext);

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
