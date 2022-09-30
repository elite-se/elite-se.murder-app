// @flow

import { RnTextStyleProp, RnViewStyleProp, Toast } from 'native-base'
import i18n from '../localization/i18n'

export type ToastConfiguration = {
  text: string;
  buttonText?: string;
  position?: "top" | "bottom" | "center";
  type?: "danger" | "success" | "warning";
  duration?: number;
  onClose?: (reason: "user" | "timeout" | "functionCall") => any;
  style?: RnViewStyleProp;
  textStyle?: RnTextStyleProp;
  buttonTextStyle?: RnTextStyleProp;
  buttonStyle?: RnViewStyleProp;
}

const defaultToastConfig: Error => ToastConfiguration = error => ({
  text: error.message,
  buttonText: i18n.t('errors.ok'),
  type: 'danger',
  duration: 5000
})

export const toastifyError = (error: Error, additionalToastConfig: ToastConfiguration = {}) => {
  Toast.show({
    ...defaultToastConfig(error),
    ...additionalToastConfig
  })
}
