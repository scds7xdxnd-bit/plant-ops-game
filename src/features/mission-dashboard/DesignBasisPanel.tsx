import { Download } from "lucide-react";
import { useGameStore, getBodForMission } from "../../store/useGameStore";
import clipboardIcon from "../../assets/icons/plant-ops/icon-clipboard.svg";
import flaskIcon from "../../assets/icons/plant-ops/icon-flask.svg";
import targetIcon from "../../assets/icons/plant-ops/icon-target.svg";
import gearIcon from "../../assets/icons/plant-ops/icon-gear.svg";
import leafIcon from "../../assets/icons/plant-ops/icon-leaf.svg";
import shieldIcon from "../../assets/icons/plant-ops/icon-shield.svg";
import lightbulbIcon from "../../assets/icons/plant-ops/icon-lightbulb.svg";

type SectionKey =
  | "project_context"
  | "feedstock_requirements"
  | "product_targets"
  | "operating_constraints"
  | "environmental_constraints"
  | "safety_constraints"
  | "reaction_section_overview"
  | "reactor_requirements"
  | "cooling_utility_constraints"
  | "safety_requirements"
  | "design_scope"
  | "reactor_effluent_composition"
  | "product_specification_detail"
  | "separation_constraints"
  | "separation_scope"
  | "environmental_interfaces"
  | "utility_supply"
  | "plant_heat_demands"
  | "heat_recovery_note"
  | "utility_scope"
  | "hazard_summary"
  | "regulatory_requirements"
  | "protection_philosophy"
  | "safety_scope"
  | "emission_sources"
  | "wastewater_streams"
  | "waste_and_containment"
  | "environmental_scope"
  | "pfd_purpose"
  | "confirmed_process_sections"
  | "pfd_stream_requirements"
  | "pfd_scope"
  | "pid_versus_pfd"
  | "control_and_safety_requirements"
  | "isolation_and_protection_hardware"
  | "pid_scope";

interface SectionConfig {
  heading: string;
  icon: string;
  iconClass: string;
}

const SECTION_CONFIG: Record<SectionKey, SectionConfig> = {
  project_context: {
    heading: "Project Context",
    icon: clipboardIcon,
    iconClass: "design-basis-section__icon--context",
  },
  feedstock_requirements: {
    heading: "Feedstock Requirements",
    icon: flaskIcon,
    iconClass: "design-basis-section__icon--feedstock",
  },
  product_targets: {
    heading: "Product Targets",
    icon: targetIcon,
    iconClass: "design-basis-section__icon--product",
  },
  operating_constraints: {
    heading: "Operating Constraints",
    icon: gearIcon,
    iconClass: "design-basis-section__icon--operating",
  },
  environmental_constraints: {
    heading: "Environmental Constraints",
    icon: leafIcon,
    iconClass: "design-basis-section__icon--environmental",
  },
  safety_constraints: {
    heading: "Safety Constraints",
    icon: shieldIcon,
    iconClass: "design-basis-section__icon--safety",
  },
  reaction_section_overview: {
    heading: "Reaction Section Overview",
    icon: flaskIcon,
    iconClass: "design-basis-section__icon--reactor",
  },
  reactor_requirements: {
    heading: "Reactor Requirements",
    icon: flaskIcon,
    iconClass: "design-basis-section__icon--reactor",
  },
  cooling_utility_constraints: {
    heading: "Cooling Utility Constraints",
    icon: gearIcon,
    iconClass: "design-basis-section__icon--operating",
  },
  safety_requirements: {
    heading: "Safety Requirements",
    icon: shieldIcon,
    iconClass: "design-basis-section__icon--safety",
  },
  design_scope: {
    heading: "Design Scope",
    icon: lightbulbIcon,
    iconClass: "design-basis-section__icon--scope",
  },
  reactor_effluent_composition: {
    heading: "Reactor Effluent Composition",
    icon: flaskIcon,
    iconClass: "design-basis-section__icon--reactor",
  },
  product_specification_detail: {
    heading: "Product Specification Detail",
    icon: targetIcon,
    iconClass: "design-basis-section__icon--product",
  },
  separation_constraints: {
    heading: "Separation Constraints",
    icon: gearIcon,
    iconClass: "design-basis-section__icon--operating",
  },
  separation_scope: {
    heading: "Separation Scope",
    icon: lightbulbIcon,
    iconClass: "design-basis-section__icon--scope",
  },
  environmental_interfaces: {
    heading: "Environmental Interfaces",
    icon: leafIcon,
    iconClass: "design-basis-section__icon--environmental",
  },
  utility_supply: {
    heading: "Utility Supply",
    icon: gearIcon,
    iconClass: "design-basis-section__icon--operating",
  },
  plant_heat_demands: {
    heading: "Plant Heat Demands",
    icon: gearIcon,
    iconClass: "design-basis-section__icon--operating",
  },
  heat_recovery_note: {
    heading: "Heat Recovery Note",
    icon: lightbulbIcon,
    iconClass: "design-basis-section__icon--scope",
  },
  utility_scope: {
    heading: "Utility Scope",
    icon: lightbulbIcon,
    iconClass: "design-basis-section__icon--scope",
  },
  hazard_summary: {
    heading: "Hazard Summary",
    icon: shieldIcon,
    iconClass: "design-basis-section__icon--safety",
  },
  regulatory_requirements: {
    heading: "Regulatory Requirements",
    icon: clipboardIcon,
    iconClass: "design-basis-section__icon--context",
  },
  protection_philosophy: {
    heading: "Protection Philosophy",
    icon: shieldIcon,
    iconClass: "design-basis-section__icon--safety",
  },
  safety_scope: {
    heading: "Safety Scope",
    icon: lightbulbIcon,
    iconClass: "design-basis-section__icon--scope",
  },
  emission_sources: {
    heading: "Emission Sources",
    icon: leafIcon,
    iconClass: "design-basis-section__icon--environmental",
  },
  wastewater_streams: {
    heading: "Wastewater Streams",
    icon: leafIcon,
    iconClass: "design-basis-section__icon--environmental",
  },
  waste_and_containment: {
    heading: "Waste & Containment",
    icon: leafIcon,
    iconClass: "design-basis-section__icon--environmental",
  },
  environmental_scope: {
    heading: "Environmental Scope",
    icon: lightbulbIcon,
    iconClass: "design-basis-section__icon--scope",
  },
  pfd_purpose: {
    heading: "PFD Purpose",
    icon: clipboardIcon,
    iconClass: "design-basis-section__icon--context",
  },
  confirmed_process_sections: {
    heading: "Confirmed Process Sections",
    icon: flaskIcon,
    iconClass: "design-basis-section__icon--reactor",
  },
  pfd_stream_requirements: {
    heading: "PFD Stream Requirements",
    icon: gearIcon,
    iconClass: "design-basis-section__icon--operating",
  },
  pfd_scope: {
    heading: "PFD Scope",
    icon: lightbulbIcon,
    iconClass: "design-basis-section__icon--scope",
  },
  pid_versus_pfd: {
    heading: "P&ID vs PFD",
    icon: clipboardIcon,
    iconClass: "design-basis-section__icon--context",
  },
  control_and_safety_requirements: {
    heading: "Control & Safety Requirements",
    icon: shieldIcon,
    iconClass: "design-basis-section__icon--safety",
  },
  isolation_and_protection_hardware: {
    heading: "Isolation & Protection Hardware",
    icon: shieldIcon,
    iconClass: "design-basis-section__icon--safety",
  },
  pid_scope: {
    heading: "P&ID Scope",
    icon: lightbulbIcon,
    iconClass: "design-basis-section__icon--scope",
  },
};

