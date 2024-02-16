"use client";
import { ChangeEvent, useContext } from "react";
import { RequestResponseContext } from "../state/context";
import AdvancedConfiguration from "./AdvancedConfiguration/AdvancedConfiguration";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Button } from "../../ui/button";
import { HttpMethod } from "@/core/types/http-method";
import { RequestResponseActionTypes } from "../state/actions";

export default function RequestForm() {
  const {
    requestResponse: {
      request: { fields, errors, isSubmitting },
    },
    dispatchRequestResponseAction,
    handleSend,
  } = useContext(RequestResponseContext);

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatchRequestResponseAction({
      type: RequestResponseActionTypes.REQUEST_UPDATE_URL,
      payload: e.target.value,
    });
  };

  const handleSelectChange = (value: HttpMethod) => {
    dispatchRequestResponseAction({
      type: RequestResponseActionTypes.REQUEST_UPDATE_HTTP_METHOD,
      payload: value,
    });
  };

  return (
    <div>
      <p className="text-lg font-semibold text-gray-800 mb-1">Request</p>
      <div className="flex gap-1">
        <div className="flex flex-col gap-1">
          <Select value={fields.httpMethod} onValueChange={handleSelectChange}>
            <SelectTrigger className="w-40">
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

        <div className="flex flex-col gap-1 w-full">
          <Input type="url" value={fields.url} onChange={handleUrlChange} />
          {errors.url && (
            <span className="text-sm text-red-500">{errors.url}</span>
          )}
        </div>

        <Button
          onClick={handleSend}
          disabled={isSubmitting || Boolean(fields.url) === false}
        >
          Send
        </Button>
      </div>
      <AdvancedConfiguration />
    </div>
  );
}
