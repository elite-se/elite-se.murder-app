// @flow

import React from 'react'
import { Button, Form, Input, Item, Label, Spinner, Text, Toast } from 'native-base'
import type { NewGamePreferences } from '../../../common/types/gamePreferences'
import type { NavigationScreenProp, NavigationState } from 'react-navigation'
import GamesApi from '../../../common/api/gamesApi'
import type { Game, NewGame } from '../../../common/types/game'
import { MIN_GAME_TITLE_LENGTH } from '../../../common/types/game'
import { addGame } from '../../../common/redux/actions'
import { connect } from 'react-redux'
import GamePrefsEditor from './GamePrefsEditor'
import i18n from 'i18n-js'
import PlayerNameInput from '../../../common/components/PlayerNameInput'
import { getPlayerName } from '../../../common/redux/selectors'
import { MIN_PLAYER_NAME_LENGTH } from '../../../common/types/player'

type PropsType = {|
  navigation: NavigationScreenProp<NavigationState>,
  addGame: (Game) => void,
  lastPlayerName: string
|}

type StateType = {|
  newGame: NewGame,
  waiting: boolean
|}

class AddGameScreen extends React.Component<PropsType, StateType> {
  state: StateType = {
    newGame: {
      title: '',
      preferences: {
        noAttestors: true,
        dailyReassignment: false
      },
      owner: {
        playerName: this.props.lastPlayerName || ''
      }
    },
    waiting: false
  }

  onSubmit = () => {
    if (!this.canSubmit()) return
    this.setState({ waiting: true })
    GamesApi.createGame(this.state.newGame)
      .then(game => {
        this.setState({ waiting: false })
        this.props.addGame(game)
        this.props.navigation.goBack()
      })
      .catch(err => {
        this.setState({ waiting: false })
        Toast.show({ text: err.message, type: 'warning' })
      })
  }

  onGamePrefsChanged = (preferences: NewGamePreferences) => this.setState(s => ({ newGame: { ...(s.newGame), preferences } }))
  onGameTitleChanged = (title: string) => this.setState(s => ({ newGame: { ...(s.newGame), title } }))
  onPlayerNameChanged = (playerName: string) => this.setState(s => ({ newGame: { ...(s.newGame), owner: { ...s.newGame.owner, playerName } } }))
  canSubmit = () => !this.state.waiting &&
    this.state.newGame.title.length >= MIN_GAME_TITLE_LENGTH &&
    this.state.newGame.owner.playerName.length >= MIN_PLAYER_NAME_LENGTH

  render () {
    const { waiting, newGame } = this.state
    const { title, preferences } = newGame
    return <Form>
      <Item>
        <Label>{i18n.t('addGame.gameTitle')}</Label>
        <Input value={title} onChangeText={this.onGameTitleChanged} autoFocus/>
      </Item>
      <GamePrefsEditor gamePrefs={preferences} onPrefsChange={this.onGamePrefsChanged} />
      <PlayerNameInput playerName={newGame.owner.playerName} onPlayerNameChange={this.onPlayerNameChanged}/>
      <Button block style={{ margin: 15, marginTop: 50 }} disabled={!this.canSubmit()} onPress={this.onSubmit}>
        { waiting ? <Spinner /> : <Text>{i18n.t('addGame.submit')}</Text> }
      </Button>
    </Form>
  }
}

export default connect<*, *, *, *, *, *>(s => ({
  lastPlayerName: getPlayerName(s)
}), {
  addGame
})(AddGameScreen)
