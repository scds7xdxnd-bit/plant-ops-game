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
  hazardous_area_classification_feed_a: "Hazardous area classification for Feed A",
  emergency_isolation_valves_feed_a: "Emergency isolation valves on Feed A supply",
  plant_esd_system: "Plant-wide emergency shutdown system",
  fire_and_gas_detection: "Fire and gas detection system",
  bunding_for_liquid_storage: "Liquid containment bunding",
  mandate_hazop_before_detailed_design: "HAZOP before detailed safety engineering",
  identify_relief_scenarios_reactor_and_separation: "Identify relief scenarios for reactor and separation",
  closed_safe_disposal_for_relief_and_vents: "Closed safe disposal for relief and vents",
  passive_fire_protection_steelwork: "Passive fire protection for structural steelwork",
  atex_zone_0_entire_plant: "Blanket ATEX Zone 0 for entire plant",
  operator_procedures_only_for_esd: "Operator procedures only for ESD",
  size_all_relief_valves_now: "Full relief valve sizing at design-basis stage",
  extra_controllers_as_safety_layers: "Redundant BPCS controllers as safety layer",
  skip_bunding_for_feed_b: "Omit bunding for aqueous Feed B",
  assign_sil_before_hazop: "Assign SIL ratings before hazard study",
  inherently_safer_over_layers_of_protection: "Inherent safety as alternative to protection layers",
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
  list_all_heat_demands_across_plant: "Enumerate all heat demands across plant",
  match_lp_steam_to_reboiler_duty: "LP steam for reboiler and drying duties",
  size_cw_against_summer_limit: "Size all coolers against summer CW limit",
  assess_heat_recovery_effluent_to_feed: "Assess heat recovery: effluent to feed",
  flag_summer_cw_constraint_for_all_cooling: "Flag summer CW limit for all cooling",
  confirm_lp_steam_temp_adequate_for_reboiler: "Confirm LP steam temp adequate for reboiler",
  include_utility_balance_in_design_basis: "Include utility balance in design basis",
  account_for_heat_tracing_needs: "Account for heat tracing needs",
  fired_heater_for_reboiler_no_justification: "Fired heater for reboiler",
  refrigeration_for_condensers_no_data: "Refrigeration for condensers",
  design_coolers_on_winter_cw_only: "Design coolers on winter CW only",
  skip_heat_recovery_plant_too_small: "Skip heat recovery: plant too small",
  size_steam_on_reactor_only: "Size steam on reactor only",
  mp_steam_for_all_heating: "MP steam for all heating duties",
  design_coolers_independently_ignore_total_cw_budget: "Size coolers independently without CW budget check",
  all_major_process_units_as_labeled_blocks: "Major process units as labeled blocks",
  all_main_streams_with_flow_direction: "Main streams with flow direction",
  utility_connections_at_each_major_unit: "Utility connections at each unit",
  recycle_stream_on_pfd: "Recycle stream on PFD",
  wastewater_and_vent_routing_on_pfd: "Wastewater and vent routing",
  numbered_streams_for_stream_table: "Numbered streams for stream table",
  stream_table_with_key_properties: "Stream table with key properties",
  feed_entry_and_product_exit_labeled: "Feed and product battery-limit labels",
  heat_recovery_exchangers_on_pfd: "Heat recovery exchangers on PFD",
  control_valve_symbols_on_pfd: "Individual control valve symbols",
  pipe_sizes_on_pfd: "Pipe sizes and material specs",
  every_drain_and_vent_on_pfd: "Every drain and vent connection",
  relief_valve_symbols_on_pfd_vessels: "Relief valve symbols on vessels",
  full_mechanical_equipment_list_on_pfd: "Full equipment list on PFD",
  omit_env_and_utility_streams_for_simplicity: "Omit environmental and utility streams",
  three_d_plant_layout_on_pfd: "3D layout with dimensions on PFD",
  voc_recovery_or_destruction_on_all_vents: "VOC recovery or destruction on all vents",
  define_all_wastewater_streams_by_source: "Define wastewater streams by source",
  ph_neutralization_before_discharge: "pH neutralization before discharge",
  secondary_containment_all_chemical_storage: "Secondary containment for all chemical storage",
  quantified_emission_estimates_for_permit: "Quantified emission estimates for permit",
  fugitive_emission_monitoring_program: "Fugitive emission monitoring program",
  recover_organic_vapor_before_destruction: "Recover organic vapor before destruction",
  define_disposal_route_for_solid_waste: "Confirm solid waste disposal route",
  env_compliance_as_paperwork_only: "Environmental compliance as paperwork exercise",
  ignore_solid_waste_negligible: "Dismiss solid waste as negligible",

  // Mission 8
  all_instruments_in_isa_notation: "Show instruments using ISA notation",
  all_control_loops_fully_shown: "Show complete control loops",
  independent_high_high_temp_interlock_shown_separately: "Show HH temp interlock independent from control",
  manual_block_valves_on_major_lines: "Show manual block valves on major lines",
  check_valves_on_feed_and_product_lines: "Show check valves on feed and product lines",
  pipe_spec_breaks_on_pid: "Show pipe spec breaks on P&ID",
  reactor_relief_valve_with_discharge_routing: "Show reactor relief valve with discharge routing",
  sample_points_on_product_and_key_streams: "Show sample points on product and key streams",
  esd_connections_to_final_elements: "Show ESD connections to final elements",
  three_d_pipe_routing_on_pid: "3D pipe routing on P&ID",
  structural_civil_details_on_pid: "Structural and civil details on P&ID",
  vendor_internal_details_on_pid: "Vendor internal details on P&ID",
  electrical_wiring_on_pid: "Electrical wiring on P&ID",
  utility_header_full_detail_on_process_pid: "Full utility headers on process P&ID",
  require_fea_before_package_approval: "FEA required before package approval",
  approve_package_despite_open_data_gaps: "Approve package without documenting data gaps",
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
