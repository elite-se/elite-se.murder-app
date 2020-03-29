// @flow

export type ApiErrorResponse = {
  timestamp: string,
  status: number,
  error: string,
  message: string,
  path: string
}

export default class ApiError extends Error {
  response: ApiErrorResponse

  constructor (response: ApiErrorResponse) {
    super(response.message === 'No message available' ? response.error : response.message)
    this.response = response
  }

  /**
   * If error is an ApiError and a handler for its status code is provided, this handler is called and the result returned.
   * Otherwise, the error is rethrown.
   *
   * @param error the error that should be handled
   * @param codeHandlers a mapping of status codes to actions
   * @returns {*} the value returned by the corresponding handler
   */
  static handle<R> (error: Error, codeHandlers: Map<number, (ApiError) => R>): R {
    if (error instanceof ApiError) {
      error = (error: ApiError)
      for (const [code, handler] of codeHandlers.entries()) {
        if (code === error.response.status) return handler(error)
      }
    }
    throw error
  }
}
