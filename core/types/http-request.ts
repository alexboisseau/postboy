import { ActivatableKeyValue } from "./activatable-key-value";
import { HttpMethod } from "./http-method";

export type QueryParameter = ActivatableKeyValue;
export type Header = ActivatableKeyValue;
export type HttpRequest = {
  method: HttpMethod;
  url: string;
};
