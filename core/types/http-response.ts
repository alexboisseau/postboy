import { SizeUnit } from "./size-units";

export type HttpResponseSize = {
  value: number;
  unit: SizeUnit;
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
