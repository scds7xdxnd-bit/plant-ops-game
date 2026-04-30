# Tech Stack Options

#### Recommended Starting Stack

For the first playable prototype:

- Frontend: TypeScript with React
- Game shell: Web app first
- State management: Zustand or Redux Toolkit
- Simulation engine: TypeScript domain module
- Data format: YAML for authored scenarios, JSON for validated runtime data
- Visualization: React Flow or Cytoscape.js for plant networks
- Charts: ECharts or Recharts
- Testing: Vitest for simulation logic, Playwright for user flows
- Persistence: Local save files first, then SQLite or Postgres if needed

#### Why Web First

A browser-based prototype is easier to test, share, iterate, and connect to dashboards. It also suits Obsidian-adjacent workflows because structured data and design docs can live beside the code.

#### Alternative Stack Options

| Option | Strength | Weakness |
|---|---|---|
| Unity | Strong game tooling and visuals | More overhead for data-heavy UI |
| Godot | Lightweight and open source | Less native for complex business dashboards |
| Python simulation plus web UI | Fast modeling | More integration complexity |
| Electron app | Desktop feel | Can be added later if web prototype works |

#### Open Stack Questions

- Should the plant view be 2D node graph, isometric, or simplified dashboard?
- Should the simulation be deterministic for every turn?
- Should multiplayer or instructor-led classroom mode be considered early?
- Should AI-generated customer messages be part of the design, or should scenarios be fully authored first?

#### Related Notes

- [[Plant Improvement Simulation]]
- [[Infrastructure Decisions]]
- [[Source of Truth]]

