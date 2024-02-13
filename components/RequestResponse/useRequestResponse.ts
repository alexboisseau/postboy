import { useState } from "react";
import { sendHttpRequest } from "@/app/actions/send-http-request";
import { HttpMethod, HttpMethods } from "@/core/types/http-method";
import { HttpResponse } from "@/core/types/http-response";
import { z } from "zod";

type HttpRequestFormErrors = {
  httpMethod: string | null;
  url: string | null;
};

export type HttpRequestForm = {
  errors: HttpRequestFormErrors;
  isSubmitting: boolean;
  httpMethod: HttpMethod;
  url: string;
};

function validateHttpRequestForm(form: HttpRequestForm): {
  success: boolean;
  errors: HttpRequestFormErrors;
} {
  let success: boolean = true;
  const errors: HttpRequestFormErrors = {
    httpMethod: null,
    url: null,
  };

  if (HttpMethods.includes(form.httpMethod) === false) {
    errors.httpMethod = "Invalid Http Method";
    success = false;
  }

  if (z.string().url().safeParse(form.url).success === false) {
    errors.url = "Invalid URL";
    success = false;
  }

  return {
    success,
    errors,
  };
}

export function useRequestResponse() {
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<HttpResponse | null>(null);
  const [httpRequestForm, setHttpRequestForm] = useState<HttpRequestForm>({
    errors: {
      httpMethod: null,
      url: null,
    },
    isSubmitting: false,
    httpMethod: "GET",
    url: "",
  });

  const setHttpMethod = (value: HttpMethod) => {
    setHttpRequestForm({
      ...httpRequestForm,
      httpMethod: value,
    });
  };

  const setUrl = (value: string) => {
    setHttpRequestForm({
      ...httpRequestForm,
      url: value,
    });
  };

  const handleSend = async () => {
    setHttpRequestForm((previous) => ({
      ...previous,
      errors: {
        httpMethod: null,
        url: null,
      },
      isSubmitting: true,
    }));
    setError(null);
    setResponse(null);

    const formValidation = validateHttpRequestForm(httpRequestForm);

    if (formValidation.success === false) {
      setHttpRequestForm((previous) => ({
        ...previous,
        errors: formValidation.errors,
        isSubmitting: false,
      }));

      return;
    }

    sendHttpRequest({
      method: httpRequestForm.httpMethod,
      url: httpRequestForm.url,
    })
      .then((response) => {
        setHttpRequestForm((previous) => ({
          ...previous,
          isSubmitting: false,
        }));
        setResponse(response);
      })
      .catch((error) => {
        console.error(error);
        setHttpRequestForm((previous) => ({
          ...previous,
          isSubmitting: false,
        }));
        setError(error?.message ?? "An error occurred");
      });
  };

  return {
    error,
    httpRequestForm,
    response,
    handleSend,
    setHttpMethod,
    setUrl,
  };
}
