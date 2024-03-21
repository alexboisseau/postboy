import { CurrentRequestState } from "../../types";
import generateUrlWithQueryParameters from "../../utils/generateUrlWithQueryParameters";

export default function addQueryParameter(
  state: CurrentRequestState
): CurrentRequestState {
  const updatedQueryParameters = [
    ...state.fields.queryParameters,
    {
      key: "",
      value: "",
      active: true,
    },
  ];

  return {
    ...state,
    fields: {
      ...state.fields,
      url: generateUrlWithQueryParameters(
        state.fields.url,
        updatedQueryParameters
      ),
      queryParameters: updatedQueryParameters,
    },
  };
}
