// @flow

import type { Reducer } from 'redux'
import type { Action } from './actions'

export type SecureState = {}

const secureReducer: Reducer<SecureState, Action> = (s = {}) => s
export default secureReducer
