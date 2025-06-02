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

// Typed HTTP methods for fetch; limits to valid verbs since RequestInit.method is just a string.
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
type RequestInit = NonNullable<Parameters<typeof fetch>[1]>;
type HeadersInit = RequestInit['headers'];
type ResponseType = 'json' | 'html';

interface Params<RequestDataType> {
  endpoint: string;
  method: HttpMethod;
  headers?: HeadersInit;
  data?: RequestDataType;
  responseType?: ResponseType;
}

interface Response<ResponseDataType> {
  headers: HeadersInit;
  status: number;
  data: ResponseDataType | null;
}

export const fetchWrapper = async <RequestDataType, ResponseDataType>(
  params: Params<RequestDataType>,
): Promise<Response<ResponseDataType>> => {
  const {
    endpoint,
    method,
    headers = {},
    data,
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
    body: JSON.stringify(data) ?? null,
    signal,
  } as const satisfies RequestInit;

  const response = await fetch(endpoint, { ...config, signal });
  clearTimeout(timeoutId);

  if (!response.ok) {
    const error = await response.json();
    // TODO: define how to define error
    throw error;
  }

  let responseData;

  switch (responseType) {
    case 'json':
      responseData = await response.json();
      break;
    case 'html':
      responseData = await response.text();
      break;
    default:
      // TODO: define how to define error
      responseData = await response.json();
  }

  return {
    headers: response.headers,
    status: response.status,
    data: responseData,
  };
};
