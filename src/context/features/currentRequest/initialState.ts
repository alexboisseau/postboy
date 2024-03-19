import { CurrentRequestState } from "./types";

export const initialState: CurrentRequestState = {
  fields: {
    httpMethod: "GET",
    url: "",
    queryParameters: [],
    headers: [],
    authorization: {
      type: "no-auth",
      apiKey: {
        key: "",
        value: "",
      },
      basic: {
        username: "",
        password: "",
      },
      bearerToken: {
        token: "",
      },
    },
    body: {
      contentType: "none",
      raw: {
        language: "json",
        value: "",
      },
      xWwwFormUrlencoded: [],
    },
  },
  errors: {
    httpMethod: null,
    url: null,
  },
  isSubmitting: false,
  response: {
    value: null,
    error: null,
  },
};
