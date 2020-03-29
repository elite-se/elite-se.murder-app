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
  navigation: NavigationScreenProp<NavigationState>,
  editable: boolean
|}

type StateType = {|
  forceOnlySpecificWeaponsChecked: boolean,
  cachedWeapons: NewWeapon[]
|}

export default class WeaponsEditor extends React.Component<PropsType, StateType> {
  static defaultProps = {
    editable: true
  }

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

  onShowWeapons = () => this.props.navigation.navigate('WeaponList', {
    initialWeapons: this.props.allowedWeapons,
    onWeaponsChanged: this.props.onWeaponsChange,
    editable: this.props.editable
  })

  render () {
    const checked = this.isOnlySpecificWeaponsChecked()
    return <ListItem onPress={this.props.editable && this.switchOnlySpecificWeapons}>
      <CheckBox checked={checked} onPress={this.switchOnlySpecificWeapons} disabled={!this.props.editable}/>
      <Body>
        <Text>{i18n.t('gamePreferences.onlySpecificWeapons')}</Text>
      </Body>
      {(this.props.editable || this.isOnlySpecificWeaponsChecked()) &&
        <Right>
          <Button disabled={!checked} small onPress={this.onShowWeapons}>
            <Icon android='md-list' ios='ios-list'/>
          </Button>
        </Right>
      }
    </ListItem>
  }
}
