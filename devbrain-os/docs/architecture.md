# Architecture

This document describes how DevBrain OS is structured, and why. It will
grow alongside the project — see `docs/adr/` for the record of individual
decisions, and `CHANGELOG.md` for what shipped on which day.

## Vision (why this project exists)

DevBrain OS is the "Engineering Brain" for a software project: a single,
structured place for architecture, standards, ADRs, API contracts, and
decisions — readable by both humans and AI coding assistants. The problem
it solves is that AI tools currently re-derive (or hallucinate) project
context on every session instead of reading it from one durable source.

## Current folder structure (Day 1)

```
devbrain-os/
├── docs/                    # Everything about the project itself
│   ├── architecture.md      # This file
│   └── adr/                 # Architecture Decision Records, one per decision
├── src/
│   ├── app/                 # Routes only (Next.js App Router). Kept thin.
│   │   ├── layout.tsx       # Root layout: fonts, <html>/<body>, global providers later
│   │   ├── page.tsx         # "/" route — today, the landing page
│   │   └── globals.css      # Design tokens (color, type) + Tailwind import
│   ├── components/
│   │   ├── ui/              # Generic, reusable primitives (Button, Input, Card...)
│   │   │                    # No feature knowledge lives here.
│   │   └── brain-graph.tsx  # Brand-specific components live directly in components/
│   └── lib/
│       └── utils.ts         # Cross-cutting helpers (cn(), later: db client, auth helpers)
├── CONTRIBUTING.md
├── CHANGELOG.md
└── README.md
```

### Why `app/` stays thin

Route files (`page.tsx`, `layout.tsx`) should mostly assemble components,
not contain business logic. That keeps routing concerns (what URL shows
what) separate from UI concerns (how it's built) and logic concerns
(where the data comes from) — three different reasons to change a file,
kept in three different places.

### Why `components/ui/` is separate from feature components

`components/ui/` holds primitives with zero knowledge of DevBrain OS
features — a `Button` doesn't know what an "Organization" or a "Project"
is. Feature components (added as we build Auth, Projects, the Engineering
Brain, etc.) will live in their own folders and compose these primitives.
This is what lets the design system evolve independently of any single
feature, and what stops a Button-level tweak from requiring changes in
ten unrelated feature folders.

## Planned structure (introduced only when the corresponding module is built)

- `src/app/(auth)/` — sign-in/sign-up routes, grouped so they can share an
  auth-specific layout without affecting the URL.
- `src/app/(dashboard)/` — the authenticated app shell (orgs, teams,
  projects).
- `prisma/` — database schema, once a real data layer is introduced.
- `src/server/` or `src/app/api/` — Route Handlers for AI calls, repo
  analysis jobs, and webhooks.

We are deliberately **not** creating these folders yet. Introducing
structure before the feature that needs it tends to produce folders whose
shape is guessed rather than earned by real requirements — and it adds
navigation overhead for a feature that doesn't exist yet.

## Design tokens

Colors and fonts are defined once, as CSS variables, in
`src/app/globals.css`, and consumed everywhere else via Tailwind's
`@theme inline` mapping (e.g. `bg-background`, `text-accent`). See that
file's header comment for the current palette and the reasoning behind
it.
