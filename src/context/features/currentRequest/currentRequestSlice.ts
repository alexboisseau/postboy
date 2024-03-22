import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActivatableKeyValue } from "@core/types/activatable-key-value";
import { HttpMethod } from "@core/types/http-method";
import { HttpResponse } from "@core/types/http-response";
import { ContentType, RequestErrors, SupportedRawLanguages } from "./types";
import getContentTypeHeader from "./utils/getContentTypeHeader";
import { AppDispatch, AppGetState } from "@context/store";
import { sendHttpRequest } from "@server-actions/send-http-request";
import validateCurrentRequest from "./utils/validateCurrentRequest";
import extractBodyFromCurrentRequest from "./utils/extractBodyFromCurrentRequest";
import createInitialState from "./utils/createInitialState";

/** REDUCERS */
import reducers from "./reducers";

export const submitCurrentRequest =
  () => async (dispatch: AppDispatch, getState: AppGetState) => {
    const currentRequest = getState().currentRequest;
    dispatch(submit());

    const formValidation = validateCurrentRequest(currentRequest);
    if (formValidation.success === false) {
      dispatch(invalid(formValidation.errors));
      return;
    }

    try {
      const response: HttpResponse = await sendHttpRequest({
        body: extractBodyFromCurrentRequest(currentRequest),
        headers: currentRequest.fields.headers,
        method: currentRequest.fields.httpMethod,
        url: currentRequest.fields.url,
      });

      dispatch(success(response));
      return response;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      dispatch(fail(error.message));
    }
  };

const initialState = createInitialState();

export const currentRequestSlice = createSlice({
  name: "currentRequest",
  initialState,
  reducers: {
    ...reducers,
    updateHttpMethod: (state, action: PayloadAction<HttpMethod>) => {
      state.fields.httpMethod = action.payload;
    },
    // BODY
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
      state.fields.headers = state.fields.headers.filter(
        (header) => header.key !== "Content-Type"
      );

      const contentTypeHeader = getContentTypeHeader(
        state.fields.body.contentType,
        state
      );
      state.fields.headers.push({
        key: "Content-Type",
        value: contentTypeHeader,
        active: true,
      });
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
  toggleAllQueryParameters,
  addHeader,
  removeHeader,
  updateHeader,
  toggleAllHeaders,
  updateAuthorizationType,
  updateAuthorizationBasic,
  updateAuthorizationBearerToken,
  updateAuthorizationApiKey,
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
