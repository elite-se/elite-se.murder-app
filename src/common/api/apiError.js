// @flow

export default class ApiError extends Error {
  code: number

  constructor (code: number, message: string) {
    super(message)
    this.code = code
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
        if (code === error.code) return handler(error)
      }
    }
    throw error
  }
}
