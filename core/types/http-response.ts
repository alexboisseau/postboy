export type HttpResponseSize = {
  value: number;
  unit: "Bytes" | "KB" | "MB" | "GB";
};

export type HttpResponseHeaders = Record<string, string>;

export type HttpResponse = {
  body: string;
  headers: HttpResponseHeaders;
  size: HttpResponseSize;
  status: number;
  statusText: string;
  time: number;
};
