// @flow

export type NewGamePreferences = {
  dailyReassignment: boolean,
  noAttestors: boolean
}

export type GamePreferences = {
  ...NewGamePreferences,
  id: number
}
