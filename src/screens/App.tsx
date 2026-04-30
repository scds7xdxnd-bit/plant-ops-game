import { BodReaderScreen } from "./BodReaderScreen";
import { DecisionBoardScreen } from "./DecisionBoardScreen";
import { DesignReviewScreen } from "./DesignReviewScreen";
import { FeedbackScreen } from "./FeedbackScreen";
import { LevelMapScreen } from "./LevelMapScreen";
import { useGameStore } from "../store/useGameStore";

export function App() {
  const currentScreen = useGameStore((state) => state.currentScreen);

  return (
    <main className="app-shell">
      {currentScreen === "level-map" && <LevelMapScreen />}
      {currentScreen === "bod-reader" && <BodReaderScreen />}
      {currentScreen === "decision-board" && <DecisionBoardScreen />}
      {currentScreen === "design-review" && <DesignReviewScreen />}
      {currentScreen === "feedback" && <FeedbackScreen />}
    </main>
  );
}
