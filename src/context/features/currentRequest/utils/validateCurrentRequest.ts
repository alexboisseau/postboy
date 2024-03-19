import { HttpMethods } from "@core/types/http-method";
import { CurrentRequestState, RequestErrors } from "../types";
import { z } from "zod";

export default function validateCurrentRequest(
  currentRequest: CurrentRequestState
): {
  success: boolean;
  errors: RequestErrors;
} {
  let success: boolean = true;
  const errors: RequestErrors = {
    httpMethod: null,
    url: null,
  };

  if (HttpMethods.includes(currentRequest.fields.httpMethod) === false) {
    errors.httpMethod = "Invalid Http Method";
    success = false;
  }

  if (z.string().url().safeParse(currentRequest.fields.url).success === false) {
    errors.url = "Invalid URL";
    success = false;
  }

  return {
    success,
    errors,
  };
}
