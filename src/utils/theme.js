export const getStoredTheme = () => {
  try {
    return localStorage.getItem('theme');
  } catch {
    return null;
  }
};

export const getActiveTheme = () => {
  const attr = document.documentElement.getAttribute('data-theme');
  if (attr === 'light' || attr === 'dark') return attr;
  return 'dark';
};

export const resolveInitialTheme = () => {
  const stored = getStoredTheme();
  if (stored === 'light' || stored === 'dark') return stored;
  try {
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
  } catch {
    /* ignore */
  }
  return 'dark';
};

export const applyTheme = (theme) => {
  const next = theme === 'light' ? 'light' : 'dark';
  const scheme = next === 'light' ? 'only light' : 'only dark';
  document.documentElement.setAttribute('data-theme', next);
  document.documentElement.style.colorScheme = scheme;
  const meta = document.querySelector('meta[name="color-scheme"]');
  if (meta) meta.setAttribute('content', scheme);
  try {
    localStorage.setItem('theme', next);
  } catch {
    /* ignore */
  }
  return next;
};

export const toggleTheme = () => {
  const next = getActiveTheme() === 'dark' ? 'light' : 'dark';
  return applyTheme(next);
};
