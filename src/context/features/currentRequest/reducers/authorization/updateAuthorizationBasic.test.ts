import { CurrentRequestState } from "../../types";
import createInitialState from "../../utils/createInitialState";
import updateAuthorizationBasic from "./updateAuthorizationBasic";

const generatePayloadAction = (username: string, password: string) => ({
  payload: {
    username,
    password,
  },
  type: "currentRequest/updateAuthorizationBasic",
});

describe("updateAuthorizationBasic", () => {
  let state: CurrentRequestState;

  beforeEach(() => {
    state = createInitialState();
  });

  it("should update the Authorization header with the new basic auth credentials", () => {
    const username = "alice";
    const password = "password";

    const updatedState = updateAuthorizationBasic(
      state,
      generatePayloadAction(username, password)
    );
    const encodedCredentials = btoa(`${username}:${password}`);

    expect(updatedState.fields.headers).toHaveLength(1);
    expect(updatedState.fields.headers[0].key).toBe("Authorization");
    expect(updatedState.fields.headers[0].value).toBe(
      `Basic ${encodedCredentials}`
    );
  });
});
