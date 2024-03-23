import { HttpMethod } from "@core/types/http-method";
import { CurrentRequestState } from "../types";
import createInitialState from "../utils/createInitialState";
import updateHttpMethod from "./updateHttpMethod";

const generatePayloadAction = (payload: HttpMethod) => ({
  payload,
  type: "currentRequest/updateHttpMethod",
});

describe("updateHttpMethod", () => {
  let state: CurrentRequestState;

  beforeEach(() => {
    state = createInitialState();
  });

  it("should set http method to GET when action.payload is equal to GET", () => {
    state.fields.httpMethod = "POST";
    const updatedState = updateHttpMethod(state, generatePayloadAction("GET"));

    expect(updatedState.fields.httpMethod).toEqual("GET");
  });

  it("should set http method to POST when action.payload is equal to POST", () => {
    state.fields.httpMethod = "GET";
    const updatedState = updateHttpMethod(state, generatePayloadAction("POST"));

    expect(updatedState.fields.httpMethod).toEqual("POST");
  });
});
