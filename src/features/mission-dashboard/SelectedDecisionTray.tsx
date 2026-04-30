import { X } from "lucide-react";
import { useGameStore } from "../../store/useGameStore";
import {
  getDecisionDisplayLabel,
  sortDecisionIdsByBoardOrder,
} from "./decisionPresentation";

export function SelectedDecisionTray() {
  const scenario = useGameStore((state) => state.scenario);
  const selectedIds = useGameStore((state) => state.selectedDecisionIds);
  const toggleDecision = useGameStore((state) => state.toggleDecision);

  return (
    <div className="selected-tray">
      <h4 className="selected-tray__header">
        Selected Decisions ({selectedIds.length})
      </h4>

      {selectedIds.length === 0 ? (
        <p className="selected-tray__empty">
          Select decision cards from the grid above.
        </p>
      ) : (
        <div className="selected-tray__chips">
          {sortDecisionIdsByBoardOrder(scenario, selectedIds).map((id) => {
            const card = scenario.decision_cards.find((c) => c.id === id);
            const label = getDecisionDisplayLabel(id, card?.label ?? id);
            return (
              <span className="selected-tray__chip" key={id}>
                {label}
                <button
                  type="button"
                  onClick={() => toggleDecision(id)}
                  aria-label={`Remove ${label}`}
                >
                  <X size={10} strokeWidth={3} />
                </button>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
