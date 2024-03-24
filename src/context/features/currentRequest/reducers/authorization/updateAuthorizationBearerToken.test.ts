import { CurrentRequestState } from "../../types";
import createInitialState from "../../utils/createInitialState";
import updateAuthorizationBearerToken from "./updateAuthorizationBearerToken";

const generatePayloadAction = (payload: string) => ({
  payload,
  type: "currentRequest/updateAuthorizationBearerToken",
});

describe("updateAuthorizationBearerToken", () => {
  let state: CurrentRequestState;

  beforeEach(() => {
    state = createInitialState();
  });

  it("should update the value of the bearer token", () => {
    const updatedState = updateAuthorizationBearerToken(
      state,
      generatePayloadAction("newToken")
    );
    expect(updatedState.fields.authorization.bearerToken.token).toBe(
      "newToken"
    );
  });

  it("should update the Authorization header with the new value", () => {
    state.fields.headers = [
      {
        key: "Authorization",
        value: "Basic username:password",
        active: true,
      },
    ];

    const updatedState = updateAuthorizationBearerToken(
      state,
      generatePayloadAction("newToken")
    );

    expect(updatedState.fields.headers).toEqual([
      {
        key: "Authorization",
        value: "Bearer newToken",
        active: true,
      },
    ]);
  });
});
