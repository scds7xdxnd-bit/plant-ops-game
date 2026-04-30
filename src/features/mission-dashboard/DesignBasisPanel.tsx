import { Download } from "lucide-react";
import { useGameStore } from "../../store/useGameStore";
import clipboardIcon from "../../assets/icons/plant-ops/icon-clipboard.svg";
import flaskIcon from "../../assets/icons/plant-ops/icon-flask.svg";
import targetIcon from "../../assets/icons/plant-ops/icon-target.svg";
import gearIcon from "../../assets/icons/plant-ops/icon-gear.svg";
import leafIcon from "../../assets/icons/plant-ops/icon-leaf.svg";
import shieldIcon from "../../assets/icons/plant-ops/icon-shield.svg";
import lightbulbIcon from "../../assets/icons/plant-ops/icon-lightbulb.svg";

type SectionKey =
  | "feedstock_requirements"
  | "product_targets"
  | "operating_constraints"
  | "environmental_constraints"
  | "safety_constraints";

interface SectionConfig {
  heading: string;
  icon: string;
  iconClass: string;
}

const SECTION_CONFIG: Record<SectionKey, SectionConfig> = {
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
};

const sectionKeys = Object.keys(SECTION_CONFIG) as SectionKey[];

export function DesignBasisPanel() {
  const scenario = useGameStore((state) => state.scenario);
  const { bod_excerpt: bod, plant, instructions } = scenario;

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
          {sectionKeys.map((key) => {
            const items = bod[key];
            if (!items || items.length === 0) return null;
            const { heading, icon, iconClass } = SECTION_CONFIG[key];
            return (
              <div className="design-basis-section" key={key}>
                <div className={`design-basis-section__icon ${iconClass}`}>
                  <img src={icon} alt="" role="presentation" />
                </div>
                <div className="design-basis-section__content">
                  <h3 className="design-basis-section__title">{heading}</h3>
                  <ul className="design-basis-section__list">
                    {items.map((item: string, i: number) => (
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
