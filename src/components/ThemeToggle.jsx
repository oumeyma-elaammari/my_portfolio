import React, { useEffect, useState } from 'react';
import { HiMoon, HiSun } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';
import { toggleTheme, getActiveTheme } from '../utils/theme';

const ThemeToggle = ({ className = '', showLabel = false }) => {
  const { t } = useTranslation();
  const [theme, setTheme] = useState(() => getActiveTheme());

  useEffect(() => {
    setTheme(getActiveTheme());

    const observer = new MutationObserver(() => {
      setTheme(getActiveTheme());
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
    return () => observer.disconnect();
  }, []);

  const isDark = theme === 'dark';

  const handleToggle = () => {
    const next = toggleTheme();
    setTheme(next);
  };

  return (
    <button
      type="button"
      className={`theme-toggle ${className}`.trim()}
      onClick={handleToggle}
      aria-label={isDark ? t('theme.toLight') : t('theme.toDark')}
      aria-pressed={!isDark}
    >
      {isDark ? <HiSun aria-hidden="true" /> : <HiMoon aria-hidden="true" />}
      {showLabel && (
        <span className="theme-toggle-label">
          {isDark ? t('theme.light') : t('theme.dark')}
        </span>
      )}
    </button>
  );
};

export default ThemeToggle;
