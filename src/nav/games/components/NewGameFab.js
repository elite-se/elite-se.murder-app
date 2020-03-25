// @flow

import React from 'react'
import { Button, Fab, Icon } from 'native-base'
import type { NavigationScreenProp, NavigationState } from 'react-navigation'

type PropsType = {|
  navigation: NavigationScreenProp<NavigationState>
|}

type StateType = {|
  active: boolean
|}

export default class NewGameFab extends React.Component<PropsType, StateType> {
  state = { active: false }

  onFabPress = () => this.setState(oldState => ({ active: !oldState.active }))
  onAddGamePress = () => this.props.navigation.navigate('AddGame')
  onJoinGamePress = () => this.props.navigation.navigate('JoinGame')

  render () {
    const { active } = this.state
    return <Fab
      active={active}
      onPress={this.onFabPress}
      position='bottomRight'>
      <Icon ios='ios-add' android='md-add' />
      <Button onPress={this.onJoinGamePress}>
        <Icon ios='ios-person-add' android='md-person-add'/>
      </Button>
      <Button onPress={this.onAddGamePress}>
        <Icon ios='ios-create' android='md-create'/>
      </Button>
    </Fab>
  }
}
