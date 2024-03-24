import { Header } from "@core/types/http-request";
import createInitialState from "../../utils/createInitialState";
import updateHeader from "./updateHeader";
import { CurrentRequestState } from "../../types";

const generateActionPayload = (header: Header, index: number) => ({
  payload: {
    header,
    index,
  },
  type: "currentRequest/updateHeader",
});

describe("updateHeader", () => {
  let state: CurrentRequestState;

  beforeEach(() => {
    state = createInitialState();
    state.fields.headers = [
      {
        key: "Content-Type",
        value: "application/x-www-form-urlencoded",
        active: true,
      },
    ];
  });

  it("should update a header", () => {
    const updatedState = updateHeader(
      state,
      generateActionPayload(
        {
          key: "Content-Type",
          value: "application/json",
          active: true,
        },
        0
      )
    );

    expect(updatedState.fields.headers).toEqual([
      {
        key: "Content-Type",
        value: "application/json",
        active: true,
      },
    ]);
  });

  it("should handle invalid index gracefully", () => {
    const updatedState = updateHeader(
      state,
      generateActionPayload(
        { key: "newKey", value: "newValue", active: true },
        -1
      )
    );

    expect(updatedState).toEqual(state);
  });
});
