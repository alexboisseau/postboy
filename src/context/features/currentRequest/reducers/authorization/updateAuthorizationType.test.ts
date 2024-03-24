import { AuthorizationType, CurrentRequestState } from "../../types";
import createInitialState from "../../utils/createInitialState";
import updateAuthorizationType from "./updateAuthorizationType";

const generateActionPayload = (authorizationType: AuthorizationType) => ({
  payload: authorizationType,
  type: "currentRequest/updateAuthorizationType",
});

describe("updateAuthorizationType", () => {
  let state: CurrentRequestState;

  beforeEach(() => {
    state = createInitialState();
  });

  it("should remove Authorization header and set type to no-auth when no-auth is selected", () => {
    state.fields.headers = [
      {
        key: "Authorization",
        value: "Bearer token",
        active: true,
      },
    ];

    state.fields.authorization.type = "bearer-token";
    state.fields.authorization.bearerToken.token = "token";

    const updatedState = updateAuthorizationType(
      state,
      generateActionPayload("no-auth")
    );

    expect(
      updatedState.fields.headers.filter((h) => h.key.includes("Authorization"))
        .length
    ).toEqual(0);
    expect(updatedState.fields.authorization.type).toEqual("no-auth");
  });

  it("should remove API key header and set type to no-auth when no-auth is selected", () => {
    const apiKey = {
      key: "X-API-KEY",
      value: "123456",
    };

    state.fields.authorization.apiKey = { ...apiKey };
    state.fields.headers = [
      {
        key: apiKey.key,
        value: apiKey.value,
        active: true,
      },
    ];

    const updatedState = updateAuthorizationType(
      state,
      generateActionPayload("no-auth")
    );

    expect(
      updatedState.fields.headers.filter(
        (h) => h.key.includes(apiKey.key) && h.value.includes(apiKey.value)
      ).length
    ).toEqual(0);
    expect(updatedState.fields.authorization.type).toEqual("no-auth");
  });

  it("should add Authorization header and set type to basic when basic is selected", () => {
    const updatedState = updateAuthorizationType(
      state,
      generateActionPayload("basic")
    );

    expect(
      updatedState.fields.headers.filter(
        (h) => h.key.includes("Authorization") && h.value.includes("Basic")
      ).length
    ).toEqual(1);
    expect(updatedState.fields.authorization.type).toEqual("basic");
  });

  it("should add Authorization header and set type to bearer-token when bearer-token is selected", () => {
    const updatedState = updateAuthorizationType(
      state,
      generateActionPayload("bearer-token")
    );

    expect(
      updatedState.fields.headers.filter(
        (h) => h.key.includes("Authorization") && h.value.includes("Bearer")
      ).length
    ).toEqual(1);
    expect(updatedState.fields.authorization.type).toEqual("bearer-token");
  });

  it("should add API key header and set type to api-key when api-key is selected", () => {
    const apiKey = {
      key: "X-API-KEY",
      value: "123456",
    };

    state.fields.authorization.apiKey = { ...apiKey };

    const updatedState = updateAuthorizationType(
      state,
      generateActionPayload("api-key")
    );

    expect(
      updatedState.fields.headers.filter(
        (h) => h.key.includes(apiKey.key) && h.value.includes(apiKey.value)
      ).length
    ).toEqual(1);
    expect(updatedState.fields.authorization.type).toEqual("api-key");
  });

  it("should update the Authorization header value when the type is changed", () => {
    state.fields.authorization.type = "basic";
    state.fields.headers = [
      {
        key: "Authorization",
        value: "Basic YWxpY2U6cGFzc3dvcmQ=",
        active: true,
      },
    ];
    state.fields.authorization.bearerToken.token = "token";

    const updatedState = updateAuthorizationType(
      state,
      generateActionPayload("bearer-token")
    );

    expect(
      updatedState.fields.headers.filter(
        (h) => h.key.includes("Authorization") && h.value.includes("Bearer")
      ).length
    ).toEqual(1);
    expect(
      updatedState.fields.headers.filter(
        (h) => h.key.includes("Authorization") && h.value.includes("Basic")
      ).length
    ).toEqual(0);
    expect(updatedState.fields.authorization.type).toEqual("bearer-token");
  });
});
