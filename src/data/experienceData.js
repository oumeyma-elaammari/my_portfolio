export const experienceData = [
  {
    id: 1,
    type: 'internship',
    title: 'Business Process Automation Intern (PFA)',
    company: 'Novelis, Oujda',
    period: 'July – August 2026',
    technologies: ['Power Automate', 'SharePoint', 'Outlook', 'Excel', 'LaTeX'],
    bullets: [
      'Designed and developed a generic business-process automation solution using Power Automate, SharePoint, Outlook, and Excel — covering request validation, notifications, and status tracking with a role-based approach for reusability',
      'Designed SharePoint list architectures with detailed field definitions to support multiple business workflows',
      'Produced comprehensive technical documentation in LaTeX with custom diagrams'
    ]
  },
  {
    id: 2,
    type: 'internship',
    title: 'Full-Stack Development Intern',
    company: 'Cleverix, Morocco',
    period: 'July 2025',
    technologies: ['React', 'Laravel', 'MySQL'],
    bullets: [
      'Developed a full-stack e-commerce application using React and Laravel',
      'Designed and implemented an admin dashboard for user, product, and order management',
      'Implemented secure authentication and role-based access control'
    ]
  }
];

export const activitiesData = [
  {
    id: 1,
    title: 'Club Altruisme · ENSAO',
    details: [
      'Head of Al-Masjid Cell (2024 - 2025)',
      'Vice President (2023 - 2024)',
      'Active Member - Design & Editing Cell'
    ]
  },
  {
    id: 2,
    title: 'Club Génie Informatique · ENSAO',
    details: [
      'Active Member - Design Cell',
      'Participation in the organization of Computer Science Day (4th edition, 2024 - 2025)'
    ]
  },
  {
    id: 3,
    title: "Maison des Sciences de l'Oriental",
    details: [
      'Participation in the Science Festival (12th edition, 2024 - 2025)'
    ]
  }
];

export const internshipCount = experienceData.filter(
  (item) => item.type === 'internship'
).length;
