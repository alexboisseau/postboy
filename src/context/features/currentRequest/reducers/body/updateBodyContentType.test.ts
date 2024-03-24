import { ContentType, CurrentRequestState } from "../../types";
import createInitialState from "../../utils/createInitialState";
import updateBodyContentType from "./updateBodyContentType";

const generatePayloadAction = (payload: ContentType) => ({
  payload,
  type: "currentRequest/updateBodyContentType",
});

describe("updateBodyContentType", () => {
  let state: CurrentRequestState;

  beforeEach(() => {
    state = createInitialState();
  });

  it("should not set any header when action.payload is none", () => {
    const updatedState = updateBodyContentType(
      state,
      generatePayloadAction("none")
    );

    expect(updatedState.fields.headers).toEqual([]);
  });

  it('should set "Content-Type" header to "application/json" when action.payload is "raw" and that body raw language selected is json', () => {
    state.fields.body.raw.language = "json";
    const updatedState = updateBodyContentType(
      state,
      generatePayloadAction("raw")
    );

    expect(updatedState.fields.headers).toEqual([
      {
        key: "Content-Type",
        value: "application/json",
        active: true,
      },
    ]);
  });

  it('should set "Content-Type" header to "application/xml" when action.payload is "raw" and that body raw language selected is xml', () => {
    state.fields.body.raw.language = "xml";
    const updatedState = updateBodyContentType(
      state,
      generatePayloadAction("raw")
    );

    expect(updatedState.fields.headers).toEqual([
      {
        key: "Content-Type",
        value: "application/xml",
        active: true,
      },
    ]);
  });

  it('should set "Content-Type" header to "application/x-www-form-urlencoded" when action.payload is "x-www-form-urlencoded"', () => {
    const updatedState = updateBodyContentType(
      state,
      generatePayloadAction("x-www-form-urlencoded")
    );

    expect(updatedState.fields.headers).toEqual([
      {
        key: "Content-Type",
        value: "application/x-www-form-urlencoded",
        active: true,
      },
    ]);
  });
});
