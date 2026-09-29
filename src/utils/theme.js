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
  document.documentElement.setAttribute('data-theme', next);
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
