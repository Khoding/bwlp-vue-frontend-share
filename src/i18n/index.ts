import {createI18n} from 'vue-i18n';
import en from '@/i18n/locales/en.json';
import de from '@/i18n/locales/de.json';

const userLanguage = navigator.language.split('-')[0];
const supportedLanguages = ['en', 'de'];

export default createI18n({
  legacy: false,
  globalInjection: true,
  locale: supportedLanguages.includes(userLanguage) ? userLanguage : 'en',
  fallbackLocale: 'de',
  messages: {
    en,
    de,
  },
});
