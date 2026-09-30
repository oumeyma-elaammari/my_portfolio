import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Portfolio from './Portfolio';
import i18n from '../i18n';

test('renders all projects by default', () => {
  render(<Portfolio />);
  expect(screen.getByText('SmarTest')).toBeInTheDocument();
  expect(screen.getByText('My-Store')).toBeInTheDocument();
  expect(screen.getByText('RoadmapDev')).toBeInTheDocument();
  expect(screen.getByText('RhVerse')).toBeInTheDocument();
  expect(screen.getByText('ArchvoxLib')).toBeInTheDocument();
  expect(screen.getByText('MemoPharma')).toBeInTheDocument();
  expect(screen.getByText('CBIR - Image Retrieval System')).toBeInTheDocument();
});

test('filters projects by category when a filter is selected', async () => {
  render(<Portfolio />);

  userEvent.click(screen.getByRole('button', { name: 'Mobile Apps' }));

  await waitFor(() => {
    expect(screen.queryByText('RoadmapDev')).not.toBeInTheDocument();
  });

  expect(screen.getByText('RhVerse')).toBeInTheDocument();
  expect(screen.queryByText('ArchvoxLib')).not.toBeInTheDocument();
  expect(screen.queryByText('My-Store')).not.toBeInTheDocument();
  expect(screen.queryByText('SmarTest')).not.toBeInTheDocument();
});

test('filters projects with the French category label', async () => {
  await i18n.changeLanguage('fr');
  render(<Portfolio />);

  userEvent.click(screen.getByRole('button', { name: 'Applications mobiles' }));

  await waitFor(() => {
    expect(screen.queryByText('RoadmapDev')).not.toBeInTheDocument();
  });

  expect(screen.getByText('RhVerse')).toBeInTheDocument();
  expect(screen.getByText(/développeuse Full-Stack/i)).toBeInTheDocument();
});
