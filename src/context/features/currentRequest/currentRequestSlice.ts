import { createSlice } from "@reduxjs/toolkit";
import createInitialState from "./utils/createInitialState";
import * as reducers from "./reducers";

const initialState = createInitialState();

export const currentRequestSlice = createSlice({
  name: "currentRequest",
  initialState,
  reducers,
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
  addBodyXWWWFormUrlEncodedRecord,
  updateBodyXWWWFormUrlEncodedRecord,
  removeBodyXWWWFormUrlEncodedRecord,
  toggleAllBodyXWwwFormUrlEncodedRecords,
  invalidCurrentRequest,
  submitPending,
  submitFulfilled,
  submitRejected,
} = currentRequestSlice.actions;

export default currentRequestSlice.reducer;
