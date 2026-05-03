import type { DecisionCard as DecisionCardType, DecisionCategoryId } from "../../domain/scenarioTypes";
import bellIcon from "../../assets/icons/plant-ops/icon-bell.svg";
import cloudIcon from "../../assets/icons/plant-ops/icon-cloud.svg";
import cubeIcon from "../../assets/icons/plant-ops/icon-cube.svg";
import filterIcon from "../../assets/icons/plant-ops/icon-filter.svg";
import flameIcon from "../../assets/icons/plant-ops/icon-flame.svg";
import gearIcon from "../../assets/icons/plant-ops/icon-gear.svg";
import heatWavesIcon from "../../assets/icons/plant-ops/icon-heat-waves.svg";
import leafIcon from "../../assets/icons/plant-ops/icon-leaf.svg";
import reliefValveIcon from "../../assets/icons/plant-ops/icon-relief-valve.svg";
import shieldIcon from "../../assets/icons/plant-ops/icon-shield.svg";
import thermometerIcon from "../../assets/icons/plant-ops/icon-thermometer.svg";
import waterDropIcon from "../../assets/icons/plant-ops/icon-water-drop.svg";
import waterNeutralizationIcon from "../../assets/icons/plant-ops/icon-water-neutralization.svg";
import {
  categoryLabels,
  getDecisionDisplayLabel,
} from "./decisionPresentation";

const pillOverrides: Record<string, { label: string; className: string }> = {
  reactor_pressure_relief_valve: { label: "Safety", className: "pill-safety" },
  flammable_feed_vapor_control: { label: "Safety", className: "pill-safety" },
  nuclear_grade_containment: { label: "Safety", className: "pill-safety" },
  independent_high_temp_interlock: { label: "Safety", className: "pill-safety" },
  relief_venting_review_runaway: { label: "Safety", className: "pill-safety" },
  same_control_safety_protection_layer: { label: "Safety", className: "pill-safety" },
  identify_relief_scenarios_reactor_and_separation: { label: "Safety", className: "pill-safety" },
};

const categoryPillClasses: Record<DecisionCategoryId, string> = {
  reactor_system: "pill-materials",
  separation_system: "pill-separation",
  heat_transfer_and_utilities: "pill-utilities",
  process_control_and_safety: "pill-control",
  environmental_treatment: "pill-environment",
  unsupported_for_now: "pill-not-needed",
};

function getPillInfo(card: DecisionCardType): {
  label: string;
  className: string;
} {
  if (pillOverrides[card.id]) return pillOverrides[card.id];
  return {
    label: categoryLabels[card.category],
    className: categoryPillClasses[card.category],
  };
}

