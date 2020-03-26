// @flow

import React from 'react'
import type { Game } from '../../../common/types/game'
import { Input, Item, Label } from 'native-base'
import i18n from 'i18n-js'
import { InputDescription } from '../../../common/components/InputDescription'

type PropsType = {|
  gameChanged: ?Game => void,
  initialCode?: string
|}

type StateType = {|
  code: string
|}

export default class GameCodeInput extends React.Component<PropsType, StateType> {
  state = {
    code: ''
  }

  componentDidMount () {
    // Simulate entering of initial game code.
    // Only setting state is not enough, game would not be fetched.
    const initialCode = this.props.initialCode
    if (initialCode) this.onGameCodeChange(initialCode)
  }

  onGameCodeChange = (code: string) => {
    this.setState({ code })
  }

  render () {
    const { code } = this.state
    return <>
      <Item>
        <Label>{i18n.t('joinGame.gameCode.label')}</Label>
        <Input
          placeholder={'ABCXYZ'}
          value={code}
          onChangeText={this.onGameCodeChange}
          autoFocus
          autoCapitalize='characters'
          maxLength={6}
          autoCorrect={false}
          autoCompleteType='off'
        />
      </Item>
      <InputDescription>{i18n.t('joinGame.gameCode.hint')}</InputDescription>
    </>
  }
}
