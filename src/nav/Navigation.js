// @flow

import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AddGameScreen from './addgame/components/AddGameScreen'
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack'
import type { NavigationScreenProp, NavigationState, NavigationStateRoute } from 'react-navigation'
import GamesOverview from './games/components/GamesOverview'
import JoinGameScreen from './joingame/components/JoinGameScreen'
import GameTabsScreen from './game/components/GameTabsScreen'
import WeaponListScreen from './gameprefs/WeaponListScreen'
import ScreenHeader from '../common/components/ScreenHeader'
import AboutScreen from './about/components/AboutScreen'
import i18n from '../common/localization/i18n'

const Stack = createStackNavigator()

export default class Navigation extends React.Component<{}> {
  buildHeader = ({ options, previous, navigation }: {options: StackNavigationOptions, previous: boolean, navigation: NavigationScreenProp<NavigationState>}) => {
    const title =
      options.headerTitle !== undefined
        ? options.headerTitle
        : options.title !== undefined
          ? options.title
          : options.titleRetriever !== undefined
            ? options.titleRetriever(navigation.route.params)
            : navigation.route.name
    return <ScreenHeader title={title} previous={previous} navigation={navigation}/>
  }

  enrichWithPropsFromParams = <Props: {| route: NavigationStateRoute, navigation: NavigationScreenProp<NavigationState> |}>(Component: React.AbstractComponent<Props>) =>
    (props: Props) => React.createElement(Component, ({ ...(props?.route?.params || {}), ...props }: any))

  render () {
    return <NavigationContainer>
      <Stack.Navigator screenOptions={{
        header: this.buildHeader
      }}>
        <Stack.Screen name='Games' component={GamesOverview} options={{ title: i18n.t('games.title') }} />
        <Stack.Screen name='AddGame' component={AddGameScreen} options={{ title: i18n.t('addGame.title') }}/>
        <Stack.Screen name='JoinGame' component={JoinGameScreen} options={{ title: i18n.t('joinGame.title') }}/>
        <Stack.Screen name='About' component={AboutScreen} options={{ title: i18n.t('about.title') }}/>
        <Stack.Screen name='Game' component={GameTabsScreen} options={{ titleRetriever: (routeParams) => routeParams.game.title }}/>
        <Stack.Screen name='WeaponList' component={this.enrichWithPropsFromParams(WeaponListScreen)}
          options={{ title: i18n.t('gamePreferences.weapons') }}/>
      </Stack.Navigator>
    </NavigationContainer>
  }
}
