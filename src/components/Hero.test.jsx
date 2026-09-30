import React from 'react';
import { act, render, screen } from '@testing-library/react';
import i18n from '../i18n';
import Hero from './Hero';

test('opens the resume that matches the active language', async () => {
  await act(async () => {
    await i18n.changeLanguage('en');
  });
  render(<Hero />);

  const englishResume = screen.getByRole('link', { name: 'Download my resume' });
  expect(englishResume).toHaveAttribute('href', expect.stringContaining('cv_oumeyma_elaammari_en.pdf'));
  expect(englishResume).toHaveAttribute('target', '_blank');
  expect(englishResume).toHaveAttribute('rel', 'noopener noreferrer');

  await act(async () => {
    await i18n.changeLanguage('fr');
  });

  const frenchResume = screen.getByRole('link', { name: 'Télécharger mon CV' });
  expect(frenchResume).toHaveAttribute('href', expect.stringContaining('cv_oumeyma_elaammari_fr.pdf'));
  expect(frenchResume).toHaveAttribute('target', '_blank');
  expect(frenchResume).toHaveAttribute('rel', 'noopener noreferrer');
});
