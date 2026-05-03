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

Goal: make Missions 1-3 prove the production direction before investing in richer mechanics.

Deliverables:

- Mission 2 content in campaign YAML — done
- Mission switching and unlock behavior — done
- Shared mission metadata used by dashboard and review screens — done
- Scenario validation tests for multiple missions — done
- Refined review and feedback copy — done
- Decision board sorting and selected/review feedback alignment — done
- Mission 2 design-basis section rendering — done
- Campaign-level progressive BoD document — done
- Mission 3 separation-section content — done locally
- BoD `NEW` badges and helper tests — done locally
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

The project is in Phase 3 moving toward Phase 4. Claude's pushed branch contains the eight-mission easy-mode campaign and the campaign-level progressive BoD document. The local branch has also reconciled Deepseek's Mission 3 separation-section work into that architecture, preserving the progressive `bod_document` model instead of restoring per-mission `bod_excerpt`.

Current local verification: `npm run test` passes with 61 tests and `npm run build` passes.

The next engineering step is to commit and push the reconciled local changes, then playtest Missions 1-3 as one flow and verify continue/unlock behavior into Mission 4.

#### Related Notes

- [[Production Gantt Chart]]
- [[MVP Backlog]]
- [[Infrastructure Decisions]]
- [[Domain Research Plan]]
