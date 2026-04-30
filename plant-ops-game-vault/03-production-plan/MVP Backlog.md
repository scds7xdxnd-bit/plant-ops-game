# MVP Backlog

#### MVP Goal

Build one playable Design Basis exercise where the player reads a simplified BoD or DBM for the Solvex-A specialty chemical plant, selects correct early process design decisions, receives senior engineer feedback, and unlocks the next Gantt-style design stage.

#### Must Have

| Item | Description | Linked Notes |
|---|---|---|
| Design basis loader | Load authored simplified BoD or DBM content | [[Scenario Data Schema]] |
| Level map | Show stages as a Gantt-style progression | [[Level Structure and Difficulty Modes]] |
| Decision board | Show process decision cards or checkboxes for selection | [[Design Basis MVP]] |
| Drag-and-drop stage placement | Use drag-and-drop for workflow placement or PFD ordering | [[Level Structure and Difficulty Modes]] |
| Decision categories | Limit MVP to reactor, separation, heat/utilities, control/safety, environmental treatment | [[Design Basis MVP]] |
| Answer key | Store correct decision IDs for each level | [[Scenario Data Schema]] |
| Mode-aware scoring | Score correct selections, missed decisions, over-selection, and missing-data flags by difficulty | [[Level Structure and Difficulty Modes]] |
| Senior engineer feedback | Explain why each decision fits or does not fit | [[Chemical Engineering Decision Mapping]] |

#### Should Have

| Item | Description |
|---|---|
| Scenario authoring checklist | Template for adding BoD clues, decisions, answer keys, and explanations |
| Basic telemetry | Log player selections and completion state |
| Difficulty levels | Easy, medium, and hard versions of the same design stage |
| Review mode | Let the player revisit missed design decisions |
| Simple plant map | Unlock process sections as visual progress |
| Classroom materials | Instructor notes, printable scenario sheets, and post-level review screens |

#### Could Have

| Item | Description |
|---|---|
| AI-assisted BoD variants | Generate alternate wording without changing the answer key |
| Scenario editor | Let non-programmers edit design basis sections, decision options, and answer keys |
| PFD Builder Lite | Let the player select and order simplified process blocks |
| No-code scenario editor | Add after YAML/JSON authoring is stable |

#### Not MVP

- Multiplayer
- Real-time operations
- Deep 3D factory simulation
- Live integration with real plant data
- Detailed plant network simulation
- Capex and downtime simulation
- Full operations outcome model
- Full P&ID drafting
- FEA
- 3D modeling as a player task

#### Related Notes

- [[Game Modes and Scope]]
- [[Design Basis MVP]]
- [[First Plant Scope]]
- [[Level Structure and Difficulty Modes]]
- [[Production Gantt Chart]]
- [[Roadmap]]
- [[Tech Stack Options]]
