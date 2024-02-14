import { HttpMethod } from "@/core/types/http-method";
import { Header, QueryParameter } from "@/core/types/http-request";
import { RequestFormErrors } from "./reducer";

export enum RequestFormActionTypes {
  UPDATE_HTTP_METHOD = "UPDATE_HTTP_METHOD",
  UPDATE_URL = "UPDATE_URL",
  ADD_NEW_QUERY_PARAMETER = "ADD_NEW_QUERY_PARAMETER",
  REMOVE_QUERY_PARAMETER = "REMOVE_QUERY_PARAMETER",
  UPDATE_QUERY_PARAMETER = "UPDATE_QUERY_PARAMETER",
  CHECK_ALL_QUERY_PARAMETERS = "CHECK_ALL_QUERY_PARAMETERS",
  ADD_HEADER = "ADD_HEADER",
  REMOVE_HEADER = "REMOVE_HEADER",
  UPDATE_HEADER = "UPDATE_HEADER",
  CHECK_ALL_HEADERS = "CHECK_ALL_HEADERS",
  UPDATE_IS_SUBMITTING = "UPDATE_IS_SUBMITTING",
  INVALID_FORM = "INVALID_FORM",
  SUBMIT_FORM = "SUBMIT_FORM",
}

type SetHttpMethodAction = {
  type: RequestFormActionTypes.UPDATE_HTTP_METHOD;
  payload: HttpMethod;
};

type SetUrlAction = {
  type: RequestFormActionTypes.UPDATE_URL;
  payload: string;
};

type AddNewQueryParameterAction = {
  type: RequestFormActionTypes.ADD_NEW_QUERY_PARAMETER;
};

type UpdateQueryParameterAction = {
  type: RequestFormActionTypes.UPDATE_QUERY_PARAMETER;
  payload: {
    queryParameter: QueryParameter;
    index: number;
  };
};

type RemoveQueryParameterAction = {
  type: RequestFormActionTypes.REMOVE_QUERY_PARAMETER;
  payload: number;
};

type CheckAllQueryParametersAction = {
  type: RequestFormActionTypes.CHECK_ALL_QUERY_PARAMETERS;
  payload: boolean;
};

type AddHeaderAction = {
  type: RequestFormActionTypes.ADD_HEADER;
};

type RemoveHeaderAction = {
  type: RequestFormActionTypes.REMOVE_HEADER;
  payload: number;
};

type UpdateHeaderAction = {
  type: RequestFormActionTypes.UPDATE_HEADER;
  payload: {
    header: Header;
    index: number;
  };
};

type CheckAllHeaders = {
  type: RequestFormActionTypes.CHECK_ALL_HEADERS;
  payload: boolean;
};

type SetIsSubmittingAction = {
  type: RequestFormActionTypes.UPDATE_IS_SUBMITTING;
  payload: boolean;
};

type InvalidFormAction = {
  type: RequestFormActionTypes.INVALID_FORM;
  payload: RequestFormErrors;
};

type SubmitFormAction = {
  type: RequestFormActionTypes.SUBMIT_FORM;
};

export type RequestFormAction =
  | SetHttpMethodAction
  | SetUrlAction
  | AddNewQueryParameterAction
  | UpdateQueryParameterAction
  | RemoveQueryParameterAction
  | CheckAllQueryParametersAction
  | AddHeaderAction
  | RemoveHeaderAction
  | UpdateHeaderAction
  | CheckAllHeaders
  | SetIsSubmittingAction
  | InvalidFormAction
  | SubmitFormAction;
