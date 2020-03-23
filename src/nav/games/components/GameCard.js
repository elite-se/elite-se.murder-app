// @flow

import React from 'react'
import type { Game } from '../../../common/types/game'
import { Card, CardItem, Text } from 'native-base'

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
        <Text>ID: {game.id}</Text>
      </CardItem>
      <CardItem>
        <Text>Code: {game.gameCode}</Text>
      </CardItem>
      <CardItem>
        <Text>{!game.deleted && 'not '}deleted</Text>
      </CardItem>
    </Card>
  }
}
