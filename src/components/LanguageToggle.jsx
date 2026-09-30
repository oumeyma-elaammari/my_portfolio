import React, { useEffect, useId, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { persistLanguage } from '../i18n';

const OPTIONS = [
  { code: 'en', labelKey: 'lang.en' },
  { code: 'fr', labelKey: 'lang.fr' }
];

const LanguageToggle = ({ className = '' }) => {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [focusTick, setFocusTick] = useState(0);
  const rootRef = useRef(null);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const focusTargetRef = useRef('checked');
  const menuId = useId();

  const current = String(i18n.resolvedLanguage || i18n.language || 'en')
    .toLowerCase()
    .startsWith('fr')
    ? 'fr'
    : 'en';

  const closeMenu = (restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) buttonRef.current?.focus();
  };

  const openMenu = (target = 'checked') => {
    focusTargetRef.current = target;
    setOpen(true);
    setFocusTick((tick) => tick + 1);
  };

  const select = (lng) => {
    persistLanguage(lng);
    i18n.changeLanguage(lng);
    closeMenu(true);
  };

  useEffect(() => {
    if (!open) return undefined;

    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  useEffect(() => {
    if (!open || !menuRef.current) return undefined;

    const items = menuRef.current.querySelectorAll('[role="menuitemradio"]');
    const checked = menuRef.current.querySelector('[aria-checked="true"]');
    const target = focusTargetRef.current === 'last'
      ? items[items.length - 1]
      : focusTargetRef.current === 'first'
        ? items[0]
        : (checked || items[0]);
    target?.focus();
    return undefined;
  }, [open, focusTick]);

  const onButtonKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      openMenu('first');
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      openMenu('last');
    } else if (event.key === 'Escape' && open) {
      event.preventDefault();
      event.stopPropagation();
      closeMenu(false);
    }
  };

  const onMenuKeyDown = (event) => {
    const items = [...menuRef.current.querySelectorAll('[role="menuitemradio"]')];
    const index = items.indexOf(document.activeElement);

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      items[(index + 1) % items.length]?.focus();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      items[(index - 1 + items.length) % items.length]?.focus();
    } else if (event.key === 'Home') {
      event.preventDefault();
      items[0]?.focus();
    } else if (event.key === 'End') {
      event.preventDefault();
      items[items.length - 1]?.focus();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      closeMenu(true);
    } else if (event.key === 'Tab') {
      setOpen(false);
    }
  };

  return (
    <div className={`lang-switch ${className}`.trim()} ref={rootRef}>
      <button
        type="button"
        className="lang-switch-button"
        ref={buttonRef}
        aria-label={t('lang.change')}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => (open ? closeMenu(false) : openMenu('checked'))}
        onKeyDown={onButtonKeyDown}
      >
        <i className="bi bi-globe2" aria-hidden="true" />
        <span className="lang-switch-code">{current === 'fr' ? 'FR' : 'EN'}</span>
      </button>

      {open && (
        <ul
          id={menuId}
          className="lang-menu"
          role="menu"
          aria-label={t('lang.label')}
          ref={menuRef}
          onKeyDown={onMenuKeyDown}
        >
          {OPTIONS.map((option) => {
            const selected = current === option.code;
            return (
              <li key={option.code} role="none">
                <button
                  type="button"
                  role="menuitemradio"
                  aria-checked={selected}
                  onClick={() => select(option.code)}
                >
                  <span>{t(option.labelKey)}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default LanguageToggle;
