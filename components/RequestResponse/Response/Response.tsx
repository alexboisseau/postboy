import { useContext } from "react";
import { RequestResponseContext } from "../state/context";

function ResponseHeader() {
  const {
    requestResponse: {
      request: { isSubmitting },
      response,
    },
  } = useContext(RequestResponseContext);

  return (
    <div className="flex justify-between">
      <p className="text-lg font-semibold text-gray-800">Response</p>
      <div>
        {isSubmitting && <p className="text-sm text-gray-600">Loading...</p>}
        {response.value !== null && (
          <div className="flex gap-4">
            <p className="text-sm text-gray-600">
              Status:{" "}
              <span className="font-bold">
                {response.value.status} {response.value.statusText}
              </span>
            </p>
            <p className="text-sm text-gray-600">
              Time: <span className="font-bold">{response.value.time} ms</span>
            </p>
            <p className="text-sm text-gray-600">
              Content-Length:{" "}
              <span className="font-bold">
                {response.value.size.value} {response.value.size.unit}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function ResponseError() {
  return (
    <span className="text-sm w-fit bg-red-100 text-red-900 font-semibold px-4 py-2 rounded-full">
      An error occurred, we could not send the request
    </span>
  );
}

export default function Response() {
  const {
    requestResponse: { response },
  } = useContext(RequestResponseContext);

  return (
    <div className="flex flex-col gap-4">
      <ResponseHeader />
      {response.error && <ResponseError />}
    </div>
  );
}
