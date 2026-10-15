# Harsha Raj Kumar — Software Engineering Portfolio

React/Vite portfolio presenting selected software projects, Vanderbilt experience, and open-source contributions.

Portfolio URL: https://hashadev.duckdns.org/ (publishing the current local revision requires GitHub access).

## Selected work

- PulseStream: telemetry ingestion, PostgreSQL persistence, and API-level failure testing.
- Proofdesk: collaborative textbook authoring, browser previews, and queued builds; includes a live-app link.
- CodeGraph: published dependency/call-graph and change-impact CLI.
- Additional links: collaborative LSM-tree maintenance, Satya, Engram, and a merged PyTorch contribution.

The homepage leads with a real Proofdesk screenshot and compact links to two merged PyTorch contributions. Project case studies identify personal contributions, engineering decisions, evidence, and limitations. The project section contains three hands-on demos: a small XML authoring preview; a clearly labeled browser-state pipeline model; and real CodeGraph impact traversal on a hand-authored sample graph. CodeGraph core/analysis code is vendored with its MIT license and source commit in `src/demos/codegraph/`. No full repository indexing, Kafka broker, PostgreSQL service, or collaborative Proofdesk backend runs inside these demos. Local benchmark results are not presented as production capacity.

## Development

```sh
npm ci
npm run dev
npm run build
```

Source: `src/App.jsx` and `src/index.css`. Static assets: `public/`. Production build: `dist/`.

## Deployment

The existing GitHub Actions workflow builds pushes to main and publishes the build to GitHub Pages with the configured custom domain. Preserve the workflow and domain when deploying. The current résumé download is `public/Harsha-Raj-Kumar-Resume.pdf`.

GitHub repository: https://github.com/harsharajkumar-273/Portfolio
