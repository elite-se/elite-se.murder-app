// @flow

import React from 'react'
import { connect } from 'react-redux'
import type { Game } from '../../../common/types/game'
import { getGames } from '../../../common/redux/selectors'
import { Card, CardItem, Text } from 'native-base'
import type { Action } from '../../../common/redux/actions'
import { replaceGames } from '../../../common/redux/actions'
import GamesApi from '../../../common/api/gamesApi'

type PropsType = {|
  games: Game[],
  replaceGames: (Game[]) => Action
|}

class GamesOverview extends React.Component<PropsType> {
  componentDidMount () {
    GamesApi.getGames().then(this.props.replaceGames)
  }

  render () {
    return this.props.games.map<Card>(game => (
      <Card key={game.id}>
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
    )
    )
  }
}

export default connect<*, *, *, *, *, *>(s => ({
  games: getGames(s)
}), {
  replaceGames
})(GamesOverview)
