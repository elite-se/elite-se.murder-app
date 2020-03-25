// @flow

import React from 'react'
import { Button, Icon } from 'native-base'
import { Alert, findNodeHandle, UIManager } from 'react-native'
import i18n from 'i18n-js'
import type { NavigationScreenProp, NavigationState } from 'react-navigation'

type MenuEntry = {|
  title: string,
  action: () => any
|}

type PropsType = {|
  navigation: NavigationScreenProp<NavigationState>
|}

export default class HeaderMoreButton extends React.Component<PropsType> {
  moreIconRef = React.createRef<Icon>()
  menuEntries: MenuEntry[] = [{
    title: i18n.t('credits.title'),
    action: () => Alert.alert(i18n.t('credits.title'), i18n.t('credits.content'))
  }, {
    title: i18n.t('about.title'),
    action: () => this.props.navigation.navigate('About')
  }]

  onMorePress = () => {
    UIManager.showPopupMenu(
      findNodeHandle(this.moreIconRef.current),
      this.menuEntries.map(e => e.title),
      (error) => console.warn(error),
      (title, index) => {
        if (index !== undefined) { index && this.menuEntries[index].action() }
      }
    )
  }

  render () {
    return <Button
      transparent
      onPress={this.onMorePress}>
      <Icon ios='ios-more' android='md-more' ref={this.moreIconRef}/>
    </Button>
  }
}
