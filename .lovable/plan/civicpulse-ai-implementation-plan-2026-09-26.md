# CivicPulse AI implementation plan

## Product experience
- Replace the template home with CivicPulse AI’s civic-tech experience, using one responsive app shell with distinct citizen and policymaker views.
- Build the Telugu-first citizen request journey: language selection, demo voice request, optional microphone recording, editable AI understanding, confirmation, and request tracking.
- Build a policymaker command center with overview, hotspots, recommendation evidence, lifecycle decisions, impact, data import, insights, audit, privacy, and the guided 15-scene judge demo.
- Add shared country/language controls, clear synthetic-data labels, connector-ready messaging simulation, and accessible responsive navigation.

## Data and services
- Use Lovable Cloud for relational persistence and seed synthetic regions, 150+ requests, facilities, infrastructure/demographics, investment plans, clusters, recommendations, and impact metrics.
- Add validated app APIs/server functions for request analysis, persistence, recommendations, lifecycle updates, analytics, and CSV preview/import; use a deterministic clearly-labelled demo analysis path so judging never depends on a key.
- Add a server-side AI analysis path only if the configured gateway can meet the requested provider behavior; never expose credentials, and preserve a working demo fallback.
- Add real sign-in only where Cloud auth can be configured safely; retain immediate judge access through an explicit demo-role selector.

## Design and verification
- Establish a semantic civic palette and typography in the global design system, then build reusable accessible controls and evidence visualizations.
- Verify the complete citizen-to-hotspot-to-recommendation-to-implementation-to-impact flow, inspect preview errors, and validate the final build.

## Technical decisions
- Keep the app on TanStack Start; use app-internal server functions and TanStack HTTP routes rather than Supabase Edge Functions.
- Keep demo records available in an explicit demo mode; avoid presenting synthetic values or simulated AI as real public data.
- Model roles separately from user profiles and enforce any privileged mutations server-side.
