import { CurrentRequestState } from "../types";
import createInitialState from "../utils/createInitialState";
import updateUrl from "./updateUrl";

describe("updateUrl", () => {
  let state: CurrentRequestState;

  beforeEach(() => {
    state = createInitialState();
  });

  it("should update the URL and query parameters correctly", () => {
    state.fields.queryParameters = [
      { key: "param1", value: "value1", active: true },
      { key: "param2", value: "value2", active: false },
    ];

    const expectedUrl = "https://example.com/test?param3=value3&param4=value4";
    const expectedQueryParameters = [
      { key: "param2", value: "value2", active: false },
      { key: "param3", value: "value3", active: true },
      { key: "param4", value: "value4", active: true },
    ];

    const action = {
      payload: "https://example.com/test?param3=value3&param4=value4",
      type: "currentRequest/updateUrl",
    };

    const newState = updateUrl(state, action);

    expect(newState.fields.url).toEqual(expectedUrl);
    expect(newState.fields.queryParameters).toEqual(expectedQueryParameters);
  });

  it("should kept only disabled query parameters when url does not have query parameters", () => {
    state.fields.queryParameters = [
      { key: "param1", value: "value1", active: true },
      { key: "param2", value: "value2", active: false },
    ];

    const expectedUrl = "https://example.com";
    const expectedQueryParameters = [
      { key: "param2", value: "value2", active: false },
    ];

    const action = {
      payload: "https://example.com",
      type: "currentRequest/updateUrl",
    };

    const newState = updateUrl(state, action);

    expect(newState.fields.url).toEqual(expectedUrl);
    expect(newState.fields.queryParameters).toEqual(expectedQueryParameters);
  });
});
