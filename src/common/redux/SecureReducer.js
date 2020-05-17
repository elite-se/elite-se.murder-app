// @flow

import type { Reducer } from 'redux'
import type { Action } from './actions'
import type { ApplicationUser } from '../types/ApplicationUser'
import ApiToken from '../types/ApiToken'

export type SecureState = {
  user: ?ApplicationUser,
  token: ?string
}

const initialSecureState: SecureState = {
  user: null,
  token: null
}

const secureReducer: Reducer<SecureState, Action> = (s = initialSecureState, a) => {
  switch (a.type) {
    case 'SET_TOKEN':
      return { ...s, token: (a.token: ApiToken).rawToken }
    case 'SET_USER':
      return { ...s, user: a.user }
    default:
      return s
  }
}
export default secureReducer
