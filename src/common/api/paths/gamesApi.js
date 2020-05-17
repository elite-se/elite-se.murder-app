// @flow

import { BACKEND } from '../api'
import type { Game, NewGame } from '../../types/game'
import type { NewPlayer, Player } from '../../types/player'
import { gameFromApi } from '../translators/gameTranslator'
import authFetch from '../authFetch'

const gamesBackend = `${BACKEND}/games`

export default class GamesApi {
  static getGame (id: number): Promise<Game> {
    return authFetch(`${gamesBackend}/${id}`).then(response => response.json()).then(json => gameFromApi(json))
  }

  static getGameByCode (gameCode: string): Promise<Game> {
    return authFetch(`${gamesBackend}/${gameCode}`).then(response => response.json()).then(json => gameFromApi(json))
  }

  static createGame (game: NewGame): Promise<Game> {
    return authFetch(`${gamesBackend}`, {
      method: 'POST',
      body: JSON.stringify(game)
    }).then(response => response.json()).then(json => gameFromApi(json))
  }

  static joinGame (gameId: number, player: NewPlayer): Promise<Player> {
    return authFetch(`${gamesBackend}/${gameId}/players`, {
      method: 'POST',
      body: JSON.stringify(player)
    }).then(response => response.json())
  }
}
