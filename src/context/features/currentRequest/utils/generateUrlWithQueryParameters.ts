import { QueryParameter } from "@core/types/http-request";

export default function generateUrlWithQueryParameters(
  inputUrl: string,
  inputQueryParameters: QueryParameter[]
) {
  const queryParameters = inputQueryParameters.filter(
    (param) => param.key.trim() !== "" && param.active
  );

  if (queryParameters.length === 0) return inputUrl;

  const urlSearchParams = new URLSearchParams();
  queryParameters.forEach((param) => {
    urlSearchParams.append(param.key, param.value);
  });

  try {
    const urlObject = new URL(inputUrl);
    urlObject.search = urlSearchParams.toString();
    return urlObject.toString();
  } catch {
    const urlBase = inputUrl.split("?")[0];
    return `${urlBase}?${urlSearchParams.toString()}`;
  }
}
