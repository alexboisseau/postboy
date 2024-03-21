import { QueryParameter } from "@core/types/http-request";
import { CurrentRequestState } from "../../types";
import createInitialState from "../../utils/createInitialState";
import updateQueryParameter from "./updateQueryParameter";

const generateActionPayload = (
  queryParameter: QueryParameter,
  index: number
) => ({
  payload: { queryParameter, index },
  type: "currentRequest/updateQueryParameter",
});

describe("updateQueryParameter", () => {
  let state: CurrentRequestState;

  beforeEach(() => {
    state = createInitialState();
    state.fields.queryParameters = [
      { key: "hello", value: "alice", active: true },
    ];
    state.fields.url = "http://example.com/?hello=alice";
  });

  it("should disabled the query parameter when the active flag is set to false", () => {
    const updatedState = updateQueryParameter(
      state,
      generateActionPayload({ key: "hello", value: "alice", active: false }, 0)
    );

    expect(updatedState.fields.queryParameters).toEqual([
      { key: "hello", value: "alice", active: false },
    ]);
    expect(updatedState.fields.url).toBe("http://example.com/");
  });

  it("should update the query parameter key and value", () => {
    const updatedState = updateQueryParameter(
      state,
      generateActionPayload({ key: "goodbye", value: "bob", active: true }, 0)
    );

    expect(updatedState.fields.queryParameters).toEqual([
      { key: "goodbye", value: "bob", active: true },
    ]);
    expect(updatedState.fields.url).toBe("http://example.com/?goodbye=bob");
  });
});
