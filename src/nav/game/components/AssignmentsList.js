// @flow

import React from 'react'
import type { MurderAssignment } from '../../../common/types/murderAssignment';
import MurderAssignmentCard from './MurderAssignmentCard'
import { Card } from 'native-base'

type PropsType = {|
  assignments: MurderAssignment[]
|}

export default class AssignmentsList extends React.Component<PropsType> {
  render () {
    const { assignments } = this.props
    return <>
      { assignments.map<Card>(assignment => (
        <MurderAssignmentCard key={ assignment.id } assignment={ assignment }/>
      )) }
    </>
  }
}
