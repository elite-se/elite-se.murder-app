// @flow

import type { Reducer } from 'redux'
import type { Action } from './actions'

export type SecureState = {|
  helloWorld: string
|}

const secureReducer: Reducer<SecureState, Action> = (s = { helloWorld: 'Hello secure world!' }, a) => {
  // noinspection JSRedundantSwitchStatement
  switch (a.type) {
    case 'SET_PRIVATE_HELLO_WORLD':
      return { ...s, helloWorld: a.helloWorld }
    default:
      return s
  }
}
export default secureReducer
