# Plant Operations Game Vault

This vault is the planning source for a chemical process engineering game about translating simplified design basis documents into early process design decisions.

#### Core Notes

- [[Vault Map]]
- [[Game Vision]]
- [[Game Modes and Scope]]
- [[Design Basis MVP]]
- [[First Plant Scope]]
- [[Chemical Engineering Decision Mapping]]
- [[Level Structure and Difficulty Modes]]
- [[Core Game Loop]]
- [[Player Experience Flow]]
- [[Stakeholder Handoff Model]]
- [[Plant Improvement Simulation]]
- [[Metrics and Formulas]]
- [[Scenario Data Schema]]
- [[Source of Truth]]
- [[Tech Stack Options]]
- [[Infrastructure Decisions]]
- [[Repository Structure]]
- [[AI and Content Pipeline]]
- [[Production Gantt Chart]]
- [[MVP Backlog]]
- [[Roadmap]]
- [[Domain Research Plan]]
- [[Open Questions]]

#### Working Principle

The MVP starts from a simplified Basis of Design or Design Basis Memorandum, not customer complaints or social media feedback.

The player acts as a junior process engineer for a small specialty chemical plant. They read feedstock specs, product targets, site constraints, utility limits, environmental rules, safety standards, and engineering codes. They then select the correct early design decisions for reactors, separation, heat transfer and utilities, process control and safety, and environmental treatment.

The larger plant-improvement simulation remains the long-term goal. The first playable version should teach the translation step from design basis language to process engineering decisions.

#### Current Prototype Status

The browser prototype now has a playable two-mission vertical slice for Solvex-A:

- dashboard-style mission screen with top header, level map, design basis excerpt, decision board, selected decision tray, objective strip, and senior engineer action bar
- design review completion screen with score summary, supported decisions, unsupported decisions, missed decisions, restart action, and gated continue action
- Mission 1: Decode The Design Basis
- Mission 2: The Reactor Runs Hot
- Mission 1 unlocks Mission 2 on pass score, not perfect score
- Mission 2 includes reactor heat-removal, summer cooling-water limitation, temperature control, independent safety protection, and runaway/overpressure review decisions
- dynamic mission header and level map state for current, completed, and locked missions
- pass-based continue action through `advanceToNextMission()`
- design decision cards sorted by display label order and shared presentation helpers
- selected decision tray and design review feedback now resolve labels from the same decision IDs
- Mission 2 design-basis excerpt renders reactor-specific sections instead of only Mission 1 BoD section names
- review score ring and metric cards have compact copy to avoid clipped text
- custom SVG icon set loaded from `src/assets/icons/plant-ops`
- deterministic scoring in `src/domain/scoring.ts`
- campaign YAML in `src/content/scenarios/solvex-a-campaign.yaml`
- campaign loader and validation in `src/content/loadCampaign.ts` and `src/domain/validateCampaign.ts`
- Zustand runtime state in `src/store/useGameStore.ts`
- tests covering scoring and campaign validation

Current verification:

- `npm run test` passes with 48 tests
- `npm run build` passes

The next product step is to playtest Missions 1 and 2 together, then start Mission 3 content. Do not start another broad visual redesign before the two-mission loop is reviewed.

#### Map

```mermaid
graph TD
  A[Simplified BoD or DBM] --> B[Player Reads Design Basis]
  B --> C[Identify Process Constraints]
  C --> D[Select Engineering Decisions]
  D --> E[Place Decisions Into Level Workflow]
  E --> F[Submit Design Review]
  F --> G[Score And Senior Engineer Feedback]
  G --> H[Unlock Next Design Stage]
```

#### Working Folders

| Folder | Purpose |
|---|---|
| `00-index` | Entry points, maps, and unresolved questions |
| `01-game-design` | Player experience, loop design, stakeholder model, modes, and scope |
| `02-simulation-model` | Plant model, metrics, formulas, data schema, and balance assumptions |
| `03-production-plan` | Gantt chart, roadmap, milestones, and MVP backlog |
| `04-tech-infrastructure` | Source of truth, stack options, repo structure, tooling, and pipeline decisions |
| `05-research` | Domain research, scenario references, interviews, and example cases |
| `06-decisions` | Architecture and product decision records |
| `scenarios` | Vault-side scenario drafts and source references |
| `templates` | Reusable note templates |
