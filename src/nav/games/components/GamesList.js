// @flow

import React from 'react'
import type { Game } from '../../../common/types/game'
import { Card } from 'native-base'
import GameCard from './GameCard'
import type { NavigationScreenProp, NavigationState } from 'react-navigation'

type PropsType = {|
  games: Game[],
  navigation: NavigationScreenProp<NavigationState>
|}

export default class GamesList extends React.Component<PropsType> {
  render () {
    const { games, navigation } = this.props
    return <>
      {games.map<Card>(game => (
        <GameCard key={game.id} game={game} navigation={navigation}/>
      )) }
    </>
  }
}
