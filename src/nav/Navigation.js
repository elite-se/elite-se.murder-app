// @flow

import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Button } from 'react-native'
import HomeScreen from './home/components/HomeScreen'

const Stack = createStackNavigator()

export default class Navigation extends React.Component<{}> {
  // eslint-disable-next-line no-undef
  createInfoButton = () => (<Button onPress={() => alert('Icon made by mavadee from www.flaticon.com')} title="Info"/>)

  render () {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen}
            options={{
              headerRight: this.createInfoButton
            }}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
  };
}
