import { useContext } from "react";
import { RequestResponseContext } from "../context";

function ResponseHeader() {
  const {
    httpRequestForm: { isSubmitting },
    response: { response },
  } = useContext(RequestResponseContext);

  return (
    <div className="flex justify-between">
      <p className="text-lg font-semibold text-gray-800">Response</p>
      <div>
        {isSubmitting && <p className="text-sm text-gray-600">Loading...</p>}
        {response !== null && (
          <div className="flex gap-4">
            <p className="text-sm text-gray-600">
              Status:{" "}
              <span className="font-bold">
                {response.status} {response.statusText}
              </span>
            </p>
            <p className="text-sm text-gray-600">
              Time: <span className="font-bold">{response.time} ms</span>
            </p>
            <p className="text-sm text-gray-600">
              Content-Length:{" "}
              <span className="font-bold">
                {response.size.value} {response.size.unit}
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
    response: { error },
  } = useContext(RequestResponseContext);

  return (
    <div className="flex flex-col gap-4">
      <ResponseHeader />
      {error && <ResponseError />}
    </div>
  );
}
