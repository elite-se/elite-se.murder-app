// @flow

import React from 'react'
import { Left, List, ListItem, Text } from 'native-base'
import type { Game } from '../../../../common/types/game'

type PropsType = {
  game: Game
}

export default class GameParticipantsScreen extends React.Component<PropsType> {
  render () {
    const { players } = this.props.game
    return <List>
      {
        players.map(player =>
          <ListItem key={player.id}>
            <Left>
              {/* if player dead, add: <Icon name='skull' type='Foundation' style={{ marginRight: 10 }}/> */}
              <Text>{player.playerName}</Text>
            </Left>
          </ListItem>
        )
      }
    </List>
  }
}
