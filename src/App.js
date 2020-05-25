// @flow

import React from 'react'
import { AppLoading, registerRootComponent } from 'expo'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons'
import { persistor, store } from './common/redux/configureStore'
import type { Store } from 'redux'
import type { Persistor } from 'redux-persist/es/types'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import i18n from 'i18n-js'
import translations from './common/localization/translations'
import * as Localization from 'expo-localization'
import { Root } from 'native-base'
import Navigation from './nav/Navigation'
import initPushNotifications from './common/functions/initPushNotifications'
import { toastifyError } from './common/funtions/errorHandling'
import UserApi from './common/api/paths/userApi'

type StateType = {
  fontsReady: boolean,
  store?: Store<*, *, *>,
  persistor?: ?Persistor
}

// Set up localization
i18n.translations = translations
i18n.locale = Localization.locale
i18n.fallbacks = true

class App extends React.Component<{}, StateType> {
  constructor (props) {
    super(props)
    this.state = {
      fontsReady: false
    }
  }

  async componentDidMount () {
    // init redux
    this.setState({ store, persistor })

    // register for push notifications and update locale on server
    initPushNotifications()
    UserApi.setLocale(i18n.currentLocale()).catch(toastifyError)

    // preload fonts
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
    return <Root>
      <Provider store={store}>
        <PersistGate loading={<AppLoading/>} persistor={persistor}>
          <Navigation/>
        </PersistGate>
      </Provider>
    </Root>
  }
}

export default registerRootComponent(App)
