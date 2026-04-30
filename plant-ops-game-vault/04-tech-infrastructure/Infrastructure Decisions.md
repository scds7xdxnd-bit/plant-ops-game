# Infrastructure Decisions

#### Current Phase

The project is in pre-code architecture and design modeling.

#### Initial Infrastructure Decisions

| Area | Initial Choice | Reason |
|---|---|---|
| Knowledge base | Obsidian vault in repository | Visual linking before implementation |
| Version control | Git | Required for design and code history |
| Design records | ADR-style Markdown | Keeps rationale visible |
| Diagrams | Mermaid | Portable and reviewable |
| Prototype target | Browser | Fastest path to playable systems UI |
| Data authoring | YAML or JSON | Versionable and easy to validate |
| Simulation tests | Deterministic unit tests | Prevents hidden balance regressions |
| Save data | Local JSON initially | Easy inspection during prototyping |

#### Infrastructure Risks

- Design notes and game data may drift unless conversion rules are defined.
- A plant simulation can become too detailed before gameplay is proven.
- UI complexity may grow faster than the core loop.
- Balance tuning requires repeatable test scenarios.

#### Guardrails

- Keep design notes linked to decision records.
- Prototype one vertical slice before building broad systems.
- Make simulation deterministic by default.
- Track assumptions as data, not only prose.
- Build tooling only after manual authoring becomes painful.

#### Related Notes

- [[Source of Truth]]
- [[Production Gantt Chart]]
- [[Open Questions]]

