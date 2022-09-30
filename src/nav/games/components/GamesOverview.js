// @flow

import React from 'react'
import { connect } from 'react-redux'
import type { Game } from '../../../common/types/game'
import { getGames } from '../../../common/redux/selectors'
import { Content, Text } from 'native-base'
import type { Action } from '../../../common/redux/actions'
import { addOrReplaceGame, removeGame } from '../../../common/redux/actions'
import GamesApi from '../../../common/api/paths/gamesApi'
import { RefreshControl, StyleSheet, View } from 'react-native'
import ApiError from '../../../common/api/apiError'
import GamesList from './GamesList'
import NewGameFab from './NewGameFab'
import type { NavigationScreenProp, NavigationState } from 'react-navigation'
import { toastifyError } from '../../../common/funtions/errorHandling'
import { isEmpty, sortBy } from 'lodash'
import i18n from '../../../common/localization/i18n'
import { EventSubscription, Notification, Notifications } from 'expo'

type PropsType = {|
  games: Game[],
  removeGame: Game => Action,
  addGame: Game => Action,
  navigation: NavigationScreenProp<NavigationState>
|}

type StateType = {|
  loading: boolean
|}

class GamesOverview extends React.Component<PropsType, StateType> {
  notificationsSubscription: ?EventSubscription = null
  state = {
    loading: false
  }

  handleNotification = (notification: Notification) => {
    const gameId: ?number = notification.data?.gameId
    const selected = (notification.origin === 'selected')
    if (!gameId) return

    GamesApi.getGame(gameId)
      .catch(ApiError.handle(new Map([[404, () => null]])))
      .then(game => {
        if (game) {
          this.props.addGame(game)
          if (selected) {
            this.props.navigation.navigate('Game', { game })
          }
        }
      })
      .catch(toastifyError)
  }

  componentDidMount () {
    this.notificationsSubscription = Notifications.addListener(this.handleNotification)
    this.refreshGames()
  }

  componentWillUnmount () {
    this.notificationsSubscription && this.notificationsSubscription.remove()
  }

  /**
   * Fetches the game from the API again, using the id of the game. If it does not exist any more, null is returned.
   * @param game the game to fetch again
   * @returns {Promise<?Game>} if there still is a non-deleted game with the same ID, a promise with that game.
   * A promise with null otherwise.
   */
  fetchGameAgain: (Game) => Promise<?Game> = (game: Game) => GamesApi.getGame(game.id)
    .then(game => game.deleted ? null : game)
    .catch(ApiError.handle(new Map([
      [404, () => null]
    ])))

  refreshGames = () => {
    this.setState({ loading: true })
    Promise.all(
      this.props.games.map(game => this.fetchGameAgain(game)
        .then(updatedGame => {
          if (updatedGame) {
            this.props.addGame(updatedGame)
          } else {
            this.props.removeGame(game)
          }
        }))
    )
      .catch(toastifyError)
      .finally(() => this.setState({ loading: false }))
  }

  render () {
    const { loading } = this.state
    const { games, navigation } = this.props
    const refreshControl = <RefreshControl refreshing={loading} onRefresh={this.refreshGames}/>
    return <View style={{ flex: 1 }}>
      <Content refreshControl={refreshControl}>
        { (games && !isEmpty(games))
          ? <View style={styles.container}>
            <GamesList games={sortBy(games, ['title', 'gameCode'])} navigation={navigation}/>
          </View>
          : <View style={styles.hintContainer}>
            <Text style={styles.hintText}>{i18n.t('games.empty')}</Text>
          </View>
        }
      </Content>
      <NewGameFab navigation={navigation}/>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    margin: 5
  },
  hintContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    margin: '16%'
  },
  hintText: {
    textAlign: 'center',
    textAlignVertical: 'center'
  }
})

export default connect<*, *, *, *, *, *>(s => ({
  games: getGames(s)
}), {
  removeGame,
  addGame: addOrReplaceGame
})(GamesOverview)
