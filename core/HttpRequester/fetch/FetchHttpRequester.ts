import { HttpRequest } from "../../types/http-request";
import { HttpResponse } from "../../types/http-response";
import { IHttpRequester } from "../HttpRequester.interface";
import { FetchHttpFormatter } from "./FetchHttpFormatter";

class FetchHttpRequester implements IHttpRequester {
  constructor(
    private readonly formatter: FetchHttpFormatter = new FetchHttpFormatter()
  ) {}

  public async sendRequest(request: HttpRequest): Promise<HttpResponse> {
    try {
      const start = performance.now();
      const response = await fetch(request.url, {
        method: request.method,
      });
      const end = performance.now();

      return await this.formatter.formatResponse({ response, start, end });
    } catch (error) {
      throw error;
    }
  }
}

export const fetchHttpRequester = Object.freeze(new FetchHttpRequester());
