import { selectCurrentRequest } from "@context/features/currentRequest/currentRequestSelectors";
import { useAppSelector } from "@context/hooks/use-app-selector";
import { useMemo } from "react";

export default function ResponseHeader() {
  const { isSubmitting, response } = useAppSelector(selectCurrentRequest);

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
      return "text-slate-600";
    }
  }, [response.value?.status]);

  const valueClassName = `font-bold ${color}`;

  return (
    <div className="flex justify-between">
      <p className={"text-foreground font-semibold"}>Response</p>
      <div>
        {isSubmitting && <p className="text-sm">Loading...</p>}
        {response.value !== null && (
          <div className="flex gap-4">
            <p className="text-sm ">
              Status:{" "}
              <span className={valueClassName}>
                {response.value.status} {response.value.statusText}
              </span>
            </p>
            <p className="text-sm ">
              Time:{" "}
              <span className={valueClassName}>{response.value.time} ms</span>
            </p>
            <p className="text-sm ">
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
