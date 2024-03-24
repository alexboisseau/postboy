import createInitialState from "../../utils/createInitialState";
import removeHeader from "./removeHeader";

const generateActionPayload = (index: number) => ({
  payload: index,
  type: "currentRequest/removeHeader",
});

describe("removeHeader", () => {
  it("should remove the header", () => {
    const state = createInitialState();
    state.fields.headers = [
      {
        key: "Content-Type",
        value: "application/x-www-form-urlencoded",
        active: true,
      },
    ];

    const updatedState = removeHeader(state, generateActionPayload(0));

    expect(updatedState.fields.headers).toEqual([]);
  });
});
