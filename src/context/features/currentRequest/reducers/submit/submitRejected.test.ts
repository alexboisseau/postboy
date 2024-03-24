import { submitRejected } from "..";
import { CurrentRequestState } from "../../types";
import createInitialState from "../../utils/createInitialState";

const generatePayloadAction = (error: string) => ({
  payload: error,
  type: "currentRequest/submitRejected",
});

describe("submitRejected", () => {
  let state: CurrentRequestState;

  beforeEach(() => {
    state = createInitialState();
  });

  it("should set isSubmitting to false", () => {
    const updatedState = submitRejected(
      state,
      generatePayloadAction("error message")
    );

    expect(updatedState.isSubmitting).toBe(false);
  });

  it("should set error field with the action.payload value", () => {
    const errorMessage = "error message";

    const updatedState = submitRejected(
      state,
      generatePayloadAction(errorMessage)
    );

    expect(updatedState.response.error).toBe(errorMessage);
  });

  it("should set response value to null", () => {
    const updatedState = submitRejected(
      state,
      generatePayloadAction("error message")
    );

    expect(updatedState.response.value).toBe(null);
  });
});
