import { HttpResponse } from "@core/types/http-response";
import createInitialState from "../../utils/createInitialState";
import { submitFulfilled } from "..";

const generatePayloadAction = (response: HttpResponse) => ({
  payload: response,
  type: "currentRequest/submitFulfilled",
});

const fakeHttpResponse: HttpResponse = {
  body: {
    value: "response data",
    contentType: "text/plain",
  },
  cookies: [
    {
      key: "cookie key",
      value: "cookie value",
    },
  ],
  headers: [
    {
      key: "header key",
      value: "header value",
    },
  ],
  size: {
    value: 100,
    unit: "Bytes",
  },
  status: 200,
  statusText: "OK",
  time: 100,
};

describe("submitFulfilled", () => {
  it("should set isSubmitting to false and response to the action payload", () => {
    const state = createInitialState();

    const updatedState = submitFulfilled(
      state,
      generatePayloadAction(fakeHttpResponse)
    );

    expect(updatedState.isSubmitting).toBe(false);
    expect(updatedState.response).toEqual({
      value: fakeHttpResponse,
      error: null,
    });
  });
});
