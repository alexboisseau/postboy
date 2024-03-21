import { CurrentRequestState } from "../../types";
import createInitialState from "../../utils/createInitialState";
import removeQueryParameter from "./removeQueryParameter";

const generateActionPayload = (index: number) => ({
  payload: index,
  type: "currentRequest/removeQueryParameter",
});

describe("removeQueryParameter", () => {
  let state: CurrentRequestState;

  beforeEach(() => {
    state = createInitialState();
    state.fields.queryParameters = [
      { key: "hello", value: "alice", active: true },
    ];
    state.fields.url = "http://example.com/?hello=alice";
  });

  it("should remove query parameter from array", () => {
    const updatedState = removeQueryParameter(state, generateActionPayload(0));

    expect(updatedState.fields.queryParameters).toEqual([]);
  });

  it("should update the url", () => {
    const updatedState = removeQueryParameter(state, generateActionPayload(0));
    expect(updatedState.fields.url).toBe("http://example.com/");
  });
});
