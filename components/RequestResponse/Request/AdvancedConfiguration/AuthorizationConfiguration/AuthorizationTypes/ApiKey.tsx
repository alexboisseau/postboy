import { RequestResponseActionTypes } from "@/components/RequestResponse/state/actions";
import { RequestResponseContext } from "@/components/RequestResponse/state/context";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContext } from "react";

export default function ApiKeyAuthorization() {
  const {
    requestResponse: {
      request: {
        fields: {
          authorization: { apiKey },
        },
      },
    },
    dispatchRequestResponseAction,
  } = useContext(RequestResponseContext);

  const handleChange = (value: string, field: "key" | "value") => {
    switch (field) {
      case "key":
        dispatchRequestResponseAction({
          type: RequestResponseActionTypes.REQUEST_UPDATE_AUTHORIZATION_API_KEY_KEY,
          payload: value,
        });
        break;
      case "value":
        dispatchRequestResponseAction({
          type: RequestResponseActionTypes.REQUEST_UPDATE_AUTHORIZATION_API_KEY_VALUE,
          payload: value,
        });
        break;
    }
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
