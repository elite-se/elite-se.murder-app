// @flow

import React from 'react'
import i18n from '../localization/i18n'
import { Input, Item, Label } from 'native-base'
import { InputDescription } from './InputDescription'

type PropsType = {|
  playerName: string,
  onPlayerNameChange: string => void
|}

export default class PlayerNameInput extends React.Component<PropsType> {
  render () {
    const { playerName, onPlayerNameChange } = this.props
    return <>
      <Item>
        <Label>{i18n.t('joinGame.name.label')}</Label>
        <Input
          value={playerName}
          placeholder={i18n.t('joinGame.name.placeholder')}
          onChangeText={onPlayerNameChange}
          autoCapitalize='words'
          autoCompleteType='name'
        />
      </Item>
      <InputDescription>{i18n.t('joinGame.name.hint')}</InputDescription></>
  }
}
