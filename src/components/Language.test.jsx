import React from 'react';
import { render, screen, within, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';
import Quote from './Quote';
import Experience from './Experience';
import i18n from '../i18n';

const openLanguageMenu = () => {
  const trigger = screen.getByRole('button', { name: /change language/i });
  userEvent.click(trigger);
  return trigger;
};

test('switches to French from the header and remembers the choice', async () => {
  render(<Header />);

  const trigger = openLanguageMenu();
  expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
  expect(trigger).toHaveAttribute('aria-expanded', 'true');
  expect(trigger.querySelector('.bi-globe2')).toBeTruthy();
  expect(trigger).toHaveTextContent('EN');

  const english = screen.getByRole('menuitemradio', { name: 'English' });
  const french = screen.getByRole('menuitemradio', { name: 'Français' });
  expect(english).toHaveFocus();
  expect(english).toHaveAttribute('aria-checked', 'true');
  expect(french).toHaveAttribute('aria-checked', 'false');

  userEvent.click(french);

  expect(await screen.findByText('Accueil')).toBeInTheDocument();
  expect(document.documentElement.lang).toBe('fr');
  expect(localStorage.getItem('language')).toBe('fr');
  expect(screen.queryByRole('menu')).not.toBeInTheDocument();

  const frenchTrigger = screen.getByRole('button', { name: /changer de langue/i });
  expect(frenchTrigger).toHaveTextContent('FR');
  userEvent.click(frenchTrigger);
  expect(screen.getByRole('menuitemradio', { name: 'Français' })).toHaveAttribute('aria-checked', 'true');
  expect(screen.getByRole('menuitemradio', { name: 'English' })).toHaveAttribute('aria-checked', 'false');
});

test('moves through the language menu with the keyboard and closes it', () => {
  render(<Header />);

  const trigger = openLanguageMenu();
  const english = screen.getByRole('menuitemradio', { name: 'English' });
  const french = screen.getByRole('menuitemradio', { name: 'Français' });

  fireEvent.keyDown(english, { key: 'ArrowDown' });
  expect(french).toHaveFocus();
  fireEvent.keyDown(french, { key: 'ArrowUp' });
  expect(english).toHaveFocus();
  fireEvent.keyDown(english, { key: 'End' });
  expect(french).toHaveFocus();
  fireEvent.keyDown(french, { key: 'Home' });
  expect(english).toHaveFocus();

  fireEvent.keyDown(english, { key: 'Escape' });
  expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  expect(trigger).toHaveFocus();
  expect(trigger).toHaveAttribute('aria-expanded', 'false');

  userEvent.click(trigger);
  expect(screen.getByRole('menu', { name: /language/i })).toBeInTheDocument();
  fireEvent.pointerDown(document.body);
  expect(screen.queryByRole('menu')).not.toBeInTheDocument();

  userEvent.click(trigger);
  fireEvent.keyDown(screen.getByRole('menuitemradio', { name: 'English' }), { key: 'ArrowDown' });
  userEvent.keyboard('{Enter}');
  expect(document.documentElement.lang).toBe('fr');
  expect(screen.queryByRole('menu')).not.toBeInTheDocument();
});

test('opens the mobile menu from the header and returns focus on close', () => {
  render(<Header />);

  const menuButton = screen.getByRole('button', { name: /open menu/i });
  expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  userEvent.click(menuButton);

  const dialog = screen.getByRole('dialog', { name: /mobile navigation/i });
  expect(menuButton).toHaveAttribute('aria-expanded', 'true');
  expect(within(dialog).queryByRole('button', { name: /change language/i })).not.toBeInTheDocument();
  expect(within(dialog).queryByRole('button', { name: /theme/i })).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: /change language/i })).toBeInTheDocument();
  expect(within(dialog).getByRole('link', { name: 'Home' })).toHaveFocus();
  expect(document.body).toHaveClass('mobile-nav-open');
  expect(document.body.style.overflow).toBe('hidden');

  fireEvent.keyDown(document, { key: 'Escape' });
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(menuButton).toHaveFocus();
  expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  expect(document.body).not.toHaveClass('mobile-nav-open');
});

test('shows the same activity dates in French and English', async () => {
  const { unmount } = render(<Experience />);
  const englishDates = screen.getAllByText(/^\d{4} - \d{4}$/).map((node) => node.textContent);
  unmount();

  await i18n.changeLanguage('fr');
  render(<Experience />);
  const frenchDates = screen.getAllByText(/^\d{4} - \d{4}$/).map((node) => node.textContent);

  expect(frenchDates).toEqual(englishDates);
  expect(frenchDates).toEqual(['2024 - 2025', '2023 - 2024', '2024 - 2025', '2024 - 2025']);
});

test('keeps the Arabic quote unchanged when the interface language changes', async () => {
  await i18n.changeLanguage('fr');
  render(<Quote />);

  const quote = document.querySelector('.quote-content');
  expect(quote).toHaveAttribute('lang', 'ar');
  expect(quote).toHaveAttribute('dir', 'rtl');
  expect(quote).toHaveTextContent('نسير في الدنيا');
  expect(document.documentElement.lang).toBe('fr');
});
