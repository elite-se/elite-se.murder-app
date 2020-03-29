// @flow

import React from 'react'
import { Content, Text } from 'native-base'
import type { NewWeapon } from '../../common/types/weapon'

type PropsType = {|
  weapons: NewWeapon[]
|}

export default class WeaponListScreen extends React.Component<PropsType> {
  render () {
    return <Content padder>
      <Text>Hello World</Text>
    </Content>
  }
}
