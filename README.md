# Protfoliowebsoterithik

Interactive recruiter-focused portfolio website for Rithik Reddy Varla, a Data Engineer / Cloud Data Engineer / BI-focused Data Professional based in Orlando, FL.

## Tech Stack

- React
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React

## Features

- Animated hero with typing effect
- Sticky navigation with active section highlighting
- Dark and light mode support
- Recruiter Mode for fast candidate highlights
- Filterable project cards and project detail modals
- Animated skills tabs
- Scroll-revealed experience timeline
- Clickable metric cards with micro-interactions
- Contact form UI with validation
- Responsive mobile menu
- Subtle animated grid and particle background

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

## Deployment

### Vercel

1. Push this repository to GitHub.
2. Import the repository in Vercel.
3. Use the default Vite settings:
   - Build command: `npm run build`
   - Output directory: `dist`

### GitHub Pages

```bash
npm run build
npm install --save-dev gh-pages
npx gh-pages -d dist
```

## Visitor Analytics

This site supports Google Analytics 4. Create a Google Analytics web data stream, then add the measurement ID to a local `.env` file before building:

```bash
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

After deploying that build, Google Analytics can show page views, dates, times, traffic sources, approximate locations, devices, and custom events such as project opens and contact link clicks. It cannot identify a visitor's real name unless that person submits contact information or otherwise identifies themselves.

## Screenshots

Add production screenshots here after deployment:

- Desktop hero
- Projects section
- Mobile navigation

## Repository

Suggested remote:

```bash
git remote add origin https://github.com/rithikreddyvarla19/Protfoliowebsoterithik.git
git push -u origin main
```
