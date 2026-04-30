import { ArrowRight, RefreshCw } from "lucide-react";
import { useGameStore } from "../../store/useGameStore";
import engineerSvgUrl from "../../assets/icons/plant-ops/icon-engineer.svg";

export function MentorActionBar() {
  const selectedDecisionIds = useGameStore(
    (state) => state.selectedDecisionIds,
  );
  const clearSelections = useGameStore((state) => state.clearSelections);
  const submitDesignReview = useGameStore((state) => state.submitDesignReview);
  const hasSelections = selectedDecisionIds.length > 0;

  return (
    <footer className="mentor-action-zone">
      <div className="mentor-action-panel">
        <div className="mentor-identity">
          <div className="mentor-avatar">
            <img
              src={engineerSvgUrl}
              alt="Senior Engineer"
              className="mentor-avatar-img"
            />
          </div>

          <div className="mentor-copy">
            <p className="mentor-name">Senior Engineer</p>
            <p className="mentor-text">
              Select the decisions that are justified by the design basis.
            </p>
          </div>
        </div>

        <div className="mentor-actions">
          <button
            className="btn-clear"
            disabled={!hasSelections}
            onClick={clearSelections}
            type="button"
          >
            <RefreshCw size={16} />
            Clear All
          </button>

          <button
            className="btn-submit"
            disabled={!hasSelections}
            onClick={submitDesignReview}
            type="button"
          >
            Submit for Review
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
