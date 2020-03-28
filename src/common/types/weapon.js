// @flow

export type NewWeapon = {|
  weaponName: string
|}

export type Weapon = {|
  ...NewWeapon,
  id: number
|}
