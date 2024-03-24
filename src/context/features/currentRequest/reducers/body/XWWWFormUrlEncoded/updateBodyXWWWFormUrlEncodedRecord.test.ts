import { ActivatableKeyValue } from "@core/types/activatable-key-value";
import createInitialState from "../../../utils/createInitialState";
import updateBodyXWWWFormUrlEncodedRecord from "./updateBodyXWWWFormUrlEncodedRecord";

const generatePayloadAction = (record: ActivatableKeyValue, index: number) => ({
  payload: { record, index },
  type: "currentRequest/updateBodyXWWWFormUrlEncodedRecord",
});

describe("updateBodyXWWWFormUrlEncodedRecord", () => {
  it("should update the record at the given index", () => {
    const state = createInitialState();
    state.fields.body.xWwwFormUrlencoded = [
      { key: "key1", value: "value1", active: true },
      { key: "key2", value: "value2", active: true },
    ];

    const updatedState = updateBodyXWWWFormUrlEncodedRecord(
      state,
      generatePayloadAction({ key: "key3", value: "value3", active: false }, 1)
    );

    expect(updatedState.fields.body.xWwwFormUrlencoded).toEqual([
      { key: "key1", value: "value1", active: true },
      { key: "key3", value: "value3", active: false },
    ]);
  });
});
