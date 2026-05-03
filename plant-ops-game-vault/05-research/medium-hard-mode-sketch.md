# Medium & Hard Mode — Design Sketch

This document is a rough sketch of the interactive mechanics and knowledge requirements for medium and hard difficulty across all 8 missions. Easy mode (card selection) is fully authored in `solvex-a-campaign.yaml`. Medium and hard introduce new interaction types that require new frontend components and, in some cases, new schema fields.

---

## Difficulty philosophy

| Mode | Player profile | Primary challenge | Wrong answers teach |
|---|---|---|---|
| Easy | First-year student, no plant experience | Reading a BoD and identifying implications | Over-engineering and under-reading |
| Medium | 2nd/3rd year student or early-career engineer | Applying ChemE principles with simplified quantitative tools | Misapplying formulas, ignoring constraints |
| Hard | Senior-student or practising engineer | Engineering judgment with incomplete or adversarial information | Overconfidence and failure to challenge assumptions |

---

## New interaction types needed (frontend components)

Before authoring medium/hard missions, these reusable components need to be designed. Each mission below names which components it uses.

| Component | Description |
|---|---|
| **ReactorSim** | ODE-driven CSTR model (Euler/RK4 in-browser). Inputs: coolant flow slider, feed rate slider, season toggle. Outputs: T vs time graph, conversion vs time graph. |
| **ActionDeck** | Card selection during a live simulation. Player chooses from 4–6 action cards; simulator shows consequence. |
| **CalculatorForm** | Structured input form for a single engineering calculation (e.g. Q = m·Cp·ΔT). Shows worked result and flags against design limit. |
| **PFDCanvas** | Drag-and-drop block diagram. Player places units from a palette and draws stream connections. Validation checks topology. |
| **PIDCanvas** | Extension of PFDCanvas. Player adds ISA instrument symbols, draws control loop connections, marks spec breaks. |
| **HAZOPTable** | Fill-in-the-blank deviation table. Player selects guide word, then types cause, consequence, safeguard, recommendation. Scored against reference. |
| **StreamTable** | Editable table of stream properties. Player fills T, P, phase, flow. Built-in mass balance checker flags errors. |
| **McCabeThiele** | Interactive graphical tool. Player adjusts reflux ratio slider and sees operating lines shift; counts stages; reads product purity. |
| **LevelOfProtection** | Stacked protection layer selector. Player adds layers (BPCS, alarm, SIL, relief) and sees residual frequency vs. tolerable target. |
| **AIChat** | Conversational panel. Can be configured per-mission as Client (answers BoD questions), Mentor (gives hints), Reviewer (critiques player work), or Adversary (gives plausible-but-wrong advice). |
| **FaultTree** | Node editor. Player connects AND/OR gates and basic event circles. System calculates top event frequency from given basic event data. |
| **CompositeHX** | Simplified pinch diagram. Pre-drawn hot/cold composite curves. Player drags match lines between streams; system validates temperature feasibility. |

---

## Mission 1 — Decode the Design Basis

### Medium
**Primary mechanic: AI Client + Assumption Register**

The BoD is partially redacted (capacity stated as a range, product purity not given, impurity name but no concentration). Player must:

1. **Ask the AI Client** — conversational panel (AIChat, role: Client). Player types natural-language questions about the BoD. The AI returns partial or evasive answers mirroring how real clients behave. Some questions are answered; some are told "not yet defined"; a few reveal contradictions.
2. **Assumption Register** — a structured form. Player documents: *Assumption / Basis for assumption / Risk level (Low/Medium/High)*. Scored on whether the assumption is technically justified and the risk level is correctly assessed.
3. **Conflict Detection** — two BoD sections contain a subtle internal contradiction (e.g. annual capacity figure is inconsistent with operating hours and stated throughput rate). Player must flag the contradiction before proceeding. No card selection; player clicks "Flag" on the relevant passages.

**Knowledge required:** Understanding what information belongs in a BoD; ability to identify gaps; basic mass balance arithmetic.

### Hard
**Primary mechanic: BoD Audit + Clarification Letter**

The BoD is from a "real-world messy" project: mixed units (mass flow in one section, molar flow in another), a "maximum" used where "minimum" was meant, and two sections that contradict each other.

