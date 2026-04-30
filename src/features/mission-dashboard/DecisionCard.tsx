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
};

const pillOverrides: Record<string, { label: string; className: string }> = {
  reactor_pressure_relief_valve: { label: "Safety", className: "pill-safety" },
  flammable_feed_vapor_control: { label: "Safety", className: "pill-safety" },
  nuclear_grade_containment: { label: "Safety", className: "pill-safety" },
};

const categoryPillClasses: Record<DecisionCategoryId, string> = {
  reactor_system: "pill-materials",
  separation_system: "pill-separation",
  heat_transfer_and_utilities: "pill-utilities",
  process_control_and_safety: "pill-control",
  environmental_treatment: "pill-environment",
  unsupported_for_now: "pill-not-needed",
};

function getDisplayLabel(id: string, fallback: string): string {
  return displayLabels[id] ?? fallback;
}

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
  const displayLabel = getDisplayLabel(card.id, card.label);
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
