import Request from "./Request/Request";
import Response from "./Response/Response";

export default function RequestResponse() {
  return (
    <div className="flex flex-col gap-2">
      <Request />
      <Response />
    </div>
  );
}
