import createInitialState from "../../../utils/createInitialState";
import { CurrentRequestState } from "../../../types";
import toggleAllBodyXWwwFormUrlEncodedRecords from "./toggleAllBodyXWwwFormUrlEncodedRecords";

const generateActionPayload = (active: boolean) => ({
  payload: active,
  type: "currentRequest/toggleAllBodyXWwwFormUrlEncodedRecords",
});

describe("toggleAllBodyXWwwFormUrlEncodedRecords", () => {
  let state: CurrentRequestState;

  beforeEach(() => {
    state = createInitialState();
    state.fields.body.xWwwFormUrlencoded = [
      { key: "hello", value: "alice", active: true },
      { key: "goodbye", value: "bob", active: false },
    ];
  });

  it("should toggle all query parameters to active", () => {
    const updatedState = toggleAllBodyXWwwFormUrlEncodedRecords(
      state,
      generateActionPayload(true)
    );

    expect(updatedState.fields.body.xWwwFormUrlencoded).toEqual([
      { key: "hello", value: "alice", active: true },
      { key: "goodbye", value: "bob", active: true },
    ]);
  });

  it("should toggle all query parameters to inactive", () => {
    const updatedState = toggleAllBodyXWwwFormUrlEncodedRecords(
      state,
      generateActionPayload(false)
    );

    expect(updatedState.fields.body.xWwwFormUrlencoded).toEqual([
      { key: "hello", value: "alice", active: false },
      { key: "goodbye", value: "bob", active: false },
    ]);
  });
});
