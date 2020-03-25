// @flow

export type NewPlayer = {|
  playerName: string
|}

export type Player = {|
  ...NewPlayer,
  id: number
|}
