import { useContext } from "react";
import { RequestResponseContext } from "../state/context";
import ResponseHeader from "./ResponseHeader";
import ResponseError from "./ResponseError";

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
