// @flow

export const MIN_WEAPON_NAME_LENGTH = 1

export type NewWeapon = {|
  weaponName: string
|}

export type Weapon = {|
  ...NewWeapon,
  id: number
|}
