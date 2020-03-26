// @flow

import React from 'react'
import { Button, NativeBase, Spinner } from 'native-base'

type PropsType = {|
  ...NativeBase.Button,
  waiting: boolean
|}

export default class SpinnerButton extends React.Component<PropsType> {
  render () {
    return <Button {...this.props} disabled={this.props.disabled || this.props.waiting}>
      { this.props.waiting ? <Spinner color='#202020' /> : this.props.children }
    </Button>
  }
}
