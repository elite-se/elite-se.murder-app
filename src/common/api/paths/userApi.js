// @flow

import { BACKEND } from '../api'
import authFetch from '../authFetch'

const userBackend = `${BACKEND}/user`

export default class UserApi {
  static setPushToken (token: string): Promise<Response> {
    return authFetch(`${userBackend}/push-token`, {
      method: 'PUT',
      body: token
    }, 'text/plain')
  }
}
