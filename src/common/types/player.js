// @flow

export const MIN_PLAYER_NAME_LENGTH = 3

export type NewPlayer = {|
  playerName: string
|}

export type Player = {|
  ...NewPlayer,
  id: number
|}
