import { CurrentRequestState } from "../types";

export default function extractBodyFromCurrentRequest(
  request: CurrentRequestState
): string | null {
  switch (request.fields.body.contentType) {
    case "none":
      return null;
    case "x-www-form-urlencoded":
      return request.fields.body.xWwwFormUrlencoded.reduce(
        (acc, field, index) => {
          if (field.active === false) return acc;
          const key = field.key;
          const value = field.value;

          if (index === request.fields.body.xWwwFormUrlencoded.length - 1) {
            return acc + `${key}=${value}`;
          } else {
            return acc + `${key}=${value}&`;
          }
        },
        ""
      );
    case "raw":
      return request.fields.body.raw.value;
    default:
      return null;
  }
}
