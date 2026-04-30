import { RotateCcw } from "lucide-react";
import { ScreenHeader } from "../../components/ScreenHeader";
import { useGameStore } from "../../store/useGameStore";

export function DesignReviewScreen() {
  const scoreResult = useGameStore((state) => state.scoreResult);
  const resetLevel = useGameStore((state) => state.resetLevel);

  if (!scoreResult) {
    return null;
  }

  return (
    <section className="screen review-screen">
      <ScreenHeader eyebrow="Design Review" title={scoreResult.band.title}>
        <button className="secondary-button" onClick={resetLevel}>
          <RotateCcw size={18} />
          Reset
        </button>
      </ScreenHeader>

      <section className="score-panel">
        <div className="score-number">{scoreResult.scorePercent}%</div>
        <p>{scoreResult.band.message}</p>
      </section>

      <section className="review-metrics">
        <div>
          <span>{scoreResult.correctSelectedIds.length}</span>
          <p>Correct selections</p>
        </div>
        <div>
          <span>{scoreResult.missedCorrectIds.length}</span>
          <p>Missed required decisions</p>
        </div>
        <div>
          <span>{scoreResult.incorrectSelectedIds.length}</span>
          <p>Unsupported selections</p>
        </div>
      </section>
    </section>
  );
}
