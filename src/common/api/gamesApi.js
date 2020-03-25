// @flow

import { BACKEND, safeFetch } from './api'
import type { Game, NewGame } from '../types/game'
import type { NewPlayer, Player } from '../types/player'

const gamesBackend = `${BACKEND}/games`

export default class GamesApi {
  static getGame (id: number): Promise<Game> {
    return safeFetch(`${gamesBackend}/${id}`).then(response => response.json())
  }

  static createGame (game: NewGame): Promise<Game> {
    return safeFetch(`${gamesBackend}`, {
      method: 'POST',
      body: JSON.stringify(game)
    }).then(response => response.json())
  }

  static joinGame (gameId: number, player: NewPlayer): Promise<Player> {
    return safeFetch(`${gamesBackend}/${gameId}/players`, {
      method: 'POST',
      body: JSON.stringify(player)
    }).then(response => response.json())
  }
}
