// @flow

import React from 'react'
import { Body, Button, Header, Icon, Left, Right, Title } from 'native-base'
import type { NavigationScreenProp, NavigationState } from 'react-navigation'
import HeaderMoreButton from './HeaderMoreButton'

type PropsType = {
  title: string,
  previous: boolean,
  navigation: NavigationScreenProp<NavigationState>
}

export default class ScreenHeader extends React.Component<PropsType> {
  render () {
    const { previous, title, navigation } = this.props
    return <Header>
      {previous && <Left>
        <Button transparent onPress={navigation.goBack}>
          <Icon name="arrow-back" />
        </Button>
      </Left>}
      <Body>
        <Title>{title}</Title>
      </Body>
      <Right>
        <HeaderMoreButton navigation={this.props.navigation}/>
      </Right>
    </Header>
  }
}
