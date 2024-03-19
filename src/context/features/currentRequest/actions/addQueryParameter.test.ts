import { CurrentRequestState } from "../types";
import createInitialState from "../utils/createInitialState";
import addQueryParameter from "./addQueryParameter";

const NEW_QUERY_PARAMETER = { key: "", value: "", active: true };

describe("addQueryParameter", () => {
  let state: CurrentRequestState;

  beforeEach(() => {
    state = createInitialState();
  });

  it("should add a new query parameter", () => {
    const expectedQueryParameters = [NEW_QUERY_PARAMETER];
    const newState = addQueryParameter(state);
    expect(newState.fields.queryParameters).toEqual(expectedQueryParameters);
  });
});
