// @flow

import React from 'react'
import { connect } from 'react-redux'
import type { Game } from '../../../common/types/game'
import { getGames } from '../../../common/redux/selectors'
import { Card, CardItem, Spinner, Text, Toast } from 'native-base'
import type { Action } from '../../../common/redux/actions'
import { replaceGames } from '../../../common/redux/actions'
import GamesApi from '../../../common/api/gamesApi'
import { StyleSheet, View } from 'react-native'

type PropsType = {|
  games: Game[],
  replaceGames: (Game[]) => Action
|}

type StateType = {|
  loading: boolean
|}

class GamesOverview extends React.Component<PropsType, StateType> {
  state = {
    loading: false
  }

  componentDidMount () {
    this.setState({ loading: true })
    GamesApi.getGames()
      .then(games => {
        this.setState({ loading: false })
        this.props.replaceGames(games)
      })
      .catch(err => {
        this.setState({ loading: false })
        Toast.show({ text: err.message, duration: 3000, type: 'warning' })
      })
  }

  render () {
    return <View style={styles.container}>
      {this.state.loading && <Spinner/>}
      {this.props.games.map<Card>(game => (
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
      )) }
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
  }
})

export default connect<*, *, *, *, *, *>(s => ({
  games: getGames(s)
}), {
  replaceGames
})(GamesOverview)
