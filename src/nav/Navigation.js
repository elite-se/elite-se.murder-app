// @flow

import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AddGameScreen from './addgame/components/AddGameScreen'
import { createStackNavigator } from '@react-navigation/stack'
import type { NavigationScreenProp, NavigationState } from 'react-navigation'
import GamesOverview from './games/components/GamesOverview'
import i18n from 'i18n-js'
import ScreenHeader from '../common/components/ScreenHeader'

const Stack = createStackNavigator()

export default class Navigation extends React.Component<{}> {
  buildHeader = ({ scene, previous, navigation }: {scene: any, previous: boolean, navigation: NavigationScreenProp<NavigationState>}) => {
    const { options } = scene.descriptor
    const title =
      options.headerTitle !== undefined
        ? options.headerTitle
        : options.title !== undefined
          ? options.title
          : scene.route.name
    return <ScreenHeader title={title} previous={previous} navigation={navigation}/>
  }

  render () {
    return <NavigationContainer>
      <Stack.Navigator screenOptions={{
        header: this.buildHeader
      }}>
        <Stack.Screen name='Games' component={GamesOverview} options={{ title: i18n.t('games.title') }} />
        <Stack.Screen name='AddGame' component={AddGameScreen} options={{ title: i18n.t('addGame.title') }}/>
        <Stack.Screen name='About' component={AddGameScreen} options={{ title: i18n.t('about.title') }}/>
      </Stack.Navigator>
    </NavigationContainer>
  }
}
