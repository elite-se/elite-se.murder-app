// @flow

import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Button, Footer, FooterTab, Icon, Text } from 'native-base'
import type { NavigationScreenProp, NavigationState, NavigationStateRoute } from 'react-navigation'
import i18n from 'i18n-js'
import GameParticipantsScreen from './GameParticipantsScreen'
import GamePreferencesScreen from './GamePreferencesScreen'

const Tab = createBottomTabNavigator()

type PropsType = {
  route: NavigationStateRoute
}

export default class GameTabsScreen extends React.Component<PropsType> {
  getGame = () => this.props.route.params?.game
  onPress = (navigation: NavigationScreenProp<NavigationState>, route: any) => () => navigation.navigate(route.name)

  buildTabBar = ({ state, descriptors, navigation }: {state: any, descriptors: any, navigation: NavigationScreenProp<NavigationState>}) => {
    return <Footer>
      <FooterTab>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key]
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name
          const isFocused = state.index === index

          return <Button
            key={index}
            vertical
            active={isFocused}
            onPress={this.onPress(navigation, route)}>
            {options.icon}
            <Text>{label}</Text>
          </Button>
        })}
      </FooterTab>
    </Footer>
  }

  addGameProp = <Props>(Component: React.AbstractComponent<Props>) => (props: Props) => <Component {...props} game={this.getGame()}/>

  render () {
    return <Tab.Navigator tabBar={this.buildTabBar} backBehavior='none'>
      <Tab.Screen name="Game.Participants" component={this.addGameProp(GameParticipantsScreen)} options={{
        title: i18n.t('game.participants.title'),
        icon: <Icon android='md-people' ios='ios-people'/>
      }}/>
      <Tab.Screen name="Game.Prefs" component={this.addGameProp(GamePreferencesScreen)} options={{
        title: i18n.t('game.preferences.title'),
        icon: <Icon android='md-settings' ios='ios-settings'/>
      }}/>
    </Tab.Navigator>
  }
}
