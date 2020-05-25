// @flow

import { isEmpty } from 'lodash'

export type ApiErrorDetails = {|
  timestamp: string,
  status: number,
  error: string,
  message: string,
  path: string
|}

export default class ApiError extends Error {
  response: Response
  errorDetails: ?ApiErrorDetails

  constructor (response: Response, errorDetails?: ApiErrorDetails) {
    super((errorDetails && !isEmpty(errorDetails.message) && errorDetails.message !== 'No message available')
      ? errorDetails.message
      : response?.statusText ||
        response?.status ? `API responded with error ${response.status}` : 'API error')
    this.response = response
    this.errorDetails = errorDetails
  }

  /**
   * Returns a function that takes errors and tries to handle them.
   * If error is an ApiError and a handler for its status code is provided, this handler is called and the result returned.
   * Otherwise, the error is rethrown.
   *
   * @param codeHandlers a mapping of status codes to actions
   * @returns {*} the error handler
   */
  static handle<R> (codeHandlers: Map<number, (ApiError) => R>): (Error => R) {
    return (error: Error) => {
      if (error instanceof ApiError) {
        error = (error: ApiError)
        for (const [code, handler] of codeHandlers.entries()) {
          if (code === error.response.status) return handler(error)
        }
      }
      throw error
    }
  }
}
