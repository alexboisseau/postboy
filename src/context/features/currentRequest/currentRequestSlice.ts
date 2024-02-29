import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActivatableKeyValue } from "@core/types/activatable-key-value";
import { HttpMethod } from "@core/types/http-method";
import { Header, QueryParameter } from "@core/types/http-request";
import { HttpResponse } from "@core/types/http-response";
import {
  AuthorizationType,
  ContentType,
  CurrentRequestState,
  RequestErrors,
  SupportedRawLanguages,
} from "./types";
import generateUrlWithQueryParameters from "./generateUrlWithQueryParameters";
import getContentTypeHeader from "./getContentTypeHeader";

const initialState: CurrentRequestState = {
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
  response: {
    value: null,
    error: null,
  },
};

export const currentRequestSlice = createSlice({
  name: "currentRequest",
  initialState,
  reducers: {
    updateHttpMethod: (state, action: PayloadAction<HttpMethod>) => {
      state.fields.httpMethod = action.payload;
    },
    updateUrl: (state, action: PayloadAction<string>) => {
      state.fields.url = action.payload;
    },
    addQueryParameter: (state) => {
      const updatedQueryParameters = [
        ...state.fields.queryParameters,
        {
          key: "",
          value: "",
          active: true,
        },
      ];

      state.fields.queryParameters = updatedQueryParameters;
      state.fields.url = generateUrlWithQueryParameters(
        state.fields.url,
        updatedQueryParameters
      );
    },
    updateQueryParameter: (
      state,
      action: PayloadAction<{
        queryParameter: QueryParameter;
        index: number;
      }>
    ) => {
      const updatedQueryParameters = state.fields.queryParameters.map(
        (param, index) =>
          index === action.payload.index ? action.payload.queryParameter : param
      );

      state.fields.queryParameters = updatedQueryParameters;
      state.fields.url = generateUrlWithQueryParameters(
        state.fields.url,
        updatedQueryParameters
      );
    },
    removeQueryParameter: (state, action: PayloadAction<number>) => {
      const updatedQueryParameters = state.fields.queryParameters.filter(
        (_, index) => index !== action.payload
      );

      state.fields.queryParameters = updatedQueryParameters;
      state.fields.url = generateUrlWithQueryParameters(
        state.fields.url,
        updatedQueryParameters
      );
    },
    checkAllQueryParameters: (state, action: PayloadAction<boolean>) => {
      const updatedQueryParameters = state.fields.queryParameters.map(
        (param) => {
          return { ...param, active: action.payload };
        }
      );

      state.fields.queryParameters = updatedQueryParameters;
      state.fields.url = generateUrlWithQueryParameters(
        state.fields.url,
        updatedQueryParameters
      );
    },
    addHeader: (state) => {
      state.fields.headers.push({
        key: "",
        value: "",
        active: true,
      });
    },
    removeHeader: (state, action: PayloadAction<number>) => {
      state.fields.headers = state.fields.headers.filter(
        (_, index) => index !== action.payload
      );
    },
    updateHeader: (
      state,
      action: PayloadAction<{ header: Header; index: number }>
    ) => {
      state.fields.headers = state.fields.headers.map((header, index) => {
        if (index === action.payload.index) {
          return action.payload.header;
        }
        return header;
      });
    },
    checkAllHeaders: (state, action: PayloadAction<boolean>) => {
      state.fields.headers = state.fields.headers.map((header) => {
        return { ...header, active: action.payload };
      });
    },
    updateAuthorizationType: (
      state,
      action: PayloadAction<AuthorizationType>
    ) => {
      state.fields.headers = state.fields.headers.filter(
        (header) => header.key !== "Authorization"
      );

      const headerValue = (() => {
        if (action.payload === "basic") {
          return `Basic ${btoa(
            `${state.fields.authorization.basic.username}:${state.fields.authorization.basic.password}`
          )}`;
        } else if (action.payload === "bearer-token") {
          return `Bearer ${state.fields.authorization.bearerToken.token}`;
        }
        return "";
      })();

      state.fields.headers.push({
        key: "Authorization",
        value: headerValue,
        active: true,
      });

      state.fields.authorization.type = action.payload;
    },
    updateAuthorizationBasicUsername: (
      state,
      action: PayloadAction<string>
    ) => {
      state.fields.headers = state.fields.headers.filter(
        (header) => header.key !== "Authorization"
      );

      state.fields.headers.push({
        key: "Authorization",
        value: `Basic ${btoa(
          `${action.payload}:${state.fields.authorization.basic.password}`
        )}`,
        active: true,
      });

      state.fields.authorization.basic.username = action.payload;
    },
    updateAuthorizationBasicPassword: (
      state,
      action: PayloadAction<string>
    ) => {
      state.fields.headers = state.fields.headers.filter(
        (header) => header.key !== "Authorization"
      );

      state.fields.headers.push({
        key: "Authorization",
        value: `Basic ${btoa(
          `${state.fields.authorization.basic.username}:${action.payload}`
        )}`,
        active: true,
      });

      state.fields.authorization.basic.password = action.payload;
    },
    updateAuthorizationBearerToken: (state, action: PayloadAction<string>) => {
      state.fields.headers = state.fields.headers.filter(
        (header) => header.key !== "Authorization"
      );

      state.fields.headers.push({
        key: "Authorization",
        value: `Bearer ${action.payload}`,
        active: true,
      });

      state.fields.authorization.bearerToken.token = action.payload;
    },
    updateAuthorizationApiKeyKey: (state, action: PayloadAction<string>) => {
      const lastKeyValue = state.fields.authorization.apiKey.key;
      state.fields.headers = state.fields.headers.filter(
        (header) =>
          header.key !== "Authorization" && header.key !== lastKeyValue
      );

      state.fields.headers.push({
        key: action.payload,
        value: state.fields.authorization.apiKey.value,
        active: true,
      });

      state.fields.authorization.apiKey.key = action.payload;
    },
    updateAuthorizationApiKeyValue: (state, action: PayloadAction<string>) => {
      const lastKeyValue = state.fields.authorization.apiKey.key;
      state.fields.headers = state.fields.headers.filter(
        (header) =>
          header.key !== "Authorization" && header.key !== lastKeyValue
      );

      state.fields.headers.push({
        key: lastKeyValue,
        value: action.payload,
        active: true,
      });

      state.fields.authorization.apiKey.value = action.payload;
    },
    updateBodyContentType: (state, action: PayloadAction<ContentType>) => {
      state.fields.headers = state.fields.headers.filter(
        (header) => header.key !== "Content-Type"
      );

      if (action.payload !== "none") {
        const contentTypeHeader = getContentTypeHeader(action.payload, state);
        state.fields.headers.push({
          key: "Content-Type",
          value: contentTypeHeader,
          active: true,
        });
      }

      state.fields.body.contentType = action.payload;
    },
    updateBodyRawLanguage: (
      state,
      action: PayloadAction<SupportedRawLanguages>
    ) => {
      state.fields.body.raw.language = action.payload;
    },
    updateBodyRawValue: (state, action: PayloadAction<string>) => {
      state.fields.body.raw.value = action.payload;
    },
    addBodyXWwwFormUrlencodedRecord: (state) => {
      state.fields.body.xWwwFormUrlencoded.push({
        key: "",
        value: "",
        active: true,
      });
    },
    updateBodyXWwwFormUrlencodedRecord: (
      state,
      action: PayloadAction<{ record: ActivatableKeyValue; index: number }>
    ) => {
      state.fields.body.xWwwFormUrlencoded =
        state.fields.body.xWwwFormUrlencoded.map((record, index) => {
          if (index === action.payload.index) {
            return action.payload.record;
          }
          return record;
        });
    },
    removeBodyXWwwFormUrlencodedRecord: (
      state,
      action: PayloadAction<number>
    ) => {
      state.fields.body.xWwwFormUrlencoded =
        state.fields.body.xWwwFormUrlencoded.filter(
          (_, index) => index !== action.payload
        );
    },
    checkAllBodyXWwwFormUrlencodedRecords: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.fields.body.xWwwFormUrlencoded =
        state.fields.body.xWwwFormUrlencoded.map((record) => {
          return { ...record, active: action.payload };
        });
    },
    invalid: (state, action: PayloadAction<RequestErrors>) => {
      state.errors = action.payload;
      state.isSubmitting = false;
    },
    submit: (state) => {
      return {
        ...state,
        errors: {
          httpMethod: null,
          url: null,
        },
        isSubmitting: true,
        response: {
          value: null,
          error: null,
        },
      };
    },
    success: (state, action: PayloadAction<HttpResponse>) => {
      state.isSubmitting = false;
      state.response = {
        value: action.payload,
        error: null,
      };
    },
    fail: (state, action: PayloadAction<string>) => {
      state.isSubmitting = false;
      state.response = {
        value: null,
        error: action.payload,
      };
    },
  },
});

export const {
  updateHttpMethod,
  updateUrl,
  addQueryParameter,
  updateQueryParameter,
  removeQueryParameter,
  checkAllQueryParameters,
  addHeader,
  removeHeader,
  updateHeader,
  checkAllHeaders,
  updateAuthorizationType,
  updateAuthorizationBasicUsername,
  updateAuthorizationBasicPassword,
  updateAuthorizationBearerToken,
  updateAuthorizationApiKeyKey,
  updateAuthorizationApiKeyValue,
  updateBodyContentType,
  updateBodyRawLanguage,
  updateBodyRawValue,
  addBodyXWwwFormUrlencodedRecord,
  updateBodyXWwwFormUrlencodedRecord,
  removeBodyXWwwFormUrlencodedRecord,
  checkAllBodyXWwwFormUrlencodedRecords,
  invalid,
  submit,
  success,
  fail,
} = currentRequestSlice.actions;

export default currentRequestSlice.reducer;
