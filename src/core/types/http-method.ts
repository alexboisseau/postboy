export const HttpMethods = [
  "GET",
  "POST",
  "PUT",
  "DELETE",
  "PATCH",
  "OPTIONS",
  "HEAD",
] as const;

export type HttpMethod = (typeof HttpMethods)[number];
