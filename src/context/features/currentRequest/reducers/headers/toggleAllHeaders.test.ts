import { CurrentRequestState } from "../../types";
import createInitialState from "../../utils/createInitialState";
import toggleAllHeaders from "./toggleAllHeaders";

const generateActionPayload = (active: boolean) => ({
  payload: active,
  type: "currentRequest/toggleAllHeaders",
});

describe("toggleAllHeaders", () => {
  let state: CurrentRequestState;

  beforeEach(() => {
    state = createInitialState();
    state.fields.headers = [
      {
        key: "Content-Type",
        value: "application/x-www-form-urlencoded",
        active: true,
      },
      {
        key: "Authorization",
        value: "Bearer token",
        active: false,
      },
    ];
  });

  it("should toggle all headers to false", () => {
    const updatedState = toggleAllHeaders(state, generateActionPayload(false));

    expect(updatedState.fields.headers.filter((h) => !h.active).length).toEqual(
      state.fields.headers.length
    );
  });

  it("should toggle all headers to true", () => {
    const updatedState = toggleAllHeaders(state, generateActionPayload(true));

    expect(updatedState.fields.headers.filter((h) => h.active).length).toEqual(
      state.fields.headers.length
    );
  });
});
