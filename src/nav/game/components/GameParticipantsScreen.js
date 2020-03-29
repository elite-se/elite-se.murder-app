// @flow

import React from 'react'
import { Content, Icon, Left, List, ListItem, Text } from 'native-base'
import type { Game } from '../../../common/types/game'
import { sortBy } from 'lodash'

type PropsType = {
  game: Game
}

export default class GameParticipantsScreen extends React.Component<PropsType> {
  render () {
    const { players, owner } = this.props.game
    return <Content><List>
      {
        sortBy(players, ['playerName']).map(player =>
          <ListItem key={player.id}>
            <Left>
              {/* if player dead, add: <Icon name='skull' type='Foundation' style={{ marginRight: 10 }}/> */}
              <Text>{player.playerName}</Text>
              { (owner.id === player.id) && <Icon name='crown' type='Foundation' style={{ marginLeft: 10, paddingTop: 3 }}/>}
            </Left>
          </ListItem>
        )
      }
    </List></Content>
  }
}
