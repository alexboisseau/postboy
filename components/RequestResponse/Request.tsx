"use client";
import { ChangeEvent } from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { HttpMethod } from "@/core/types/http-method";
import { HttpRequestForm } from "./useRequestResponse";

type PrepareRequestProps = {
  httpRequestForm: HttpRequestForm;
  onHttpMethodChange: (method: HttpMethod) => void;
  onUrlChange: (url: string) => void;
  isLoading: boolean;
  handleSend: () => void;
};

export default function Request({
  handleSend,
  httpRequestForm,
  isLoading,
  onHttpMethodChange,
  onUrlChange,
}: PrepareRequestProps) {
  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    onUrlChange(e.target.value);
  };

  return (
    <div>
      <p className="mb-1 text-gray-700">Request</p>
      <div className="flex gap-1">
        <div className="flex flex-col gap-1">
          <Select
            value={httpRequestForm.httpMethod}
            onValueChange={onHttpMethodChange}
          >
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
          {httpRequestForm.errors.httpMethod && (
            <span className="text-sm text-red-500">
              {httpRequestForm.errors.httpMethod}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1 w-full">
          <Input
            type="url"
            value={httpRequestForm.url}
            onChange={handleUrlChange}
          />
          {httpRequestForm.errors.url && (
            <span className="text-sm text-red-500">
              {httpRequestForm.errors.url}
            </span>
          )}
        </div>

        <Button
          onClick={handleSend}
          disabled={isLoading || Boolean(httpRequestForm.url) === false}
        >
          Send
        </Button>
      </div>
    </div>
  );
}
