# Repository Structure

#### Purpose

This note proposes a future repository layout once implementation begins. The vault remains useful before code exists.

#### Recommended Layout

```text
plant-ops-game/
  docs/
    obsidian-vault/
  apps/
    web/
  packages/
    simulation/
    scenario-schema/
    scenario-content/
  tests/
    fixtures/
  tools/
    validate-scenarios/
```

#### Ownership

| Area | Owner Role | Purpose |
|---|---|---|
| `docs/obsidian-vault` | Designer, domain lead, producer | Human-readable design source |
| `packages/scenario-content` | Scenario author | YAML or JSON scenario data |
| `packages/scenario-schema` | Engineer | Validation schema and type generation |
| `packages/simulation` | Simulation engineer | Deterministic model and tests |
| `apps/web` | Product engineer | Playable browser prototype |
| `tools` | Build engineer | Content validation and conversion tools |

#### Data Flow

```mermaid
flowchart LR
  A[Obsidian Notes] --> B[Scenario Draft]
  B --> C[Structured YAML]
  C --> D[Schema Validation]
  D --> E[Runtime JSON]
  E --> F[Simulation Package]
  F --> G[Web App]
```

#### Early Rule

Do not let the first prototype depend on a complex backend. The simulation should run locally and deterministically until the loop is proven.

#### Related Notes

- [[Source of Truth]]
- [[Tech Stack Options]]
- [[Infrastructure Decisions]]
- [[Scenario Data Schema]]
