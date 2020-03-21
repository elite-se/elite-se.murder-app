// @flow

import createSecureStore from 'redux-persist-expo-securestore'
import { combineReducers, createStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import AsyncStorage from 'redux-persist/lib/storage'
import MainReducer from './MainReducer'
import SecureReducer from './SecureReducer'

const secureStorage = createSecureStore()
const securePersistConfig = {
  key: 'secure',
  storage: secureStorage
}

const mainPersistConfig = {
  key: 'main',
  storage: AsyncStorage
}

const rootReducer = combineReducers({
  main: persistReducer(mainPersistConfig, MainReducer),
  secure: persistReducer(securePersistConfig, SecureReducer)
})

export default function configureStore () {
  const store = createStore<*, *, *>(rootReducer)
  const persistor = persistStore(store)
  return { store, persistor }
}
