# Contributing to DevBrain OS

## Getting started

```bash
npm install
npm run dev
```

The app runs at http://localhost:3000.

## Commit conventions

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` — a new feature
- `fix:` — a bug fix
- `refactor:` — code change that neither fixes a bug nor adds a feature
- `docs:` — documentation only
- `test:` — adding or fixing tests
- `chore:` — tooling, dependencies, config

Keep commits small and scoped to one logical change — this repo is meant
to read like a real, incrementally-built project, not a series of
mega-commits.

## Before opening a PR

```bash
npm run lint
npx tsc --noEmit
npm run build
```

All three should pass cleanly.

## Documentation

- Record any non-trivial technical decision as an ADR in `docs/adr/`
  (copy the format of `docs/adr/0001-tech-stack.md`).
- Update `docs/architecture.md` when the folder structure changes.
- Add an entry to `CHANGELOG.md` under `Unreleased` for any user- or
  developer-facing change.
