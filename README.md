# Harsha Raj Kumar — Software Engineering Portfolio

Single-page React portfolio built with Vite and framer-motion.

Live site: https://hashadev.duckdns.org/

## What's on the page

- **Hero** with a Proofdesk screenshot and links to GitHub, LinkedIn, Medium, and the résumé.
- **Highlights** drawn from measured results (PulseStream local run, merged PyTorch fixes).
- **Projects carousel** with filters (Systems, Developer tools, Hackathons). Flagship projects open a popup with engineering notes and, where available, a hands-on demo:
  - PulseStream: browser-state model of an ingestion pipeline (clearly labeled as a model).
  - Proofdesk: small XML authoring preview.
  - CodeGraph: real impact traversal over a hand-authored sample graph (vendored core under `src/demos/codegraph/`, MIT licensed).
  - LSM-Tree: engineering notes.
- **Experience**, **open source**, **writing**, **education and toolkit**, and a contact block.

No Kafka broker, PostgreSQL service, or collaborative Proofdesk backend runs inside the demos. Local benchmark results are not presented as production capacity.

## Development

```sh
npm ci
npm run dev       # dev server
npm run build     # production build in dist/
npm run preview   # serve the build on :4173
npm run lint
```

Source lives in `src/App.jsx` (content and components) and `src/index.css` (styles). Static assets, writing pages, and PDFs are in `public/`.

## Deployment

A GitHub Actions workflow builds pushes to `main` and publishes `dist/` to GitHub Pages with the custom domain configured in `public/CNAME`. The résumé download is `public/Harsha-Raj-Kumar-Resume.pdf`.

Repository: https://github.com/harsharajkumar-273/Portfolio
