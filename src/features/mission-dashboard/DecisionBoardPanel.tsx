import { useGameStore } from "../../store/useGameStore";
import { DecisionCard } from "./DecisionCard";
import { SelectedDecisionTray } from "./SelectedDecisionTray";
import { sortCardsByCategoryDisplayLabel } from "./decisionPresentation";

export function DecisionBoardPanel() {
  const scenario = useGameStore((state) => state.scenario);
  const selectedDecisionIds = useGameStore(
    (state) => state.selectedDecisionIds,
  );
  const toggleDecision = useGameStore((state) => state.toggleDecision);
  const selectedSet = new Set(selectedDecisionIds);
  const totalCorrect = scenario.correct_decision_ids.length;
  const visibleCards = sortCardsByCategoryDisplayLabel(
    scenario.decision_cards,
  );

  return (
    <section className="decision-folder">
      <div className="decision-folder__tab">
        <span className="decision-folder__tab-label">
          SELECT EARLY DESIGN DECISIONS
        </span>
      </div>

      <div className="decision-folder__body">
        <div className="decision-folder__meta">
          <span className="decision-folder__meta-left">
            Selected {selectedDecisionIds.length} / {totalCorrect}
          </span>
          <span className="decision-folder__meta-right">
            {totalCorrect} correct decisions
          </span>
        </div>

        <div className="decision-folder__grid">
          {visibleCards.map((card) => (
            <DecisionCard
              key={card.id}
              card={card}
              isSelected={selectedSet.has(card.id)}
              onToggle={toggleDecision}
            />
          ))}
        </div>

        <SelectedDecisionTray />
      </div>
    </section>
  );
}
