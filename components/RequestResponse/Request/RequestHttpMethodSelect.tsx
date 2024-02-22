import { useContext } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RequestResponseActionTypes } from "../state/actions";
import { RequestResponseContext } from "../state/context";
import { HttpMethod } from "@/core/types/http-method";

const httpMethodColors: {
  [K in HttpMethod]: string;
} = {
  GET: "text-green-500",
  POST: "text-blue-500",
  PUT: "text-yellow-500",
  PATCH: "text-yellow-500",
  DELETE: "text-red-500",
  OPTIONS: "text-gray-500",
  HEAD: "text-gray-500",
};

export default function RequestHttpMethodSelect() {
  const {
    requestResponse: {
      request: {
        fields: { httpMethod },
        errors,
      },
    },
    dispatchRequestResponseAction,
  } = useContext(RequestResponseContext);

  const handleChange = (value: HttpMethod) => {
    dispatchRequestResponseAction({
      type: RequestResponseActionTypes.REQUEST_UPDATE_HTTP_METHOD,
      payload: value,
    });
  };

  return (
    <div className="flex flex-col gap-1">
      <Select value={httpMethod} onValueChange={handleChange}>
        <SelectTrigger
          className={`w-32 font-semibold ${httpMethodColors[httpMethod]}`}
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
