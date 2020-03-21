// @flow

import type { Reducer } from 'redux'
import type { Action } from './actions'

export type MainState = {}

const mainReducer: Reducer<MainState, Action> = (s = {}) => s
export default mainReducer
