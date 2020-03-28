// @flow

import type { NewWeapon, Weapon } from './weapon'

export type NewGamePreferences = {|
  dailyReassignment: boolean,
  noAttestors: boolean,
  furtherRules: string,
  allowedWeapons: NewWeapon[]
|}

export type GamePreferences = {|
  ...NewGamePreferences,
  id: number,
  allowedWeapons: Weapon[],
  allWeaponsAllowed: boolean
|}
