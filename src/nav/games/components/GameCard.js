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
    return <Card>
      <CardItem header bordered>
        <Text>{game.title}</Text>
      </CardItem>
      <CardItem>
        <Text>{i18n.t('games.gamecard.id', { id: game.id.toString() })}</Text>
      </CardItem>
      <CardItem>
        <Text>{i18n.t('games.gamecard.code', { code: game.gameCode || '–' })}</Text>
      </CardItem>
    </Card>
  }
}
