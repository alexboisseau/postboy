import { RootState } from "@context/store";

export const selectCurrentRequest = (state: RootState) => state.currentRequest;
export const selectCurrentRequestFields = (state: RootState) =>
  state.currentRequest.fields;
export const selectCurrentRequestResponse = (state: RootState) =>
  state.currentRequest.response;
export const selectCurrentRequestErrors = (state: RootState) =>
  state.currentRequest.errors;
export const selectCurrentRequestIsSubmitting = (state: RootState) =>
  state.currentRequest.isSubmitting;
