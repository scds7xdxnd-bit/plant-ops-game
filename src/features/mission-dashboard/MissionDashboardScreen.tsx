import { TopMissionHeader } from "./TopMissionHeader";
import { LevelSidebar } from "./LevelSidebar";
import { DesignBasisPanel } from "./DesignBasisPanel";
import { DecisionBoardPanel } from "./DecisionBoardPanel";
import { MentorActionBar } from "./MentorActionBar";
import "./missionDashboard.css";

export function MissionDashboardScreen() {
  return (
    <div className="dashboard">
      <TopMissionHeader />
      <main className="dashboard-main">
        <LevelSidebar />
        <DesignBasisPanel />
        <DecisionBoardPanel />
      </main>
      <MentorActionBar />
    </div>
  );
}
