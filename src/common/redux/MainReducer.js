// @flow

import type { Reducer } from 'redux'
import type { Action } from './actions'
import type { Game } from '../types/game'
import { without } from 'lodash'

export type MainState = {|
  games: Game[],
  playerName: string
|}

const initialMainState: MainState = {
  games: [],
  playerName: ''
}

const mainReducer: Reducer<MainState, Action> = (s = initialMainState, a) => {
  // noinspection JSRedundantSwitchStatement
  switch (a.type) {
    case 'ADD_GAME':
      return { ...s, games: [...s.games, a.game] }
    case 'REMOVE_GAME':
      return { ...s, games: without(s.games, a.game) }
    case 'SET_PLAYER_NAME':
      return { ...s, playerName: a.playerName }
    default:
      return s
  }
}
export default mainReducer
