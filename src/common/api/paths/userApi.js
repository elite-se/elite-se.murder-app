// @flow

import { AUTH_HEADER, BACKEND } from '../api'
import type { ApplicationUser } from '../../types/ApplicationUser'
import ApiToken from '../../types/ApiToken'
import { safeFetch } from '../safeFetch'

const authBackend = `${BACKEND}/user`

export default class UserApi {
  static signUp (user: ApplicationUser): Promise<Response> {
    return safeFetch(`${authBackend}/sign-up`, {
      method: 'POST',
      body: JSON.stringify(user)
    })
  }

  static login (user: ApplicationUser): Promise<ApiToken> {
    return safeFetch(`${authBackend}/login`, {
      method: 'POST',
      body: JSON.stringify(user)
    })
      .then(response => {
        const header = response.headers.get(AUTH_HEADER)
        if (!header) { throw Error('login succeeded but still did not receive token') }
        return header
      })
      .then(header => new ApiToken(header))
  }
}
