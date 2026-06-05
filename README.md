# Protfoliowebsoterithik

Recruiter-focused portfolio website for Rithik Reddy Varla, positioned for Data Engineer, Data Scientist, and ML Engineer roles and organized around four project evidence categories:

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
- Visitor review form with structured email output
- Downloadable Excel review tracker at `public/visitor-review-tracker.xlsx`
- Interactive data-network canvas background
- Professional light/dark mode
- Skills, experience, education, metrics, certifications, and contact sections
- Google Analytics support through `VITE_GA_MEASUREMENT_ID`
- Microsoft Clarity support through `VITE_CLARITY_PROJECT_ID`
- HubSpot website visits support through `VITE_HUBSPOT_PORTAL_ID`

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

## Session Recordings and Heatmaps

Create a Microsoft Clarity project for the portfolio site, then copy the project ID from the Clarity tracking code and add it before building:

```bash
VITE_CLARITY_PROJECT_ID=XXXXXXXXXX
```

Clarity can show anonymous session recordings, click maps, scroll maps, and heatmaps, which is useful for seeing whether visitors spend time on projects, architecture details, contact links, or role filters. Microsoft notes that Clarity should not be used on websites or apps targeting users under 18 globally, so keep this portfolio positioned as a professional recruiting site.

## Company-Level Visitor Tracking

Create a free HubSpot account, copy the tracking code, and add the portal/account ID from the script before building:

```bash
VITE_HUBSPOT_PORTAL_ID=XXXXXXXX
```

HubSpot's website visits tool uses the HubSpot tracking code to detect page views and surface publicly available company information associated with a visitor's IP address when available. HubSpot notes that small companies and individual visitors may appear as an internet service provider instead of a company, and ad blockers can interfere with tracking. After the code is active, review visitor-company data in HubSpot under Reporting -> Analytics Tools -> Website Visits or Prospects, depending on the HubSpot navigation shown in your account.
