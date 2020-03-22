// @flow

import type { Reducer } from 'redux'
import type { Action } from './actions'

export type SecureState = {}

const initialSecureState: SecureState = {}

const secureReducer: Reducer<SecureState, Action> = (s = initialSecureState, a) => {
  // noinspection JSRedundantSwitchStatement
  switch (a.type) {
    default:
      return s
  }
}
export default secureReducer
