// @flow

import React from 'react'
import { AppLoading, registerRootComponent } from 'expo'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons'
import Navigation from './nav/Navigation'

class App extends React.Component<{}, { isReady: boolean }> {
  constructor (props) {
    super(props)
    this.state = {
      isReady: false
    }
  }

  async componentDidMount () {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font
    })
    this.setState({ isReady: true })
  }

  render () {
    if (!this.state.isReady) {
      return <AppLoading />
    }

    return <Navigation/>
  }
}

export default registerRootComponent(App)
