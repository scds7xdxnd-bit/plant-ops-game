# First Plant Scope

#### Recommendation

The first plant should be a small specialty chemical plant producing a fictional liquid solvent additive.

#### Fictional Plant

| Field | Choice |
|---|---|
| Product | Solvex-A |
| Product type | Specialty solvent additive |
| Plant type | Small continuous/batch hybrid chemical plant |
| Annual capacity | 5,000 tons/year |
| Player role | Junior process engineer |

#### Main Process Sections

- feedstock storage
- feed preparation / dosing
- reactor
- heat exchanger / cooling system
- separator
- product tank
- environmental treatment

#### First PFD Builder Lite Blocks

| Order | Block | Why It Belongs |
|---:|---|---|
| 1 | Feedstock Storage | Feed A is flammable and Feed B may be corrosive at high concentration |
| 2 | Feed Preparation / Dosing | Supports feed ratio, catalyst addition, and impurity handling |
| 3 | Reactor | Core learning block for reaction, heat generation, residence time, and control |
| 4 | Heat Exchanger / Cooling System | Required because the reaction is mildly exothermic and cooling water is limited |
| 5 | Separator | Needed for product purity, water removal, and impurity removal |
| 6 | Product Tank | Connects the process to product specification and storage |
| 7 | Environmental Treatment | Combines wastewater neutralization and VOC control for the earliest PFD stage |

#### Why This Plant

| Reason | Explanation |
|---|---|
| Chemical engineering relevance | Naturally uses kinetics, thermodynamics, mass balance, heat balance, separation, control, and safety |
| Manageable MVP | Can be represented with 5 to 8 process blocks |
| Expandable later | Can later support cost, optimization, emissions, maintenance, and simulation |
| Lower accuracy burden | Easier than nuclear, pharma, semiconductor, or food safety-heavy plants |
| Fun enough | Works well with mission-based level design |

#### Example Level 1 Design Basis

```text
Project: Solvex-A Specialty Chemical Plant

Feedstock Requirements:
- Feed A is a liquid organic feedstock.
- Feed B is an aqueous catalyst solution.
- Feed A contains light impurity X.
- Feed B is corrosive at high concentration.

Product Targets:
- Product purity: minimum 98.5 wt%.
- Water content: below 0.5 wt%.
- Production capacity: 5,000 tons/year.

Operating Constraints:
- Medium-pressure steam is available.
- Cooling water is limited during summer.
- Plant should operate 330 days/year.
- Maximum reactor temperature: 120 C.

Environmental Constraints:
- VOC emissions must be controlled.
- Wastewater must be neutralized before discharge.

Safety Constraints:
- Feed A is flammable.
- Reaction is mildly exothermic.
- Overpressure protection is required.
```

#### Related Notes

- [[Design Basis MVP]]
- [[Chemical Engineering Decision Mapping]]
- [[Scenario Data Schema]]
