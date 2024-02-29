import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { HttpMethod } from "@core/types/http-method";
import { useAppSelector } from "@context/hooks/use-app-selector";
import { useAppDispatch } from "@context/hooks/use-app-dispatch";
import { updateHttpMethod } from "@context/features/currentRequest/currentRequestSlice";
import { selectCurrentRequest } from "@context/features/currentRequest/currentRequestSelectors";

const httpMethodColors: {
  [K in HttpMethod]: string;
} = {
  GET: "text-green-600",
  POST: "text-blue-600",
  PUT: "text-yellow-600",
  PATCH: "text-yellow-600",
  DELETE: "text-red-600",
  OPTIONS: "text-slate-600",
  HEAD: "text-slate-600",
};

export default function RequestHttpMethodSelect() {
  const { fields, errors } = useAppSelector(selectCurrentRequest);
  const dispatch = useAppDispatch();

  const handleChange = (value: HttpMethod) => {
    dispatch(updateHttpMethod(value));
  };

  return (
    <div className="flex flex-col gap-1">
      <Select value={fields.httpMethod} onValueChange={handleChange}>
        <SelectTrigger
          className={`w-32 font-semibold ${httpMethodColors[fields.httpMethod]}`}
        >
          <SelectValue placeholder="HTTP Method" />
        </SelectTrigger>
        <SelectContent className="font-semibold">
          <SelectItem
            className={`${httpMethodColors.GET} hover:${httpMethodColors.GET}`}
            value="GET"
          >
            GET
          </SelectItem>
          <SelectItem className={httpMethodColors.POST} value="POST">
            POST
          </SelectItem>
          <SelectItem className={httpMethodColors.PUT} value="PUT">
            PUT
          </SelectItem>
          <SelectItem className={httpMethodColors.PATCH} value="PATCH">
            PATCH
          </SelectItem>
          <SelectItem className={httpMethodColors.DELETE} value="DELETE">
            DELETE
          </SelectItem>
        </SelectContent>
      </Select>
      {errors.httpMethod && (
        <span className="text-sm text-red-500">{errors.httpMethod}</span>
      )}
    </div>
  );
}
