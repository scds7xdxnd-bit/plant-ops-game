# Process Design: Basis to Plant

Browser prototype and Obsidian planning vault for a chemical process engineering training game.

The MVP puts the player in the role of a junior process engineer. The player reads a simplified Basis of Design or Design Basis Memorandum for the fictional Solvex-A specialty chemical plant, selects early process design decisions, submits the design review, and receives senior engineer feedback.

## Current Prototype

- Vite, React, and TypeScript browser app
- Zustand state store
- YAML scenario loading
- Deterministic scoring logic
- Solvex-A level 1 design-basis exercise
- Obsidian vault for planning notes, ADRs, scope, and scenario design

## Local Development

```sh
npm install
npm run dev
```

Useful checks:

```sh
npm run test
npm run build
```

## Repository Layout

```text
src/
  app/                 App shell and route-level screen selection
  assets/              Runtime images, icons, and other visual assets
  components/          Shared React components used across features
  content/             Runtime scenario content and loaders
  domain/              Pure game/domain logic with no React dependency
  features/            UI features grouped by gameplay area
  store/               Zustand game state
  styles/              Global app CSS
  tests/               Unit tests

plant-ops-game-vault/  Obsidian planning vault and design source material
```

## Content Source Rule

The Obsidian vault is the human-readable design source. Runtime scenario data used by the app lives under `src/content/scenarios/` so it can be imported, tested, and bundled by Vite.

When scenario content changes, keep the app YAML and the matching vault scenario note/file intentionally synchronized until a validation or content pipeline exists.
