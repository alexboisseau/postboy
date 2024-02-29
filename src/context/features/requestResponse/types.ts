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
export type SupportedRawLanguages = "json" | "xml";

export type RequestFormErrors = {
  httpMethod: string | null;
  url: string | null;
};

export type RequestFormAuthorization = {
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

export type RequestFormBody = {
  contentType: ContentType;
  raw: {
    language: SupportedRawLanguages;
    value: string;
  };
  xWwwFormUrlencoded: ActivatableKeyValue[];
};

export type RequestFormFields = {
  httpMethod: HttpMethod;
  url: string;
  queryParameters: QueryParameter[];
  headers: Header[];
  authorization: RequestFormAuthorization;
  body: RequestFormBody;
};

export type RequestForm = {
  errors: RequestFormErrors;
  fields: RequestFormFields;
  isSubmitting: boolean;
};

export type Response = {
  value: HttpResponse | null;
  error: string | null;
};

export interface RequestResponseState {
  request: RequestForm;
  response: Response;
}
