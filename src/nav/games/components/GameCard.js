// @flow

import React from 'react'
import type { Game } from '../../../common/types/game'
import { Card, CardItem, Text } from 'native-base'
import i18n from 'i18n-js'

type PropsType = {|
  game: Game
|}

export default class GameCard extends React.Component<PropsType> {
  render () {
    const { game } = this.props
    const numPlayers = game.players?.length || 0
    return <Card>
      <CardItem header bordered>
        <Text>{game.title} ({game.gameCode})</Text>
      </CardItem>
      <CardItem>
        <Text>{i18n.t('games.gamecard.owner', { owner: game.owner.playerName })}</Text>
      </CardItem>
      <CardItem>
        <Text>{i18n.t('games.gamecard.numPlayers', { count: numPlayers, numPlayers: i18n.toNumber(numPlayers, { precision: 0 }) })}</Text>
      </CardItem>
    </Card>
  }
}
