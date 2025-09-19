import { createI18n } from 'vue-i18n'
import localesEN from '../locales/en.json'
import localesUA from '../locales/ua.json'
import localesRU from '../locales/ru.json'

export default ({ app }) => {
  const i18n = createI18n({
    legacy: false, //for Composition API
    locale: localStorage.getItem('lastLocale') || import.meta.env.VITE_I18N_LOCALE || 'en',
    fallbackLocale: import.meta.env.VITE_I18N_FALLBACK_LOCALE || 'ru',
    messages: {
      en: localesEN,
      ru: localesRU,
      ua: localesUA,
    },
    globalInjection: true,
  })

  app.use(i18n)
}

// import { createI18n } from 'vue-i18n'
// import messages from 'src/i18n'

// export default ({ app }) => {
//   const i18n = createI18n({
//     legacy: false, // важно для Composition API
//     locale: 'en',
//     fallbackLocale: 'en',
//     messages
//   })

//   app.use(i18n) // вот это подключение
// }
