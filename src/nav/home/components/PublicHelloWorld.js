// @flow

import React from 'react'
import { connect } from 'react-redux'
import { setPublicHelloWorld } from '../../../common/redux/actions'
import { Form, Input, Item } from 'native-base'
import type { Action } from 'redux'
import { getPublicHelloWorld } from '../../../common/redux/selectors'

type PropsType = {|
  setPublicHelloWorld: Action<string>,
  helloWorldText: string
|}

class PublicHelloWorld extends React.Component<PropsType> {
  render () {
    return <Form>
      <Item>
        <Input placeholder='Unsecurely stored' onChangeText={this.props.setPublicHelloWorld} value={this.props.helloWorldText} />
      </Item>
    </Form>
  }
}

export default connect<*, *, *, *, *, *>(
  state => ({ helloWorldText: getPublicHelloWorld(state) }),
  { setPublicHelloWorld })(
  PublicHelloWorld
)
