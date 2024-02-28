"use client";
import Request from "./Request/Request";
import Response from "./Response/Response";
import { RequestResponseProvider } from "./state/provider";
import { Separator } from "@components/ui/separator";

export default function RequestResponse() {
  return (
    <RequestResponseProvider>
      <div className="container flex flex-col gap-8 py-5 bg-white dark:bg-zinc-900">
        <Request />
        <Separator />
        <Response />
      </div>
    </RequestResponseProvider>
  );
}
