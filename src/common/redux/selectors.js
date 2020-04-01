// @flow

import type { MainState } from './MainReducer'
import type { SecureState } from './SecureReducer'
import ApiToken from '../types/ApiToken'

export type RootStoreType = {
  main: MainState,
  secure: SecureState
}

export const getMainState = (store: RootStoreType) => store.main
export const getSecureState = (store: RootStoreType) => store.secure
export const getGames = (store: RootStoreType) => getMainState(store).games
export const getPlayerName = (store: RootStoreType) => getMainState(store).playerName
export const getApplicationUser = (store: RootStoreType) => getSecureState(store).user
export const getApiToken = (store: RootStoreType) => {
  const rawToken = getSecureState(store).token
  return rawToken ? new ApiToken(rawToken) : null
}
