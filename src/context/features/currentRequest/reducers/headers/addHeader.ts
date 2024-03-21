import { CurrentRequestState } from "../../types";

export default function addHeader(
  state: CurrentRequestState
): CurrentRequestState {
  return {
    ...state,
    fields: {
      ...state.fields,
      headers: [
        ...state.fields.headers,
        {
          key: "",
          value: "",
          active: true,
        },
      ],
    },
  };
}
