// @flow

import ApiError from './apiError'

export const BACKEND = 'http://192.168.178.39:8080'

export const safeFetch = async (input: RequestInfo, init?: RequestOptions) => {
  const response = await fetch(input, init)
  if (!response.ok) {
    const text = await response.text()
    throw new ApiError(response.status, text)
  }
  return response
}
