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
    bod_excerpt:
      feedstock_requirements:
        - Feed A is a liquid organic feedstock.
      product_targets:
        - Final Solvex-A purity must be at least 98.5 wt%.
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

The example above is abbreviated. The live Mission 1 YAML contains the full BoD excerpt, 17 decision cards, 10 correct decisions, 7 wrong-but-plausible decisions, result bands, explanations, and telemetry event names.

Mission 2 is now also in the live campaign YAML:

- ID: `solvex_a_mission_2`
- Title: `Mission 2: The Reactor Runs Hot`
- Status at campaign start: `locked`
- Design basis focus: reactor section, exothermic heat removal, temperature-sensitive quality, summer cooling-water limits, independent safety protection, credible runaway and overpressure review
- Decision cards: 15 total
- Correct decisions: 9
- Wrong-but-plausible decisions: 6
- Scoring: same deterministic easy point system as Mission 1, with 70% pass and 100% perfect
- Unlock: points to future `solvex_a_mission_3`

The design-basis renderer now supports mission-specific `bod_excerpt` keys such as `reactor_requirements`, `cooling_utility_constraints`, `safety_requirements`, and `design_scope`, with a fallback heading formatter for future keys.

#### Current Validation Rules

- IDs must be stable and unique.
- Campaign must have at least one mission.
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
- `Scenario` remains the per-mission compatibility type while the UI is migrated gradually.
- `loadSolvexCampaign()` validates campaign data at load time.
- `loadSolvexLevelOne()` remains as a compatibility wrapper for older tests and components.
- `src/content/scenarios/solvex-a-level-1.yaml` is a legacy duplicate and should be archived or deleted after the Mission 1-2 playtest proves the campaign YAML workflow.
- Current test coverage includes scoring, campaign validation, duplicate mission IDs and numbers, Mission 2 data integrity, Mission 2 scoring, and decision board ordering.

#### Related Notes

- [[Plant Data Model]]
- [[Metrics and Formulas]]
- [[Design Basis MVP]]
- [[First Plant Scope]]
- [[Chemical Engineering Decision Mapping]]
- [[Starter Scenario - High-Purity Output Request]]
- [[Source of Truth]]
