import { ActivatableKeyValue } from "@core/types/activatable-key-value";
import { HttpMethod } from "@core/types/http-method";
import { Header, QueryParameter } from "@core/types/http-request";
import { HttpResponse } from "@core/types/http-response";

export type AuthorizationType =
  | "no-auth"
  | "basic"
  | "bearer-token"
  | "api-key";
export type ContentType = "none" | "x-www-form-urlencoded" | "raw";
export type ContentTypeHeader =
  | "application/x-www-form-urlencoded"
  | "application/json"
  | "application/xml";
export type SupportedRawLanguages = "json" | "xml";

export type RequestFieldsAuthorization = {
  type: AuthorizationType;
  apiKey: {
    key: string;
    value: string;
  };
  basic: {
    username: string;
    password: string;
  };
  bearerToken: {
    token: string;
  };
};

export type RequestFieldsBody = {
  contentType: ContentType;
  raw: {
    language: SupportedRawLanguages;
    value: string;
  };
  xWwwFormUrlencoded: ActivatableKeyValue[];
};

export type RequestFields = {
  authorization: RequestFieldsAuthorization;
  body: RequestFieldsBody;
  headers: Header[];
  httpMethod: HttpMethod;
  queryParameters: QueryParameter[];
  url: string;
};

export type RequestErrors = {
  httpMethod: string | null;
  url: string | null;
};

export type RequestResponse = {
  value: HttpResponse | null;
  error: string | null;
};

export interface CurrentRequestState {
  errors: RequestErrors;
  fields: RequestFields;
  isSubmitting: boolean;
  response: RequestResponse;
}
