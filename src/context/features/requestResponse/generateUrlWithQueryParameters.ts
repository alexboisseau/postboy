import { QueryParameter } from "@core/types/http-request";

export default function generateUrlWithQueryParameters(
  url: string,
  queryParameters: QueryParameter[]
) {
  const urlSearchParams = new URLSearchParams();
  queryParameters.forEach((param) => {
    if (param.active === true) {
      urlSearchParams.append(param.key, param.value);
    }
  });

  try {
    const urlObject = new URL(url);
    urlObject.search = urlSearchParams.toString();
    url = urlObject.toString();
  } catch {
    const urlBase = url.split("?")[0];
    url = urlBase + "?" + urlSearchParams.toString();
  }

  return url;
}
