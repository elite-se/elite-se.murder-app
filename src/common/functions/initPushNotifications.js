// @flow

import type { Channel } from 'expo'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'
import UserApi from '../api/paths/userApi'
import { toastifyError } from '../funtions/errorHandling'
import i18n from '../localization/i18n'

const channelDefaults: Channel = {
  sound: true,
  vibrate: true
}

const CHANNEL_GAME_END = 'GAME_ENDED'
const CHANNEL_ASSIGNMENT = 'MURDER_ASSIGNMENT'

function createAndroidChannels () {
  Notifications.createChannelAndroidAsync(CHANNEL_GAME_END, {
    ...channelDefaults,
    name: i18n.t('notificationChannels.gameEnd.name'),
    description: i18n.t('notificationChannels.gameEnd.description'),
    priority: 'low'
  })
  Notifications.createChannelAndroidAsync(CHANNEL_ASSIGNMENT, {
    ...channelDefaults,
    name: i18n.t('notificationChannels.assignment.name'),
    description: i18n.t('notificationChannels.assignment.description'),
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
