import { CurrentRequestState } from "../../../types";
import createInitialState from "../../../utils/createInitialState";
import addBodyXWWWFormUrlEncodedRecord from "./addBodyXWWWFormUrlEncodedRecord";

describe("addBodyXWWWFormUrlEncodedRecord", () => {
  it("should add a new record to the xWwwFormUrlencoded array", () => {
    const state: CurrentRequestState = createInitialState();
    const updatedState = addBodyXWWWFormUrlEncodedRecord(state);

    expect(updatedState.fields.body.xWwwFormUrlencoded[0]).toEqual({
      key: "",
      value: "",
      active: true,
    });
  });
});
