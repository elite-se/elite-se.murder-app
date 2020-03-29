// @flow

import type { GamePreferences, NewGamePreferences } from './gamePreferences'
import type { NewPlayer, Player } from './player'

export const GAME_CODE_LENGTH = 6
export const MIN_GAME_TITLE_LENGTH = 3

export type NewGame = {|
    title: string,
    preferences: NewGamePreferences,
    owner: NewPlayer
|}

export type Game = {|
    id: number,
    gameCode: string,
    deleted: boolean,
    owner: Player,
    ...NewGame,
    preferences: GamePreferences,
    owner: Player,
    players: Player[]
|}
