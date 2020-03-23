// @flow

import ApiError from './apiError'

export const BACKEND = 'http://192.168.178.39:8080'

type MyOptionsType = {
  ...$Diff<RequestOptions, { headers?: HeadersInit }>,
  headers?: { [key: string]: string }
}

const addContentTypeHeader = (init?: MyOptionsType, contentType: string): MyOptionsType => {
  if (!init || !init.headers) {
    return { ...init, headers: { 'content-type': contentType } }
  }
  const headers: { [key: string]: string } = init.headers
  return {
    ...init,
    headers: {
      ...headers,
      'content-type': contentType
    }
  }
}

export const safeFetch = async (input: RequestInfo, init?: RequestOptions, contentType: string = 'application/json') => {
  const response = await fetch(input, addContentTypeHeader(init, contentType))
  if (!response.ok) {
    const text = await response.text()
    throw new ApiError(response.status, text)
  }
  return response
}
