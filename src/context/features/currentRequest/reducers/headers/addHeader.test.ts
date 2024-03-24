import createInitialState from "../../utils/createInitialState";
import addHeader from "./addHeader";

describe("addHeader", () => {
  it("should add a new header", () => {
    const state = createInitialState();
    const updatedState = addHeader(state);

    expect(updatedState.fields.headers).toEqual([
      {
        key: "",
        value: "",
        active: true,
      },
    ]);
  });
});
