// @flow

import React from 'react'
import type { Game } from '../../../common/types/game'
import { Card, CardItem, Icon, Text } from 'native-base'
import i18n from '../../../common/localization/i18n'
import { StyleSheet, TouchableOpacity } from 'react-native'
import type { NavigationScreenProp, NavigationState } from 'react-navigation'

type PropsType = {|
  game: Game,
  navigation: NavigationScreenProp<NavigationState>
|}

const styles = StyleSheet.create({
  stateIcon: {
    alignSelf: 'flex-end',
    marginLeft: 'auto'
  }
})

export default class GameCard extends React.Component<PropsType> {
  getStateIconName () {
    switch (this.props.game.state) {
      case 'PREPARATION':
        return <Icon name='hour-glass' type='Entypo' style={styles.stateIcon}/>
      case 'RUNNING':
        return <Icon name='knife-military' type='MaterialCommunityIcons' style={styles.stateIcon}/>
      case 'FINISHED':
        return <Icon name='flag-checkered' type='FontAwesome5' style={styles.stateIcon}/>
    }
  }

  onCardPress = () => this.props.navigation.navigate('Game', { game: this.props.game })

  render () {
    const { game } = this.props
    const numPlayers = game.players?.length || 0
    return <TouchableOpacity onPress={this.onCardPress}>
      <Card>
        <CardItem header bordered>
          <Text>{game.title} ({game.gameCode})</Text>
          {this.getStateIconName()}
        </CardItem>
        <CardItem>
          <Text>{i18n.t('games.gamecard.owner', { owner: game.owner.playerName })}</Text>
        </CardItem>
        <CardItem>
          <Text>{i18n.t('games.gamecard.numPlayers', { count: numPlayers, numPlayers: i18n.toNumber(numPlayers, { precision: 0 }) })}</Text>
        </CardItem>
      </Card>
    </TouchableOpacity>
  }
}
