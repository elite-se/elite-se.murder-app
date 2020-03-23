// @flow

import { BACKEND, safeFetch } from './api'
import type { Game } from '../types/game'

const gamesBackend = `${BACKEND}/games`

export default class GamesApi {
  static getGame (id: number): Promise<Game> {
    return safeFetch(`${gamesBackend}/${id}`).then(response => response.json())
  }
}
