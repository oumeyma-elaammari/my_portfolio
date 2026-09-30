export const experienceData = [
  {
    id: 1,
    type: 'internship',
    company: 'Novelis, Oujda',
    technologies: ['Power Automate', 'SharePoint', 'Outlook', 'Excel', 'LaTeX'],
    titleKey: 'experience.items.1.title',
    periodKey: 'experience.items.1.period',
    bulletKeys: [
      'experience.items.1.bullets.0',
      'experience.items.1.bullets.1',
      'experience.items.1.bullets.2'
    ]
  },
  {
    id: 2,
    type: 'internship',
    company: 'Cleverix, Morocco',
    technologies: ['React', 'Laravel', 'MySQL'],
    titleKey: 'experience.items.2.title',
    periodKey: 'experience.items.2.period',
    bulletKeys: [
      'experience.items.2.bullets.0',
      'experience.items.2.bullets.1',
      'experience.items.2.bullets.2'
    ]
  }
];

export const activitiesData = [
  {
    id: 1,
    title: 'Club Altruisme',
    subtitle: 'ENSAO',
    icon: 'bi-heart',
    details: [
      { roleKey: 'experience.activities.1.roles.0', date: '2024 - 2025' },
      { roleKey: 'experience.activities.1.roles.1', date: '2023 - 2024' },
      { roleKey: 'experience.activities.1.roles.2' }
    ]
  },
  {
    id: 2,
    title: 'Club Génie Informatique',
    subtitle: 'ENSAO',
    icon: 'bi-code-slash',
    details: [
      { roleKey: 'experience.activities.2.roles.0' },
      {
        roleKey: 'experience.activities.2.roles.1',
        date: '2024 - 2025'
      }
    ]
  },
  {
    id: 3,
    title: "Maison des Sciences de l'Oriental",
    icon: 'bi-lightbulb',
    details: [
      {
        roleKey: 'experience.activities.3.roles.0',
        date: '2024 - 2025'
      }
    ]
  }
];

export const internshipCount = experienceData.filter(
  (item) => item.type === 'internship'
).length;
