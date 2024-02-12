import { HttpRequest } from "../types/http-request";
import { HttpResponse } from "../types/http-response";

export interface IHttpRequester {
  sendRequest(request: HttpRequest): Promise<HttpResponse>;
}