1. **Annotate the BoD** — player clicks on text passages and tags each one: *Confirmed / Assumed / Ambiguous / Contradicted*. A coverage heatmap updates. Score requires full annotation before submission.
2. **Mass balance sanity check (CalculatorForm)** — given capacity, reaction stoichiometry, and feed purity, does the BoD internally close? Player inputs their interpretation; system checks against stoichiometric constraints.
3. **Clarification letter** — fill a ranked list of questions to the client (structured form: Question / Why it matters / Priority). Scored on completeness (doesn't miss critical gaps), specificity (not asking things already in the BoD), and ranking (safety-critical gaps ranked higher).

**Knowledge required:** Unit conversion, stoichiometry, ability to write technical questions, understanding of BoD coverage requirements.

---

## Mission 2 — The Reactor Runs Hot

### Medium
**Primary mechanic: Live Reactor Simulator + Control Loop Placement**

1. **ReactorSim** — player sees a CSTR schematic with live temperature vs. time and conversion vs. time graphs. Controls: coolant flow slider (0–60 m³/h), feed rate slider (50–150% of design), season toggle (winter 25°C / summer 32°C CW supply). System introduces disturbances (coolant supply suddenly drops to 30 m³/h; feed rate steps up 20%). Player must identify the correct response using the **ActionDeck** (e.g. "Reduce feed rate", "Increase coolant flow", "Trigger interlock"). Simulator shows the consequence in real time on the graphs.
2. **Heat duty sizing (CalculatorForm)** — given Q = ṁ·Cp·ΔT for coolant and the reactor heat duty (from the BoD), player calculates required coolant flow for summer conditions. A "design adequacy" indicator shows safe / marginal / failing.
3. **Control loop placement (PIDCanvas fragment)** — a partial P&ID of the reactor section. Player drags a temperature measurement, a controller block, and a coolant flow control valve onto the diagram and connects them. Validation checks: is the measurement downstream of where it matters? Is the control action direction correct (increase coolant on high T)?

**Knowledge required:** Heat balance (Q = ṁ·Cp·ΔT), understanding of control loop elements, first-principles response to process disturbances.

### Hard
**Primary mechanic: Reactor Sizing + Thermal Runaway Analysis + Reactor Type Selection**

1. **Kinetics sizing (CalculatorForm sequence)** — given Arrhenius parameters (A, Ea), target conversion, and operating temperature, player calculates residence time (τ = f(k, X)) and thus reactor volume. The tool shows how volume increases sharply at low temperature (slow kinetics) and how selectivity collapses above 110°C (selectivity penalty function provided). Player must find the feasible operating window.
2. **LOPA lite (LevelOfProtection)** — for the thermal runaway scenario, player is given initiating event frequency and consequence severity. They stack protection layers and must reach the tolerable risk target. Wrong layer choices (using the control loop as a safety layer) are flagged as violations of independence.
3. **Reactor type decision** — player is shown selectivity vs. conversion curves for CSTR vs. PFR (provided data). They must select the reactor type and operating mode, justify the choice in a structured form, and see a simplified comparison of their design vs. a naive choice. The simulator shows why the wrong reactor type gives poor selectivity or requires much larger volume.

**Knowledge required:** Arrhenius equation, CSTR/PFR design equations, LOPA mechanics, selectivity/conversion tradeoffs.

---

## Mission 3 — Separate or Contaminate

### Medium
**Primary mechanic: Separation Train Builder + Feasibility Tools**

1. **PFDCanvas (separation section)** — player assembles the separation train by dragging unit operations (decanter, distillation column, dryer, condenser) onto a canvas and connecting streams. Validation checks topology: does phase separation come before the column? Is the recycle connection correct? Is the dryer downstream of the impurity removal step?
2. **Relative volatility check (CalculatorForm)** — player enters boiling points of the components (given). System calculates α. If α > 1.3, distillation is flagged as feasible; if α < 1.1, a warning is shown that another technology may be needed. Player must use this to justify or reject distillation for each split.
3. **McCabeThiele (simplified)** — for the key binary split, an interactive graphical tool. Player adjusts reflux ratio (slider), sees operating lines shift, counts theoretical stages, reads product purity result. Teaches the reflux-stages tradeoff without deriving the equations.

**Knowledge required:** Relative volatility, qualitative VLE, McCabe-Thiele reading, understanding of separation train sequencing heuristics.

### Hard
**Primary mechanic: Full Mass Balance + Azeotrope Handling**

1. **StreamTable** — player enters flow rates and compositions at 5–6 key streams. Built-in checker validates that every unit's mass balance closes within 1%. Errors are highlighted by unit. Player must debug: which stream assumption is wrong?
2. **Azeotrope scenario** — player is told that product/impurity forms an azeotrope at a certain composition (data provided). They must identify that simple distillation cannot cross the azeotrope and select a workaround (pressure-swing distillation, liquid-liquid extraction, entrainer). AI Senior Engineer is available for consultation (hint costs score points).
3. **Energy integration opportunity (CompositeHX)** — given the separation train streams, player identifies which hot streams can preheat which cold streams. The composite curve tool shows if the match is thermodynamically feasible and estimates the steam saving.

**Knowledge required:** Mass balance for multicomponent systems, azeotrope thermodynamics, basic pinch concept.

---

## Mission 4 — Count the Heat

### Medium
**Primary mechanic: Stream Matching + HX Sizing**

1. **CompositeHX (stream matching)** — player is shown a table of hot and cold streams (T_in, T_out, duty). They drag connection lines between hot and cold streams to create heat exchanger matches. System validates: is the temperature driving force positive throughout? Does the match violate the pinch (shown as a reference line)? Does it reduce utility targets?
2. **HX sizing (CalculatorForm)** — given Q, LMTD, and overall U (provided), player calculates required area A = Q / (U · LMTD). They choose a standard HX size from a catalog. Undersized: fails in summer. Oversized: flags extra cost. System shows the tradeoff.
3. **Utility selection (CalculatorForm)** — player is shown LP steam (low cost, 160°C saturation) vs. MP steam (higher cost, 200°C). Given reboiler temperature requirement (e.g. 125°C), player must select LP steam and confirm it provides adequate driving force. A wrong choice (MP steam when LP is sufficient) is accepted but flagged as unjustified premium cost.

**Knowledge required:** LMTD calculation, HX design equation, steam saturation temperature vs. pressure, pinch concept basics.

### Hard
**Primary mechanic: Heat Exchanger Network + Operability**

1. **Full HEN on grid diagram (CompositeHX extended)** — player places heat exchangers on a temperature interval grid diagram, targeting minimum utility consumption. Pinch violations are flagged. Utility target bar shows how close the design is to theoretical minimum.
2. **Cooling tower constraint (CalculatorForm)** — given summer wet-bulb temperature, cooling water demand, and approach temperature, player checks whether the 32°C supply temperature can still be maintained under peak load. If not, they must propose a fallback (refrigeration on one circuit, reduce throughput).
3. **Dynamic risk identification** — player is given their HEN design and must identify: what happens if the feed preheat exchanger fouling causes its duty to drop 30%? Does the separator condenser duty increase? Does the CW budget then exceed the summer limit? Player fills a structured cause-effect form. Scored on whether consequences are correctly traced.

**Knowledge required:** HEN grid diagram method, pinch analysis, cooling tower approach temperature, process integration risk thinking.

---

## Mission 5 — Layers of Protection

### Medium
**Primary mechanic: Mini HAZOP + P&ID Instrument Audit**

1. **HAZOPTable** — player is given a simplified P&ID of the reactor section (static SVG with clickable nodes). They click on a node (e.g. reactor inlet pipe), select a guide word (High / Low / None / Reverse flow), and fill in: *Cause → Consequence → Existing Safeguard → Recommendation*. Each row is scored on whether the cause is credible, the consequence is correctly escalated, and the safeguard is appropriate and independent. Three nodes total; ~4 guide words each.
2. **P&ID instrument audit (PIDCanvas)** — an interactive P&ID with deliberately missing instruments (no independent high-T switch, a control valve and safety relief on the same instrumentation signal, a missing level transmitter on the separator). Player clicks problem locations and selects what is missing from a menu. A coverage traffic-light map updates.
3. **LevelOfProtection (LOPA lite)** — for two top hazard scenarios identified in the HAZOP, player stacks protection layers and checks if residual frequency meets the tolerable target. Wrong layer choices (same sensor for control and safety) are flagged.

**Knowledge required:** HAZOP guide words, cause-consequence escalation, protection layer independence, basic LOPA logic.

### Hard
**Primary mechanic: Full HAZOP Node + SIL Sizing + Fault Tree**

1. **HAZOPTable (full node)** — player acts as HAZOP scribe for a complete reactor inlet node (10+ guide words). AI HAZOP facilitator (AIChat, role: Facilitator) guides the session: "What causes high flow here?" and "What is the consequence if this reaches the reactor?" Player's answers are checked for technical completeness.
2. **SIL determination (CalculatorForm sequence)** — given consequence severity (from the HAZOP output) and initiating event frequency (player estimates from provided statistics tables), player calculates required SIL level. They then select sensor architecture (1oo1, 1oo2, 2oo3) and final element, verify that the PFD (probability of failure on demand) meets the SIL target.
3. **Fault tree (FaultTree)** — given the top event "Reactor temperature exceeds 140°C", player builds a fault tree: connects AND/OR gates, places basic events (cooling failure, control loop failure, operator inaction), and checks logical completeness. System calculates top event probability from provided basic event frequencies. Player must verify the calculated probability is consistent with the LOPA result.

**Knowledge required:** HAZOP scribing, SIL arithmetic, PFD calculation, fault tree logic, AND/OR gate probability rules.

---

## Mission 6 — What Leaves the Fence

### Medium
**Primary mechanic: VOC Mass Balance + Wastewater Train Builder**

1. **VOC mass balance (CalculatorForm)** — given feed composition, expected venting losses (provided as % of throughput by stream type), player calculates annual VOC emission in kg/year for each source. They then select control technology (condenser, activated carbon, thermal oxidizer) and see removal efficiency. Must bring all sources below a permit limit table displayed on screen.
2. **Wastewater treatment train (PFDCanvas variant)** — player drag-and-drop sequences treatment units (pH adjustment tank, clarifier, biological reactor, final polish). System validates: does pH neutralization precede biological treatment? Is final pH 6–9? Does BOD meet discharge limit (provided)? Player sees simulated effluent quality evolve through each unit.
3. **Permit gap analysis** — given a regulatory limit table and the player's calculated emission/discharge values, they must flag which streams need additional treatment and propose what. Structured form: *Stream / Calculated value / Permit limit / Proposed control*.

**Knowledge required:** Emission factor calculations, treatment train sequencing, basic wastewater treatment principles, regulatory permit reading.

### Hard
**Primary mechanic: Full Emissions Map + GHG Calculation + BAT Justification**

1. **Full emissions map** — player is given a list of all potential emission points (reactor vent, storage breathing, pump seals, boiler flue gas, wastewater treatment off-gas). For each, they select the applicable emission estimation method (direct measurement, emission factor, mass balance) and input data. System builds a plant-wide emission inventory. Unaddressed sources are flagged red.
2. **Carbon footprint (CalculatorForm)** — given utility consumption (steam kg/h, electricity kW, natural gas Nm³/h for boiler), player applies provided emission factors to calculate Scope 1 and Scope 2 GHG emissions in CO₂-equivalent per tonne of product. Compares two design options (with and without heat recovery).
3. **BAT justification (structured form)** — given a simplified BAT reference document excerpt, player must demonstrate that each chosen emission control technology is BAT or justify a deviation. Scored on quality of engineering argument, not just correct selection. AI Reviewer (AIChat, role: Reviewer) gives a critique of the justification and player must respond.

**Knowledge required:** Emission factor methodology, GHG accounting (Scope 1/2), BAT reference documents, regulatory justification writing.

---

## Mission 7 — Draw the Process

### Medium
**Primary mechanic: Interactive PFD Builder + Error Finding + Mass Balance**

1. **PFDCanvas** — player builds the Solvex-A PFD from scratch on a blank canvas. Unit blocks are available in a palette (reactor, decanter, column, dryer, etc.). Player places blocks, draws streams, labels battery limits. Validation checks: are all confirmed process sections present? Are all streams directional? Does the recycle connect correctly?
2. **Stream data assignment (StreamTable)** — once the topology is placed, player assigns key properties (T, P, phase) to each numbered stream. System checks thermodynamic consistency: if a condenser outlet is marked vapor, flag it. If a reboiler inlet is marked below saturation temperature, flag it.
3. **Error-finding exercise** — after completing their own PFD, player is shown a second PFD (with 5–6 deliberate errors: missing pump between low-P and high-P sections, recycle in wrong direction, decanter missing, relief shown at wrong level of detail). Player clicks error locations and selects the error type from a menu.

**Knowledge required:** PFD conventions, stream condition logic (temperature/phase consistency), process topology rules (pressure elevation requires pump/compressor).

### Hard
**Primary mechanic: PFD from Description + AI Review + Optimisation**

1. **PFD from process description** — player is given a written process narrative only (no template, no checklist). They build the PFD from scratch: all units, all streams, all utility connections, all environmental streams. Scored against a reference PFD on topology, stream completeness, and battery-limit labeling.
2. **AI review (AIChat, role: Reviewer)** — after submitting their PFD, the AI Senior Engineer reviews it and gives a structured critique: "Your recycle stream is missing a purge — what happens to inerts over time?" and "I can't see where the catalyst bleed goes." Player must respond by either modifying the PFD or defending their design in a structured justification form.
3. **Process optimisation comparison** — player is given two PFD options (one with a recycle, one without). They run a simplified yield/cost comparison using provided conversion, separation load, and energy use data. They must justify which design is better and under what conditions the other might be preferred.

**Knowledge required:** PFD authoring standards, recycle purge design, process narrative interpretation, economic tradeoff framing.

---

## Mission 8 — Tag Everything

### Medium
**Primary mechanic: Control Loop Builder + Interlock Table + P&ID Redline**

1. **PIDCanvas (full)** — player is given the approved Solvex-A PFD and a palette of ISA instrument symbols. They must place all instruments and draw all control loops for the reactor section: TIC on the coolant loop, FIC on the feed, PIC on the reactor, LIC on the separator. Validation checks: is each loop complete (measurement → controller → final element)? Is the control action direction correct (fail-safe position)?
2. **Interlock logic table** — player is given a set of process conditions and must fill in a cause-and-effect matrix: *"If TI-101 > 115°C AND FI-102 < 10 m³/h, then → close FCV-201, open emergency vent FV-202."* Scored on completeness (all scenarios covered), correct trigger directions (high vs. low), and correct ESD actions.
3. **P&ID redline exercise** — an existing P&ID has 4–5 safety gaps (no high-pressure interlock on reactor, a control valve that fails open when it should fail closed, missing check valve on product line, spec break omitted at a corrosion boundary). Player "redlines" the P&ID by clicking problem areas and selecting the fix from a menu. The P&ID updates visually.

**Knowledge required:** ISA tag notation, control loop elements, fail-safe valve positions, interlock cause-and-effect logic.

### Hard
**Primary mechanic: Control Philosophy + SIF Design + AI Adversarial**

1. **Control philosophy (structured form)** — player writes a control narrative for 4–5 control loops from a process description: *Controlled variable / Manipulated variable / Controller action / Fail-safe position / Interlocks / Alarms.* Scored against a reference narrative on completeness and technical correctness.
2. **SIF design (CalculatorForm sequence)** — player selects sensors, logic solver, and final elements for the reactor high-high temperature SIF targeting SIL-2. They must verify the PFD (probability of failure on demand) meets the SIL-2 target using provided component reliability data. Wrong architecture (1oo1 when 1oo2 is needed) gives a PFD that fails the target.
3. **AI adversarial (AIChat, role: Adversary)** — the AI Senior Engineer plays devil's advocate: "Your TIC-101 loop controls coolant flow, but what happens if the temperature transmitter fails high? Walk me through the sequence." Player must respond in a structured form: *Failure mode / Consequence / Detection / Existing mitigation / Is it adequate?* Scored on whether they correctly identify the fail-high failure mode, trace the consequence to reactor temperature rising, and confirm the independent high-high interlock catches it (and that the interlock uses a different sensor).

**Knowledge required:** Control narrative writing, SIL-2 PFD arithmetic, failure mode analysis (transmitter fail-high/low), independence verification.

---

## AI integration summary across all missions

| Mission | AI role | How it's used |
|---|---|---|
| M1 medium | Client | Answers BoD clarification questions; some answers are evasive or partial |
| M1 hard | Client | Same, but some answers contain planted errors the player must catch |
| M2 hard | Operator | Acts on player instructions during the live sim; asks "what should I do?" |
| M5 hard | HAZOP Facilitator | Guides through guide words; prompts for missing information |
| M6 hard | Reviewer | Critiques BAT justification; player must respond |
| M7 hard | Reviewer | Reviews completed PFD; raises specific questions player must address |
| M8 hard | Adversary | Gives plausible-but-wrong safety advice; player must identify the flaw |

The adversarial AI mechanic in M8 is the hardest. It trains critical thinking — the ability to identify an error in a confident-sounding technical argument — which is what distinguishes senior from junior engineers.

---

## Schema extensions needed for medium/hard

The current schema (`scenarioTypes.ts` and campaign YAML) supports `deterministic_easy` card selection only. Medium/hard missions will need:

```yaml
# New top-level field on Scenario
interaction_type: card_select | reactor_sim | pid_canvas | hazop_table | calculator_form | ...

# New scoring mode
scoring:
  mode: deterministic_medium | deterministic_hard

# New result fields for quantitative tasks
calculator_tasks:
  - id: heat_duty_summer
    formula: "Q = m_dot * Cp * delta_T"
    inputs: [m_dot, Cp, delta_T]
    target_field: Q
    pass_condition: "within 10% of reference"
    reference_value: 485  # kW

# New AI config block
ai_config:
  role: client | mentor | reviewer | adversary | hazop_facilitator
  context_prompt: "You are the project sponsor for the Solvex-A plant..."
  hints_allowed: true
  hint_score_penalty: 5  # percent per hint used
```

The cleanest approach is to keep each medium/hard mission as a separate YAML file (not appended to the easy campaign) and add a `difficulty_variant_of` back-reference so the UI can group them on the level map.
