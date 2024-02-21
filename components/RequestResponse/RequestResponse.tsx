"use client";
import RequestForm from "./RequestForm/RequestForm";
import Response from "./Response/Response";
import { RequestResponseProvider } from "./state/provider";
import { Separator } from "@/components/ui/separator";

export default function RequestResponse() {
  return (
    <RequestResponseProvider>
      <div className="container flex flex-col gap-8">
        <RequestForm />
        <Separator />
        <Response />
      </div>
    </RequestResponseProvider>
  );
}
