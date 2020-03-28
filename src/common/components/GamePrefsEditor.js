// @flow

import React from 'react'
import { Body, CheckBox, ListItem, Text, Textarea } from 'native-base'
import i18n from 'i18n-js'
import type { GamePreferences, NewGamePreferences } from '../types/gamePreferences'

type PropsType<P> = {|
  gamePrefs: P,
  onPrefsChange?: (P) => void
|}

export default class GamePrefsEditor<P: NewGamePreferences | GamePreferences> extends React.Component<PropsType<P>> {
  changePrefs: (P => P) => void = prefChanger => {
    const prefsChangeHandler = this.props.onPrefsChange
    if (prefsChangeHandler) prefsChangeHandler(prefChanger(this.props.gamePrefs))
  }

  switchNoAttestors = () => this.changePrefs(p => ({
    ...p,
    noAttestors: !p.noAttestors
  }))

  switchDailyReassignment = () => this.changePrefs(p => ({
    ...p,
    dailyReassignment: !p.dailyReassignment
  }))

  onChangeFurtherRules = (furtherRules: string) => this.changePrefs(p => ({
    ...p,
    furtherRules
  }))

  render () {
    const { noAttestors, dailyReassignment, furtherRules } = this.props.gamePrefs
    const numFurtherRulesLines = furtherRules.split(/\n/).length
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
      {editable
        ? <Textarea bordered placeholder={i18n.t('gamePreferences.furtherRules')} value={furtherRules}
          rowSpan={Math.max(2, Math.min(numFurtherRulesLines, 10))} onChangeText={this.onChangeFurtherRules}/>
        : <Text style={{ paddingLeft: 15 }}>{furtherRules}</Text>
      }
    </>
  }
}
