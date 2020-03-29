// @flow

import React from 'react'
import { Content } from 'native-base'
import type { Game } from '../../../common/types/game'
import GamePrefsEditor from '../../gameprefs/GamePrefsEditor'
import type { NavigationScreenProp, NavigationState } from 'react-navigation'

type PropsType = {
  game: Game,
  navigation: NavigationScreenProp<NavigationState>
}

export default class GamePreferencesScreen extends React.Component<PropsType> {
  render () {
    const { preferences } = this.props.game
    return <Content padder>
      <GamePrefsEditor gamePrefs={preferences} navigation={this.props.navigation} editable={false}/>
    </Content>
  }
}
