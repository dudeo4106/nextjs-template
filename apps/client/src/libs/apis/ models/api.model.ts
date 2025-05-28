export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export type RequestData = Record<string, object>;
export interface RequestParams {
  endpoint: string;
  method: HTTPMethod;
  headers?: HeadersInit;
  data?: FormData | RequestData | undefined;
  timeout?: number;
  responseType?: 'json' | 'text' | 'arrayBuffer' | 'blob';
}

export interface APIResponse<T> {
  headers: HeadersInit;
  statusCode: number;
  data: T | null;
}
