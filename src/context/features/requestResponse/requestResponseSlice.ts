import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActivatableKeyValue } from "@core/types/activatable-key-value";
import { HttpMethod } from "@core/types/http-method";
import { Header, QueryParameter } from "@core/types/http-request";
import { HttpResponse } from "@core/types/http-response";
import {
  AuthorizationType,
  ContentType,
  RequestFormErrors,
  RequestResponseState,
  SupportedRawLanguages,
} from "./types";
import generateUrlWithQueryParameters from "./generateUrlWithQueryParameters";
import getContentTypeHeader from "./getContentTypeHeader";

const initialState: RequestResponseState = {
  request: {
    fields: {
      httpMethod: "GET",
      url: "",
      queryParameters: [],
      headers: [],
      authorization: {
        type: "no-auth",
        apiKey: {
          key: "",
          value: "",
        },
        basic: {
          username: "",
          password: "",
        },
        bearerToken: {
          token: "",
        },
      },
      body: {
        contentType: "none",
        raw: {
          language: "json",
          value: "",
        },
        xWwwFormUrlencoded: [],
      },
    },
    errors: {
      httpMethod: null,
      url: null,
    },
    isSubmitting: false,
  },
  response: {
    value: null,
    error: null,
  },
};

export const requestResponseSlice = createSlice({
  name: "requestResponse",
  initialState,
  reducers: {
    updateRequestHttpMethod: (state, action: PayloadAction<HttpMethod>) => {
      state.request.fields.httpMethod = action.payload;
    },
    updateRequestUrl: (state, action: PayloadAction<string>) => {
      state.request.fields.url = action.payload;
    },
    addRequestQueryParameter: (state) => {
      const updatedQueryParameters = [
        ...state.request.fields.queryParameters,
        {
          key: "",
          value: "",
          active: true,
        },
      ];

      state.request.fields.queryParameters = updatedQueryParameters;
      state.request.fields.url = generateUrlWithQueryParameters(
        state.request.fields.url,
        updatedQueryParameters
      );
    },
    updateRequestQueryParameter: (
      state,
      action: PayloadAction<{
        queryParameter: QueryParameter;
        index: number;
      }>
    ) => {
      const updatedQueryParameters = state.request.fields.queryParameters.map(
        (param, index) =>
          index === action.payload.index ? action.payload.queryParameter : param
      );

      state.request.fields.queryParameters = updatedQueryParameters;
      state.request.fields.url = generateUrlWithQueryParameters(
        state.request.fields.url,
        updatedQueryParameters
      );
    },
    removeRequestQueryParameter: (state, action: PayloadAction<number>) => {
      const updatedQueryParameters =
        state.request.fields.queryParameters.filter(
          (_, index) => index !== action.payload
        );

      state.request.fields.queryParameters = updatedQueryParameters;
      state.request.fields.url = generateUrlWithQueryParameters(
        state.request.fields.url,
        updatedQueryParameters
      );
    },
    checkAllRequestQueryParameters: (state, action: PayloadAction<boolean>) => {
      const updatedQueryParameters = state.request.fields.queryParameters.map(
        (param) => {
          return { ...param, active: action.payload };
        }
      );

      state.request.fields.queryParameters = updatedQueryParameters;
      state.request.fields.url = generateUrlWithQueryParameters(
        state.request.fields.url,
        updatedQueryParameters
      );
    },
    addRequestHeader: (state) => {
      state.request.fields.headers.push({
        key: "",
        value: "",
        active: true,
      });
    },
    removeRequestHeader: (state, action: PayloadAction<number>) => {
      state.request.fields.headers = state.request.fields.headers.filter(
        (_, index) => index !== action.payload
      );
    },
    updateRequestHeader: (
      state,
      action: PayloadAction<{ header: Header; index: number }>
    ) => {
      state.request.fields.headers = state.request.fields.headers.map(
        (header, index) => {
          if (index === action.payload.index) {
            return action.payload.header;
          }
          return header;
        }
      );
    },
    checkAllRequestHeaders: (state, action: PayloadAction<boolean>) => {
      state.request.fields.headers = state.request.fields.headers.map(
        (header) => {
          return { ...header, active: action.payload };
        }
      );
    },
    updateRequestAuthorizationType: (
      state,
      action: PayloadAction<AuthorizationType>
    ) => {
      state.request.fields.headers = state.request.fields.headers.filter(
        (header) => header.key !== "Authorization"
      );

      const headerValue = (() => {
        if (action.payload === "basic") {
          return `Basic ${btoa(
            `${state.request.fields.authorization.basic.username}:${state.request.fields.authorization.basic.password}`
          )}`;
        } else if (action.payload === "bearer-token") {
          return `Bearer ${state.request.fields.authorization.bearerToken.token}`;
        }
        return "";
      })();

      state.request.fields.headers.push({
        key: "Authorization",
        value: headerValue,
        active: true,
      });

      state.request.fields.authorization.type = action.payload;
    },
    updateRequestAuthorizationBasicUsername: (
      state,
      action: PayloadAction<string>
    ) => {
      state.request.fields.headers = state.request.fields.headers.filter(
        (header) => header.key !== "Authorization"
      );

      state.request.fields.headers.push({
        key: "Authorization",
        value: `Basic ${btoa(
          `${action.payload}:${state.request.fields.authorization.basic.password}`
        )}`,
        active: true,
      });

      state.request.fields.authorization.basic.username = action.payload;
    },
    updateRequestAuthorizationBasicPassword: (
      state,
      action: PayloadAction<string>
    ) => {
      state.request.fields.headers = state.request.fields.headers.filter(
        (header) => header.key !== "Authorization"
      );

      state.request.fields.headers.push({
        key: "Authorization",
        value: `Basic ${btoa(
          `${state.request.fields.authorization.basic.username}:${action.payload}`
        )}`,
        active: true,
      });

      state.request.fields.authorization.basic.password = action.payload;
    },
    updateRequestAuthorizationBearerToken: (
      state,
      action: PayloadAction<string>
    ) => {
      state.request.fields.headers = state.request.fields.headers.filter(
        (header) => header.key !== "Authorization"
      );

      state.request.fields.headers.push({
        key: "Authorization",
        value: `Bearer ${action.payload}`,
        active: true,
      });

      state.request.fields.authorization.bearerToken.token = action.payload;
    },
    updateRequestAuthorizationApiKeyKey: (
      state,
      action: PayloadAction<string>
    ) => {
      const lastKeyValue = state.request.fields.authorization.apiKey.key;
      state.request.fields.headers = state.request.fields.headers.filter(
        (header) =>
          header.key !== "Authorization" && header.key !== lastKeyValue
      );

      state.request.fields.headers.push({
        key: action.payload,
        value: state.request.fields.authorization.apiKey.value,
        active: true,
      });

      state.request.fields.authorization.apiKey.key = action.payload;
    },
    updateRequestAuthorizationApiKeyValue: (
      state,
      action: PayloadAction<string>
    ) => {
      const lastKeyValue = state.request.fields.authorization.apiKey.key;
      state.request.fields.headers = state.request.fields.headers.filter(
        (header) =>
          header.key !== "Authorization" && header.key !== lastKeyValue
      );

      state.request.fields.headers.push({
        key: lastKeyValue,
        value: action.payload,
        active: true,
      });

      state.request.fields.authorization.apiKey.value = action.payload;
    },
    updateRequestBodyContentType: (
      state,
      action: PayloadAction<ContentType>
    ) => {
      state.request.fields.headers = state.request.fields.headers.filter(
        (header) => header.key !== "Content-Type"
      );

      if (action.payload !== "none") {
        const contentTypeHeader = getContentTypeHeader(action.payload, state);
        state.request.fields.headers.push({
          key: "Content-Type",
          value: contentTypeHeader,
          active: true,
        });
      }

      state.request.fields.body.contentType = action.payload;
    },
    updateRequestBodyRawLanguage: (
      state,
      action: PayloadAction<SupportedRawLanguages>
    ) => {
      state.request.fields.body.raw.language = action.payload;
    },
    updateRequestBodyRawValue: (state, action: PayloadAction<string>) => {
      state.request.fields.body.raw.value = action.payload;
    },
    addRequestBodyXWwwFormUrlencodedRecord: (state) => {
      state.request.fields.body.xWwwFormUrlencoded.push({
        key: "",
        value: "",
        active: true,
      });
    },
    updateRequestBodyXWwwFormUrlencodedRecord: (
      state,
      action: PayloadAction<{ record: ActivatableKeyValue; index: number }>
    ) => {
      state.request.fields.body.xWwwFormUrlencoded =
        state.request.fields.body.xWwwFormUrlencoded.map((record, index) => {
          if (index === action.payload.index) {
            return action.payload.record;
          }
          return record;
        });
    },
    removeRequestBodyXWwwFormUrlencodedRecord: (
      state,
      action: PayloadAction<number>
    ) => {
      state.request.fields.body.xWwwFormUrlencoded =
        state.request.fields.body.xWwwFormUrlencoded.filter(
          (_, index) => index !== action.payload
        );
    },
    checkAllRequestBodyXWwwFormUrlencodedRecords: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.request.fields.body.xWwwFormUrlencoded =
        state.request.fields.body.xWwwFormUrlencoded.map((record) => {
          return { ...record, active: action.payload };
        });
    },
    invalidRequest: (state, action: PayloadAction<RequestFormErrors>) => {
      state.request.errors = action.payload;
      state.request.isSubmitting = false;
    },
    submitRequest: (state) => {
      return {
        ...state,
        request: {
          ...state.request,
          errors: {
            httpMethod: null,
            url: null,
          },
          isSubmitting: true,
        },
        response: {
          value: null,
          error: null,
        },
      };
    },
    requestSuccess: (state, action: PayloadAction<HttpResponse>) => {
      state.request.isSubmitting = false;
      state.response = {
        value: action.payload,
        error: null,
      };
    },
    requestFailure: (state, action: PayloadAction<string>) => {
      state.request.isSubmitting = false;
      state.response = {
        value: null,
        error: action.payload,
      };
    },
  },
});

export const {
  updateRequestHttpMethod,
  updateRequestUrl,
  addRequestQueryParameter,
  updateRequestQueryParameter,
  removeRequestQueryParameter,
  checkAllRequestQueryParameters,
  addRequestHeader,
  removeRequestHeader,
  updateRequestHeader,
  checkAllRequestHeaders,
  updateRequestAuthorizationType,
  updateRequestAuthorizationBasicUsername,
  updateRequestAuthorizationBasicPassword,
  updateRequestAuthorizationBearerToken,
  updateRequestAuthorizationApiKeyKey,
  updateRequestAuthorizationApiKeyValue,
  updateRequestBodyContentType,
  updateRequestBodyRawLanguage,
  updateRequestBodyRawValue,
  addRequestBodyXWwwFormUrlencodedRecord,
  updateRequestBodyXWwwFormUrlencodedRecord,
  removeRequestBodyXWwwFormUrlencodedRecord,
  checkAllRequestBodyXWwwFormUrlencodedRecords,
  invalidRequest,
  submitRequest,
  requestSuccess,
  requestFailure,
} = requestResponseSlice.actions;

export default requestResponseSlice.reducer;
