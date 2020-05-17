// @flow

import type { Game } from '../types/game'
import ApiToken from '../types/ApiToken'
import type { ApplicationUser } from '../types/ApplicationUser'

export type AddGameAction = {
  type: 'ADD_OR_REPLACE_GAME',
  game: Game
}

export type RemoveGameAction = {
  type: 'REMOVE_GAME',
  game: Game
}

export type SetPlayernameAction = {
  type: 'SET_PLAYER_NAME',
  playerName: string
}

export type SetTokenAction = {
  type: 'SET_TOKEN',
  token: ApiToken
}

export type SetApplicationUserAction = {
  type: 'SET_USER',
  user: ApplicationUser
}

export type Action = AddGameAction | RemoveGameAction

export function addOrReplaceGame (game: Game): AddGameAction {
  return { type: 'ADD_OR_REPLACE_GAME', game }
}

export function removeGame (game: Game): RemoveGameAction {
  return { type: 'REMOVE_GAME', game }
}

export function setPlayerName (playerName: string): SetPlayernameAction {
  return { type: 'SET_PLAYER_NAME', playerName }
}

export function setToken (token: ApiToken): SetTokenAction {
  return { type: 'SET_TOKEN', token }
}

export function setApplicationUser (user: ApplicationUser): SetApplicationUserAction {
  return { type: 'SET_USER', user }
}
