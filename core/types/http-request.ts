import { HttpMethod } from "./http-method";

export type HttpRequest = {
  method: HttpMethod;
  url: string;
};
