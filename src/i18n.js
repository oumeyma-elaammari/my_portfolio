import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import fr from './locales/fr.json';

export const LANGUAGE_STORAGE_KEY = 'language';

export const resolveInitialLanguage = () => {
  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored === 'fr' || stored === 'en') return stored;
  } catch {
    // localStorage can throw in private mode or when storage is blocked.
  }

  try {
    const nav = window.navigator;
    const list = [nav.language, ...(nav.languages || [])];
    if (list.some((lang) => typeof lang === 'string' && lang.toLowerCase().startsWith('fr'))) {
      return 'fr';
    }
  } catch {
    // navigator can be unavailable in some embeds.
  }

  return 'en';
};

export const persistLanguage = (lng) => {
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lng);
  } catch {
    // Ignore quota and privacy errors; the choice still applies for this visit.
  }
};

const applyDocumentLanguage = () => {
  if (typeof document === 'undefined') return;
  const lng = i18n.resolvedLanguage || i18n.language || 'en';
  const short = String(lng).toLowerCase().startsWith('fr') ? 'fr' : 'en';
  document.documentElement.lang = short;
  document.title = i18n.t('meta.title');
  const description = document.querySelector('meta[name="description"]');
  if (description) description.setAttribute('content', i18n.t('meta.description'));
};

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr }
  },
  lng: resolveInitialLanguage(),
  fallbackLng: 'en',
  nsSeparator: false,
  interpolation: { escapeValue: false },
  returnNull: false,
  react: { useSuspense: false }
});

applyDocumentLanguage();
i18n.on('languageChanged', applyDocumentLanguage);

export default i18n;
