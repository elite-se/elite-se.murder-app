// @flow

import * as Random from 'expo-random'
import type { ApplicationUser } from '../types/ApplicationUser'
import Constants from 'expo-constants'
import AuthApi from './paths/authApi'
import { getApiToken, getApplicationUser } from '../redux/selectors'
import store from '../redux/configureStore'
import { setApplicationUser, setToken } from '../redux/actions'
import { addHeader, safeFetch } from './safeFetch'
import { AUTH_HEADER } from './api'

const TOKEN_REFRESH_GAP_MS = 1000 * 60 // 1min
const PASSWORD_LENGTH = 30

const generatePassword = async () => Random.getRandomBytesAsync(PASSWORD_LENGTH).then(ints => new TextDecoder('utf-8').decode(ints))

const createNewAccount = async () => {
  const user: ApplicationUser = {
    deviceId: Constants.installationId,
    password: await generatePassword()
  }
  return AuthApi.signUp(user).then(() => user)
}

const fetchNewToken = async () => {
  let user = getApplicationUser(store.getState())
  if (!user) {
    user = await createNewAccount()
    store.dispatch(setApplicationUser(user))
  }
  return await AuthApi.login(user)
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
