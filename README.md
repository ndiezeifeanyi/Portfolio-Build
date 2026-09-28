# Ndibueze Chibuzor Portfolio

An editorial, data-driven personal portfolio for Ndibueze Ifeanyichukwu Chibuzor: microbiology, public health research, data science, machine learning, and AI-enabled digital health.

## Information architecture

- Home: identity, current direction, key actions, and focus areas
- About: the progression from microbiology and public health into computational work
- Education: B.Sc. Microbiology, academic context, and a bridge into professional learning
- Research: undergraduate research project and future research interests
- Projects: featured MedSought AI work, scoped to the ML/AI conversational layer
- Experience: OneForma AI data/evaluation work and a future-ready professional timeline
- Leadership: Microbiology Association leadership and a slot for NYSC/service details
- Skills: grouped tools and methods without arbitrary proficiency percentages
- Learning: M4ACE, WorldQuant University, DataCamp, and AWS learning context
- Writing: a ready-to-grow space for technical and research notes
- Beyond the CV: running, books, podcasts, learning, helping others, and persistence
- Contact: conversation CTA, social placeholders, and stable CV download path

## Content updates

Most content lives in [`src/content/site.ts`](src/content/site.ts). Add or update projects, research entries, skills, learning items, leadership details, achievements, and writing there without changing layout code.

Replace the placeholder CV at `public/cv/ndibueze-cv.pdf` with the latest PDF. Keep the filename stable so both download buttons continue to work.

## Admin access

Open `/admin` and sign in with the password configured in `.env.local`:

```bash
ADMIN_PASSWORD=use-a-long-private-password
ADMIN_SESSION_SECRET=use-a-long-random-secret
```

The admin area lets you update the public name, headline, introduction, location, email, phone, LinkedIn, GitHub, additional links, and CV PDF. Profile edits are stored in `data/profile.json`; CV uploads replace `public/cv/ndibueze-cv.pdf`.

This local file-backed editor is appropriate for a self-hosted or local deployment. Vercel's filesystem is ephemeral, so production deployment should move `data/profile.json` to a persistent database and the CV to object storage.

Before publishing, replace the following intentionally open content:

- LinkedIn URL, GitHub URL, and email address
- Final CV PDF
- Research design, sample/data details, analysis, and findings
- MedSought AI repository/demo links and project outcomes
- OneForma dates, project names, and platform-specific outcomes
- WorldQuant University, DataCamp, AWS, and M4ACE programme details/certificates
- Professional experience, NYSC, volunteering, and service entries
- Writing entries and any future project media
- Deployed origin in `public/sitemap.xml`

## Local development

Once dependencies are available:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

The root-level `preview.html` is a temporary visual QA page only; the production entry point is `src/app/page.tsx`.
