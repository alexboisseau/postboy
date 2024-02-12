import {
  HttpResponse,
  HttpResponseHeaders,
  HttpResponseSize,
} from "@/core/types/http-response";
import { formatBytes } from "@/core/utils/format-bytes";

export class FetchHttpFormatter {
  public async formatResponse({
    response,
    start,
    end,
  }: {
    response: Response;
    start: number;
    end: number;
  }): Promise<HttpResponse> {
    const blob = await this.extractResponseBlob(response);

    const body = await this.formatBody(blob);
    const headers = await this.formatHeaders(response);
    const size = await this.formatSize(response, blob, headers);
    const time = this.formatTime(start, end);

    return {
      body: body,
      headers: headers,
      size: size,
      status: response.status,
      statusText: response.statusText,
      time: time,
    };
  }

  private async extractResponseBlob(response: Response): Promise<Blob> {
    return await response.blob();
  }

  private async formatBody(blob: Blob): Promise<string> {
    return await blob.text();
  }

  private async formatSize(
    response: Response,
    blob: Blob,
    headers: HttpResponseHeaders
  ): Promise<HttpResponseSize> {
    const contentLength = await this.calculateContentLength(response, blob);
    const headersLength = await this.calculateHeadersLength(headers);

    console.log(contentLength);
    console.log(headersLength);

    const bytes = contentLength + headersLength;

    return formatBytes(bytes);
  }

  private async formatHeaders(
    response: Response
  ): Promise<HttpResponseHeaders> {
    const headers: Record<string, string> = {};

    response.headers.forEach((value: string, key: string) => {
      headers[key] = value;
    });

    return headers;
  }

  private formatTime(start: number, end: number): number {
    return Math.ceil(end - start);
  }

  private async calculateHeadersLength(
    headers: HttpResponseHeaders
  ): Promise<number> {
    const headersArray: string[] = [];

    for (const key in headers) {
      headersArray.push(key);
      headersArray.push(headers[key]);

      console.log(key, headers[key]);
    }

    return new Blob(headersArray).size;
  }

  private async calculateContentLength(
    response: Response,
    blob: Blob
  ): Promise<number> {
    const contentLength = response.headers.get("Content-Length");

    if (contentLength === null) {
      return blob.size;
    }

    return parseInt(contentLength, 10);
  }
}
