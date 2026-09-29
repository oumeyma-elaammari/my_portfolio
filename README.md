# Oumeyma ELAAMMARI - Portfolio

Personal portfolio of Oumeyma ELAAMMARI, a Software Engineering student at ENSA Oujda specializing in full-stack development and artificial intelligence. The site presents her background, experience, skills, certifications, projects and a contact form. Live site: [https://my-portfolio-eo.vercel.app/](https://my-portfolio-eo.vercel.app/).

## Stack

- **React 19** with **Create React App** (`react-scripts`)
- **Bootstrap 5** CSS utilities for layout
- **Bootstrap Icons** and **react-icons** for iconography
- **AOS** (Animate On Scroll) for scroll animations
- **Typed.js** for the animated hero tagline
- **react-scroll** for smooth in-page navigation
- **Formspree** as the contact form backend
- **@testing-library/react** + **Jest** for unit tests

## Project structure

```
public/            Static assets (index.html, manifest, videos, robots.txt, sitemap.xml)
src/
  assets/          Images (WebP) and the downloadable CV (PDF)
  components/      One component per section (Header, Hero, Stats, About, Experience,
                    Portfolio, Skills, Certificates, Contact, Quote, Footer)
  data/            Shared data (skills, experience, certificates)
  styles/          One CSS file per component
```

## Getting started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development server

```bash
npm start
```

Runs the app in development mode at [http://localhost:3000](http://localhost:3000).

### Running tests

```bash
npm test
```

Unit tests cover the Contact form and the Portfolio project filter.

### Production build

```bash
npm run build
```

Builds an optimized production bundle into the `build/` folder.

## Deployment

Static hosting (Vercel / Netlify / similar):

- Build command: `npm run build`
- Output directory: `build`

Current production URL: `https://my-portfolio-eo.vercel.app/`

## Contact form

The contact form (`src/components/Contact.jsx`) submits to a [Formspree](https://formspree.io/) endpoint. Update the `fetch` URL in that component to point to another form if needed.
