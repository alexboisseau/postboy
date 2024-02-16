"use client";
import RequestForm from "./RequestForm/RequestForm";
import Response from "./Response/Response";
import { RequestResponseProvider } from "./state/provider";

export default function RequestResponse() {
  return (
    <RequestResponseProvider>
      <div className="container flex flex-col gap-7">
        <RequestForm />
        <Response />
      </div>
    </RequestResponseProvider>
  );
}
