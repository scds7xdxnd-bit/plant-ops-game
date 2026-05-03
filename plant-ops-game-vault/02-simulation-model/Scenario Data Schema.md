# Scenario Data Schema

#### Purpose

This note defines the authoring structure for playable Design Basis MVP campaign data. The current browser prototype loads validated campaign YAML.

Current runtime file:

- `src/content/scenarios/solvex-a-campaign.yaml`

Current validation code:

- `src/domain/validateCampaign.ts`

Compatibility wrapper:

- `src/content/loadScenario.ts` still exposes `loadSolvexLevelOne()` for older tests and components.

#### Scenario Components

| Component | Purpose |
|---|---|
| Campaign metadata | Campaign title, subtitle, player role, plant profile |
| Mission metadata | Mission ID, mission number, title, short title, status, difficulty |
| Design basis sections | Simplified BoD or DBM content |
| Decision categories | Reactor, separation, heat and utilities, control and safety, environmental treatment |
| Decision options | Candidate engineering decisions shown as cards or checkboxes |
| Answer key | Correct decision IDs for each mission |
| Explanations | Senior engineer feedback for correct, missed, and incorrect selections |
| Level structure | Gantt-style stage and unlock information |
| Scoring rules | Points, penalties, and completion thresholds |
| Unlock rules | Next mission ID, required score, perfect-score requirement, unlock labels |

#### Current Campaign YAML Shape

```yaml
id: solvex_a_campaign
version: 0.1.0
title: Solvex-A: Basis to Plant
subtitle: Design Basis Challenge
player_role: Junior process engineer
plant:
  product: Solvex-A
  product_type: Specialty solvent additive
  plant_type: Small continuous/batch hybrid chemical plant
  annual_capacity_tpy: 5000

bod_document:
  project_context:
    introduced_in_mission: 1
    items:
      - The project is a new Solvex-A specialty solvent additive unit.
  reaction_section_overview:
    introduced_in_mission: 2
    items:
      - The reactor section converts Feed A and Feed B into Solvex-A.
  reactor_effluent_composition:
    introduced_in_mission: 3
    items:
      - Reactor effluent contains Solvex-A, unreacted Feed A, impurity X, water, and catalyst residues.

missions:
  - id: solvex_a_mission_1
    version: 0.1.0
    mission_number: 1
    title: "Mission 1: Decode The Design Basis"
    short_title: "Decode The Design Basis"
    status: current
    industry: specialty_chemicals
    difficulty: easy
    stage:
      id: bod_review
      name: Design Basis Review
      gantt_position: 1
      unlocks_on_pass:
        - Basic PFD Blocks
        - "Mission 2: The Reactor Runs Hot"
    unlock:
      unlocks_on_pass:
        - Basic PFD Blocks
        - "Mission 2: The Reactor Runs Hot"
      next_mission_id: solvex_a_mission_2
      requires_score_percent: 70
      requires_perfect_score: false
    decision_cards:
      - id: reactor_temperature_control_loop
        category: process_control_and_safety
        label: Add reactor temperature control loop
        type: correct
        linked_clues:
          - The reaction is mildly exothermic.
        short_hint: The reactor has both heat generation and a temperature limit.
    correct_decision_ids:
      - reactor_temperature_control_loop
    scoring:
      mode: deterministic_easy
      pass_threshold_percent: 70
      perfect_threshold_percent: 100
      points:
        correct_selection: 1
        missed_correct: -0.5
        incorrect_selection: -0.25
        perfect_bonus: 1
```

The example above is abbreviated. The live campaign YAML contains the full progressive `bod_document`, Mission 1's 17 decision cards, 10 correct decisions, 7 wrong-but-plausible decisions, result bands, explanations, and telemetry event names.

Mission 2 is in the live campaign YAML:

- ID: `solvex_a_mission_2`
- Title: `Mission 2: The Reactor Runs Hot`
- Status at campaign start: `locked`
- Design basis focus: reactor section, exothermic heat removal, temperature-sensitive quality, summer cooling-water limits, independent safety protection, credible runaway and overpressure review
- Decision cards: 15 total
- Correct decisions: 9
- Wrong-but-plausible decisions: 6
- Scoring: same deterministic easy point system as Mission 1, with 70% pass and 100% perfect
- Unlock: points to `solvex_a_mission_3`

Mission 3 is reconciled locally in the live campaign YAML:

- ID: `solvex_a_mission_3`
- Title: `Mission 3: Separation Section`
- Status at campaign start: `locked`
- Design basis focus: reactor effluent composition, product purity and water targets, physical property gaps, temperature sensitivity, separation scope, and wastewater/environmental interfaces
- Decision cards: 16 total
- Correct decisions: 9
- Wrong-but-plausible decisions: 7
- Scoring: same deterministic easy point system as Missions 1 and 2, with 70% pass and 100% perfect
- Unlock: points to `solvex_a_mission_4`

Mission 4 has been polished in the live campaign YAML:

- ID: `solvex_a_mission_4`
- Title: `Mission 4: Heat & Utilities`
- Status at campaign start: `locked`
- Design basis focus: heat transfer, utilities, cooling water constraints, steam levels, heat recovery, utility bottlenecks
- Decision cards: 15 total
- Correct decisions: 8
- Wrong-but-plausible decisions: 7
- Scoring: same deterministic easy point system as Missions 1-3, with 70% pass and 100% perfect
- Unlock: points to `solvex_a_mission_5`

Mission 5 has been polished in the live campaign YAML:

