// @flow

import { BACKEND, safeFetch } from './api'
import type { Game, NewGame } from '../types/game'

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
}
