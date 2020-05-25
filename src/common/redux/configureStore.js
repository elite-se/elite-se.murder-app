// @flow

import createSecureStore from 'redux-persist-expo-securestore'
import type { Reducer, Store } from 'redux'
import { combineReducers, createStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import { AsyncStorage } from 'react-native'
import type { MainState } from './MainReducer'
import MainReducer from './MainReducer'
import type { SecureState } from './SecureReducer'
import SecureReducer from './SecureReducer'
import type { RootStoreType } from './selectors'

const secureStorage = createSecureStore()
const securePersistConfig = {
  key: 'secure',
  storage: secureStorage
}

const mainPersistConfig = {
  key: 'main',
  storage: AsyncStorage
}

const rootReducer: Reducer<RootStoreType, *> = combineReducers({
  main: (persistReducer<any, *>(mainPersistConfig, MainReducer): Reducer<MainState, *>),
  secure: (persistReducer<any, *>(securePersistConfig, SecureReducer): Reducer<SecureState, *>)
})

function configureStore () {
  const store: Store<RootStoreType, *, *> = createStore<RootStoreType, *, *>(rootReducer)
  const persistor = persistStore(store)
  return { store, persistor }
}

export const { store, persistor } = configureStore()
export default store
