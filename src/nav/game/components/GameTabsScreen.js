// @flow

import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Button, Footer, FooterTab, Icon, Text } from 'native-base'
import type { NavigationScreenProp, NavigationState } from 'react-navigation'
import i18n from 'i18n-js'
import type { Game } from '../../../common/types/game'
import GameParticipantsScreen from './participants/GameParticipantsScreen'

const Tab = createBottomTabNavigator()

type PropsType = {|
  game: Game
|}

export default class GameTabsScreen extends React.Component<PropsType> {
  buildTabBar = ({ state, descriptors, navigation }: {state: any, descriptors: any, navigation: NavigationScreenProp<NavigationState>}) => {
    return (
      <Footer>
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
            const onPress = () => navigation.navigate(route.name)

            return <Button
              key={index}
              vertical
              active={isFocused}
              onPress={onPress}>
              {options.icon}
              <Text>{label}</Text>
            </Button>
          })}
        </FooterTab>
      </Footer>
    )
  }

  render () {
    return <Tab.Navigator tabBar={this.buildTabBar}>
      <Tab.Screen name="Game.Participants" component={GameParticipantsScreen} options={{
        title: i18n.t('game.participants.title'),
        icon: <Icon android='md-people' ios='ios-people'/>
      }} />
    </Tab.Navigator>
  }
}
