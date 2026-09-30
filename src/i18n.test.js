import i18n, { persistLanguage, resolveInitialLanguage } from './i18n';

test('uses a stored language choice before the browser language', () => {
  localStorage.setItem('language', 'fr');
  expect(resolveInitialLanguage()).toBe('fr');
});

test('uses French when the browser language is French and nothing is stored', () => {
  const descriptor = Object.getOwnPropertyDescriptor(window.navigator, 'language');
  Object.defineProperty(window.navigator, 'language', {
    configurable: true,
    get: () => 'fr-MA'
  });

  expect(resolveInitialLanguage()).toBe('fr');

  if (descriptor) {
    Object.defineProperty(window.navigator, 'language', descriptor);
  } else {
    delete window.navigator.language;
  }
});

test('ignores localStorage failures when resolving the language', () => {
  const getItem = Storage.prototype.getItem;
  Storage.prototype.getItem = () => {
    throw new Error('blocked');
  };

  expect(resolveInitialLanguage()).toBe('en');
  Storage.prototype.getItem = getItem;
});

test('ignores localStorage failures when saving the language', () => {
  const setItem = Storage.prototype.setItem;
  Storage.prototype.setItem = () => {
    throw new Error('blocked');
  };

  expect(() => persistLanguage('fr')).not.toThrow();
  Storage.prototype.setItem = setItem;
});

test('falls back to English for the bio and experience descriptions', async () => {
  await i18n.changeLanguage('fr');

  expect(i18n.t('about.bio')).toMatch(/final-year engineering student at ENSAO/);
  expect(i18n.t('experience.items.1.bullets.0')).toMatch(/Power Automate/);
  expect(i18n.t('experience.items.2.bullets.2')).toMatch(/role-based access control/);
  expect(i18n.t('nav.home')).toBe('Accueil');
  expect(i18n.t('hero.typed', { returnObjects: true })[0]).toBe('Étudiante en génie logiciel');
  expect(document.documentElement.lang).toBe('fr');
});
