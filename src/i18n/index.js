import { createI18n } from 'vue-i18n'
import messages from '@intlify/unplugin-vue-i18n/messages'

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  fallbackLocale: import.meta.env.VITE_DEFAULT_LOCALE,
  availableLocales: ['en', 'es'],
  locale: import.meta.env.VITE_DEFAULT_LOCALE,
  messages
});