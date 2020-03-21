// @flow

import type { Reducer } from 'redux'
import type { Action } from './actions'

export type MainState = {|
  helloWorld: string
|}

const mainReducer: Reducer<MainState, Action> = (s = { helloWorld: 'Hello unsecure world!' }, a) => {
  // noinspection JSRedundantSwitchStatement
  switch (a.type) {
    case 'SET_PUBLIC_HELLO_WORLD':
      return { ...s, helloWorld: a.helloWorld }
    default:
      return s
  }
}
export default mainReducer
