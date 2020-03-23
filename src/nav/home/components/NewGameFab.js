// @flow

import React from 'react'
import { Fab, Icon } from 'native-base'
import { Alert } from 'react-native'

export default class NewGameFab extends React.Component<{}> {
  onAddGamePress = () => Alert.alert('TODO: add view for adding games')

  render () {
    return <Fab
      onPress={this.onAddGamePress}
      position='bottomRight'>
      <Icon ios='ios-add' android='md-add' />
    </Fab>
  }
}
