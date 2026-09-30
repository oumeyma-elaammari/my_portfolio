import React from 'react';
import { useTranslation } from 'react-i18next';
import { persistLanguage } from '../i18n';

const LanguageToggle = ({ className = '' }) => {
  const { i18n, t } = useTranslation();
  const current = String(i18n.resolvedLanguage || i18n.language || 'en')
    .toLowerCase()
    .startsWith('fr')
    ? 'fr'
    : 'en';

  const select = (lng) => {
    persistLanguage(lng);
    i18n.changeLanguage(lng);
  };

  return (
    <div className={`lang-switch ${className}`.trim()} role="group" aria-label={t('lang.label')}>
      <button
        type="button"
        aria-pressed={current === 'en'}
        aria-label={t('lang.en')}
        onClick={() => select('en')}
      >
        EN
      </button>
      <button
        type="button"
        aria-pressed={current === 'fr'}
        aria-label={t('lang.fr')}
        onClick={() => select('fr')}
      >
        FR
      </button>
    </div>
  );
};

export default LanguageToggle;
