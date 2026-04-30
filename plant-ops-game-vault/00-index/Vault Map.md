# Vault Map

#### Purpose

This note shows how the design files connect before code exists. Use it as the visual entry point in Obsidian graph view.

#### Concept Map

```mermaid
graph TD
  V --> M[Game Modes and Scope]
  V[Game Vision] --> DB[Design Basis MVP]
  DB --> FPS[First Plant Scope]
  DB --> CEM[Chemical Engineering Decision Mapping]
  DB --> LDM[Level Structure and Difficulty Modes]
  DB --> L[Core Game Loop]
  DB --> SDS[Scenario Data Schema]
  L --> P[Player Experience Flow]
  L --> H[Stakeholder Handoff Model]
  SDS --> SOT[Source of Truth]
  SOT --> RS[Repository Structure]
  RS --> INF[Infrastructure Decisions]
  INF --> TS[Tech Stack Options]
  TS --> MB[MVP Backlog]
  MB --> G[Production Gantt Chart]
  MB --> LDM
  MB --> R[Roadmap]
  R --> SIM[Plant Improvement Simulation]
  SIM --> DM[Plant Data Model]
  SIM --> MF[Metrics and Formulas]
  R --> DL[Decision Log]
  OQ[Open Questions] --> V
  OQ --> DB
  OQ --> SIM
  OQ --> INF
```

#### Main Path Through The Vault

1. Start with [[Game Vision]].
2. Read [[Design Basis MVP]].
3. Read [[First Plant Scope]] and [[Chemical Engineering Decision Mapping]].
4. Read [[Core Game Loop]] and [[Player Experience Flow]] through the Design Basis MVP lens.
5. Use [[Scenario Data Schema]] to define BoD sections, decision options, answer keys, and explanations.
6. Treat [[Plant Improvement Simulation]], [[Plant Data Model]], and [[Metrics and Formulas]] as long-term expansion notes.
7. Lock infrastructure thinking in [[Source of Truth]], [[Repository Structure]], and [[Infrastructure Decisions]].
8. Plan production through [[MVP Backlog]], [[Level Structure and Difficulty Modes]], [[Production Gantt Chart]], and [[Roadmap]].

#### Related Notes

- [[Home]]
- [[Open Questions]]
- [[Decision Log]]
