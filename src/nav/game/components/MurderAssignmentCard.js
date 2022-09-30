// @flow

import React from 'react'
import { MurderAssignment } from '../../../common/types/murderAssignment'
import { Card, CardItem, Icon, Text } from 'native-base'
import i18n from 'i18n-js'

type PropsType = {|
  assignment: MurderAssignment
|}

export default class MurderAssignmentCard extends React.Component<PropsType> {
  getAssignmentClaim () {
    const { assignment } = this.props
    const target = assignment.target
    switch (this.props.assignment.state) {
      case 'PENDING':
        return <>
          <Text>{ i18n.t('game.assignments.current.claim', { target: target.name }) }</Text>
          <Icon name=""/>
        </>
      case 'FULFILLED':
        return <>
          <Text>{ i18n.t('game.assignments.former.claim') }</Text>
          <Icon name=""/>
        </>
      case 'FAILED':
        return <>
          <Text>{ i18n.t('game.assignments.failed.claim', { target: target.name }) }</Text>
          <Icon name=""/>
        </>
      case 'PLAYER_LEAVED':
        return <>
          <Text>{ i18n.t('game.assignments.leaved.claim', { target: target.name }) }</Text>
          <Icon name=""/>
        </>
    }
  }

  render () {
    return <Card>
      <CardItem header bordered>
        { this.getAssignmentClaim() }
      </CardItem>
    </Card>
  }
}
