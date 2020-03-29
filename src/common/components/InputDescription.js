// @flow

import React from 'react'
import { StyleSheet } from 'react-native'
import { NativeBase, Text } from 'native-base'

export class InputDescription extends React.Component<NativeBase.Text, any> {
  render () {
    return <Text style={styles.hint} {...this.props}/>
  }
}

const styles = StyleSheet.create({
  hint: {
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 5,
    marginBottom: 25,
    fontSize: 12
  }
})
