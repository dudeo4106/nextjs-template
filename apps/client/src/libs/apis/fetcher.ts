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

import { APIResponse, RequestData, RequestParams } from './ models/api.model';

const setRequestBody = (
  data?: FormData | RequestData | undefined,
): BodyInit | undefined => {
  if (data instanceof FormData || typeof data === 'string') {
    return data;
  } else if (data) {
    return JSON.stringify(data);
  }
  return undefined;
};

export const fetchWrapper = async <T>(
  requestParams: RequestParams,
): Promise<APIResponse<T>> => {
  const {
    endpoint,
    method,
    headers = {},
    data,
    timeout = 5000,
    responseType = 'json',
  } = requestParams;

  const controller = new AbortController();
  const signal = controller.signal;
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  const config: RequestInit = {
    method,
    headers: headers,
    body: setRequestBody(data) ?? null,
    signal,
  };

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
    case 'text':
      responseData = await res.text();
      break;
    case 'blob':
      responseData = await res.blob();
      break;
    case 'arrayBuffer':
      responseData = await res.arrayBuffer();
      break;
    default:
      responseData = await res.json();
      break;
  }

  return {
    headers,
    statusCode: 200,
    data: responseData,
  };
};
