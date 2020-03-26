// @flow

import React from 'react'
import type { NavigationScreenProp, NavigationState } from 'react-navigation'
import { Content, Form, Text } from 'native-base'
import i18n from 'i18n-js'
import { connect } from 'react-redux'
import { getPlayerName } from '../../../common/redux/selectors'
import { addOrReplaceGame, setPlayerName } from '../../../common/redux/actions'
import PlayerNameInput from '../../../common/components/PlayerNameInput'
import type { Game } from '../../../common/types/game'
import type { NewPlayer } from '../../../common/types/player'
import { MIN_PLAYER_NAME_LENGTH } from '../../../common/types/player'
import SpinnerButton from '../../../common/components/SpinnerButton'
import GamesApi from '../../../common/api/gamesApi'
import GameCodeInput from './GameCodeInput'
import { toastifyError } from '../../../common/funtions/errorHandling'
import ApiError from '../../../common/api/apiError'

export type PropsType = {|
  navigation: NavigationScreenProp<NavigationState>,
  lastPlayerName: string,
  setPlayerName: string => void,
  addGame: Game => void,
  gameCode?: string
|}

type StateType = {|
  waiting: boolean,
  player: NewPlayer,
  game: ?Game
|}

class JoinGameScreen extends React.Component<PropsType, StateType> {
  state = {
    waiting: false,
    player: {
      playerName: this.props.lastPlayerName || ''
    },
    game: null
  }

  onGameChange = (game: ?Game) => this.setState({ game })
  onNameChange = (playerName: string) => this.setState(s => ({ player: { ...s.player, playerName } }))
  canSubmit = () => {
    return this.state.game && this.state.player.playerName.length >= MIN_PLAYER_NAME_LENGTH
  }

  onSubmit = () => {
    // fetch state
    const { player, game } = this.state
    if (!game) return
    this.setState({ waiting: true })

    // store player name as default for next time
    this.props.setPlayerName(player.playerName)

    // call api
    GamesApi.joinGame(game.id, player)
      .then(() => {
        this.props.addGame(game)
        this.props.navigation.navigate('Games')
      })
      .catch(e => ApiError.handle(e, new Map([
        [409, () => toastifyError(e, { text: i18n.t('joinGame.nameConflict') })] // handle player name conflict
      ])))
      .catch(toastifyError)
      .finally(() => this.setState({ waiting: false }))
  }

  render () {
    const { waiting, player } = this.state
    return <Content style={{ margin: 10 }}>
      <Form>
        <GameCodeInput onGameChanged={this.onGameChange} initialCode={this.props.gameCode}/>
        <PlayerNameInput playerName={player.playerName} onPlayerNameChange={this.onNameChange}/>
        <SpinnerButton block style={{ margin: 15, marginTop: 30 }} disabled={!this.canSubmit()} onPress={this.onSubmit} waiting={waiting}>
          <Text>{i18n.t('joinGame.submit')}</Text>
        </SpinnerButton>
      </Form>
    </Content>
  }
}

export default connect<*, *, *, *, *, *>(s => ({
  lastPlayerName: getPlayerName(s)
}), {
  setPlayerName,
  addGame: addOrReplaceGame
})(JoinGameScreen)
