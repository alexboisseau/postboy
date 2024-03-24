import { submitPending } from "..";
import { CurrentRequestState } from "../../types";
import createInitialState from "../../utils/createInitialState";

describe("submitPending", () => {
  let state: CurrentRequestState;

  beforeEach(() => {
    state = createInitialState();
  });

  it("should clear errors", () => {
    const updatedState = submitPending(state);
    expect(updatedState.errors).toEqual({
      httpMethod: null,
      url: null,
    });
  });

  it("should set isSubmitting to true", () => {
    const updatedState = submitPending(state);
    expect(updatedState.isSubmitting).toBe(true);
  });

  it("should clear response", () => {
    const updatedState = submitPending(state);
    expect(updatedState.response).toEqual({
      value: null,
      error: null,
    });
  });
});
