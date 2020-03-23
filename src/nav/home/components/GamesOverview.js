// @flow

import React from 'react'
import { connect } from 'react-redux'
import type { Game } from '../../../common/types/game'
import { getGames } from '../../../common/redux/selectors'
import { Content, Toast } from 'native-base'
import type { Action } from '../../../common/redux/actions'
import { removeGame } from '../../../common/redux/actions'
import GamesApi from '../../../common/api/gamesApi'
import { RefreshControl, StyleSheet, View } from 'react-native'
import ApiError from '../../../common/api/apiError'
import GamesList from './GamesList'

type PropsType = {|
  games: Game[],
  removeGame: (Game) => Action
|}

type StateType = {|
  loading: boolean
|}

class GamesOverview extends React.Component<PropsType, StateType> {
  state = {
    loading: false
  }

  componentDidMount () {
    this.refreshGames()
  }

  /**
   * Tries to determine if the given game has been deleted by fetching it from the API again.
   * @param game the game to check
   * @returns {Promise<boolean>} a Promise that resolves to true if there still is a non-deleted game with the same ID, and to false if the
   * game with that ID is deleted or does not exist any more.
   */
  checkGameDeleted: (Game) => Promise<boolean> = (game: Game) => GamesApi.getGame(game.id)
    .then(game => game.deleted)
    .catch(error => ApiError.handle(error, new Map([
      [404, () => true]
    ])))

  refreshGames = () => {
    this.setState({ loading: true })
    Promise.all(
      this.props.games.map(game => this.checkGameDeleted(game).then(deleted => {
        if (deleted) this.props.removeGame(game)
      }))
    ).then(() => {
      this.setState({ loading: false })
    })
      .catch(err => {
        this.setState({ loading: false })
        Toast.show({ text: err.message, duration: 3000, type: 'warning' })
      })
  }

  render () {
    const { loading } = this.state
    const refreshControl = <RefreshControl refreshing={loading} onRefresh={this.refreshGames}/>
    return <Content refreshControl={refreshControl}>
      <View style={styles.container}>
        <GamesList games={this.props.games}/>
      </View>
    </Content>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    margin: 5
  }
})

export default connect<*, *, *, *, *, *>(s => ({
  games: getGames(s)
}), {
  removeGame
})(GamesOverview)
