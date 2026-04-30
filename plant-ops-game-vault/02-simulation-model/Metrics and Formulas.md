# Metrics and Formulas

#### Purpose

This note defines the first metric layer for the plant improvement simulation. These are not final formulas; they are placeholders for paper prototyping and deterministic implementation tests.

#### Metric Categories

| Category | Example Metrics | Player Meaning |
|---|---|---|
| Market | demand, satisfaction, churn risk, willingness to pay | Whether customers value the change |
| Financial | revenue, margin, capex, payback period | Whether the case works commercially |
| Operations | throughput, uptime, changeover time, WIP | Whether the plant can execute reliably |
| Quality | defect rate, rework rate, inspection load | Whether output meets expectations |
| Engineering | feasibility, technical risk, utility headroom | Whether the change is physically plausible |
| Safety and compliance | safety risk, audit risk, emissions | Whether the change creates unacceptable risk |
| Organization | trust, morale, engineering capacity | Whether the company can absorb the project |

#### Starter Formulas

These formulas are intentionally simple so they can be tested by hand.

```text
effective_capacity = bottleneck_capacity * uptime * yield
service_level = min(1, effective_capacity / committed_demand)
gross_margin = revenue - variable_cost - quality_loss_cost - expedite_cost
project_value = strategic_value + margin_gain - capex_penalty - risk_penalty
customer_satisfaction_delta = quality_fit + delivery_fit + price_fit - disruption_penalty
```

#### Formula Governance

Every formula should eventually record:

- Purpose
- Inputs
- Units
- Expected range
- Source or assumption
- Test cases
- Known simplifications

#### Balance Principle

The game should reward coherent tradeoff thinking, not formula hunting. If a formula encourages unrealistic optimization, adjust the model or hide precision from the player.

#### Related Notes

- [[Plant Improvement Simulation]]
- [[Plant Data Model]]
- [[Scenario Data Schema]]
- [[Source of Truth]]
