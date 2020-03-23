// @flow

import React from 'react'
import { Button, Form, Input, Item, Label, Spinner, Text, Toast } from 'native-base'
import type { NewGamePreferences } from '../../../common/types/gamePreferences'
import type { NavigationScreenProp, NavigationState } from 'react-navigation'
import GamesApi from '../../../common/api/gamesApi'
import type { Game, NewGame } from '../../../common/types/game'
import { addGame } from '../../../common/redux/actions'
import { connect } from 'react-redux'
import GamePrefsEditor from './GamePrefsEditor'

type PropsType = {|
  navigation: NavigationScreenProp<NavigationState>,
  addGame: (Game) => void
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
  canSubmit = () => this.state.newGame.title.length >= 3 && !this.state.waiting

  render () {
    const { waiting, newGame } = this.state
    const { title, preferences } = newGame
    return <Form>
      <Item>
        <Label>Title</Label>
        <Input placeholder='Title' value={title} onChangeText={this.onGameTitleChanged} autoFocus/>
      </Item>
      <GamePrefsEditor gamePrefs={preferences} onPrefsChange={this.onGamePrefsChanged} />
      <Button block style={{ margin: 15, marginTop: 50 }} disabled={!this.canSubmit()} onPress={this.onSubmit}>
        { waiting ? <Spinner /> : <Text>Create game</Text> }
      </Button>
    </Form>
  }
}

export default connect<*, *, *, *, *, *>(null, {
  addGame
})(AddGameScreen)
