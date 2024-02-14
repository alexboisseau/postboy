import { HttpMethod, HttpMethods } from "@/core/types/http-method";
import { Header, QueryParameter } from "@/core/types/http-request";
import { z } from "zod";
import { RequestFormAction, RequestFormActionTypes } from "./actions";

function generateUrl(url: string, queryParameters: QueryParameter[]): string {
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

export function validateRequestForm(form: RequestForm): {
  success: boolean;
  errors: RequestFormErrors;
} {
  let success: boolean = true;
  const errors: RequestFormErrors = {
    httpMethod: null,
    url: null,
  };

  if (HttpMethods.includes(form.fields.httpMethod) === false) {
    errors.httpMethod = "Invalid Http Method";
    success = false;
  }

  if (z.string().url().safeParse(form.fields.url).success === false) {
    errors.url = "Invalid URL";
    success = false;
  }

  return {
    success,
    errors,
  };
}

export type RequestFormErrors = {
  httpMethod: string | null;
  url: string | null;
};

export type RequestFormFields = {
  httpMethod: HttpMethod;
  url: string;
  queryParameters: QueryParameter[];
  headers: Header[];
};

export type RequestForm = {
  errors: RequestFormErrors;
  fields: RequestFormFields;
  isSubmitting: boolean;
};

export function RequestFormReducer(
  state: RequestForm,
  action: RequestFormAction
): RequestForm {
  switch (action.type) {
    case RequestFormActionTypes.UPDATE_HTTP_METHOD: {
      return {
        ...state,
        fields: {
          ...state.fields,
          httpMethod: action.payload,
        },
      };
    }

    case RequestFormActionTypes.UPDATE_URL: {
      const url = action.payload;
      let queryParameters: QueryParameter[] = [];
      const queryParametersString = url.split("?")[1];

      if (queryParametersString !== undefined) {
        const urlSearchParams = new URLSearchParams(queryParametersString);
        queryParameters = Array.from(urlSearchParams).map(([key, value]) => {
          return {
            key,
            value,
            active: true,
          };
        });
      }

      return {
        ...state,
        fields: {
          ...state.fields,
          url: url,
          queryParameters: queryParameters.concat(
            state.fields.queryParameters.filter(
              (param) =>
                param.active === false &&
                queryParameters.find((p) => p.key === param.key) === undefined
            )
          ),
        },
      };
    }

    case RequestFormActionTypes.UPDATE_QUERY_PARAMETER: {
      const updatedQueryParameters = state.fields.queryParameters.map(
        (param, index) => {
          if (index === action.payload.index) {
            return action.payload.queryParameter;
          }
          return param;
        }
      );

      return {
        ...state,
        fields: {
          ...state.fields,
          queryParameters: updatedQueryParameters,
          url: generateUrl(state.fields.url, updatedQueryParameters),
        },
      };
    }

    case RequestFormActionTypes.UPDATE_IS_SUBMITTING: {
      return {
        ...state,
        isSubmitting: action.payload,
      };
    }

    case RequestFormActionTypes.ADD_NEW_QUERY_PARAMETER: {
      const newQueryParameter = {
        key: "",
        value: "",
        active: true,
      };
      const updatedQueryParameters = [
        ...state.fields.queryParameters,
        newQueryParameter,
      ];

      return {
        ...state,
        fields: {
          ...state.fields,
          queryParameters: updatedQueryParameters,
          url: generateUrl(state.fields.url, updatedQueryParameters),
        },
      };
    }

    case RequestFormActionTypes.REMOVE_QUERY_PARAMETER: {
      const updatedQueryParameters = state.fields.queryParameters.filter(
        (_, index) => index !== action.payload
      );

      return {
        ...state,
        fields: {
          ...state.fields,
          queryParameters: updatedQueryParameters,
          url: generateUrl(state.fields.url, updatedQueryParameters),
        },
      };
    }

    case RequestFormActionTypes.CHECK_ALL_QUERY_PARAMETERS: {
      const updatedQueryParameters = state.fields.queryParameters.map(
        (param) => {
          return { ...param, active: action.payload };
        }
      );

      return {
        ...state,
        fields: {
          ...state.fields,
          queryParameters: updatedQueryParameters,
          url: generateUrl(state.fields.url, updatedQueryParameters),
        },
      };
    }

    case RequestFormActionTypes.ADD_HEADER: {
      const header = {
        key: "",
        value: "",
        active: true,
      };

      return {
        ...state,
        fields: {
          ...state.fields,
          headers: [...state.fields.headers, header],
        },
      };
    }

    case RequestFormActionTypes.REMOVE_HEADER: {
      const headers = state.fields.headers.filter(
        (_, index) => index !== action.payload
      );

      return {
        ...state,
        fields: {
          ...state.fields,
          headers,
        },
      };
    }

    case RequestFormActionTypes.UPDATE_HEADER: {
      return {
        ...state,
        fields: {
          ...state.fields,
          headers: state.fields.headers.map((header, index) => {
            if (index === action.payload.index) {
              return action.payload.header;
            }
            return header;
          }),
        },
      };
    }

    case RequestFormActionTypes.CHECK_ALL_HEADERS: {
      return {
        ...state,
        fields: {
          ...state.fields,
          headers: state.fields.headers.map((header) => {
            return { ...header, active: action.payload };
          }),
        },
      };
    }

    case RequestFormActionTypes.INVALID_FORM: {
      return {
        ...state,
        errors: action.payload,
        isSubmitting: false,
      };
    }

    case RequestFormActionTypes.SUBMIT_FORM: {
      return {
        ...state,
        errors: {
          httpMethod: null,
          url: null,
        },
        isSubmitting: true,
      };
    }
    default:
      return state;
  }
}

export const initialRequestForm: RequestForm = {
  errors: {
    httpMethod: null,
    url: null,
  },
  fields: {
    httpMethod: "GET",
    url: "",
    queryParameters: [],
    headers: [],
  },
  isSubmitting: false,
};
