// @flow

import React from 'react'
import { Body, CheckBox, ListItem, Text } from 'native-base'
import i18n from 'i18n-js'
import type { GamePreferences, NewGamePreferences } from '../types/gamePreferences'

type PropsType<P> = {|
  gamePrefs: P,
  onPrefsChange?: (P) => void
|}

export default class GamePrefsEditor<P: NewGamePreferences | GamePreferences> extends React.Component<PropsType<P>> {
  switchNoAttestors = () => this.props.onPrefsChange && this.props.onPrefsChange({
    ...this.props.gamePrefs,
    noAttestors: (!this.props.gamePrefs.noAttestors: boolean)
  })

  switchDailyReassignment = () => this.props.onPrefsChange && this.props.onPrefsChange({
    ...this.props.gamePrefs,
    dailyReassignment: (!this.props.gamePrefs.dailyReassignment: boolean)
  })

  render () {
    const { noAttestors, dailyReassignment } = this.props.gamePrefs
    const editable = !!this.props.onPrefsChange
    return <>
      <ListItem onPress={this.switchNoAttestors}>
        <CheckBox checked={!noAttestors} onPress={this.switchNoAttestors} disabled={!editable}/>
        <Body><Text>{i18n.t('gamePreferences.allowAttestors')}</Text></Body>
      </ListItem>
      <ListItem onPress={this.switchDailyReassignment}>
        <CheckBox checked={dailyReassignment} onPress={this.switchDailyReassignment} disabled={!editable}/>
        <Body><Text>{i18n.t('gamePreferences.dailyReassignment')}</Text></Body>
      </ListItem>
    </>
  }
}
