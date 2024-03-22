import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { selectCurrentRequestFields } from "@context/features/currentRequest/currentRequestSelectors";
import { updateAuthorizationBasic } from "@context/features/currentRequest/currentRequestSlice";
import { useAppDispatch } from "@context/hooks/use-app-dispatch";
import { useAppSelector } from "@context/hooks/use-app-selector";

export default function BasicAuthorization() {
  const {
    authorization: {
      basic: { username, password },
    },
  } = useAppSelector(selectCurrentRequestFields);
  const dispatch = useAppDispatch();

  const handleChange = (value: string, field: "username" | "password") => {
    dispatch(
      updateAuthorizationBasic({
        username: field === "username" ? value : username,
        password: field === "password" ? value : password,
      })
    );
  };

  return (
    <div className="w-full flex flex-col gap-3 items-center">
      <div className="lg:w-3/6 w-4/6">
        <Label htmlFor="authorization-basic-username">Username</Label>
        <Input
          value={username}
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
          value={password}
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
