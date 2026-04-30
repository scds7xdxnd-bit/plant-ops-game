# Chemical Engineering Decision Mapping

#### Purpose

This note maps chemical engineering concepts to game decisions. It is the bridge between learning content and gameplay.

#### Mapping Table

| Chemical Engineering Concept | Player Decision Examples |
|---|---|
| Reaction kinetics | batch reactor vs CSTR, residence time, catalyst handling, temperature control |
| Thermodynamics | separation method, condenser requirement, heating/cooling requirement, phase behavior check |
| Material and energy balances | feed ratio, recycle need, heating/cooling load, waste stream amount |
| Transport phenomena | mixing requirement, heat exchanger selection, pump selection, pressure drop awareness |
| Yield vs conversion | operating condition, recycle unreacted feed, purification intensity |
| Separation techniques | distillation, decanting, filtration, membrane, extraction |
| Batch vs continuous processing | batch, CSTR, plug flow reactor, hybrid process |
| Process control | temperature loop, pressure indicator, level control, flow ratio control, emergency shutdown trigger |
| Cost | simpler separator vs high-performance separator, equipment count, utility demand, recycle complexity |
| Safety | relief valve, interlock, inerting, emergency cooling, gas detection |
| Material compatibility | stainless steel, carbon steel, lined vessel, corrosion allowance, gasket compatibility |
| Scale-up potential | robust mixing, heat removal, continuous process potential, avoid hard-to-scale lab methods |

#### Example Logic

| BoD Clue | Likely Decision |
|---|---|
| Reaction is mildly exothermic | cooling system, temperature control loop, high-temperature alarm |
| Product is heat sensitive | avoid high-temperature separation, consider vacuum or lower-temperature option |
| Feed is flammable | vapor management, ignition control, relief protection |
| Cooling water is limited | reduce cooling demand, consider heat integration or alternate cooling |
| Catalyst solution is corrosive | corrosion-resistant material or lined equipment |
| VOC emissions must be controlled | condenser, scrubber, activated carbon, vapor containment |

#### Related Notes

- [[Design Basis MVP]]
- [[First Plant Scope]]
- [[Scenario Data Schema]]
