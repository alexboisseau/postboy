import { CurrentRequestState } from "../../types";

export default function submitPending(
  state: CurrentRequestState
): CurrentRequestState {
  return {
    ...state,
    errors: {
      httpMethod: null,
      url: null,
    },
    isSubmitting: true,
    response: {
      value: null,
      error: null,
    },
  };
}
