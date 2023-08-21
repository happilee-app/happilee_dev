import i18n from 'i18next'

import enTranslation from './locales/en/translation.json'
import frTranslation from './locales/fr/translation.json'
import arTranslation from './locales/ar/translation.json'
import mlTranslation from './locales/ml/translation.json'
import knTranslation from './locales/kn/translation.json'

const getDefaultLanguage = localStorage.getItem('la') ?? 'en'

i18n.init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: getDefaultLanguage, // Default language
  resources: {
    en: { translation: enTranslation }, // English translations
    fr: { translation: frTranslation }, // French translations
    ar: { translation: arTranslation }, // Arabic translations
    ml: { translation: mlTranslation }, // Malayalam translations
    kn: { translation: knTranslation }, // Kannada translations
  },
})

export default i18n
