import { QueryParameter } from "@/core/types/http-request";
import {
  RequestForm,
  RequestFormErrors,
  RequestResponse,
  RequestResponseAction,
  RequestResponseActionTypes,
} from "./actions";
import { HttpMethods } from "@/core/types/http-method";
import { z } from "zod";

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

export const initialRequestResponse: RequestResponse = {
  request: {
    fields: {
      httpMethod: "GET",
      url: "",
      queryParameters: [],
      headers: [],
    },
    errors: {
      httpMethod: null,
      url: null,
    },
    isSubmitting: false,
  },
  response: {
    value: null,
    error: null,
  },
};

export function requestResponseReducer(
  state: RequestResponse,
  action: RequestResponseAction
) {
  switch (action.type) {
    case RequestResponseActionTypes.REQUEST_UPDATE_HTTP_METHOD: {
      return {
        ...state,
        request: {
          ...state.request,
          method: action.payload,
        },
      };
    }

    case RequestResponseActionTypes.REQUEST_UPDATE_URL: {
      const url = action.payload;
      let queryParameters: QueryParameter[] = [];
      const queryParametersString = url.split("?")[1];

      if (queryParametersString !== undefined) {
        const urlSearchParams = new URLSearchParams(queryParametersString);
        queryParameters = Array.from(urlSearchParams)
          .map(([key, value]) => {
            return {
              key,
              value,
              active: true,
            };
          })
          .concat(
            state.request.fields.queryParameters.filter(
              (param) =>
                param.active === false &&
                queryParameters.find((p) => p.key === param.key) === undefined
            )
          );
      }

      return {
        ...state,
        request: {
          ...state.request,
          fields: {
            ...state.request.fields,
            url,
            queryParameters,
          },
        },
      };
    }

    case RequestResponseActionTypes.REQUEST_NEW_QUERY_PARAMETER: {
      const newQueryParameter = {
        key: "",
        value: "",
        active: true,
      };
      const updatedQueryParameters = [
        ...state.request.fields.queryParameters,
        newQueryParameter,
      ];

      return {
        ...state,
        request: {
          ...state.request,
          fields: {
            ...state.request.fields,
            queryParameters: updatedQueryParameters,
            url: generateUrl(state.request.fields.url, updatedQueryParameters),
          },
        },
      };
    }

    case RequestResponseActionTypes.REQUEST_UPDATE_QUERY_PARAMETER: {
      const updatedQueryParameters = state.request.fields.queryParameters.map(
        (param, index) => {
          if (index === action.payload.index) {
            return action.payload.queryParameter;
          }
          return param;
        }
      );

      return {
        ...state,
        request: {
          ...state.request,
          fields: {
            ...state.request.fields,
            url: generateUrl(state.request.fields.url, updatedQueryParameters),
            queryParameters: updatedQueryParameters,
          },
        },
      };
    }

    case RequestResponseActionTypes.REQUEST_REMOVE_QUERY_PARAMETER: {
      const updatedQueryParameters =
        state.request.fields.queryParameters.filter(
          (_, index) => index !== action.payload
        );

      return {
        ...state,
        request: {
          ...state.request,
          fields: {
            ...state.request.fields,
            queryParameters: updatedQueryParameters,
            url: generateUrl(state.request.fields.url, updatedQueryParameters),
          },
        },
      };
    }

    case RequestResponseActionTypes.REQUEST_CHECK_ALL_QUERY_PARAMETERS: {
      const updatedQueryParameters = state.request.fields.queryParameters.map(
        (param) => {
          return { ...param, active: action.payload };
        }
      );

      return {
        ...state,
        request: {
          ...state.request,
          fields: {
            ...state.request.fields,
            queryParameters: updatedQueryParameters,
            url: generateUrl(state.request.fields.url, updatedQueryParameters),
          },
        },
      };
    }

    case RequestResponseActionTypes.REQUEST_NEW_HEADER: {
      const header = {
        key: "",
        value: "",
        active: true,
      };

      return {
        ...state,
        request: {
          ...state.request,
          fields: {
            ...state.request.fields,
            headers: [...state.request.fields.headers, header],
          },
        },
      };
    }

    case RequestResponseActionTypes.REQUEST_REMOVE_HEADER: {
      const updatedHeaders = state.request.fields.headers.filter(
        (_, index) => index !== action.payload
      );

      return {
        ...state,
        request: {
          ...state.request,
          fields: {
            ...state.request.fields,
            headers: updatedHeaders,
          },
        },
      };
    }

    case RequestResponseActionTypes.REQUEST_UPDATE_HEADER: {
      const updatedHeaders = state.request.fields.headers.map(
        (header, index) => {
          if (index === action.payload.index) {
            return action.payload.header;
          }
          return header;
        }
      );

      return {
        ...state,
        request: {
          ...state.request,
          fields: {
            ...state.request.fields,
            headers: updatedHeaders,
          },
        },
      };
    }

    case RequestResponseActionTypes.REQUEST_CHECK_ALL_HEADERS: {
      const updatedHeaders = state.request.fields.headers.map((header) => {
        return { ...header, active: action.payload };
      });

      return {
        ...state,
        request: {
          ...state.request,
          fields: {
            ...state.request.fields,
            headers: updatedHeaders,
          },
        },
      };
    }

    case RequestResponseActionTypes.REQUEST_INVALID_FORM: {
      return {
        ...state,
        request: {
          ...state.request,
          errors: action.payload,
          isSubmitting: false,
        },
      };
    }

    case RequestResponseActionTypes.REQUEST_SUBMIT_FORM: {
      return {
        ...state,
        request: {
          ...state.request,
          errors: {
            httpMethod: null,
            url: null,
          },
          isSubmitting: true,
        },
        response: {
          value: null,
          error: null,
        },
      };
    }

    case RequestResponseActionTypes.RESPONSE_SUCCESS: {
      return {
        ...state,
        request: {
          ...state.request,
          isSubmitting: false,
        },
        response: {
          value: action.payload,
          error: null,
        },
      };
    }

    case RequestResponseActionTypes.RESPONSE_ERROR: {
      return {
        ...state,
        request: {
          ...state.request,
          isSubmitting: false,
        },
        response: {
          value: null,
          error: action.payload,
        },
      };
    }
  }
}
