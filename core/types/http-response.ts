import { SizeUnit } from "./size-units";

export type HttpResponseSize = {
  value: number;
  unit: SizeUnit;
};

export type HttpResponseHeader = {
  key: string;
  value: string;
};

export type HttpCookie = {
  key: string;
  value: string;
  domain?: string;
  path?: string;
  expires?: string;
  maxAge?: string;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "lax" | "strict" | "none";
};

export type HttpResponse = {
  body: string;
  cookies: HttpCookie[];
  headers: HttpResponseHeader[];
  size: HttpResponseSize;
  status: number;
  statusText: string;
  time: number;
};
