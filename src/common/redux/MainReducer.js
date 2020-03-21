// @flow

import type { Reducer } from 'redux'
import type { Action } from './actions'

export type MainState = {}

const mainReducer: Reducer<MainState, Action> = (s = {}, a) => {
  // noinspection JSRedundantSwitchStatement
  switch (a.type) {
    case 'SET_PUBLIC_HELLO_WORLD':
      return { ...s, helloWorld: a.helloWorld }
    default:
      return s
  }
}
export default mainReducer
