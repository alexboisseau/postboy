import { RequestResponseActionTypes } from "@/components/RequestResponse/state/actions";
import { RequestResponseContext } from "@/components/RequestResponse/state/context";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContext } from "react";

export default function BearerTokenAuthorization() {
  const { dispatchRequestResponseAction } = useContext(RequestResponseContext);

  const handleChange = (value: string) => {
    dispatchRequestResponseAction({
      type: RequestResponseActionTypes.REQUEST_UPDATE_AUTHORIZATION_BEARER_TOKEN,
      payload: value,
    });
  };

  return (
    <div className="w-full flex flex-col gap-3 items-center">
      <div className="lg:w-3/6 w-4/6">
        <Label htmlFor="authorization-bearer-token">Token</Label>
        <Input
          type="text"
          onChange={(e) => {
            handleChange(e.currentTarget.value);
          }}
          id="authorization-bearer-token"
        />
      </div>
    </div>
  );
}
