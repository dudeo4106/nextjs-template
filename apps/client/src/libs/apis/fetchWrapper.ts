/**
 * fetcher.ts
 *
 * Common data fetching utility function.
 *
 * - Named "fetcher" based on its role: handles HTTP requests and responses.
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

interface ApiResponse<ResponseDataType> {
  headers: HeadersInit;
  statusCode: number;
  data: ResponseDataType | null;
}

export const fetchWrapper = async <RequestDataType, ResponseDataType>(
  requestParams: Params<RequestDataType>,
): Promise<ApiResponse<ResponseDataType>> => {
  const {
    endpoint,
    method,
    headers = {},
    data,
    responseType = 'json',
  } = requestParams;

  const controller = new AbortController();
  const signal = controller.signal;
  // fetch does not support built-in timeouts.
  // setTimeout + AbortController simulates timeout to avoid indefinite pending requests.
  const timeoutId = setTimeout(() => controller.abort(), 5000);
  const config = {
    method,
    headers: headers,
    // see: https://developer.mozilla.org/en-US/docs/Web/API/RequestInit
    // TODO: check if JSON.stringify is needed
    body: JSON.stringify(data) ?? null,
    signal,
  } as const satisfies RequestInit;

  const res = await fetch(endpoint, { ...config, signal });
  clearTimeout(timeoutId);

  if (!res.ok) {
    const errorRes = await res.json();
    // TODO: define how to define error
    throw errorRes;
  }

  let responseData;

  switch (responseType) {
    case 'json':
      responseData = await res.json();
      break;
    case 'html':
      responseData = await res.text();
      break;
    default:
      responseData = await res.json();
  }

  return {
    headers: res.headers,
    statusCode: res.status,
    data: responseData,
  };
};
