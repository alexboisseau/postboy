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
        <SelectTrigger className="w-32">
          <SelectValue placeholder="HTTP Method" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="GET">GET</SelectItem>
          <SelectItem value="POST">POST</SelectItem>
          <SelectItem value="PUT">PUT</SelectItem>
          <SelectItem value="PATCH">PATCH</SelectItem>
          <SelectItem value="DELETE">DELETE</SelectItem>
        </SelectContent>
      </Select>
      {errors.httpMethod && (
        <span className="text-sm text-red-500">{errors.httpMethod}</span>
      )}
    </div>
  );
}
