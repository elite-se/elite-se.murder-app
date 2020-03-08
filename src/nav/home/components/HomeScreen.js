// @flow

import React from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import { Body, Button, Container, Content, Header, Icon, Right, Text, Title } from 'native-base'

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
          <Text>Hello world!</Text>
        </View>
      </Content>
    </Container>
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
