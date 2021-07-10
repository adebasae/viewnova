import LanguageDetector from 'i18next-browser-languagedetector';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Cookies from 'js-cookie';
import localeLoader from './locale-loader';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import routerLoader from './router';

const { loadLocales } = localeLoader;
const vocabularies = loadLocales();
const listLng = ['es', 'de', 'en', 'ca', 'eu', 'gl'];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
i18n.on('languageChanged', function (lng) {
  // console.log(lng);
  // Cookies.set('i18next', lng);
  /* const newUrl = window.location.pathname.split('/');
  let change = false;
  if (window.location.pathname !== '/') {
    if (!listLng.includes(newUrl[1])) {
      if (newUrl.length === 2) {
        change = true;
        // window.location.replace(`/${lng}${window.location.pathname}`);
      }
    }
    if (newUrl[1] !== lng && !change) {
      const rutas = routerLoader.LoadRouterByPath(newUrl[2], lng);
      console.log(rutas, lng);
      // window.location.replace(rutas);
    }
  } */
});

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'es',
    resources: vocabularies,
    whitelist: listLng,
    detection: {
      order: ['path'],
      lookupFromPathIndex: 0,
      checkWhitelist: true,
    },
    interpolation: {
      escapeValue: false,
      formatSeparator: '.',
    },
  });
export default i18n;
