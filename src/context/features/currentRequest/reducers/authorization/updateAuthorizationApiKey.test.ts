import { CurrentRequestState } from "../../types";
import createInitialState from "../../utils/createInitialState";
import updateAuthorizationApiKey from "./updateAuthorizationApiKey";

const generatePayloadAction = (key: string, value: string) => ({
  payload: {
    key,
    value,
  },
  type: "currentRequest/updateAuthorizationApiKey",
});

describe("updateAuthorizationApiKey", () => {
  let state: CurrentRequestState;

  beforeEach(() => {
    state = createInitialState();
  });

  it("should add a new header", () => {
    const updatedState = updateAuthorizationApiKey(
      state,
      generatePayloadAction("AUTH_KEY", "API_TOKEN")
    );

    expect(updatedState.fields.headers).toHaveLength(1);
    expect(updatedState.fields.headers[0]).toEqual({
      key: "AUTH_KEY",
      value: "API_TOKEN",
      active: true,
    });
  });

  it("should remove Authorization header if it exists", () => {
    state.fields.headers.push({
      key: "Authorization",
      value: "Bearer TOKEN",
      active: true,
    });

    const updatedState = updateAuthorizationApiKey(
      state,
      generatePayloadAction("AUTH_KEY", "API_TOKEN")
    );

    expect(
      updatedState.fields.headers.filter((h) => h.key === "Authorization")
    ).toHaveLength(0);
  });

  it('should update the value of the "apiKey" field', () => {
    const updatedState = updateAuthorizationApiKey(
      state,
      generatePayloadAction("AUTH_KEY", "API_TOKEN")
    );

    expect(updatedState.fields.authorization.apiKey).toEqual({
      key: "AUTH_KEY",
      value: "API_TOKEN",
    });
  });

  it("should update the header value if the key already exists", () => {
    state.fields.authorization.apiKey = {
      key: "AUTH_KEY",
      value: "OLD_TOKEN",
    };
    state.fields.headers.push({
      key: "AUTH_KEY",
      value: "OLD_TOKEN",
      active: true,
    });

    const updatedState = updateAuthorizationApiKey(
      state,
      generatePayloadAction("AUTH_KEY", "API_TOKEN")
    );

    expect(updatedState.fields.headers).toHaveLength(1);
    expect(updatedState.fields.headers[0]).toEqual({
      key: "AUTH_KEY",
      value: "API_TOKEN",
      active: true,
    });
  });
});