function formatSectionHeading(key: string): string {
  return key
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getSectionConfig(key: string): SectionConfig {
  return (
    SECTION_CONFIG[key as SectionKey] ?? {
      heading: formatSectionHeading(key),
      icon: clipboardIcon,
      iconClass: "design-basis-section__icon--context",
    }
  );
}

export function DesignBasisPanel() {
  const scenario = useGameStore((state) => state.scenario);
  const campaign = useGameStore((state) => state.campaign);
  const { plant, instructions } = scenario;
  const missionNumber = scenario.mission_number ?? 1;

  const bodSections = getBodForMission(campaign, missionNumber);

  return (
    <section className="dashboard-panel design-basis-panel">
      <header className="design-basis-panel__header">
        <span className="design-basis-label">DESIGN BASIS EXCERPT</span>
        <button className="btn-download-pdf" type="button">
          <Download size={14} />
          Download (PDF)
        </button>
      </header>

      <div className="design-basis-body">
        <div className="design-basis-summary">
          <img
            className="design-basis-summary__icon"
            src={clipboardIcon}
            alt=""
            role="presentation"
          />
          <div className="design-basis-summary__text">
            <p>
              <strong>Project:</strong> {plant.product} Specialty Chemical Plant
            </p>
            <p>
              <strong>Annual Capacity:</strong>{" "}
              {plant.annual_capacity_tpy.toLocaleString()} tons/year
            </p>
            <p>
              <strong>Plant Type:</strong> {plant.plant_type}
            </p>
          </div>
        </div>

        <div className="design-basis-sections">
          {bodSections.map(({ key, section, isNew }) => {
            const { heading, icon, iconClass } = getSectionConfig(key);
            return (
              <div className="design-basis-section" key={key}>
                <div className={`design-basis-section__icon ${iconClass}`}>
                  <img src={icon} alt="" role="presentation" />
                </div>
                <div className="design-basis-section__content">
                  <h3 className="design-basis-section__title">
                    {heading}
                    {isNew && (
                      <span className="design-basis-section__new-badge">
                        NEW
                      </span>
                    )}
                  </h3>
                  <ul className="design-basis-section__list">
                    {section.items.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        <div className="design-basis-task">
          <div className="design-basis-task__icon">
            <img src={lightbulbIcon} alt="" role="presentation" />
          </div>
          <p>
            <strong>Task:</strong> {instructions.prompt}
          </p>
        </div>
      </div>
    </section>
  );
}
