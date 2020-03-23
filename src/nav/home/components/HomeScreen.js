// @flow

import React from 'react'
import { Alert } from 'react-native'
import { Body, Button, Container, Header, Icon, Right, Title } from 'native-base'
import GamesOverview from './GamesOverview'

export default class HomeScreen extends React.Component<{}> {
  onMorePress = () => Alert.alert('Credits', 'Icon made by mavadee from www.flaticon.com')

  render () {
    return <Container>
      <Header>
        <Body>
          <Title>
            Home
          </Title>
        </Body>
        <Right>
          <Button
            transparent
            onPress={this.onMorePress}>
            <Icon ios='ios-more' android='md-more'/>
          </Button>
        </Right>
      </Header>
      <GamesOverview/>
    </Container>
  };
}
