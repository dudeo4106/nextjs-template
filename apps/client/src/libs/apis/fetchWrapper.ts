/**
 * fetchWrapper.ts
 *
 * Common data fetching utility function.
 *
 * - Named "fetchWrapper" based on its role: handles HTTP requests and responses.
 * - Even without SWR, the term clearly conveys its purpose and matches common conventions.
 * - Abstract enough to allow internal implementation changes (e.g., fetch, axios).
 * - Keeps the codebase clean and semantically meaningful.
 */

import { CustomApiError } from './CustomApiError';

// Typed HTTP methods for fetch; limits to valid verbs since RequestInit.method is just a string.
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
type RequestInit = NonNullable<Parameters<typeof fetch>[1]>;
type HeadersInit = RequestInit['headers'];
type ResponseType = 'json' | 'html';

interface Params<RequestDataType> {
  endpoint: string;
  method: HttpMethod;
  headers?: HeadersInit;
  body: RequestDataType;
  responseType?: ResponseType;
}

interface Response<ResponseDataType> {
  status: number;
  data: ResponseDataType;
}

export const fetchWrapper = async <RequestDataType, ResponseDataType>(
  params: Params<RequestDataType>,
): Promise<Response<ResponseDataType>> => {
  const {
    endpoint,
    method,
    headers = {},
    body,
    responseType = 'json',
  } = params;

  const controller = new AbortController();
  const signal = controller.signal;
  // fetch does not support built-in timeouts.
  // setTimeout + AbortController simulates timeout to avoid indefinite pending requests.
  const timeoutId = setTimeout(() => controller.abort(), 5000);
  const config = {
    method,
    headers: headers,
    // see: https://developer.mozilla.org/en-US/docs/Web/API/RequestInit
    body: body && JSON.stringify(body),
    signal,
  } as const satisfies RequestInit;

  const response = await fetch(endpoint, { ...config, signal });
  clearTimeout(timeoutId);

  if (!response.ok) {
    throw await CustomApiError.createdFrom(response);
  }

  let responseBody;

  switch (responseType) {
    case 'json':
      responseBody = await response.json();
      break;
    case 'html':
      responseBody = await response.text();
      break;
    default:
      throw await CustomApiError.createdFrom(response);
  }

  return {
    status: response.status,
    data: responseBody,
  };
};
