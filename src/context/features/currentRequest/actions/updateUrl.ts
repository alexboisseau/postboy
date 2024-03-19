import { QueryParameter } from "@core/types/http-request";
import { CurrentRequestState } from "../types";

export default function updateUrl(
  state: CurrentRequestState,
  url: string
): {
  url: string;
  queryParameters: QueryParameter[];
} {
  const disabledQueryParameters = state.fields.queryParameters.filter(
    (qp) => qp.active === false
  );
  const queryParametersString = url.split("?")[1];

  const queryParameters: QueryParameter[] = disabledQueryParameters;
  if (queryParametersString !== undefined) {
    const urlSearchParams = new URLSearchParams(queryParametersString);
    const activeParameters = Array.from(urlSearchParams).map(
      ([key, value]) => ({
        key,
        value,
        active: true,
      })
    );
    queryParameters.push(...activeParameters);
  }

  return {
    url,
    queryParameters,
  };
}
