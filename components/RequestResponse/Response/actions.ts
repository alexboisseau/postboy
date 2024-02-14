import { HttpResponse } from "@/core/types/http-response";

export enum ResponseActionTypes {
  CLEAR_BEFORE_REQUEST = "CLEAR_BEFORE_REQUEST",
  UPDATE_ERROR = "UPDATE_ERROR",
  UPDATE_RESPONSE = "UPDATE_RESPONSE",
}

type UpdateErrorAction = {
  type: ResponseActionTypes.UPDATE_ERROR;
  payload: string | null;
};

type UpdateResponseAction = {
  type: ResponseActionTypes.UPDATE_RESPONSE;
  payload: HttpResponse | null;
};

type ClearBeforeRequestAction = {
  type: ResponseActionTypes.CLEAR_BEFORE_REQUEST;
};

export type ResponseAction =
  | UpdateErrorAction
  | UpdateResponseAction
  | ClearBeforeRequestAction;
