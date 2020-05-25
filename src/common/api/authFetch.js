// @flow

import * as Random from 'expo-random'
import Constants from 'expo-constants'
import { getApiToken, getApplicationUser } from '../redux/selectors'
import store from '../redux/configureStore'
import { setApplicationUser, setToken } from '../redux/actions'
import { addHeader, safeFetch } from './safeFetch'
import { AUTH_HEADER } from './api'
import ApiError from './apiError'
import AuthApi from './paths/authApi'

const TOKEN_REFRESH_GAP_MS = 1000 * 60 // 1min
const PASSWORD_LENGTH = 30

const generatePassword = async () => Random.getRandomBytesAsync(PASSWORD_LENGTH).then(ints => new TextDecoder('utf-8').decode(ints))

const createNewUser = async () => {
  return {
    deviceId: Constants.installationId,
    password: await generatePassword()
  }
}

const fetchNewToken = async () => {
  let user = getApplicationUser(store.getState())
  if (!user) {
    user = await createNewUser()
    await AuthApi.signUp(user)
    store.dispatch(setApplicationUser(user))
  }

  // sign up stored user again if server forgot us
  const userConst = user
  const handleUserIsUnknown = async () => {
    await AuthApi.signUp(userConst)
    return AuthApi.login(userConst)
  }

  return AuthApi.login(user)
    .catch(ApiError.handle(new Map([[403, handleUserIsUnknown]])))
}

const getAuthToken = async () => {
  let token = getApiToken(store.getState())
  if (!token || token.getExpiry() < new Date(Date.now() + TOKEN_REFRESH_GAP_MS)) {
    token = await fetchNewToken()
    store.dispatch(setToken(token))
  }
  return token
}

/**
 * Like safeFetch, but ensures that the request is authenticated, if necessary by creating a new account or refreshing the API token.
 * @param input mainly destination of the request
 * @param init further request configuration like additional headers, body, etc.
 * @param contentType value of the 'content-type' header
 * @returns {Promise<Response>}
 */
export const fetchAuthenticated = async (input: RequestInfo, init?: RequestOptions, contentType?: string) => {
  return safeFetch(input, addHeader(init, AUTH_HEADER, (await getAuthToken()).rawToken), contentType)
}

export default fetchAuthenticated
