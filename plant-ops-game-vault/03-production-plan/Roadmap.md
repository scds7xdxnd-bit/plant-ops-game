# Roadmap

#### Phase 0: Design Vault

Goal: make the design navigable before writing code.

Deliverables:

- Obsidian vault structure
- Core game loop
- Simulation assumptions
- Source-of-truth decision
- First scenario draft
- MVP backlog

#### Phase 1: Paper Prototype

Goal: prove the loop can create interesting decisions without software.

Deliverables:

- One complete scenario
- Printed or Markdown decision sheets
- Hand-calculated outcome model
- Notes from at least three test runs

#### Phase 2: Browser Prototype

Goal: turn the paper prototype into a playable web flow.

Deliverables:

- Mission dashboard
- Design basis excerpt panel
- Decision card board
- Selected decision tray
- Senior engineer action bar
- Design review completion screen
- Deterministic scoring
- Campaign YAML loader
- Campaign validation

#### Phase 3: Vertical Slice

Goal: make Missions 1 and 2 prove the production direction before building the full level set.

Deliverables:

- Mission 2 content in campaign YAML — done
- Mission switching and unlock behavior — done
- Shared mission metadata used by dashboard and review screens — done
- Scenario validation tests for multiple missions — done
- Refined review and feedback copy — done
- Decision board sorting and selected/review feedback alignment — done
- Mission 2 design-basis section rendering — done
- First informal playtest pass

#### Phase 4: MVP

Goal: support multiple scenarios and a repeatable production process.

Deliverables:

- Missions 1-8 campaign flow
- Authoring workflow
- Save/load
- Balance review process
- Release packaging

#### Current Status

The project is in Phase 3. Missions 1 and 2 are playable in one campaign flow. Mission 1 unlocks Mission 2 on a 70% pass score, campaign schema and validation are implemented, and the UI uses dynamic mission metadata. Current tests pass at 48 tests and the production build is clean.

The next engineering step is a Mission 1-2 playtest pass, followed by Mission 3 separation-section content if the two-mission loop holds up.

#### Related Notes

- [[Production Gantt Chart]]
- [[MVP Backlog]]
- [[Infrastructure Decisions]]
- [[Domain Research Plan]]
