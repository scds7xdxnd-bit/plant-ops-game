# ADR-002 Use Design Basis MVP for First Prototype

#### Status

Accepted

#### Context

The game originally explored a customer-feedback or House of Quality style MVP. The revised direction is more specific: a chemical process engineering game for students and early process design trainees.

The first playable version needs to be scoped tightly enough to build, but realistic enough to teach process design thinking.

#### Decision

Use a Design Basis MVP for the first browser prototype.

The player reads a simplified BoD or DBM for the Solvex-A specialty chemical plant and converts it into early process design decisions.

The first target player is a chemical engineering student. Junior process engineers and design trainees are secondary users.

The first plant is a continuous/batch hybrid specialty chemical plant producing the fictional solvent additive Solvex-A.

The MVP decision scope is limited to:

1. reactor system
2. separation system
3. heat transfer and utilities
4. process control and safety
5. environmental treatment

The first PFD Builder Lite stage uses seven blocks:

1. Feedstock Storage
2. Feed Preparation / Dosing
3. Reactor
4. Heat Exchanger / Cooling System
5. Separator
6. Product Tank
7. Environmental Treatment

#### Consequences

- The MVP does not start from customer complaints, marketing briefs, or social media comments.
- The MVP does not attempt full factory simulation.
- FEA, 3D modeling, full P&ID drafting, detailed plant layout, real financial modeling, and real-time operations are explicitly out of scope.
- The first target is a browser prototype.
- Classroom support is light: instructor notes, printable scenario sheets, and review screens.
- Scenario authoring starts with YAML or JSON before any no-code editor.

#### Related Notes

- [[Design Basis MVP]]
- [[First Plant Scope]]
- [[Level Structure and Difficulty Modes]]
- [[MVP Backlog]]