interface DecisionCardProps {
  card: DecisionCardType;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

export function DecisionCard({ card, isSelected, onToggle }: DecisionCardProps) {
  const icon = getDecisionIcon(card.id, card.category);
  const displayLabel = getDecisionDisplayLabel(card.id, card.label);
  const pill = getPillInfo(card);

  return (
    <button
      className={`decision-card ${isSelected ? "selected" : ""}`}
      data-testid={`decision-card-${card.id}`}
      onClick={() => onToggle(card.id)}
      type="button"
    >
      <span className="decision-card__icon" aria-hidden="true">
        <img src={icon} alt="" />
      </span>
      <span className="decision-card__title">{displayLabel}</span>
      <span className={`decision-card__pill ${pill.className}`}>
        {pill.label}
      </span>
      <span className="decision-card__checkbox" aria-hidden="true" />
    </button>
  );
}

function getDecisionIcon(id: string, category: DecisionCategoryId): string {
  const iconsByDecisionId: Record<string, string> = {
    hazardous_area_classification_feed_a: flameIcon,
    emergency_isolation_valves_feed_a: shieldIcon,
    plant_esd_system: shieldIcon,
    fire_and_gas_detection: bellIcon,
    bunding_for_liquid_storage: waterDropIcon,
    mandate_hazop_before_detailed_design: gearIcon,
    identify_relief_scenarios_reactor_and_separation: reliefValveIcon,
    closed_safe_disposal_for_relief_and_vents: shieldIcon,
    passive_fire_protection_steelwork: shieldIcon,
    atex_zone_0_entire_plant: gearIcon,
    operator_procedures_only_for_esd: bellIcon,
    size_all_relief_valves_now: gearIcon,
    extra_controllers_as_safety_layers: gearIcon,
    skip_bunding_for_feed_b: waterDropIcon,
    assign_sil_before_hazop: gearIcon,
    inherently_safer_over_layers_of_protection: shieldIcon,
    reactor_temperature_control_loop: thermometerIcon,
    reactor_heat_removal_system: heatWavesIcon,
    high_temperature_alarm: bellIcon,
    reactor_pressure_relief_valve: reliefValveIcon,
    flammable_feed_vapor_control: flameIcon,
    corrosion_resistant_feed_b_contact_parts: shieldIcon,
    light_impurity_removal_step: filterIcon,
    product_drying_or_water_removal: waterDropIcon,
    wastewater_neutralization: waterNeutralizationIcon,
    voc_emission_control: cloudIcon,
    full_plant_3d_model: cubeIcon,
    finite_element_analysis_reactor_shell: gearIcon,
    reactor_heat_removal_summer_duty: heatWavesIcon,
    reactor_temp_control_coolant_loop: thermometerIcon,
    independent_high_temp_interlock: bellIcon,
    define_max_reactor_operating_temp: thermometerIcon,
    flag_cw_summer_design_constraint: heatWavesIcon,
    relief_venting_review_runaway: reliefValveIcon,
    check_coolant_supply_before_increase: waterDropIcon,
    verify_utility_bottleneck_before_hx: gearIcon,
    feed_rate_reduction_operating_fallback: gearIcon,
    ignore_summer_cw_use_annual_avg: heatWavesIcon,
    operator_alarm_only_for_runaway: bellIcon,
    overdesign_reactor_volume_heat_removal: cubeIcon,
    exotic_metallurgy_no_corrosion_evidence: shieldIcon,
    full_cfd_fea_3d_reactor_modeling: cubeIcon,
    same_control_safety_protection_layer: gearIcon,
    sep_light_impurity_removal: filterIcon,
    sep_product_water_removal: waterDropIcon,
    sep_performance_targets: filterIcon,
    sep_request_vle_data: filterIcon,
    sep_account_temp_sensitivity: thermometerIcon,
    sep_water_routing_to_treatment: waterNeutralizationIcon,
    sep_requirements_vs_sizing: filterIcon,
    sep_evaluate_alternatives: filterIcon,
    sep_link_feedb_to_water: waterDropIcon,
    sep_cryogenic_no_data: filterIcon,
    sep_skip_water_removal: waterDropIcon,
    sep_purity_packaging_only: filterIcon,
    sep_column_sizing_now: cubeIcon,
    sep_full_simulation: cubeIcon,
    sep_ignore_light_impurity: filterIcon,
    sep_high_temp_stripping: flameIcon,
    list_all_heat_demands_across_plant: heatWavesIcon,
    match_lp_steam_to_reboiler_duty: heatWavesIcon,
    size_cw_against_summer_limit: waterDropIcon,
    assess_heat_recovery_effluent_to_feed: heatWavesIcon,
    flag_summer_cw_constraint_for_all_cooling: waterDropIcon,
    confirm_lp_steam_temp_adequate_for_reboiler: thermometerIcon,
    include_utility_balance_in_design_basis: gearIcon,
    account_for_heat_tracing_needs: heatWavesIcon,
    fired_heater_for_reboiler_no_justification: flameIcon,
    refrigeration_for_condensers_no_data: heatWavesIcon,
    design_coolers_on_winter_cw_only: waterDropIcon,
    skip_heat_recovery_plant_too_small: heatWavesIcon,
    size_steam_on_reactor_only: heatWavesIcon,
    mp_steam_for_all_heating: heatWavesIcon,
    design_coolers_independently_ignore_total_cw_budget: waterDropIcon,
    all_major_process_units_as_labeled_blocks: cubeIcon,
    all_main_streams_with_flow_direction: heatWavesIcon,
    utility_connections_at_each_major_unit: heatWavesIcon,
    recycle_stream_on_pfd: filterIcon,
    wastewater_and_vent_routing_on_pfd: waterNeutralizationIcon,
    numbered_streams_for_stream_table: gearIcon,
    stream_table_with_key_properties: gearIcon,
    feed_entry_and_product_exit_labeled: cubeIcon,
    heat_recovery_exchangers_on_pfd: heatWavesIcon,
    control_valve_symbols_on_pfd: gearIcon,
    pipe_sizes_on_pfd: gearIcon,
    every_drain_and_vent_on_pfd: waterDropIcon,
    relief_valve_symbols_on_pfd_vessels: reliefValveIcon,
    full_mechanical_equipment_list_on_pfd: cubeIcon,
    omit_env_and_utility_streams_for_simplicity: waterDropIcon,
    three_d_plant_layout_on_pfd: cubeIcon,
    voc_recovery_or_destruction_on_all_vents: cloudIcon,
    define_all_wastewater_streams_by_source: waterDropIcon,
    ph_neutralization_before_discharge: waterNeutralizationIcon,
    secondary_containment_all_chemical_storage: waterDropIcon,
    quantified_emission_estimates_for_permit: gearIcon,
    fugitive_emission_monitoring_program: bellIcon,
    recover_organic_vapor_before_destruction: filterIcon,
    define_disposal_route_for_solid_waste: cubeIcon,
    full_biological_ww_treatment_no_data: cubeIcon,
    open_flame_flare_for_voc_control: flameIcon,
    fugitive_emissions_negligible_no_basis: cloudIcon,
    skip_secondary_containment_for_feed_b_aqueous: waterDropIcon,
    discharge_wastewater_after_neutralization_only: waterDropIcon,
    env_compliance_as_paperwork_only: gearIcon,
    ignore_solid_waste_negligible: cubeIcon,

    // Mission 8
    all_instruments_in_isa_notation: gearIcon,
    all_control_loops_fully_shown: gearIcon,
    independent_high_high_temp_interlock_shown_separately: bellIcon,
    manual_block_valves_on_major_lines: shieldIcon,
    check_valves_on_feed_and_product_lines: shieldIcon,
    pipe_spec_breaks_on_pid: gearIcon,
    reactor_relief_valve_with_discharge_routing: reliefValveIcon,
    sample_points_on_product_and_key_streams: waterDropIcon,
    esd_connections_to_final_elements: shieldIcon,
    three_d_pipe_routing_on_pid: cubeIcon,
    structural_civil_details_on_pid: cubeIcon,
    vendor_internal_details_on_pid: gearIcon,
    electrical_wiring_on_pid: gearIcon,
    utility_header_full_detail_on_process_pid: heatWavesIcon,
    require_fea_before_package_approval: cubeIcon,
    approve_package_despite_open_data_gaps: gearIcon,
  };

  if (iconsByDecisionId[id]) {
    return iconsByDecisionId[id];
  }

  const fallbackIcons: Record<DecisionCategoryId, string> = {
    reactor_system: shieldIcon,
    separation_system: filterIcon,
    heat_transfer_and_utilities: heatWavesIcon,
    process_control_and_safety: shieldIcon,
    environmental_treatment: leafIcon,
    unsupported_for_now: gearIcon,
  };

  return fallbackIcons[category];
}
