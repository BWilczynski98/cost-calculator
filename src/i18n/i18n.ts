import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import pl from './translations/pl'

export const resources = {
  pl: {
    translation: pl,
  },
}

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: 'pl',
  fallbackLng: 'pl',
  interpolation: {
    escapeValue: false,
  },
})
