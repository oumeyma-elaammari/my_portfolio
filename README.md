# Oumeyma ELAAMMARI - Portfolio

Personal portfolio of Oumeyma ELAAMMARI, a Software Engineering student at ENSA Oujda specializing in full-stack development and artificial intelligence. The site presents her background, skills, certifications, academic projects and a contact form, and is built as a single-page React application.

## Stack

- **React 19** with **Create React App** (`react-scripts`)
- **Bootstrap 5** / **react-bootstrap** for layout utilities
- **Bootstrap Icons** for iconography
- **AOS** (Animate On Scroll) for scroll animations
- **Typed.js** for the animated hero tagline
- **react-scroll** for smooth in-page navigation
- **react-icons** for social icons
- **Formspree** as the contact form backend
- **@testing-library/react** + **Jest** for unit tests

## Project structure

```
public/            Static assets served as-is (index.html, manifest, videos, robots/sitemap)
src/
  assets/          Images (WebP) and the downloadable CV (PDF)
  components/      One component per section (Header, Hero, About, Resume, Skills,
                    Certificates, Portfolio, Services, Contact, Quote, Footer)
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

Runs the app in development mode at [http://localhost:3000](http://localhost:3000). The page reloads on changes.

### Running tests

```bash
npm test
```

Launches Jest in interactive watch mode. Unit tests currently cover the Contact form (submission, success/error states) and the Portfolio project filter.

### Production build

```bash
npm run build
```

Builds an optimized, minified production bundle into the `build/` folder, ready to be deployed to any static host.

## Deployment

The app is a static bundle (output of `npm run build`) and can be deployed to any static hosting provider, for example:

- **Netlify**: drag-and-drop the `build/` folder in the Netlify dashboard, or connect the repository and set the build command to `npm run build` with publish directory `build`.
- **Vercel**: import the repository and Vercel will auto-detect the Create React App preset (build command `npm run build`, output directory `build`).
- **GitHub Pages**: add a `homepage` field to `package.json`, install `gh-pages`, and run `npm run build` followed by `npx gh-pages -d build`.

After the first deployment, update the placeholder URL in `public/sitemap.xml` with the real domain.

## Contact form

The contact form (`src/components/Contact.jsx`) submits to a [Formspree](https://formspree.io/) endpoint. To point it at a different Formspree form (or another backend), update the `fetch` URL in that component.
