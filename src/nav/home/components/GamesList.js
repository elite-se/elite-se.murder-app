// @flow

import React from 'react'
import type { Game } from '../../../common/types/game'
import { Card } from 'native-base'
import GameCard from './GameCard'

type PropsType = {|
  games: Game[]
|}

export default class GamesList extends React.Component<PropsType> {
  render () {
    return <>
      {this.props.games.map<Card>(game => (
        <GameCard key={game.id} game={game}/>
      )) }
    </>
  }
}