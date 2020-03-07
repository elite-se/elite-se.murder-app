// @flow

import React from 'react'
import { registerRootComponent } from 'expo'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './nav/home/components/HomeScreen'
import { Button } from 'react-native'

const Stack = createStackNavigator()

class App extends React.Component<{}> {
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

export default registerRootComponent(App)
