// @flow

import type { Game, GameState } from '../../types/game'

type ApiGame = {|
  ...$Diff<Game, { state: GameState }>,
  gameStatus: GameState
|}

export const gameFromApi: ApiGame => Game = game => {
  const { gameStatus, ...gameWithoutStatus } = game
  return { ...gameWithoutStatus, state: gameStatus }
}
