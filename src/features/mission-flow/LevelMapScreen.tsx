import { ArrowRight, FileText, Lock, Map } from "lucide-react";
import { ScreenHeader } from "../../components/ScreenHeader";
import { useGameStore } from "../../store/useGameStore";

const stages = [
  "BoD Review",
  "Reactor Decisions",
  "Separation Decisions",
  "Heat & Utilities",
  "Safety Systems",
  "Environmental Controls",
  "PFD Assembly",
  "P&ID Basics",
];

export function LevelMapScreen() {
  const scenario = useGameStore((state) => state.scenario);
  const goTo = useGameStore((state) => state.goTo);

  return (
    <section className="screen">
      <ScreenHeader eyebrow="Process Design: Basis to Plant" title={scenario.title}>
        <button className="primary-button" onClick={() => goTo("bod-reader")}>
          <FileText size={18} />
          Open BoD
        </button>
      </ScreenHeader>

      <section className="briefing-band">
        <div>
          <p className="label">Plant</p>
          <strong>{scenario.plant.product}</strong>
          <span>{scenario.plant.plant_type}</span>
        </div>
        <div>
          <p className="label">Role</p>
          <strong>{scenario.player_role}</strong>
          <span>{scenario.difficulty} mode</span>
        </div>
        <div>
          <p className="label">Goal</p>
          <strong>{scenario.stage.name}</strong>
          <span>{scenario.instructions.expected_time_minutes} min target</span>
        </div>
      </section>

      <section className="level-map" aria-label="Gantt-style level map">
        {stages.map((stage, index) => {
          const active = index === 0;
          return (
            <div className={`stage-row ${active ? "active" : ""}`} key={stage}>
              <div className="stage-index">L{index + 1}</div>
              <div className="stage-track">
                <div className="stage-bar">
                  <Map size={16} />
                  <span>{stage}</span>
                </div>
              </div>
              <div className="stage-status">
                {active ? (
                  <>
                    <ArrowRight size={16} />
                    Ready
                  </>
                ) : (
                  <>
                    <Lock size={16} />
                    Locked
                  </>
                )}
              </div>
            </div>
          );
        })}
      </section>
    </section>
  );
}
