# Protfoliowebsoterithik

Recruiter-focused portfolio website for Rithik Reddy Varla, organized around four hiring categories:

- Data Engineer
- Data Analytics
- BI Analyst
- Machine Learning

## Tech Stack

- React
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React

## Current Experience

- Recruiter View with fast evidence highlights
- Role coverage summary across 13 public GitHub repositories
- Searchable and filterable project portfolio
- Project brief panel with recruiter read, proof points, tech stack, and direct GitHub links
- Professional light/dark mode
- Skills, experience, education, metrics, certifications, and contact sections
- Google Analytics support through `VITE_GA_MEASUREMENT_ID`

## Setup

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Production Build

```bash
npm run build
npm run preview
```

## GitHub Pages Deployment

```bash
npm run build
npx gh-pages -d dist
```

## Visitor Analytics

Create a Google Analytics 4 web data stream and add the measurement ID to a local `.env` file before building:

```bash
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Analytics can show page views, timestamps, traffic sources, approximate locations, devices, and custom events such as project opens and contact link clicks.
