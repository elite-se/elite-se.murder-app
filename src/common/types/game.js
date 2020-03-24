// @flow

import type { GamePreferences, NewGamePreferences } from './gamePreferences'
import type { Player } from './player'

export type NewGame = {|
    title: string,
    preferences: NewGamePreferences
|}

export type Game = {|
    id: number,
    gameCode: string,
    deleted: boolean,
    owner: Player,
    ...NewGame,
    preferences: GamePreferences
|}
