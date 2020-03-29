// @flow

import React from 'react'
import { Body, Button, CheckBox, Icon, ListItem, Right, Text } from 'native-base'
import i18n from 'i18n-js'
import { isEmpty } from 'lodash'
import type { NewWeapon, Weapon } from '../../common/types/weapon'
import type { NavigationScreenProp, NavigationState } from 'react-navigation'

type PropsType = {|
  allowedWeapons: $ReadOnlyArray<NewWeapon | Weapon>,
  onWeaponsChange: NewWeapon[] => void,
  navigation: NavigationScreenProp<NavigationState>
|}

type StateType = {|
  forceOnlySpecificWeaponsChecked: boolean,
  cachedWeapons: NewWeapon[]
|}

export default class WeaponsEditor extends React.Component<PropsType, StateType> {
  state = {
    forceOnlySpecificWeaponsChecked: false,
    cachedWeapons: []
  }

  isOnlySpecificWeaponsChecked = () => this.state.forceOnlySpecificWeaponsChecked || !isEmpty(this.props.allowedWeapons)

  switchOnlySpecificWeapons = () => {
    const wasChecked = this.isOnlySpecificWeaponsChecked()
    if (wasChecked) {
      this.setState({
        cachedWeapons: this.props.allowedWeapons.map(w => ((w: any): NewWeapon)), // bad, but stripping away the id is not necessary at the moment
        forceOnlySpecificWeaponsChecked: false
      })
      this.props.onWeaponsChange([])
    } else {
      this.setState({ forceOnlySpecificWeaponsChecked: true })
      this.props.onWeaponsChange(this.state.cachedWeapons)
    }
  }

  onShowWeapons = () => this.props.navigation.navigate('WeaponList', { weapons: this.props.allowedWeapons })

  render () {
    const checked = this.isOnlySpecificWeaponsChecked()
    return <ListItem onPress={this.switchOnlySpecificWeapons}>
      <CheckBox checked={checked} onPress={this.switchOnlySpecificWeapons}/>
      <Body>
        <Text>{i18n.t('gamePreferences.onlySpecificWeapons')}</Text>
      </Body>
      <Right>
        <Button disabled={!checked} small onPress={this.onShowWeapons}>
          <Icon android='md-list' ios='ios-list' />
        </Button>
      </Right>
    </ListItem>
  }
}
