# Public-page SEO rollout — 2026-10-17

## Findings and implementation

Production was already partly server-rendered; the checkout was behind origin/main. Reconciled at 65c97ec. The initial audit's canonical meta bug was already fixed upstream. The actual remaining problems were empty source HTML on dictionary/static/tool routes, incomplete discovery, and fallback 200 responses for missing pages.

- Extended Cloudflare Pages React SSR to the dictionary, alphabet/pagination pages, wall, generators, and public static pages. Existing term/home rendering and API contract protections remain.
- Built a validated public catalog of 1,157 published terms. All entries are reachable through real HTML anchors, including numeric initial characters, and deterministic pages of 40 entries. Search remains available.
- Sitemap now contains 1,242 unique canonical URLs, including all 1,157 terms. Removed invented wall-detail entries and arbitrary last-modified dates. Term lastmod uses actual content timestamps.
- Page-specific metadata and canonical URLs exist in response HTML. Pagination is self-canonical. Unknown public pages return 404; legacy wall-detail URLs redirect to the wall. Search/admin/confirmation routes carry an HTTP noindex directive.
- Legal terms now use /terms-of-service; /terms remains the dictionary. Homepage heading and introduction describe the dictionary and link directly to it. Removed the inaccurate 2,000+ term claim.
- React hydrates the server payload; navigation loads the matching document so initial data cannot leak across routes.

## Build and content updates

Run `pnpm build:web` and `pnpm test:seo`. Build retrieves public published listings from api.learnings.org, partitioned by initial letter. It checks every slug for uniqueness and verifies the resulting total against the published counts endpoint. This partitioning avoids a duplicate-title boundary encountered in the API's existing title-only cursor. If content changes mid-build or a cursor skips an entry, the count check fails the build rather than silently dropping terms.

The catalog is a deployment snapshot, not a live database replica. After approving, editing, or removing dictionary entries, rebuild and deploy the frontend to refresh directory excerpts and sitemap. Individual term pages still read current published API content. No database migration or API Worker deployment is needed for this change. A later publication hook can automate frontend rebuilds.

Generated catalog.json is ignored by git and created during every frontend build. The Pages Worker derives the sitemap from the same catalog. The old hand-maintained public/sitemap.xml has been removed; the Worker is the only sitemap source.

## Verification

- Existing frozen home/term SSR suite: 17 checks, including invalid upstream data, unsafe links, serialization, missing terms and dependency failures.
- SEO suite: enumerates every dictionary URL from the sitemap, verifies its canonical and term anchors, and confirms all 1,157 terms occur exactly once across unfiltered directory pagination. Checks static SSR, 404s, redirects, HEAD, method restrictions and noindex headers.
- Live API smoke checks: home, wall, generator hub, term detail all render successfully.
- Browser preview: alphabet C page 2 -> next page -> Cross-training detail, no browser errors/hydration warnings.
- Search Console domain property now exists. On October 17 it reports data processing for performance, indexing and experience, so historical indexing causes cannot yet be attributed precisely.

## Deployment and rollback

Cloudflare Pages project: learnings; hostname: learnings-b6y.pages.dev; production branch: main. Existing production before this rollout: 05ba145a-b439-49f5-8ec3-0bd4a403085c (65c97ec). Keep this deployment available for rollback in Cloudflare Pages if production verification fails. DNS, API Worker, database, secrets and bindings are unchanged.

Deploy a branch preview first with `wrangler pages deploy apps/web/dist --project-name learnings --branch codex/seo-public-pages`. Production can deploy from main through the existing Git integration or via `wrangler pages deploy apps/web/dist --project-name learnings --branch main` after verification. Do not deploy the API's old wrangler configuration: it is unrelated to this frontend work.

## Remaining measurement and editorial work

Search Console needs to collect data. Submit https://learnings.org/sitemap.xml after production verification, inspect key URLs and use the indexing report when available. Technical crawlability is not a promise of rankings or that every published entry deserves indexing. The dictionary includes repeated titles, generic generated definitions, and near-duplicate variations. Content consolidation/enrichment needs editorial judgment; this rollout does not fabricate examples or bulk-delete existing entries. Build a priority list from actual search impressions and indexing outcomes when available. Core Web Vitals field data is also not yet available in the new property.
