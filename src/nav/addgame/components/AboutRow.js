// @flow

import React from 'react'
import { Col, Row, Text } from 'native-base'
import i18n from 'i18n-js'

type PropsType = {|
  name?: string,
  nameKey?: string,
  value: string
|}

const COL1_WIDTH = 2
const COL2_WIDTH = 3

export default class AboutRow extends React.Component<PropsType> {
  render () {
    const { name, nameKey, value } = this.props
    return <Row>
      <Col size={COL1_WIDTH}>
        <Text style={{ fontWeight: 'bold' }}>{ name || nameKey ? i18n.t(nameKey) : ''}</Text>
      </Col>
      <Col size={COL2_WIDTH}>
        <Text>{value}</Text>
      </Col>
    </Row>
  }
}
