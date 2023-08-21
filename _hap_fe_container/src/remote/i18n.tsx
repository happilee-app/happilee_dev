import i18n from 'i18next'

import arTranslation from './locales/ar/translation.json'
import enTranslation from './locales/en/translation.json'

const getDefaultLanguage = localStorage.getItem('la') ?? 'en'

i18n.init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: getDefaultLanguage, // Default language
  resources: {
    ar: { translation: arTranslation }, // Arabic translations
    en: { translation: enTranslation }, // English translations
  },
})

export default i18n
