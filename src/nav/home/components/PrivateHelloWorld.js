// @flow

import React from 'react'
import { connect } from 'react-redux'
import { setPrivateHelloWorld } from '../../../common/redux/actions'
import { Form, Input, Item } from 'native-base'
import type { Action } from 'redux'
import { getPrivateHelloWorld } from '../../../common/redux/selectors'

type PropsType = {|
  setPrivateHelloWorld: Action<string>,
  helloWorldText: string
|}

class PublicHelloWorld extends React.Component<PropsType> {
  render () {
    return <Form>
      <Item>
        <Input placeholder='Securely stored' onChangeText={this.props.setPrivateHelloWorld} value={this.props.helloWorldText} />
      </Item>
    </Form>
  }
}

export default connect<*, *, *, *, *, *>(
  state => ({ helloWorldText: getPrivateHelloWorld(state) }),
  { setPrivateHelloWorld })(
  PublicHelloWorld
)
