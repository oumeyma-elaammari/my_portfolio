import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from './Contact';
import i18n from '../i18n';

const fillForm = () => {
  userEvent.type(screen.getByLabelText(/your name/i), 'Jane Doe');
  userEvent.type(screen.getByLabelText(/your email/i), 'jane@example.com');
  userEvent.type(screen.getByLabelText(/subject/i), 'Hello');
  userEvent.type(screen.getByLabelText(/message/i), 'Test message');
};

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

test('renders all contact form fields', () => {
  render(<Contact />);
  expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/your email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
});

test('submits the form and shows a success message', async () => {
  global.fetch.mockResolvedValueOnce({ ok: true });
  render(<Contact />);

  fillForm();
  userEvent.click(screen.getByRole('button', { name: /send message/i }));

  expect(await screen.findByText(/your message has been sent/i)).toBeInTheDocument();
  expect(global.fetch).toHaveBeenCalledWith(
    'https://formspree.io/f/mdapneeo',
    expect.objectContaining({ method: 'POST' })
  );
});

test('shows an error message when the request fails', async () => {
  global.fetch.mockResolvedValueOnce({ ok: false });
  render(<Contact />);

  fillForm();
  userEvent.click(screen.getByRole('button', { name: /send message/i }));

  expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
});

test('shows French form labels and the French success message', async () => {
  await i18n.changeLanguage('fr');
  global.fetch.mockResolvedValueOnce({ ok: true });
  render(<Contact />);

  userEvent.type(screen.getByLabelText(/votre nom/i), 'Jane Doe');
  userEvent.type(screen.getByLabelText(/votre e-mail/i), 'jane@example.com');
  userEvent.type(screen.getByLabelText(/sujet/i), 'Bonjour');
  userEvent.type(screen.getByLabelText(/^message$/i), 'Message de test');
  userEvent.click(screen.getByRole('button', { name: /envoyer/i }));

  expect(await screen.findByText(/votre message a été envoyé/i)).toBeInTheDocument();
});
