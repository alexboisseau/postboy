import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { selectCurrentRequestFields } from "@context/features/currentRequest/currentRequestSelectors";
import { updateAuthorizationBearerToken } from "@context/features/currentRequest/currentRequestSlice";
import { useAppDispatch } from "@context/hooks/use-app-dispatch";
import { useAppSelector } from "@context/hooks/use-app-selector";

export default function BearerTokenAuthorization() {
  const {
    authorization: {
      bearerToken: { token },
    },
  } = useAppSelector(selectCurrentRequestFields);
  const dispatch = useAppDispatch();

  const handleChange = (value: string) => {
    dispatch(updateAuthorizationBearerToken(value));
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
          value={token}
          id="authorization-bearer-token"
        />
      </div>
    </div>
  );
}
