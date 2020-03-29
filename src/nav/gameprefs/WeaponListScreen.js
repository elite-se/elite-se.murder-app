// @flow

import React from 'react'
import { Body, Button, Content, Icon, Input, List, ListItem, Right, Text } from 'native-base'
import type { NewWeapon } from '../../common/types/weapon'
import { MIN_WEAPON_NAME_LENGTH } from '../../common/types/weapon'
import { find, sortBy, union, without } from 'lodash'
import i18n from 'i18n-js'

type PropsType = {|
  +initialWeapons: NewWeapon[],
  +onWeaponsChanged: (NewWeapon[]) => void,
  +editable: boolean
|}

type StateType = {|
  weapons: NewWeapon[],
  newWeapon: NewWeapon
|}

const initialNewWeapon: NewWeapon = {
  weaponName: ''
}

export default class WeaponListScreen extends React.Component<PropsType, StateType> {
  static defaultProps = {
    editable: true,
    onWeaponsChanged: () => {
    }
  }

  state = {
    newWeapon: initialNewWeapon,
    weapons: this.props.initialWeapons
  }

  onDelete = (w: NewWeapon) => () => {
    const { onWeaponsChanged } = this.props
    const { weapons } = this.state
    const newWeapons = without(weapons, w)
    this.setState({ weapons: newWeapons })
    if (onWeaponsChanged) onWeaponsChanged(newWeapons)
  }

  onInputChange = (weaponName: string) => this.setState(s => ({
    newWeapon: {
      ...s.newWeapon,
      weaponName
    }
  }))

  onAdd = () => {
    if (!this.canSubmit()) return
    const { onWeaponsChanged } = this.props
    const { weapons } = this.state
    const newWeapons = union(weapons, [this.state.newWeapon])
    this.setState({
      newWeapon: initialNewWeapon,
      weapons: newWeapons
    })
    if (onWeaponsChanged) onWeaponsChanged(newWeapons)
  }

  canSubmit = () => {
    const { newWeapon, weapons } = this.state
    return newWeapon.weaponName.length >= MIN_WEAPON_NAME_LENGTH && !find(weapons, w => w.weaponName === newWeapon.weaponName)
  }

  renderAddRow = () => <ListItem>
    <Body>
      <Input onChangeText={this.onInputChange} value={this.state.newWeapon.weaponName} enablesReturnKeyAutomatically
        placeholder={i18n.t('gamePreferences.weaponsList.addPlaceholder')}
        onSubmitEditing={this.onAdd}/>
    </Body>
    {this.props.editable && <Right>
      <Button onPress={this.onAdd} small success disabled={!this.canSubmit()}>
        <Icon android='md-add' ios='ios-add'/>
      </Button>
    </Right>}
  </ListItem>

  renderWeapon = (w: NewWeapon) => <ListItem key={w.weaponName}>
    <Body><Text>{w.weaponName}</Text></Body>
    {this.props.editable && <Right>
      <Button onPress={this.onDelete(w)} small danger>
        <Icon android='md-trash' ios='ios-trash'/>
      </Button>
    </Right>}
  </ListItem>

  render () {
    const { weapons } = this.state
    return <Content><List>
      {this.props.editable && this.renderAddRow()}
      {sortBy(weapons, w => w.weaponName).map(this.renderWeapon)}
    </List></Content>
  }
}
