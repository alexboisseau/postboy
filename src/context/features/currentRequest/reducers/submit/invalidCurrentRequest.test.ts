import { invalidCurrentRequest } from "..";
import { RequestErrors } from "../../types";
import createInitialState from "../../utils/createInitialState";

const generatePayloadAction = (errors: RequestErrors) => ({
  payload: errors,
  type: "currentRequest/invalidCurrentRequest",
});

describe("invalidCurrentRequest", () => {
  it("should set errors and isSubmitting to false", () => {
    const state = createInitialState();

    const updatedState = invalidCurrentRequest(
      state,
      generatePayloadAction({
        url: "URL is required",
        httpMethod: "HTTP method is required",
      })
    );

    expect(updatedState.errors).toEqual({
      url: "URL is required",
      httpMethod: "HTTP method is required",
    });

    expect(updatedState.isSubmitting).toBe(false);
  });
});
