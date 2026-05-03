import type {
  DecisionCard,
  DecisionCategoryId,
  Scenario,
} from "../../domain/scenarioTypes";

export const categoryLabels: Record<DecisionCategoryId, string> = {
  reactor_system: "Materials",
  separation_system: "Separation",
  heat_transfer_and_utilities: "Utilities",
  process_control_and_safety: "Control",
  environmental_treatment: "Environment",
  unsupported_for_now: "Advanced",
};

export const displayLabels: Record<string, string> = {
  reactor_temperature_control_loop: "Reactor temperature control loop",
  reactor_heat_removal_system: "Reactor heat-removal system",
  high_temperature_alarm: "High reactor temperature alarm",
  reactor_pressure_relief_valve: "Reactor pressure relief protection",
  flammable_feed_vapor_control: "Flammable feed vapor / ignition-source control",
  corrosion_resistant_feed_b_contact_parts: "Corrosion-resistant materials for Feed B",
  light_impurity_removal_step: "Light-impurity removal step",
  product_drying_or_water_removal: "Product water-removal / drying step",
  wastewater_neutralization: "Wastewater neutralization",
  voc_emission_control: "VOC emission control",
  full_plant_3d_model: "Full 3D plant model",
  finite_element_analysis_reactor_shell: "FEA on reactor vessel",
  cryogenic_distillation_column: "Cryogenic distillation",
  nuclear_grade_containment: "Nuclear-grade containment",
  food_grade_sterile_design: "Food-grade sterile design",
  maximize_reactor_temperature: "Operate near max reactor temperature",
  ignore_summer_cooling_constraint: "Ignore summer cooling limit",
  reactor_heat_removal_summer_duty: "Reactor heat removal sized for summer CW",
  reactor_temp_control_coolant_loop: "Temp control tied to coolant flow",
  independent_high_temp_interlock: "Independent high-temp interlock",
  define_max_reactor_operating_temp: "Max allowable reactor temp",
  flag_cw_summer_design_constraint: "Flag CW summer limitation",
  relief_venting_review_runaway: "Relief/venting review for runaway",
  check_coolant_supply_before_increase: "Check coolant supply before increasing flow",
  verify_utility_bottleneck_before_hx: "Verify utility bottleneck before larger HX",
  feed_rate_reduction_operating_fallback: "Feed rate reduction as summer fallback",
  ignore_summer_cw_use_annual_avg: "Ignore summer CW limit; use annual avg",
  operator_alarm_only_for_runaway: "Operator alarm only for runaway",
  overdesign_reactor_volume_heat_removal: "Overdesign reactor volume for heat removal",
  exotic_metallurgy_no_corrosion_evidence: "Exotic metallurgy without corrosion evidence",
  full_cfd_fea_3d_reactor_modeling: "Full CFD/FEA/3D modelling for reactor",
  same_control_safety_protection_layer: "Treat control and safety as same layer",
  sep_light_impurity_removal: "Light-impurity removal step",
  sep_product_water_removal: "Product water-removal or drying step",
  sep_performance_targets: "Separation performance targets",
  sep_request_vle_data: "Request VLE / relative volatility data",
  sep_account_temp_sensitivity: "Account for temperature sensitivity",
  sep_water_routing_to_treatment: "Route water-rich streams to treatment",
  sep_requirements_vs_sizing: "Requirements now; sizing later",
  sep_evaluate_alternatives: "Evaluate distillation and alternatives",
  sep_link_feedb_to_water: "Link Feed B to water removal",
  sep_cryogenic_no_data: "Cryogenic distillation without data",
  sep_skip_water_removal: "Skip water removal",
  sep_purity_packaging_only: "Purity as packaging check only",
  sep_column_sizing_now: "Final column sizing now",
  sep_full_simulation: "Full rigorous simulation now",
  sep_ignore_light_impurity: "Ignore light impurity X",
  sep_high_temp_stripping: "High-temp stripping without check",
};

export function getDecisionDisplayLabel(id: string, fallback: string): string {
  return displayLabels[id] ?? fallback;
}

export function sortCardsByCategoryDisplayLabel(
  cards: DecisionCard[],
): DecisionCard[] {
  const grouped: Record<string, DecisionCard[]> = {};

  for (const card of cards) {
    const categoryLabel = categoryLabels[card.category] ?? card.category;
    grouped[categoryLabel] ??= [];
    grouped[categoryLabel].push(card);
  }

  for (const categoryLabel of Object.keys(grouped)) {
    grouped[categoryLabel].sort((a, b) =>
      getDecisionDisplayLabel(a.id, a.label).localeCompare(
        getDecisionDisplayLabel(b.id, b.label),
      ),
    );
  }

  return Object.keys(grouped)
    .sort((a, b) => a.localeCompare(b))
    .flatMap((categoryLabel) => grouped[categoryLabel]);
}

export function sortDecisionIdsByBoardOrder(
  scenario: Scenario,
  ids: string[],
): string[] {
  const order = new Map(
    sortCardsByCategoryDisplayLabel(scenario.decision_cards).map(
      (card, index) => [card.id, index],
    ),
  );

  return [...ids].sort(
    (a, b) =>
      (order.get(a) ?? Number.MAX_SAFE_INTEGER) -
      (order.get(b) ?? Number.MAX_SAFE_INTEGER),
  );
}
