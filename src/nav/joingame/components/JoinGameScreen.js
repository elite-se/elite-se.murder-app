// @flow

import React from 'react'
import type { NavigationScreenProp, NavigationState } from 'react-navigation'
import { Content, Form, Input, Item, Label, Text } from 'native-base'
import i18n from 'i18n-js'
import { connect } from 'react-redux'
import { getPlayerName } from '../../../common/redux/selectors'
import { setPlayerName } from '../../../common/redux/actions'
import PlayerNameInput from '../../../common/components/PlayerNameInput'
import { InputDescription } from '../../../common/components/InputDescription'
import { GAME_CODE_LENGTH } from '../../../common/types/game'
import { MIN_PLAYER_NAME_LENGTH } from '../../../common/types/player'
import SpinnerButton from '../../../common/components/SpinnerButton'

export type PropsType = {|
  navigation: NavigationScreenProp<NavigationState>,
  lastPlayerName: string,
  setPlayerName: (string) => void,
  gameCode?: string
|}

type StateType = {|
  waiting: boolean,
  gameCode: string,
  playerName: string
|}

class JoinGameScreen extends React.Component<PropsType, StateType> {
  state = {
    waiting: false,
    gameCode: this.props.gameCode || '',
    playerName: this.props.lastPlayerName || ''
  }

  onGameCodeChange = (gameCode: string) => this.setState({ gameCode })
  onNameChange = (playerName: string) => this.setState({ playerName })
  canSubmit = () => {
    return this.state.gameCode.length === GAME_CODE_LENGTH && this.state.playerName.length >= MIN_PLAYER_NAME_LENGTH
  }

  onSubmit = () => {
    const { playerName } = this.state
    this.setState({ waiting: true })
    this.props.setPlayerName(playerName)
  }

  render () {
    const { waiting, gameCode, playerName } = this.state
    return <Content style={{ margin: 10 }}>
      <Form>
        <Item>
          <Label>{i18n.t('joinGame.gameCode.label')}</Label>
          <Input
            placeholder={'ABCXYZ'}
            value={gameCode}
            onChangeText={this.onGameCodeChange}
            autoFocus
            autoCapitalize='characters'
            maxLength={6}
            autoCorrect={false}
            autoCompleteType='off'
          />
        </Item>
        <InputDescription>{i18n.t('joinGame.gameCode.hint')}</InputDescription>
        <PlayerNameInput playerName={playerName} onPlayerNameChange={this.onNameChange}/>
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
  setPlayerName
})(JoinGameScreen)
