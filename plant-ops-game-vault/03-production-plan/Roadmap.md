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

Goal: prove the full Missions 1-8 easy-mode production direction before investing in richer mechanics.

Deliverables:

- Mission 2 content in campaign YAML — done
- Mission switching and unlock behavior — done
- Shared mission metadata used by dashboard and review screens — done
- Scenario validation tests for multiple missions — done
- Refined review and feedback copy — done
- Decision board sorting and selected/review feedback alignment — done
- Mission 2 design-basis section rendering — done
- Campaign-level progressive BoD document — done
- Mission 3 separation-section content — done
- BoD `NEW` badges and helper tests — done
- Mission 4 heat & utilities polish — done
- Mission 5 safety systems polish — done
- Mission 6 environmental treatment polish — done
- Mission 7 PFD assembly polish — done
- Mission 8 design package review polish — done
- Playwright browser e2e automated campaign playthrough (Missions 1-8) — done
- First full-campaign informal playtest pass — done

#### Phase 4: MVP

Goal: support multiple scenarios and a repeatable production process.

Deliverables:

- Missions 1-8 campaign flow
- Authoring workflow
- Save/load
- Balance review process
- Release packaging

#### Current Status

The project is at the end of Phase 3 and ready to enter Phase 4 balance/release-prep work. Claude's pushed branch contains the eight-mission easy-mode campaign and the campaign-level progressive BoD document. Deepseek's mission polish work has been reconciled into that architecture, preserving the progressive `bod_document` model instead of restoring per-mission `bod_excerpt`.

Current local verification: `npm run test` passes with 117 tests, `npm run test:playthrough` passes, `npm run test:e2e` passes, and `npm run build` passes. The Playwright e2e test completes a full Missions 1-8 campaign playthrough including the final-mission campaign-complete state.

All 8 missions are now polished to the same quality bar with data integrity tests, display labels, decision card icons, concise review feedback, progressive BoD sections, and campaign-complete end-state handling.

#### Related Notes

- [[Production Gantt Chart]]
- [[MVP Backlog]]
- [[Infrastructure Decisions]]
- [[Domain Research Plan]]
