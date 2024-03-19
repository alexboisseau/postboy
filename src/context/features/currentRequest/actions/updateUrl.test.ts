import { CurrentRequestState } from "../types";
import updateUrl from "./updateUrl";
import { initialState } from "../initialState";

describe("updateUrl", () => {
  const state: CurrentRequestState = { ...initialState };

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

    const { url, queryParameters } = updateUrl(
      state,
      "https://example.com/test?param3=value3&param4=value4"
    );

    expect(url).toEqual(expectedUrl);
    expect(queryParameters).toEqual(expectedQueryParameters);
  });
});
