// @flow

import React from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { Body, Button, Container, Content, Header, Icon, Right, Title } from 'native-base'
import PublicHelloWorld from './PublicHelloWorld'
import PrivateHelloWorld from './PrivateHelloWorld'

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
      <Content>
        <View style={styles.container}>
          <PublicHelloWorld/>
          <PrivateHelloWorld/>
        </View>
      </Content>
    </Container>
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    margin: 5
  }
})
