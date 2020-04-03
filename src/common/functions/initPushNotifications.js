// @flow

import type { Channel } from 'expo'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'
import UserApi from '../api/paths/userApi'
import { toastifyError } from '../funtions/errorHandling'

const channelDefaults: Channel = {
  sound: true,
  vibrate: true
}

const CHANNEL_GAME_END = 'GAME_ENDED'
const CHANNEL_ASSIGNMENT = 'MURDER_ASSIGNMENT'

function createAndroidChannels () {
  Notifications.createChannelAndroidAsync(CHANNEL_GAME_END, {
    ...channelDefaults,
    name: 'Game end',
    priority: 'low'
  })
  Notifications.createChannelAndroidAsync(CHANNEL_ASSIGNMENT, {
    ...channelDefaults,
    name: 'Murder assignment',
    priority: 'high'
  })
}

export default async function initPushNotifications () {
  // get permission
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
  if (status !== 'granted') return

  // create channels
  createAndroidChannels()

  // tell server aboout our token
  const token = await Notifications.getExpoPushTokenAsync()
  UserApi.setPushToken(token).catch(toastifyError)
}
