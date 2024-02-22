import { useContext, useMemo } from "react";
import { RequestResponseContext } from "../state/context";

export default function ResponseHeader() {
  const {
    requestResponse: {
      request: { isSubmitting },
      response,
    },
  } = useContext(RequestResponseContext);

  const color = useMemo(() => {
    const firstNumber = response.value?.status.toString().charAt(0);

    if (firstNumber === "1" || firstNumber === "2") {
      return "text-green-600";
    } else if (
      firstNumber === "3" ||
      firstNumber === "4" ||
      firstNumber === "5"
    ) {
      return "text-red-600";
    } else {
      return "text-gray-600";
    }
  }, [response.value?.status]);

  const valueClassName = `font-bold ${color}`;

  return (
    <div className="flex justify-between">
      <p className={"text-2xl font-semibold text-gray-800"}>Response</p>
      <div>
        {isSubmitting && <p className="text-sm text-gray-600">Loading...</p>}
        {response.value !== null && (
          <div className="flex gap-4">
            <p className="text-sm text-gray-600">
              Status:{" "}
              <span className={valueClassName}>
                {response.value.status} {response.value.statusText}
              </span>
            </p>
            <p className="text-sm text-gray-600">
              Time:{" "}
              <span className={valueClassName}>{response.value.time} ms</span>
            </p>
            <p className="text-sm text-gray-600">
              Content-Length:{" "}
              <span className={valueClassName}>
                {response.value.size.value} {response.value.size.unit}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
