// @flow

import React from 'react'
import { Content, Form, Input, Item, Label, Text, View } from 'native-base'
import type { NewGamePreferences } from '../../../common/types/gamePreferences'
import type { NavigationScreenProp, NavigationState } from 'react-navigation'
import GamesApi from '../../../common/api/gamesApi'
import type { Game, NewGame } from '../../../common/types/game'
import { MIN_GAME_TITLE_LENGTH } from '../../../common/types/game'
import { addOrReplaceGame } from '../../../common/redux/actions'
import { connect } from 'react-redux'
import i18n from 'i18n-js'
import { getPlayerName } from '../../../common/redux/selectors'
import { MIN_PLAYER_NAME_LENGTH } from '../../../common/types/player'
import SpinnerButton from '../../../common/components/SpinnerButton'
import { toastifyError } from '../../../common/funtions/errorHandling'
import PlayerNameInput from '../../../common/components/PlayerNameInput'
import GamePrefsEditor from '../../gameprefs/GamePrefsEditor'

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
        dailyReassignment: false,
        allowedWeapons: [],
        furtherRules: ''
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
        this.props.addGame(game)
        this.props.navigation.goBack()
      })
      .catch(toastifyError)
      .finally(() => this.setState({ waiting: false }))
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
    return <Content padder>
      <Form>
        <Item>
          <Label>{i18n.t('addGame.gameTitle')}</Label>
          <Input value={title} onChangeText={this.onGameTitleChanged} autoFocus/>
        </Item>

        <Item style={{ marginTop: 20 }} first>
          <Label><Text>{i18n.t('gamePreferences.header')}</Text></Label>
        </Item>
        <GamePrefsEditor gamePrefs={preferences} onPrefsChange={this.onGamePrefsChanged} navigation={this.props.navigation}/>

        <View style={{ marginTop: 20 }}/>
        <PlayerNameInput playerName={newGame.owner.playerName} onPlayerNameChange={this.onPlayerNameChanged}/>
        <SpinnerButton block style={{ margin: 15, marginTop: 20 }} disabled={!this.canSubmit()} onPress={this.onSubmit} waiting={waiting}>
          <Text>{i18n.t('addGame.submit')}</Text>
        </SpinnerButton>
      </Form>
    </Content>
  }
}

export default connect<*, *, *, *, *, *>(s => ({
  lastPlayerName: getPlayerName(s)
}), {
  addGame: addOrReplaceGame
})(AddGameScreen)