- ID: `solvex_a_mission_5`
- Title: `Mission 5: Layers of Protection`
- Status at campaign start: `locked`
- Design basis focus: plant-wide safety requirements, flammable feed storage, exothermic runaway, hazardous area classification, ESD philosophy, fire and gas detection, HAZOP timing, relief scenarios, passive fire protection, inherently safer design vs protection layers
- Decision cards: 16 total
- Correct decisions: 9
- Wrong-but-plausible decisions: 7
- Scoring: same deterministic easy point system as Missions 1-4, with 70% pass and 100% perfect
- Unlock: points to `solvex_a_mission_6`

Mission 6 has been polished in the live campaign YAML:

- ID: `solvex_a_mission_6`
- Title: `Mission 6: What Leaves the Fence`
- Status at campaign start: `locked`
- Design basis focus: environmental treatment, VOC emission sources and controls, wastewater stream characterisation, pH neutralisation, secondary containment, fugitive emission monitoring, waste minimisation hierarchy (recover before destroy), solid waste disposal route, quantified emission estimates for permit
- Decision cards: 15 total
- Correct decisions: 8
- Wrong-but-plausible decisions: 7 (including premature biological treatment, open-flame flaring, dismissing fugitive emissions, skipping secondary containment for aqueous streams, discharging after neutralisation only, treating compliance as paperwork, ignoring solid waste)
- Scoring: same deterministic easy point system as Missions 1-5, with 70% pass and 100% perfect
- Unlock: points to `solvex_a_mission_7`

Mission 7 has been polished in the live campaign YAML:

- ID: `solvex_a_mission_7`
- Title: `Mission 7: Draw the Process`
- Status at campaign start: `locked`
- Design basis focus: PFD assembly, major process blocks, stream routing and flow direction, utility connections, recycle streams, environmental interfaces, stream numbering and stream table, battery-limit labeling, heat recovery exchangers; PFD vs P&ID scope distinction, excluded detail (control valves, pipe specs, drains, relief devices, equipment lists, 3D layout)
- Decision cards: 16 total
- Correct decisions: 9
- Wrong-but-plausible decisions: 7 (P&ID level detail, pipe specs, drains/vents, relief device symbols, full equipment list, omitting environmental streams, 3D plant layout)
- Scoring: same deterministic easy point system as Missions 1-6, with 70% pass and 100% perfect
- Unlock: points to `solvex_a_mission_8`

Mission 8 has been polished in the live campaign YAML:

- ID: `solvex_a_mission_8`
- Title: `Mission 8: Tag Everything`
- Status at campaign start: `locked`
- Design basis focus: design package review, P&ID/PFD distinction, control and safety requirements, isolation and protection hardware, relief discharge routing, sample points, ESD connections, open-data-gap tracking, and final package consistency checks
- Decision cards: 16 total
- Correct decisions: 9
- Wrong-but-plausible decisions: 7 (including unsupported 3D routing, structural detail, vendor internals, electrical wiring, utility headers, FEA before package approval, and approving despite open data gaps)
- Scoring: same deterministic easy point system as Missions 1-7, with 70% pass and 100% perfect
- Unlock: final campaign-complete state with `next_mission_id: null`

The design-basis renderer uses campaign-level `bod_document` sections, not per-mission `bod_excerpt`. `getBodForMission(campaign, missionNumber)` returns sections where `introduced_in_mission <= missionNumber` and marks sections introduced in the current mission with `isNew`.

#### Current Validation Rules

- IDs must be stable and unique.
- Campaign must have at least one mission.
- Campaign must define a `bod_document` object.
- Each BoD section must have a positive `introduced_in_mission`.
- Each BoD section must have at least one item.
- Mission IDs must be unique.
- Mission numbers must be unique.
- Campaign missions must define `mission_number`, `short_title`, `status`, and `unlock`.
- Every mission must have at least one correct decision.
- Decision card IDs must be unique within a mission.
- Correct decision IDs must exist in decision cards.
- Wrong-but-plausible decision IDs must exist in decision cards.
- Every correct decision must have an explanation.
- Every unsupported decision should have an explanation.
- Incorrect options should be plausible enough to teach judgment.
- Result bands must exist and use valid percentage thresholds.
- Pass, perfect, and unlock score thresholds must be valid percentages.
- Scoring must be deterministic.
- Plant simulation fields can be added later, but are not required for the MVP.

#### Current Implementation Notes

- `src/domain/scenarioTypes.ts` defines `Campaign`, `PlantProfile`, `MissionUnlock`, and the per-mission `Scenario` type.
- `Campaign.bod_document` is the source of all design-basis text shown during missions.
- `Scenario` remains the per-mission compatibility type while the UI is migrated gradually.
- `loadSolvexCampaign()` validates campaign data at load time.
- `loadSolvexLevelOne()` remains as a compatibility wrapper for older tests and components.
- `src/content/scenarios/solvex-a-level-1.yaml` is a legacy duplicate and should be archived or deleted after the full campaign playtest confirms `solvex-a-campaign.yaml` as the sole runtime content source.
- Current test coverage includes scoring, campaign validation, duplicate mission IDs and numbers, BoD validation, progressive BoD visibility, Mission 1-8 data integrity, Mission 1-8 scoring, decision board ordering, automated store-level campaign playthrough, and automated browser-level e2e playthrough (Playwright, Missions 1-8 including final campaign-complete state).

#### Related Notes

- [[Plant Data Model]]
- [[Metrics and Formulas]]
- [[Design Basis MVP]]
- [[First Plant Scope]]
- [[Chemical Engineering Decision Mapping]]
- [[Starter Scenario - High-Purity Output Request]]
- [[Source of Truth]]
