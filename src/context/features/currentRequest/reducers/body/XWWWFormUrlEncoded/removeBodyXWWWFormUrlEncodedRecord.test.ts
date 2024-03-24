import createInitialState from "../../../utils/createInitialState";
import removeBodyXWWWFormUrlEncodedRecord from "./removeBodyXWWWFormUrlEncodedRecord";

const generatePayloadAction = (payload: number) => ({
  payload,
  type: "currentRequest/removeBodyXWWWFormUrlEncodedRecord",
});

describe("removeBodyXWWWFormUrlEncodedRecord", () => {
  it("should remove the record at the given index", () => {
    const state = createInitialState();
    state.fields.body.xWwwFormUrlencoded = [
      { key: "key1", value: "value1", active: true },
      { key: "key2", value: "value2", active: true },
    ];

    const updatedState = removeBodyXWWWFormUrlEncodedRecord(
      state,
      generatePayloadAction(1)
    );

    expect(updatedState.fields.body.xWwwFormUrlencoded).toEqual([
      { key: "key1", value: "value1", active: true },
    ]);
  });

  it("should not remove any records if the index is out of bounds", () => {
    const state = createInitialState();
    state.fields.body.xWwwFormUrlencoded = [
      { key: "key1", value: "value1", active: true },
      { key: "key2", value: "value2", active: true },
    ];

    const updatedState = removeBodyXWWWFormUrlEncodedRecord(
      state,
      generatePayloadAction(2)
    );

    expect(updatedState.fields.body.xWwwFormUrlencoded).toEqual([
      { key: "key1", value: "value1", active: true },
      { key: "key2", value: "value2", active: true },
    ]);
  });
});
