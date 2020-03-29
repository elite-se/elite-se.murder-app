// @flow

import React from 'react'
import { Body, CheckBox, ListItem, Text, Textarea } from 'native-base'
import i18n from 'i18n-js'
import WeaponsEditor from './WeaponsEditor'
import type { GamePreferences, NewGamePreferences } from '../../common/types/gamePreferences'
import type { NewWeapon } from '../../common/types/weapon'
import type { NavigationScreenProp, NavigationState } from 'react-navigation'

type PropsType<P> = {|
  gamePrefs: P,
  onPrefsChange?: (P) => void,
  navigation: NavigationScreenProp<NavigationState>
|}

export default class GamePrefsEditor<P: NewGamePreferences | GamePreferences> extends React.Component<PropsType<P>> {
  isEditable = () => !!this.props.onPrefsChange

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

  onWeaponsChange = (allowedWeapons: NewWeapon[]) => this.changePrefs(p => ({
    ...p,
    allowedWeapons
  }))

  renderNoAttestors = () =>
    <ListItem onPress={this.switchNoAttestors}>
      <CheckBox checked={!this.props.gamePrefs.noAttestors} onPress={this.switchNoAttestors} disabled={!this.isEditable()}/>
      <Body><Text>{i18n.t('gamePreferences.allowAttestors')}</Text></Body>
    </ListItem>

  renderDailyReassignment = () =>
    <ListItem onPress={this.switchDailyReassignment}>
      <CheckBox checked={this.props.gamePrefs.dailyReassignment} onPress={this.switchDailyReassignment} disabled={!this.isEditable()}/>
      <Body><Text>{i18n.t('gamePreferences.dailyReassignment')}</Text></Body>
    </ListItem>

  renderWeapons = () => <WeaponsEditor allowedWeapons={this.props.gamePrefs.allowedWeapons} onWeaponsChange={this.onWeaponsChange}
    navigation={this.props.navigation}/>

  renderFurtherRules = () => {
    const furtherRules = this.props.gamePrefs.furtherRules || ''
    const numFurtherRulesLines = furtherRules.split(/\n/).length
    return this.isEditable()
      ? <Textarea bordered placeholder={i18n.t('gamePreferences.furtherRules')} value={furtherRules}
        rowSpan={Math.max(2, Math.min(numFurtherRulesLines, 10))} onChangeText={this.onChangeFurtherRules}/>
      : <Text style={{ paddingLeft: 15 }}>{furtherRules}</Text>
  }

  render () {
    return <>
      {this.renderNoAttestors()}
      {this.renderDailyReassignment()}
      {this.renderWeapons()}
      {this.renderFurtherRules()}
    </>
  }
}
