// @flow

import React from 'react'
import { Fab, Icon } from 'native-base'
import type { NavigationScreenProp, NavigationState } from 'react-navigation'

type PropsType = {|
  navigation: NavigationScreenProp<NavigationState>
|}

export default class NewGameFab extends React.Component<PropsType> {
  onAddGamePress = () => this.props.navigation.navigate('AddGame')

  render () {
    return <Fab
      onPress={this.onAddGamePress}
      position='bottomRight'>
      <Icon ios='ios-add' android='md-add' />
    </Fab>
  }
}
