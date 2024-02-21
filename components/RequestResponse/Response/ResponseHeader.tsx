import { useContext } from "react";
import { RequestResponseContext } from "../state/context";

export default function ResponseHeader() {
  const {
    requestResponse: {
      request: { isSubmitting },
      response,
    },
  } = useContext(RequestResponseContext);

  return (
    <div className="flex justify-between">
      <p className="text-2xl font-semibold text-gray-800">Response</p>
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
