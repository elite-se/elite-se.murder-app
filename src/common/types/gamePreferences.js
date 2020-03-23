// @flow

export type NewGamePreferences = {
  dailyReassignment: boolean,
  noAttestors: boolean
}

export type GamePreferences = {
  id: number,
  ...NewGamePreferences
}
