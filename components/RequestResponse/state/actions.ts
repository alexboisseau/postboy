import { HttpMethod } from "@/core/types/http-method";
import { Header, QueryParameter } from "@/core/types/http-request";
import { HttpResponse } from "@/core/types/http-response";

export type RequestFormErrors = {
  httpMethod: string | null;
  url: string | null;
};

export type RequestFormFields = {
  httpMethod: HttpMethod;
  url: string;
  queryParameters: QueryParameter[];
  headers: Header[];
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

export type RequestResponse = {
  request: RequestForm;
  response: Response;
};

export enum RequestResponseActionTypes {
  REQUEST_UPDATE_HTTP_METHOD = "REQUEST_UPDATE_HTTP_METHOD",
  REQUEST_UPDATE_URL = "REQUEST_UPDATE_URL",
  REQUEST_NEW_QUERY_PARAMETER = "REQUEST_NEW_QUERY_PARAMETER",
  REQUEST_UPDATE_QUERY_PARAMETER = "REQUEST_UPDATE_QUERY_PARAMETER",
  REQUEST_REMOVE_QUERY_PARAMETER = "REQUEST_REMOVE_QUERY_PARAMETER",
  REQUEST_CHECK_ALL_QUERY_PARAMETERS = "REQUEST_CHECK_ALL_QUERY_PARAMETERS",
  REQUEST_NEW_HEADER = "REQUEST_NEW_HEADER",
  REQUEST_REMOVE_HEADER = "REQUEST_REMOVE_HEADER",
  REQUEST_UPDATE_HEADER = "REQUEST_UPDATE_HEADER",
  REQUEST_CHECK_ALL_HEADERS = "REQUEST_CHECK_ALL_HEADERS",
  REQUEST_INVALID_FORM = "REQUEST_INVALID_FORM",
  REQUEST_SUBMIT_FORM = "REQUEST_SUBMIT_FORM",
  RESPONSE_SUCCESS = "RESPONSE_SUCCESS",
  RESPONSE_ERROR = "RESPONSE_ERROR",
}

type RequestUpdateHttpMethodAction = {
  type: RequestResponseActionTypes.REQUEST_UPDATE_HTTP_METHOD;
  payload: HttpMethod;
};

type RequestUpdateUrlAction = {
  type: RequestResponseActionTypes.REQUEST_UPDATE_URL;
  payload: string;
};

type RequestNewQueryParameterAction = {
  type: RequestResponseActionTypes.REQUEST_NEW_QUERY_PARAMETER;
};

type RequestUpdateQueryParameterAction = {
  type: RequestResponseActionTypes.REQUEST_UPDATE_QUERY_PARAMETER;
  payload: {
    queryParameter: QueryParameter;
    index: number;
  };
};

type RequestRemoveQueryParameterAction = {
  type: RequestResponseActionTypes.REQUEST_REMOVE_QUERY_PARAMETER;
  payload: number;
};

type RequestCheckAllQueryParametersAction = {
  type: RequestResponseActionTypes.REQUEST_CHECK_ALL_QUERY_PARAMETERS;
  payload: boolean;
};

type RequestNewHeaderAction = {
  type: RequestResponseActionTypes.REQUEST_NEW_HEADER;
};

type RequestRemoveHeaderAction = {
  type: RequestResponseActionTypes.REQUEST_REMOVE_HEADER;
  payload: number;
};

type RequestUpdateHeaderAction = {
  type: RequestResponseActionTypes.REQUEST_UPDATE_HEADER;
  payload: {
    header: Header;
    index: number;
  };
};

type RequestCheckAllHeadersAction = {
  type: RequestResponseActionTypes.REQUEST_CHECK_ALL_HEADERS;
  payload: boolean;
};

type RequestInvalidFormAction = {
  type: RequestResponseActionTypes.REQUEST_INVALID_FORM;
  payload: RequestFormErrors;
};

type RequestSubmitFormAction = {
  type: RequestResponseActionTypes.REQUEST_SUBMIT_FORM;
};

type ResponseSuccessAction = {
  type: RequestResponseActionTypes.RESPONSE_SUCCESS;
  payload: HttpResponse;
};

type ResponseErrorAction = {
  type: RequestResponseActionTypes.RESPONSE_ERROR;
  payload: string;
};

export type RequestResponseAction =
  | RequestUpdateHttpMethodAction
  | RequestUpdateUrlAction
  | RequestNewQueryParameterAction
  | RequestUpdateQueryParameterAction
  | RequestRemoveQueryParameterAction
  | RequestCheckAllQueryParametersAction
  | RequestNewHeaderAction
  | RequestRemoveHeaderAction
  | RequestUpdateHeaderAction
  | RequestCheckAllHeadersAction
  | RequestInvalidFormAction
  | RequestSubmitFormAction
  | ResponseSuccessAction
  | ResponseErrorAction;
