# Vacation Dashboard

Next.js static-export dashboard for `Vacation Cafe Simulator` product feedback analysis.

## Active project state

- Source-of-truth branch: `vacation-cafe-dashboard`
- GitHub Pages URL: `https://codeavd.github.io/vacation_dashboard/`
- Deployment flow: push to `vacation-cafe-dashboard` -> GitHub Actions builds `out/` -> Pages publishes the artifact

## Runtime

- App Router entry: `app/page.tsx`
- Server bootstrap: `lib/dashboard-bootstrap.ts`
- Client dataset fetch: `public/dashboard-data.generated.json`

## Data pipeline

- Canonical dataset: `dashboard-data.generated.json`
- Public runtime copy: `public/dashboard-data.generated.json`
- Optional local-only raw imports: `iinfo/`
- Rebuild command: `pnpm data:build`

The generator rebuilds the dashboard dataset from checked-in canonical data plus any local `iinfo/` artifacts that are present on the machine. Raw import files are intentionally gitignored.

## Commands

- `pnpm install`
- `pnpm data:build`
- `pnpm test`
- `pnpm lint`
- `pnpm build`

## Notes

- The repository no longer relies on the old standalone HTML dashboard or committed `next export` artifacts.
- Published assets are produced during CI from the current Next.js app rather than being committed to the branch.
