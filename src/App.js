// @flow

import React from 'react'
import { registerRootComponent } from 'expo'
import AppLoading from 'expo-app-loading'
import { persistor, store } from './common/redux/configureStore'
import type { Store } from 'redux'
import type { Persistor } from 'redux-persist/es/types'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import i18n from './common/localization/i18n'
import { NativeBaseProvider, extendTheme } from 'native-base'
import Navigation from './nav/Navigation'
import initPushNotifications from './common/functions/initPushNotifications'
import { toastifyError } from './common/funtions/errorHandling'
import UserApi from './common/api/paths/userApi'

type StateType = {
  setupDone: boolean,
  store?: Store<*, *, *>,
  persistor?: ?Persistor
}

// Set up localization

const theme = extendTheme({
  fontConfig: {
    Roboto: {
      100: {
        normal: "Roboto-Light",
        italic: "Roboto-LightItalic",
      },
      200: {
        normal: "Roboto-Light",
        italic: "Roboto-LightItalic",
      },
      300: {
        normal: "Roboto-Light",
        italic: "Roboto-LightItalic",
      },
      400: {
        normal: "Roboto-Regular",
        italic: "Roboto-Italic",
      },
      500: {
        normal: "Roboto-Medium",
      },
      600: {
        normal: "Roboto-Medium",
        italic: "Roboto-MediumItalic",
      },
      // Add more variants
      //   700: {
      //     normal: 'Roboto-Bold',
      //   },
      //   800: {
      //     normal: 'Roboto-Bold',
      //     italic: 'Roboto-BoldItalic',
      //   },
      //   900: {
      //     normal: 'Roboto-Bold',
      //     italic: 'Roboto-BoldItalic',
      //   },
    },
  },

  // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    heading: "Roboto",
    body: "Roboto",
    mono: "Roboto",
  },
});

class App extends React.Component<{}, StateType> {
  state = {
    setupDone: false
  }

  async componentDidMount () {
    // init redux
    this.setState({ store, persistor })
  }

  async setupAsync () {
    // register for push notifications and update locale on server
    await initPushNotifications()
    UserApi.setLocale(i18n.locale).catch(toastifyError)
  }

  render () {
    const { setupDone, persistor, store } = this.state
    if (!setupDone || !persistor || !store) {
      return <AppLoading startAsync={this.setupAsync} onFinish={() => this.setState({setupDone: true})} onError={console.warn} />
    }
    return <NativeBaseProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={<AppLoading/>} persistor={persistor}>
          <Navigation/>
        </PersistGate>
      </Provider>
    </NativeBaseProvider>
  }
}

export default registerRootComponent(App)
