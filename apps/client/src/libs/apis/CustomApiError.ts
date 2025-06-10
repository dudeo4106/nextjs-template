/**
 * CustomApiError
 *
 * A custom error class used to wrap failed fetch() HTTP responses.
 * It provides status code and parsed response body for unified error handling across the app.
 *
 * - Use `CustomApiError.createdFrom(response)` to instantiate.
 * - Automatically parses JSON body if available.
 */
export class CustomApiError extends Error {
  public static async createdFrom(response: Response) {
    if (response.ok) {
      throw new Error('This should not be considered as Error');
    }
    const responseBody = await response.json().catch(() => undefined);
    return new CustomApiError(response.status, responseBody);
  }

  private constructor(
    readonly status: number,
    readonly body: object | undefined,
  ) {
    super();

    // Clean up stack trace (V8 only), making easy to debug
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/captureStackTrace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
