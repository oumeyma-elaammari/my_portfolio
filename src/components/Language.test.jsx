import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';
import Quote from './Quote';
import Experience from './Experience';
import i18n from '../i18n';

test('switches to French from the header and remembers the choice', async () => {
  render(<Header />);

  const french = screen.getByRole('button', { name: 'Français' });
  french.focus();
  expect(french).toHaveFocus();

  userEvent.click(french);

  expect(await screen.findByText('Accueil')).toBeInTheDocument();
  expect(document.documentElement.lang).toBe('fr');
  expect(localStorage.getItem('language')).toBe('fr');
  expect(screen.getByRole('button', { name: 'English' })).toHaveAttribute('aria-pressed', 'false');
  expect(screen.getByRole('button', { name: 'Français' })).toHaveAttribute('aria-pressed', 'true');
});

test('shows the language switch in the mobile menu', () => {
  render(<Header />);

  userEvent.click(screen.getByRole('button', { name: /open menu/i }));

  const dialog = screen.getByRole('dialog', { name: /mobile navigation/i });
  expect(within(dialog).getByRole('group', { name: /language/i })).toBeInTheDocument();
  expect(within(dialog).getByRole('button', { name: 'Français' })).toBeInTheDocument();
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
