"use client";

import { ChangeEvent, useState } from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

function HTTPMethodSelector({
  method,
  onMethodChange,
}: {
  method: string;
  // eslint-disable-next-line no-unused-vars
  onMethodChange: (method: string) => void;
}) {
  return (
    <Select value={method} onValueChange={onMethodChange}>
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
  );
}

function HTTPUrlInput({
  url,
  onUrlChange,
}: {
  url: string;
  // eslint-disable-next-line no-unused-vars
  onUrlChange: (url: string) => void;
}) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onUrlChange(e.target.value);
  };

  return <Input value={url} onChange={handleChange} />;
}

export default function PrepareRequest() {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");

  const handleSend = () => {
    console.log({
      method,
      url,
    });
  };

  return (
    <div className="container">
      <div className="flex gap-1">
        <HTTPMethodSelector method={method} onMethodChange={setMethod} />
        <HTTPUrlInput url={url} onUrlChange={setUrl} />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </div>
  );
}
