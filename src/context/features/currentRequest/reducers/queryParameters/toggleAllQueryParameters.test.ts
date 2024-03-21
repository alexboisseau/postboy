import { CurrentRequestState } from "../../types";
import createInitialState from "../../utils/createInitialState";
import toggleAllQueryParameters from "./toggleAllQueryParameters";

const generateActionPayload = (active: boolean) => ({
  payload: active,
  type: "currentRequest/toggleAllQueryParameters",
});

describe("toggleAllQueryParameters", () => {
  let state: CurrentRequestState;

  beforeEach(() => {
    state = createInitialState();
    state.fields.queryParameters = [
      { key: "hello", value: "alice", active: true },
      { key: "goodbye", value: "bob", active: false },
    ];
  });

  it("should toggle all query parameters to active", () => {
    const updatedState = toggleAllQueryParameters(
      state,
      generateActionPayload(true)
    );

    expect(updatedState.fields.queryParameters).toEqual([
      { key: "hello", value: "alice", active: true },
      { key: "goodbye", value: "bob", active: true },
    ]);
  });

  it("should toggle all query parameters to inactive", () => {
    const updatedState = toggleAllQueryParameters(
      state,
      generateActionPayload(false)
    );

    expect(updatedState.fields.queryParameters).toEqual([
      { key: "hello", value: "alice", active: false },
      { key: "goodbye", value: "bob", active: false },
    ]);
  });
});
