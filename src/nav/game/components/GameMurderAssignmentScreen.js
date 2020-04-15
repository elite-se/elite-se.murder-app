// @flow

import React from 'react'
import { Content, Text } from 'native-base'
import type { Game } from '../../../common/types/game'
import { RefreshControl, View } from 'react-native'
import isEmpty from 'react-native-web/dist/vendor/react-native/isEmpty'
import AssignmentsList from './AssignmentsList'
import ApiError from '../../../common/api/apiError'
import { toastifyError } from '../../../common/funtions/errorHandling'
import GamesApi from '../../../common/api/gamesApi'
import i18n from 'i18n-js'

type PropsType = {|
  game: Game,
  navigation: NavigationScreenProp<NavigationState>
|}

type StateType = {|
  loading: boolean
|}

export default class GameMurderAssignmentScreen extends React.Component<PropsType> {
  state = {
    loading: false
  }

  componentDidMount () {
    this.refreshAssignments()
  }

  fetchGameAgain: (Game) => Promise<?Game> = (game: Game) => GamesApi.getGame(game.id)
    .then(game => game.deleted ? null : game)
    .catch(error => ApiError.handle(error, new Map([
      [404, () => null]
    ])))

  refreshAssignments () {
    this.setState({ loading: true })
    const { game } = this.props
    Promise.all(
      this.props.game = this.fetchGameAgain(game)
        .then(updatedGame => {

        })
    )
      .catch(toastifyError)
      .finally(() => this.setState({ loading: false }))
  }

  render () {
    const { loading } = this.state
    const { game, navigation } = this.props
    const refreshControl = <RefreshControl refreshing={loading} onRefresh={this.refreshAssignments()}/>
    return <Content refreshControl={refreshControl}>
      { (game.assignments && !isEmpty(game.assignments))
        ? <View>
          <AssignmentsList assignments={game.assignments} navigation={navigation}/>
        </View>
        : <View>
          <Text>{ i18n.t('games.assignments.empty') }</Text>
        </View>
      }
    </Content>
  }
}
