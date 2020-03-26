// @flow

import React from 'react'
import type { Game } from '../../../common/types/game'
import { GAME_CODE_LENGTH } from '../../../common/types/game'
import { Icon, Input, Item, Label, Spinner } from 'native-base'
import i18n from 'i18n-js'
import { InputDescription } from '../../../common/components/InputDescription'
import GamesApi from '../../../common/api/gamesApi'
import ApiError from '../../../common/api/apiError'
import { toastifyError } from '../../../common/funtions/errorHandling'

type ValidityState = 'NONE' | 'CHECKING' | 'VALID' | 'INVALID'

type PropsType = {|
  onGameChanged: ?Game => void,
  initialCode?: string
|}

type StateType = {|
  code: string,
  validityState: ValidityState
|}

export default class GameCodeInput extends React.Component<PropsType, StateType> {
  state = {
    code: '',
    validityState: 'NONE'
  }

  componentDidMount () {
    // Simulate entering of initial game code.
    // Only setting state is not enough, game would not be fetched.
    const initialCode = this.props.initialCode
    if (initialCode) this.onGameCodeChange(initialCode)
  }

  /**
   * Updates the state to the new code, and tries to retrieve the game for the code, updating the validityState.
   * @param code
   */
  onGameCodeChange = (code: string) => {
    this.setState({ code })
    if (code.length !== GAME_CODE_LENGTH) {
      this.setState({ validityState: 'NONE' })
    } else {
      this.setState({ validityState: 'CHECKING' })
      GamesApi.getGameByCode(code)
        .then(game => {
          if (this.setValidityStateIfCodeMatches(code, 'VALID')) this.props.onGameChanged(game)
        })
        .catch(e => ApiError.handle(e, new Map([
          [404, () => this.setValidityStateIfCodeMatches(code, 'INVALID')]
        ])))
        .catch(e => {
          this.setValidityStateIfCodeMatches(code, 'NONE')
          toastifyError(e)
        })
    }
  }

  /**
   * Checks if the passed code is the same as in the current state. If it does, the validity state is updated to the passed value.
   *
   * Use this method if you want to update the validity after you checked it but you can not be sure that the user did not change the code
   * meanwhile so that another check is already in progress.
   *
   * @param checkedCode this code gets tested if it matches the one in the current state
   * @param validityState the new state to set if the code matches
   * @returns {boolean} true exactly if the passed code matches the one in the state
   */
  setValidityStateIfCodeMatches = (checkedCode: string, validityState: ValidityState) => {
    if (checkedCode === this.state.code) {
      this.setState({ validityState })
      return true
    }
    return false
  }

  render () {
    const { code, validityState } = this.state
    return <>
      <Item
        success={ validityState === 'VALID' || undefined }
        error={ validityState === 'INVALID' || undefined }>
        <Label>{i18n.t('joinGame.gameCode.label')}</Label>
        <Input
          placeholder={'ABCXYZ'}
          value={code}
          onChangeText={this.onGameCodeChange}
          autoFocus
          autoCapitalize='characters'
          maxLength={6}
          autoCorrect={false}
          autoCompleteType='off'
        />
        {validityState === 'CHECKING' && <Spinner style={{ height: 20, marginRight: 10 }} />}
        {validityState === 'INVALID' && <Icon name='close-circle'/>}
        {validityState === 'VALID' && <Icon name='checkmark-circle'/>}
      </Item>
      <InputDescription>{i18n.t('joinGame.gameCode.hint')}</InputDescription>
    </>
  }
}
