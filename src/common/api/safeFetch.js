// @flow

import ApiError from './apiError'

const CONTENT_TYPE_HEADER = 'content-type'
const CONTENT_TYPE_DEFAULT = 'application/json'

type MyOptionsType = {
  ...$Diff<RequestOptions, { headers?: HeadersInit }>,
  headers?: { [key: string]: string }
}

export const addHeader = (init?: MyOptionsType, headerName: string, headerValue: mixed): MyOptionsType => {
  if (!init || !init.headers) {
    return { ...init, headers: { [headerName]: headerValue } }
  }
  const headers: { [key: string]: string } = init.headers
  return {
    ...init,
    headers: {
      ...headers,
      [headerName]: headerValue
    }
  }
}

/**
 * Like fetch, but adds a 'content-type' header and throws an ApiError if the response has not the status code for 'OK'.
 * @param input mainly destination of the request
 * @param init further request configuration like additional headers, body, etc.
 * @param contentType value of the 'content-type' header
 * @returns {Promise<Response>} answer from the API
 */
export const safeFetch = async (input: RequestInfo, init?: RequestOptions, contentType: string = CONTENT_TYPE_DEFAULT) => {
  const response = await fetch(input, addHeader(init, CONTENT_TYPE_HEADER, contentType))
  if (!response.ok) {
    const responseText = await response.text()
    let responseJson
    try {
      responseJson = JSON.parse(responseText)
    } catch (err) {
      throw Error('API response was neither status OK nor in JSON format:\n' + responseText)
    }
    throw new ApiError(responseJson)
  }
  return response
}
