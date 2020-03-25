// @flow

import React from 'react'
import { Button, Icon } from 'native-base'
import { Alert } from 'react-native'
import i18n from 'i18n-js'
import type { NavigationScreenProp, NavigationState } from 'react-navigation'
import type { MenuEntry } from '../functions/showPopupMenu'
import showPopupMenu from '../functions/showPopupMenu'

type PropsType = {|
  navigation: NavigationScreenProp<NavigationState>
|}

export default class HeaderMoreButton extends React.Component<PropsType> {
  moreIconRef = React.createRef<Icon>()
  menuEntries: MenuEntry[] = [{
    title: i18n.t('credits.title'),
    handler: () => Alert.alert(i18n.t('credits.title'), i18n.t('credits.content'))
  }, {
    title: i18n.t('about.title'),
    handler: () => this.props.navigation.navigate('About')
  }]

  onMorePress = () => showPopupMenu(this.menuEntries, this.moreIconRef)

  render () {
    return <Button
      transparent
      onPress={this.onMorePress}>
      <Icon ios='ios-more' android='md-more' ref={this.moreIconRef}/>
    </Button>
  }
}
