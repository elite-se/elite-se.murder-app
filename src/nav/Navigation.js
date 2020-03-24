// @flow

import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AddGameScreen from './addgame/components/AddGameScreen'
import { createStackNavigator } from '@react-navigation/stack'
import { Body, Button, Header, Icon, Left, Right, Title } from 'native-base'
import type { NavigationScreenProp, NavigationState } from 'react-navigation'
import { Alert } from 'react-native'
import GamesOverview from './games/components/GamesOverview'

const Stack = createStackNavigator()

export default class Navigation extends React.Component<{}> {
  onMorePress = () => Alert.alert('Credits', 'Icon made by mavadee from www.flaticon.com')

  buildHeader = ({ scene, previous, navigation }: {scene: any, previous: boolean, navigation: NavigationScreenProp<NavigationState>}) => {
    const { options } = scene.descriptor
    const title =
      options.headerTitle !== undefined
        ? options.headerTitle
        : options.title !== undefined
          ? options.title
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

  render () {
    return <NavigationContainer>
      <Stack.Navigator screenOptions={{
        header: this.buildHeader
      }}>
        <Stack.Screen name='Games' component={GamesOverview} />
        <Stack.Screen name='AddGame' component={AddGameScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  }
}
