"use client";
import Request from "./Request";
import Response from "./Response";
import { useRequestResponse } from "./useRequestResponse";

export default function RequestResponse() {
  const {
    error,
    httpRequestForm,
    response,
    handleSend,
    setHttpMethod,
    setUrl,
  } = useRequestResponse();

  return (
    <div className="container flex flex-col gap-5">
      <Request
        handleSend={handleSend}
        httpRequestForm={httpRequestForm}
        isLoading={httpRequestForm.isSubmitting}
        onHttpMethodChange={setHttpMethod}
        onUrlChange={setUrl}
      />
      <Response
        error={error}
        isLoading={httpRequestForm.isSubmitting}
        response={response}
      />
    </div>
  );
}
