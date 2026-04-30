# Production Gantt Chart

#### Draft Production Plan

The browser prototype has completed the first playable two-mission loop: Mission 1, Mission 2, campaign schema, campaign validation, pass-based unlock, and mission-to-mission progression. The next production focus is playtesting Missions 1 and 2, then authoring Mission 3.

```mermaid
gantt
  title Process Design Game - Current Production Plan
  dateFormat  YYYY-MM-DD
  axisFormat  %b %d

  section Completed
  Lock Design Basis MVP direction     :done, a1, 2026-04-25, 1d
  Define Solvex-A plant scope         :done, a2, after a1, 1d
  Build Mission 1 dashboard           :done, a3, after a2, 2d
  Build design review screen          :done, a4, after a3, 1d
  Add campaign schema and validation  :done, a5, after a4, 1d

  section Next Vertical Slice
  Author Mission 2 reactor content    :done, b1, 2026-05-01, 1d
  Add mission switching and unlocks   :done, b2, after b1, 1d
  Validate two-mission campaign        :done, b3, after b2, 1d
  Polish review and mission panels     :done, b4, after b3, 1d
  Playtest Missions 1 and 2            :b5, after b4, 2d

  section Expansion
  Author Mission 3 separation content  :c0, after b5, 2d
  Author Missions 4 to 6              :c1, after c0, 5d
  Build PFD block assembly mission     :c2, after c1, 4d
  Build capstone package review        :c3, after c2, 4d

  section Release Prep
  Balance scoring and feedback         :d1, after c3, 4d
  Instructor/classroom review          :d2, after d1, 4d
  Package MVP build                    :d3, after d2, 3d
```

#### Milestone Definition

| Milestone | Definition |
|---|---|
| Concept locked | Design Basis MVP and Solvex-A plant scope are stable |
| Mission 1 playable | Player can complete BoD review, submit decisions, and receive senior engineer feedback |
| Campaign schema ready | Runtime campaign YAML loads through validation and supports multiple missions |
| Two-mission vertical slice | Player can complete Mission 1, unlock Mission 2, and continue into reactor-section content |
| Two-mission playtest ready | Mission 1 and Mission 2 pass tests/build and are ready for informal playtest |
| MVP campaign playable | Missions 1-8 are playable with appropriate interaction variety |
| MVP release candidate | Features required for first classroom release are defined, tested, and packaged |

#### Related Notes

- [[Infrastructure Decisions]]
- [[Level Structure and Difficulty Modes]]
- [[Open Questions]]
- [[Decision Log]]
