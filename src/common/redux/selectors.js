// @flow

import type { MainState } from './MainReducer'
import type { SecureState } from './SecureReducer'

export type RootStoreType = {|
  main: MainState,
  secure: SecureState
|}

export const getMainState = (store: RootStoreType) => store.main
export const getSecureState = (store: RootStoreType) => store.secure
export const getPublicHelloWorld = (store: RootStoreType) => getMainState(store).helloWorld
export const getPrivateHelloWorld = (store: RootStoreType) => getSecureState(store).helloWorld
