// @flow

import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AddGameScreen from './addgame/components/AddGameScreen'
import { createStackNavigator, Scene } from '@react-navigation/stack'
import { Body, Button, Header, Icon, Left, Right, Title } from 'native-base'
import type { NavigationScreenProp, NavigationState, NavigationStateRoute } from 'react-navigation'
import { Alert } from 'react-native'
import GamesOverview from './games/components/GamesOverview'
import i18n from 'i18n-js'
import JoinGameScreen from './joingame/components/JoinGameScreen'
import GameTabsScreen from './game/components/GameTabsScreen'
import WeaponListScreen from './gameprefs/WeaponListScreen'

const Stack = createStackNavigator()

export default class Navigation extends React.Component<{}> {
  onMorePress = () => Alert.alert(i18n.t('credits.title'), i18n.t('credits.content'))

  buildHeader = ({ scene, previous, navigation }: {scene: Scene, previous: boolean, navigation: NavigationScreenProp<NavigationState>}) => {
    const { options } = scene.descriptor
    const title =
      options.headerTitle !== undefined
        ? options.headerTitle
        : options.title !== undefined
          ? options.title
          : options.titleRetriever !== undefined
            ? options.titleRetriever(scene)
            : scene.route.name

    return (
      <Header>
        {previous && <Left>
          <Button transparent onPress={navigation.goBack}>
            <Icon name="arrow-back" />
          </Button>
        </Left>}
        <Body>
          <Title>{title}</Title>
        </Body>
        <Right>
          <Button
            transparent
            onPress={this.onMorePress}>
            <Icon ios='ios-more' android='md-more'/>
          </Button>
        </Right>
      </Header>
    )
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
        <Stack.Screen name='Game' component={GameTabsScreen} options={{ titleRetriever: (scene: Scene) => scene.route.params.game.title }}/>
        <Stack.Screen name='WeaponList' component={this.enrichWithPropsFromParams(WeaponListScreen)}
          options={{ title: i18n.t('gamePreferences.weapons') }}/>
      </Stack.Navigator>
    </NavigationContainer>
  }
}
