// @flow

import { BACKEND, safeFetch } from './api'
import type { Game } from '../types/game'

const gamesBackend = `${BACKEND}/games`

export default class GamesApi {
  static getGames (): Promise<Game[]> {
    return safeFetch(gamesBackend).then(response => response.json())
  }
}
