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
