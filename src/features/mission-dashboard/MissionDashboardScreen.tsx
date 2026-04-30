import { Lightbulb, Target } from "lucide-react";
import { TopMissionHeader } from "./TopMissionHeader";
import { LevelSidebar } from "./LevelSidebar";
import { DesignBasisPanel } from "./DesignBasisPanel";
import { DecisionBoardPanel } from "./DecisionBoardPanel";
import { MentorActionBar } from "./MentorActionBar";
import { useGameStore } from "../../store/useGameStore";
import "./missionDashboard.css";

export function MissionDashboardScreen() {
  const scenario = useGameStore((state) => state.scenario);
  const totalCorrect = scenario.correct_decision_ids.length;

  return (
    <div className="dashboard">
      <TopMissionHeader />
      <main className="dashboard-main">
        <LevelSidebar />
        <DesignBasisPanel />
        <DecisionBoardPanel />
      </main>

      <section className="mission-support-strip">
        <div className="mission-support-strip__item">
          <Target size={15} className="mission-support-strip__icon" />
          <div className="mission-support-strip__copy">
            <p className="mission-support-strip__label">Mission Objective</p>
            <p className="mission-support-strip__text">
              Select the early design decisions justified by the design basis.
            </p>
          </div>
        </div>

        <div className="mission-support-strip__divider" />

        <div className="mission-support-strip__item">
          <span className="mission-support-strip__badge">{totalCorrect} target</span>
          <div className="mission-support-strip__copy">
            <p className="mission-support-strip__label">Selection Target</p>
            <p className="mission-support-strip__text">
              {totalCorrect} supported decisions needed for a complete design.
            </p>
          </div>
        </div>

        <div className="mission-support-strip__divider" />

        <div className="mission-support-strip__item">
          <Lightbulb size={15} className="mission-support-strip__icon" />
          <div className="mission-support-strip__copy">
            <p className="mission-support-strip__label">Mentor Hint</p>
            <p className="mission-support-strip__text">
              Advanced items may be useful later, but not now.
            </p>
          </div>
        </div>
      </section>

      <MentorActionBar />
    </div>
  );
}
