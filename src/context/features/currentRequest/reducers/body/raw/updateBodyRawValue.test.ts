import { CurrentRequestState } from "../../../types";
import createInitialState from "../../../utils/createInitialState";
import updateBodyRawValue from "./updateBodyRawValue";

const generatePayloadAction = (payload: string) => ({
  payload,
  type: "currentRequest/updateBodyRawValue",
});

describe("updateBodyRawValue", () => {
  it("should update the body raw value", () => {
    const state: CurrentRequestState = createInitialState();

    const updatedState = updateBodyRawValue(
      state,
      generatePayloadAction("hello world")
    );

    expect(updatedState.fields.body.raw.value).toBe("hello world");
  });
});
