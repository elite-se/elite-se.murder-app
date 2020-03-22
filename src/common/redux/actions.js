// @flow

import type { Game } from '../types/game'

export type AddGameAction = {
  type: 'ADD_GAME',
  game: Game
}

export type ReplaceGamesAction = {
  type: 'REPLACE_GAMES',
  games: Game[]
}

export type Action = AddGameAction | ReplaceGamesAction

export function addGame (game: Game): AddGameAction {
  return { type: 'ADD_GAME', game }
}

export function replaceGames (games: Game[]): ReplaceGamesAction {
  return { type: 'REPLACE_GAMES', games }
}
