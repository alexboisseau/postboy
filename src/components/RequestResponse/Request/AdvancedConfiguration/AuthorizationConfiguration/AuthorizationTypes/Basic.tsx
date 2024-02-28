import { RequestResponseActionTypes } from "@/src/components/RequestResponse/state/actions";
import { RequestResponseContext } from "@/src/components/RequestResponse/state/context";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { useContext } from "react";

export default function BasicAuthorization() {
  const { dispatchRequestResponseAction } = useContext(RequestResponseContext);

  const handleChange = (value: string, field: "username" | "password") => {
    switch (field) {
      case "username":
        dispatchRequestResponseAction({
          type: RequestResponseActionTypes.REQUEST_UPDATE_AUTHORIZATION_BASIC_USERNAME,
          payload: value,
        });
        break;
      case "password":
        dispatchRequestResponseAction({
          type: RequestResponseActionTypes.REQUEST_UPDATE_AUTHORIZATION_BASIC_PASSWORD,
          payload: value,
        });
        break;
    }
  };

  return (
    <div className="w-full flex flex-col gap-3 items-center">
      <div className="lg:w-3/6 w-4/6">
        <Label htmlFor="authorization-basic-username">Username</Label>
        <Input
          type="text"
          onChange={(e) => {
            handleChange(e.currentTarget.value, "username");
          }}
          id="authorization-basic-username"
        />
      </div>
      <div className="lg:w-3/6 w-4/6">
        <Label htmlFor="authorization-basic-password">Password</Label>
        <Input
          type="password"
          onChange={(e) => {
            handleChange(e.currentTarget.value, "password");
          }}
          id="authorization-basic-password"
        />
      </div>
    </div>
  );
}
