import { ArrowRight, ClipboardList } from "lucide-react";
import { ScreenHeader } from "../../components/ScreenHeader";
import { useGameStore } from "../../store/useGameStore";

const sectionLabels: Record<string, string> = {
  project_context: "Project Context",
  feedstock_requirements: "Feedstock Requirements",
  product_targets: "Product Targets",
  operating_constraints: "Operating Constraints",
  environmental_constraints: "Environmental Constraints",
  safety_constraints: "Safety Constraints",
};

export function BodReaderScreen() {
  const scenario = useGameStore((state) => state.scenario);
  const goTo = useGameStore((state) => state.goTo);

  return (
    <section className="screen">
      <ScreenHeader eyebrow="Simplified BoD / DBM" title="Read The Design Basis">
        <button className="secondary-button" onClick={() => goTo("level-map")}>
          Back
        </button>
        <button className="primary-button" onClick={() => goTo("decision-board")}>
          <ClipboardList size={18} />
          Start Decisions
        </button>
      </ScreenHeader>

      <section className="senior-note">
        <p className="label">Senior Engineer</p>
        <p>{scenario.briefing.senior_engineer_message}</p>
      </section>

      <section className="document-grid">
        {Object.entries(scenario.bod_excerpt).map(([section, items]) => (
          <article className="document-section" key={section}>
            <h2>{sectionLabels[section] ?? section}</h2>
            <ul>
              {items.map((item) => (
                <li key={item}>
                  <ArrowRight size={14} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </section>
  );
}
