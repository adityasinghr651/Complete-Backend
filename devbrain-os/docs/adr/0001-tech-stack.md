# ADR 0001: Core Tech Stack

**Status:** Accepted
**Date:** 2026-07-17

## Context

DevBrain OS needs a foundation that supports:

- A marketing/landing surface (public, SEO-relevant, fast).
- An authenticated app surface (dashboards, editors, AI chat) added later.
- Server-side logic (auth, AI calls, repository analysis) without standing
  up a separate backend service on day one.
- A path to production deployment without custom infra work.

## Decision

We are using:

- **Next.js (App Router) + TypeScript** — one framework for both the
  public site and the authenticated app, with Server Components for
  data-heavy pages and Route Handlers for API-style endpoints
  (webhooks, AI streaming, repo analysis jobs) instead of a separate
  Express/Nest service. This avoids a second deployable, a second auth
  boundary, and a second set of environment variables to keep in sync.
- **Tailwind CSS v4** — utility-first styling with design tokens
  expressed as CSS variables (`src/app/globals.css`), so the visual
  language (colors, type) has one source of truth instead of being
  duplicated across components.
- **clsx + tailwind-merge** (`src/lib/utils.ts`) — the standard pairing
  for building conditional class names without class-order bugs.

## Alternatives Considered

- **Remix** — comparable App Router-style model, smaller ecosystem for
  AI/RAG tooling and Vercel-adjacent deployment docs we'll lean on later.
- **Vite + Express/Nest backend** — more control, but doubles the
  deployables and auth surface for no benefit at our current stage.
- **Plain CSS Modules / styled-components** — more boilerplate per
  component than utility classes, and no built-in design-token story
  as clean as Tailwind's `@theme`.

## Consequences

- All future features (auth, projects, Engineering Brain, AI chat)
  live inside `src/app`, using Server Components by default and
  `"use client"` only where interactivity requires it.
- Any new color, spacing, or type decision should be added to
  `src/app/globals.css` as a token, not hardcoded in a component.
- We accept Next.js's opinions (file-system routing, React Server
  Components, its caching model) as given; deviating from them later
  would need its own ADR.
