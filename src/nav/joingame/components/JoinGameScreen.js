// @flow

import React from 'react'
import type { NavigationScreenProp, NavigationState } from 'react-navigation'
import { Button, Content, Form, Input, Item, Label, Spinner, Text } from 'native-base'
import i18n from 'i18n-js'
import { StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { getPlayerName } from '../../../common/redux/selectors'
import { setPlayerName } from '../../../common/redux/actions'

const GAME_CODE_LENGTH = 6
const MIN_PLAYER_NAME_LENGTH = 3

type PropsType = {|
  navigation: NavigationScreenProp<NavigationState>,
  lastPlayerName: string,
  setPlayerName: (string) => void
|}

type StateType = {|
  waiting: boolean,
  gameCode: string,
  playerName: string
|}

class JoinGameScreen extends React.Component<PropsType, StateType> {
  state = {
    waiting: false,
    gameCode: '',
    playerName: this.props.lastPlayerName
  }

  onGameCodeChange = (gameCode: string) => this.setState({ gameCode })

  onNameChange = (playerName: string) => this.setState({ playerName })
  canSubmit = () => {
    return this.state.gameCode.length === GAME_CODE_LENGTH && this.state.playerName.length >= MIN_PLAYER_NAME_LENGTH
  }

  onSubmit = () => {
    const { playerName } = this.state
    const { setPlayerName } = this.props
    setPlayerName(playerName)
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
        <Text style={styles.gameCodeHint}>{i18n.t('joinGame.gameCode.hint')}</Text>
        <Item>
          <Label>{i18n.t('joinGame.name.label')}</Label>
          <Input
            value={playerName}
            placeholder={i18n.t('joinGame.name.placeholder')}
            onChangeText={this.onNameChange}
            autoCapitalize='words'
            autoCompleteType='name'
          />
        </Item>
        <Text style={styles.gameCodeHint}>{i18n.t('joinGame.name.hint')}</Text>
        <Button block style={{ margin: 15, marginTop: 30 }} disabled={!this.canSubmit()} onPress={this.onSubmit}>
          { waiting ? <Spinner /> : <Text>{i18n.t('joinGame.submit')}</Text> }
        </Button>
      </Form>
    </Content>
  }
}

const styles = StyleSheet.create({
  gameCodeHint: {
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 5,
    marginBottom: 25,
    fontSize: 12
  }
})

export default connect<*, *, *, *, *, *>(s => ({
  lastPlayerName: getPlayerName(s)
}), {
  setPlayerName
})(JoinGameScreen)
