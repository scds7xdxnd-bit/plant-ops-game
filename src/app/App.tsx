import { DesignReviewCompleteScreen } from "../features/design-review/DesignReviewCompleteScreen";
import { MissionDashboardScreen } from "../features/mission-dashboard/MissionDashboardScreen";
import { BodReaderScreen } from "../features/mission-flow/BodReaderScreen";
import { DecisionBoardScreen } from "../features/mission-flow/DecisionBoardScreen";
import { LevelMapScreen } from "../features/mission-flow/LevelMapScreen";
import { useGameStore } from "../store/useGameStore";

export function App() {
  const currentScreen = useGameStore((state) => state.currentScreen);

  if (currentScreen === "mission-dashboard") {
    return <MissionDashboardScreen />;
  }

  if (currentScreen === "design-review") {
    return <DesignReviewCompleteScreen />;
  }

  return (
    <main className="app-shell">
      {currentScreen === "level-map" && <LevelMapScreen />}
      {currentScreen === "bod-reader" && <BodReaderScreen />}
      {currentScreen === "decision-board" && <DecisionBoardScreen />}
    </main>
  );
}
