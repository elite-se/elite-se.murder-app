// @flow

import React from 'react'
import { AppLoading, registerRootComponent } from 'expo'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons'
import HomeScreen from './nav/home/components/HomeScreen'
import configureStore from './common/redux/configureStore'
import type { Store } from 'redux'
import type { Persistor } from 'redux-persist/es/types'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'

type StateType = {
  fontsReady: boolean,
  store?: Store<*, *, *>,
  persistor?: ?Persistor
}

class App extends React.Component<{}, StateType> {
  constructor (props) {
    super(props)
    this.state = {
      fontsReady: false
    }
  }

  async componentDidMount () {
    const { store, persistor } = configureStore()
    this.setState({ store, persistor })
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font
    })
    this.setState({ fontsReady: true })
  }

  render () {
    const { fontsReady, persistor, store } = this.state
    if (!fontsReady || !persistor || !store) {
      return <AppLoading />
    }
    return <Provider store={store}>
      <PersistGate loading={<AppLoading/>} persistor={persistor}>
        <HomeScreen/>
      </PersistGate>
    </Provider>
  }
}

export default registerRootComponent(App)
