import { HttpResponse } from "@/core/types/http-response";

type ResponseHeaderProps = {
  isLoading: boolean;
  response: HttpResponse | null;
};

function ResponseHeader({ isLoading, response }: ResponseHeaderProps) {
  return (
    <div className="flex justify-between">
      <p className="mb-1 text-gray-700">Response</p>
      <div>
        {isLoading && <p className="text-sm text-gray-600">Loading...</p>}
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

type ResponseProps = {
  error: string | null;
  isLoading: boolean;
  response: HttpResponse | null;
};

export default function Response({
  error,
  isLoading,
  response,
}: ResponseProps) {
  return (
    <div className="flex flex-col gap-4">
      <ResponseHeader isLoading={isLoading} response={response} />
      {error && <ResponseError />}
    </div>
  );
}
