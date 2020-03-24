// @flow

import type { Game } from '../types/game'

export type AddGameAction = {
  type: 'ADD_GAME',
  game: Game
}

export type RemoveGameAction = {
  type: 'REMOVE_GAME',
  game: Game
}

export type Action = AddGameAction | RemoveGameAction

export function addGame (game: Game): AddGameAction {
  return { type: 'ADD_GAME', game }
}

export function removeGame (game: Game): RemoveGameAction {
  return { type: 'REMOVE_GAME', game }
}
