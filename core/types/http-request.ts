import { HttpMethod } from "./http-method";

type ActivableKeyValue = {
  key: string;
  value: string;
  active: boolean;
};

export type QueryParameter = ActivableKeyValue;

export type Header = ActivableKeyValue;

export type HttpRequest = {
  method: HttpMethod;
  url: string;
};
