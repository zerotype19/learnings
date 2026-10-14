# Learnings source recovery candidate

Engineering candidate only. No branch push, preview, source rollout or production configuration change has occurred. Cloudflare automatically deploys every branch; pushing this branch requires the review gate.

Base: zerotype19/learnings 0e51cf6b983ec53ae611668f67e3fbb3feaf7986, matching production Pages deployment 1d786c69-5acb-43ff-a2fc-59079a06e6dd. The frontend Pages project is `learnings` (learnings-b6y.pages.dev), found on page 2 of the account project listing. DNS and the API Worker remain unchanged.

The initial public homepage is an empty React shell. Its twenty feed entries arrive from a cross-origin API that the existing Optiview browser acquisition deliberately does not permit. Term HTML also inherits the homepage canonical. The candidate renders the first complete public feed page and term/related/variation content through React SSR, hydrates the same frozen payload, uses actual destination anchors and emits route-specific canonicals. It does not claim that the first twenty entries are the entire paginated archive.

API requests use a fixed origin and paths, no visitor credentials, reject redirects, impose an 8-second timeout and 2MB body cap, and validate payload identity/schema. A partial page with a continuation cursor, duplicates, missing required destinations, malformed tags and dependency errors fail with noncacheable 503. A missing term returns 404. An absent optional term `links` field matches the actual API contract and yields the existing explicit no-examples state; no examples are fabricated. The renderer does not bypass any Optiview review or publishing gate.

Run `pnpm build:web` then `node scripts/test-source-recovery.mjs`. Frozen captures and receipts are in this directory. `node scripts/preview-source-recovery.mjs` serves a local browser preview with external connections/scripts blocked. Existing analytics and the unused App-level terms fetch are blocked in this preview; they are not evidence of failed SSR hydration. Real browser inspection found 20 feed cards and their 20 links, hydrated term definition and five related destinations.

The initial draft failed against actual API shapes: feed summaries lack full term definitions, variations encode tags as JSON text, and absent term links are omitted. These failures were corrected, not hidden by synthetic fixture changes. Test receipts include failure cases. Build warnings concern outdated browser compatibility data. The Optiview parser remains unchanged and the separate ticker patch remains excluded.

Acquisition is credentialless, not a zero-write guarantee: the existing term GET increments views. Frozen captures avoid repeating that operation for local testing. No content, approval, permissions or publication writes are part of this candidate.

Rollback proposal after separate rollout GO: restore the existing Pages production deployment 1d786c69-5acb-43ff-a2fc-59079a06e6dd, verify original shell/assets and both canonical responses, and recheck the unchanged API Worker, Optiview route, publications and approval state. Do not change DNS, API, database or Optiview bindings. If identity has changed, stop for reconciliation instead of retrying. Rollback has not been executed; no deployment has occurred.
