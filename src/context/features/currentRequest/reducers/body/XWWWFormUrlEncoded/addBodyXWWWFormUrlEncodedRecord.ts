import { CurrentRequestState } from "../../../types";

export default function addBodyXWWWFormUrlEncodedRecord(
  state: CurrentRequestState
): CurrentRequestState {
  return {
    ...state,
    fields: {
      ...state.fields,
      body: {
        ...state.fields.body,
        xWwwFormUrlencoded: [
          ...state.fields.body.xWwwFormUrlencoded,
          {
            key: "",
            value: "",
            active: true,
          },
        ],
      },
    },
  };
}
