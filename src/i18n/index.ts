import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { isBrowser } from '@/lib/platform'
// Only load the browser language detector when running in the browser.
let LanguageDetector: any = undefined;
if (isBrowser()) {
  // Dynamically require to avoid server-side usage of browser-only detector
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  LanguageDetector = require('i18next-browser-languagedetector');
}

import en from './locales/en.json';
import sh from './locales/sh.json';
import nd from './locales/nd.json';

const resources = {
  en: {
    translation: en,
  },
  sh: {
    translation: sh,
  },
  nd: {
    translation: nd,
  },
};

// Initialize i18n. Use the browser detector only on the client to avoid
// referencing localStorage during SSR which can cause hydration/build issues.
i18n.use(initReactI18next);
if (isBrowser() && LanguageDetector) {
  i18n.use(LanguageDetector);
}

const initOptions: any = {
  resources,
  fallbackLng: 'en',
  debug: false,
  interpolation: {
    escapeValue: false,
  },
};

if (isBrowser()) {
  initOptions.detection = {
    order: ['localStorage', 'navigator', 'htmlTag'],
    caches: ['localStorage'],
  };
}

i18n.init(initOptions);

export default i18n;