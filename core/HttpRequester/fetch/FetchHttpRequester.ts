import { HttpRequest } from "../../types/http-request";
import { HttpResponse } from "../../types/http-response";
import { IHttpRequester } from "../HttpRequester.interface";
import { FetchHttpFormatter } from "./FetchHttpFormatter";

class FetchHttpRequester implements IHttpRequester {
  constructor(
    private readonly formatter: FetchHttpFormatter = new FetchHttpFormatter()
  ) {}

  public async sendRequest(request: HttpRequest): Promise<HttpResponse> {
    const start = performance.now();
    const response = await fetch(request.url, {
      method: request.method,
    });
    const end = performance.now();

    return this.formatter.formatResponse({ response, start, end });
  }
}

export const fetchHttpRequester = Object.freeze(new FetchHttpRequester());
