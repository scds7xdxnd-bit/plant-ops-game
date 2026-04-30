# ADR-001 Use Obsidian as Pre-Code Design Source

#### Status

Accepted for initial planning.

#### Context

The project needs to connect game design, business flows, engineering constraints, production planning, and infrastructure decisions before code is written.

#### Decision

Use an Obsidian vault stored in the project repository as the initial source of truth for design thinking, diagrams, decision records, and planning.

#### Consequences

Positive:

- Easy to visualize relationships between concepts.
- Works well before code exists.
- Keeps planning artifacts versionable.
- Supports Mermaid diagrams and backlinks.

Negative:

- Design notes can drift from implementation unless conversion rules are created later.
- Structured simulation data will eventually need stricter validation than Markdown provides.

#### Related Notes

- [[Source of Truth]]
- [[Infrastructure Decisions]]

