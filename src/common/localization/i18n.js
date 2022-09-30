import { I18n } from 'i18n-js'
import translations from './translations'
import * as Localization from 'expo-localization'

const i18n = new I18n(translations, { enableFallback: true, locale: Localization.locale, defaultLocale: "en" })

export default i18n
