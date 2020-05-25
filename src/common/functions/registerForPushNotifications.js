// @flow

import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'
import UserApi from '../api/paths/userApi'

export default async function registerForPushNotificationsAsync () {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
  if (status !== 'granted') return
  const token = await Notifications.getExpoPushTokenAsync()
  return UserApi.setPushToken(token)
}
