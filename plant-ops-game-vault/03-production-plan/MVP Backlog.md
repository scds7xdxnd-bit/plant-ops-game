# MVP Backlog

#### MVP Goal

Build a playable Design Basis campaign where the player reads simplified BoD or DBM material for the Solvex-A specialty chemical plant, selects correct early process design decisions, receives senior engineer feedback, and unlocks the next Gantt-style design stage.

#### Current App Status

Completed in the browser prototype:

- Mission 1 dashboard screen
- Mission 1 decision card selection
- Mission 2 reactor-section content
- Mission 4 polished: Heat & Utilities mission with 8 correct + 7 wrong-plausible decisions, utility-focused content, full display labels, icons, concise feedback, data integrity/scoring/unlock/BoD tests
- Mission 5 polished: Layers of Protection mission with 9 correct + 7 wrong-plausible decisions, safety systems focus, full display labels, icons, concise feedback, data integrity/scoring/unlock/BoD tests
- Mission 6 polished: What Leaves the Fence mission with 8 correct + 7 wrong-plausible decisions, environmental treatment focus, emission sources, wastewater characterisation, neutralisation, secondary containment, fugitive monitoring, waste minimisation hierarchy, solid waste disposal, quantified permit estimates, full display labels, icons, concise feedback, data integrity/scoring/unlock/BoD tests
- Mission 7 polished: Draw the Process mission with 9 correct + 7 wrong-plausible decisions, PFD assembly focus, process blocks, stream routing, utility connections, recycle, environmental interfaces, stream table, battery-limit labels, heat recovery exchangers, PFD vs P&ID scope, full display labels, icons, concise feedback, data integrity/scoring/unlock/BoD tests
- Mission 8 polished: Tag Everything mission with 9 correct + 7 wrong-plausible decisions, design package review focus, P&ID/PFD distinction, control/safety/environmental consistency checks, isolation/protection hardware, FEA and open-data-gap exclusions, campaign-complete final state, full display labels, icons, concise feedback, data integrity/scoring/final-unlock/BoD tests
- mission-to-mission switching and unlock behavior
- pass-based unlocks at 70%
- selected decision tray
- senior engineer action bar
- design review completion screen
- deterministic scoring tests
- campaign-level YAML schema
- campaign-level progressive `bod_document`
- campaign loader with validation
- custom SVG icon usage
- dynamic mission header and level map status
- shared decision display labels and sorted decision board order
- selected tray and design review feedback aligned by decision ID
- progressive design-basis sections rendered in the dashboard and BoD reader
- `NEW` badges for current-mission BoD sections
- compact review summary copy and score ring sizing
- Playwright browser e2e automated playthrough test for Missions 1-8 and final campaign-complete state
- `.claude/` local worktrees ignored and excluded from test discovery

Current runtime source:

- `src/content/scenarios/solvex-a-campaign.yaml`

Legacy duplicate still present:

- `src/content/scenarios/solvex-a-level-1.yaml`

Recommendation: keep the legacy file during the current full-campaign playtest, then archive or delete it once `solvex-a-campaign.yaml` is accepted as the sole runtime content source.

#### Must Have

| Item | Description | Linked Notes |
|---|---|---|
| Design basis loader | Load authored simplified BoD or DBM content | [[Scenario Data Schema]] |
| Level map | Show stages as a Gantt-style progression | [[Level Structure and Difficulty Modes]] |
| Decision board | Show process decision cards or checkboxes for selection | [[Design Basis MVP]] |
| Decision categories | Limit MVP to reactor, separation, heat/utilities, control/safety, environmental treatment | [[Design Basis MVP]] |
| Answer key | Store correct decision IDs for each level | [[Scenario Data Schema]] |
| Mode-aware scoring | Score correct selections, missed decisions, over-selection, and missing-data flags by difficulty | [[Level Structure and Difficulty Modes]] |
| Senior engineer feedback | Explain why each decision fits or does not fit | [[Chemical Engineering Decision Mapping]] |
| Campaign schema | Support multiple missions from one campaign YAML | [[Scenario Data Schema]] |
| Scenario validation | Reject broken campaign YAML before app runtime | [[Scenario Data Schema]] |
| Design review screen | Summarize score, supported decisions, unsupported decisions, and missed decisions | [[Player Experience Flow]] |
| Mission switching | Continue from one mission to the next after unlock criteria are met | [[Level Structure and Difficulty Modes]] |
| Mission 2 content | Reactor heat-removal and summer cooling-water constraint mission | [[Chemical Engineering Decision Mapping]] |
| Mission 3 content | Separation requirements, impurity/water removal, property data gaps, and wastewater routing | [[Chemical Engineering Decision Mapping]] |
| Full easy-mode campaign | Missions 1-8 polished with deterministic scoring, explanations, unlocks, and automated tests | [[Level Structure and Difficulty Modes]] |

#### Should Have

| Item | Description |
|---|---|
| Scenario authoring checklist | Template for adding BoD clues, decisions, answer keys, and explanations |
| Basic telemetry | Log player selections and completion state |
| Difficulty levels | Easy, medium, and hard versions of the same design stage |
| Review mode | Let the player revisit missed design decisions |
| Simple plant map | Unlock process sections as visual progress |
| Classroom materials | Instructor notes, printable scenario sheets, and post-level review screens |
| Full-campaign playtest | Test Missions 1-8 as a continuous classroom-style vertical slice |
| Balance pass | Tune wording, card difficulty, scoring thresholds, and feedback after full-campaign playtest |

#### Could Have

| Item | Description |
|---|---|
| AI-assisted BoD variants | Generate alternate wording without changing the answer key |
| Scenario editor | Let non-programmers edit design basis sections, decision options, and answer keys |
| PFD Builder Lite | Let the player select and order simplified process blocks |
| No-code scenario editor | Add after YAML/JSON authoring is stable |
| Drag-and-drop stage placement | Use drag-and-drop for PFD block ordering after decision missions are proven |

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
