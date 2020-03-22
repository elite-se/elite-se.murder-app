// @flow

import type { Reducer } from 'redux'
import type { Action } from './actions'
import type { Game } from '../types/game'

export type MainState = {|
  games: Game[]
|}

const initialMainState: MainState = {
  games: []
}

const mainReducer: Reducer<MainState, Action> = (s = initialMainState, a) => {
  // noinspection JSRedundantSwitchStatement
  switch (a.type) {
    case 'ADD_GAME':
      return { ...s, games: [...s.games, a.game] }
    case 'REPLACE_GAMES':
      return { ...s, games: a.games }
    default:
      return s
  }
}
export default mainReducer
