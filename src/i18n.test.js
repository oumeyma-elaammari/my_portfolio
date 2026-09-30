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

test('uses the validated French bio, internship descriptions, and wording', async () => {
  await i18n.changeLanguage('fr');

  expect(i18n.t('about.bio')).toMatch(/^Je suis élève-ingénieure en dernière année à l'ENSAO/);
  expect(i18n.t('about.bio')).toMatch(/un stage PFE/);
  expect(i18n.t('experience.items.1.bullets.0')).toMatch(/Power Automate/);
  expect(i18n.t('experience.items.2.bullets.0')).toBe(
    "Développement d'une application e-commerce Full-Stack avec React et Laravel."
  );
  expect(i18n.t('header.tagline')).toBe('Élève-ingénieure Full-Stack & IA');
  expect(i18n.t('about.subtitle')).toBe('Élève-ingénieure Full-Stack & IA');
  expect(i18n.t('footer.tagline')).toBe('Élève-ingénieure Full-Stack & IA');
  expect(i18n.t('about.softTitle')).toBe('Savoir-être');
  expect(i18n.t('meta.title')).toBe('Oumeyma ELAAMMARI | Portfolio Full-Stack & IA');
  expect(i18n.t('meta.description')).toMatch(/élève-ingénieure à l'ENSAO/);
  expect(i18n.t('meta.description')).toMatch(/un stage PFE à partir de janvier 2027/);
  expect(i18n.t('hero.greeting')).toBe("Bonjour, je m'appelle");
  expect(i18n.t('hero.availability')).toBe('Disponible pour un stage PFE — janvier 2027');
  expect(i18n.t('hero.typed', { returnObjects: true })).toEqual([
    'Élève-ingénieure en génie logiciel',
    'Développeuse Full-Stack',
    "Passionnée d'IA"
  ]);
  expect(i18n.t('about.education.engineering')).toContain('–');
  expect(i18n.t('experience.activities.1.roles.2')).toBe('Membre active – cellule Design & Editing');
  expect(i18n.t('projects.items.7.description')).toMatch(/jeu de données Corel-1000/);
  expect(document.documentElement.lang).toBe('fr');
});

test('uses the English home introduction, availability line, and typed roles', async () => {
  await i18n.changeLanguage('en');

  expect(i18n.t('hero.welcome')).toBe('Welcome to my portfolio');
  expect(i18n.t('hero.greeting')).toBe('Hello, my name is');
  expect(i18n.t('hero.availability')).toBe('Available for a PFE internship — January 2027');
  expect(i18n.t('hero.typed', { returnObjects: true })).toEqual([
    'Software Engineering Student',
    'Full-Stack Developer',
    'AI Enthusiast'
  ]);
});
