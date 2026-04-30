# Production Gantt Chart

#### Draft Production Plan

```mermaid
gantt
  title Process Design Game - Draft Production Plan
  dateFormat  YYYY-MM-DD
  axisFormat  %b %d

  section Discovery
  Lock revised MVP direction          :a1, 2026-05-01, 4d
  Define Solvex-A plant scope         :a2, after a1, 4d
  Draft simplified BoD or DBM         :a3, after a2, 5d

  section MVP Content Design
  Define decision categories          :b1, after a3, 4d
  Map chemical concepts to decisions  :b2, after b1, 5d
  Create easy medium hard levels      :b3, after b2, 6d

  section Prototype
  Choose prototype stack              :c1, after b3, 3d
  Build level map wireframe           :c2, after c1, 5d
  Build decision board                :c3, after c2, 7d
  Build scoring and feedback          :c4, after c3, 7d

  section Playtesting
  Internal playtest                   :d1, after c4, 4d
  Revise levels and explanations      :d2, after d1, 7d
  Process engineer review             :d3, after d2, 5d

  section Production Planning
  Scope next playable build           :e1, after d3, 5d
  Create backlog                      :e2, after e1, 4d
  Decide production infrastructure    :e3, after e2, 4d
```

#### Milestone Definition

| Milestone | Definition |
|---|---|
| Concept locked | Design Basis MVP and Solvex-A plant scope are stable |
| First level defined | One simplified BoD stage can be played on paper |
| Decision prototype | Player can select process decisions and receive deterministic scoring |
| Vertical slice | Player can complete BoD review through one design stage with feedback |
| MVP scope | Features required for first public or classroom release are defined |

#### Related Notes

- [[Infrastructure Decisions]]
- [[Level Structure and Difficulty Modes]]
- [[Open Questions]]
- [[Decision Log]]
