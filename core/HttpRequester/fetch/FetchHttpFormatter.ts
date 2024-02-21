import {
  HttpCookie,
  HttpResponse,
  HttpResponseHeader,
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

    const headers = this.formatHeaders(response);
    const body = await this.formatBody(blob, headers);
    const cookies = this.formatCookies(response);
    const size = await this.formatSize(response, blob, headers);
    const time = this.formatTime(start, end);

    return {
      body: body,
      cookies: cookies,
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

  private async formatBody(
    blob: Blob,
    headers: HttpResponseHeader[]
  ): Promise<{
    value: string;
    contentType: string;
  }> {
    const value = await blob.text();

    const contentTypeHeader = headers.find(
      (header) => header.key.toLowerCase() === "content-type"
    );

    if (contentTypeHeader) {
      const [contentType] = contentTypeHeader.value.split(";");
      return {
        value,
        contentType,
      };
    }

    return {
      value,
      contentType: "text/plain",
    };
  }

  private async formatSize(
    response: Response,
    blob: Blob,
    headers: HttpResponseHeader[]
  ): Promise<HttpResponseSize> {
    const contentLength = await this.calculateContentLength(response, blob);
    const headersLength = await this.calculateHeadersLength(headers);
    const bytes = contentLength + headersLength;

    return formatBytes(bytes);
  }

  private formatHeaders(response: Response): HttpResponseHeader[] {
    const headers: HttpResponseHeader[] = [];

    response.headers.forEach((value: string, key: string) => {
      headers.push({ key, value });
    });

    return headers;
  }

  private formatCookies(response: Response): Array<HttpCookie> {
    const cookies = response.headers.getSetCookie();

    return cookies.map((c) => {
      const attributes = c.split(";").map((attr) => attr.trim());
      const cookie: HttpCookie = {
        key: "",
        value: "",
        httpOnly: false,
        secure: false,
      };

      attributes.forEach((attr) => {
        const index = attr.indexOf("=");
        let key = "";
        let value = "";
        if (index > 0) {
          key = attr.slice(0, index);
          value = attr.slice(index + 1);
        } else {
          key = attr;
          value = "";
        }

        switch (key.toLowerCase()) {
          case "domain":
            cookie.domain = value;
            break;
          case "path":
            cookie.path = value;
            break;
          case "expires":
            cookie.expires = value;
            break;
          case "max-age":
            cookie.maxAge = value;
            break;
          case "httponly":
            cookie.httpOnly = true;
            break;
          case "secure":
            cookie.secure = true;
            break;
          case "samesite":
            cookie.sameSite = value as "lax" | "strict" | "none";
            break;
          default:
            cookie.key = key;
            cookie.value = value;
            break;
        }
      });

      return cookie;
    });
  }

  private formatTime(start: number, end: number): number {
    return Math.ceil(end - start);
  }

  private async calculateHeadersLength(
    headers: HttpResponseHeader[]
  ): Promise<number> {
    return new Blob(headers.map((header) => header.key + header.value)).size;
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
