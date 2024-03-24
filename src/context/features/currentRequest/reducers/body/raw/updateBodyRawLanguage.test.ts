import { CurrentRequestState, SupportedRawLanguages } from "../../../types";
import createInitialState from "../../../utils/createInitialState";
import updateBodyRawLanguage from "./updateBodyRawLanguage";

const generatePayloadAction = (language: SupportedRawLanguages) => ({
  payload: language,
  type: "currentRequest/updateBodyRawLanguage",
});

describe("updateBodyRawLanguage", () => {
  let state: CurrentRequestState;

  beforeEach(() => {
    state = createInitialState();
  });

  it("should update the body raw language", () => {
    state.fields.body.raw.language = "xml";

    const updatedState = updateBodyRawLanguage(
      state,
      generatePayloadAction("json")
    );

    expect(updatedState.fields.body.raw.language).toEqual("json");
  });

  it("should update the content type header to application/json when json is selected", () => {
    state.fields.body.raw.language = "xml";
    state.fields.body.contentType = "raw";
    state.fields.headers = [
      { key: "Content-Type", value: "application/xml", active: true },
    ];

    const updatedState = updateBodyRawLanguage(
      state,
      generatePayloadAction("json")
    );

    expect(updatedState.fields.headers[0]).toEqual({
      key: "Content-Type",
      value: "application/json",
      active: true,
    });
  });

  it("should update the content type header to application/xml when xml is selected", () => {
    state.fields.body.raw.language = "json";
    state.fields.body.contentType = "raw";
    state.fields.headers = [
      { key: "Content-Type", value: "application/json", active: true },
    ];

    const updatedState = updateBodyRawLanguage(
      state,
      generatePayloadAction("xml")
    );

    expect(updatedState.fields.headers[0]).toEqual({
      key: "Content-Type",
      value: "application/xml",
      active: true,
    });
  });
});
