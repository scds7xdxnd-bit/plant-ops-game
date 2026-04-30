# Scenario Data Schema

#### Purpose

This note defines the early authoring structure for playable Design Basis MVP scenarios. It should later become validated YAML or JSON.

#### Scenario Components

| Component | Purpose |
|---|---|
| Scenario metadata | Title, industry, learning goal, difficulty |
| Design basis sections | Simplified BoD or DBM content |
| Decision categories | Reactor, separation, heat and utilities, control and safety, environmental treatment |
| Decision options | Candidate engineering decisions shown as cards or checkboxes |
| Answer key | Correct decision IDs for each level or design basis clue |
| Explanations | Senior engineer feedback for correct, missed, and incorrect selections |
| Level structure | Gantt-style stage and unlock information |
| Scoring rules | Points, penalties, and completion thresholds |

#### Draft YAML Shape

```yaml
id: solvex_a_design_basis_intro
title: Solvex-A Design Basis Intro
industry: specialty_chemicals
difficulty: early
plant:
  product: Solvex-A
  type: small_specialty_chemical_plant
  annual_capacity_tpy: 5000
learning_goals:
  - read a simplified design basis
  - identify process constraints
  - select early process design decisions
design_basis:
  feedstock_requirements:
    - Feed A is a liquid organic feedstock.
    - Feed B is an aqueous catalyst solution.
    - Feed A contains light impurity X.
    - Feed B is corrosive at high concentration.
  product_targets:
    - Product purity must be at least 98.5 wt%.
    - Water content must be below 0.5 wt%.
  operating_constraints:
    - Medium-pressure steam is available.
    - Cooling water is limited during summer.
    - Maximum reactor temperature is 120 C.
  environmental_constraints:
    - VOC emissions must be controlled.
    - Wastewater must be neutralized before discharge.
  safety_constraints:
    - Feed A is flammable.
    - Reaction is mildly exothermic.
    - Overpressure protection is required.
decision_options:
  - id: cooling_jacket
    category: heat_transfer_and_utilities
    label: Cooling jacket
  - id: temperature_control_loop
    category: process_control_and_safety
    label: Temperature control loop
  - id: pressure_relief_valve
    category: process_control_and_safety
    label: Pressure relief valve
  - id: wastewater_neutralization
    category: environmental_treatment
    label: Wastewater neutralization
levels:
  - id: l1_design_basis_review
    stage: Design Basis Review
    prompt: Select decisions implied by the exothermic and flammable feed constraints.
    correct_decision_ids:
      - cooling_jacket
      - temperature_control_loop
      - pressure_relief_valve
    explanations:
      cooling_jacket: The reaction is mildly exothermic, so heat removal is required.
      temperature_control_loop: Temperature control is needed to keep the reactor below its design limit.
      pressure_relief_valve: Overpressure protection is explicitly required.
scoring:
  easy:
    correct_selection: 1
    missed_required_decision: -0.5
    incorrect_over_selection: -0.25
    correct_missing_data_flag: 0.5
    unsupported_missing_data_flag: 0
    perfect_level_bonus: 1
  medium:
    correct_selection: 1
    missed_required_decision: -1
    incorrect_over_selection: -1
    correct_missing_data_flag: 1
    unsupported_missing_data_flag: -0.5
    perfect_level_bonus: 1
  hard:
    correct_selection: 1
    missed_required_decision: -1
    incorrect_over_selection: -1.5
    correct_missing_data_flag: 1
    unsupported_missing_data_flag: -1
    perfect_level_bonus: 2
```

#### Validation Rules To Add Later

- IDs must be stable and unique.
- Every level must have at least one correct decision.
- Every correct decision must have an explanation.
- Incorrect options should be plausible enough to teach judgment.
- Hard mode can mark missing data or assumption required as a valid answer.
- Scoring must be deterministic.
- Plant simulation fields can be added later, but are not required for the MVP.

#### Related Notes

- [[Plant Data Model]]
- [[Metrics and Formulas]]
- [[Design Basis MVP]]
- [[First Plant Scope]]
- [[Chemical Engineering Decision Mapping]]
- [[Starter Scenario - High-Purity Output Request]]
- [[Source of Truth]]
