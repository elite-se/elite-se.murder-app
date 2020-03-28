// @flow

import React from 'react'
import { Content } from 'native-base'
import type { Game } from '../../../common/types/game'
import GamePrefsEditor from '../../../common/components/GamePrefsEditor'

type PropsType = {
  game: Game
}

export default class GamePreferencesScreen extends React.Component<PropsType> {
  render () {
    const { preferences } = this.props.game
    return <Content padder>
      <GamePrefsEditor gamePrefs={preferences}/>
    </Content>
  }
}
