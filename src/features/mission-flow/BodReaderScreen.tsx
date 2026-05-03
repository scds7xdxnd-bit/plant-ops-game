import { ArrowRight, ClipboardList } from "lucide-react";
import { ScreenHeader } from "../../components/ScreenHeader";
import { useGameStore, getBodForMission } from "../../store/useGameStore";

export function BodReaderScreen() {
  const scenario = useGameStore((state) => state.scenario);
  const campaign = useGameStore((state) => state.campaign);
  const goTo = useGameStore((state) => state.goTo);

  const missionNumber = scenario.mission_number ?? 1;
  const bodSections = getBodForMission(campaign, missionNumber);

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
        {bodSections.map(({ key, section, isNew }) => (
          <article className="document-section" key={key}>
            <h2>
              {section.items.length > 0 &&
                key
                  .split("_")
                  .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                  .join(" ")}
              {isNew && (
                <span className="document-section__new-badge"> NEW</span>
              )}
            </h2>
            <ul>
              {section.items.map((item) => (
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
