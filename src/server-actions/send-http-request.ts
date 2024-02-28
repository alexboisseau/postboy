"use server";
import { fetchHttpRequester } from "@core/HttpRequester/fetch/FetchHttpRequester";
import { HttpMethods } from "@core/types/http-method";
import { HttpRequest } from "@core/types/http-request";
import { HttpResponse } from "@core/types/http-response";
import { z } from "zod";

const httpRequestSchema = z.object({
  body: z.string().nullable(),
  headers: z.array(
    z.object({
      key: z.string(),
      value: z.string(),
      active: z.boolean(),
    })
  ),
  url: z.string().url(),
  method: z.enum(HttpMethods),
});

function validateIncomingRequest(request: HttpRequest): boolean {
  const result = httpRequestSchema.safeParse(request);
  return result.success;
}

export async function sendHttpRequest(
  request: HttpRequest
): Promise<HttpResponse> {
  const validation = validateIncomingRequest(request);

  if (!validation) {
    throw new Error("Invalid request");
  }

  return await fetchHttpRequester.sendRequest(request);
}
