import { SizeUnit } from "./size-units";

export type HttpResponseSize = {
  value: number;
  unit: SizeUnit;
};

export type HttpResponseHeader = {
  key: string;
  value: string;
};

export type HttpResponse = {
  body: string;
  headers: HttpResponseHeader[];
  size: HttpResponseSize;
  status: number;
  statusText: string;
  time: number;
};
