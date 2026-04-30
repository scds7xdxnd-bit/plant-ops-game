import { useGameStore } from "../../store/useGameStore";
import { DecisionCard, categoryLabels, displayLabels } from "./DecisionCard";
import { SelectedDecisionTray } from "./SelectedDecisionTray";
import type { DecisionCard as DecisionCardType } from "../../domain/scenarioTypes";

const VISIBLE_CARD_COUNT = 12;

function sortCardsByCategory(cards: DecisionCardType[]): DecisionCardType[] {
  const getCardLabel = (card: DecisionCardType) =>
    displayLabels[card.id] ?? card.label;

  const grouped: Record<string, DecisionCardType[]> = {};

  for (const card of cards) {
    const catLabel = categoryLabels[card.category] ?? card.category;
    if (!grouped[catLabel]) grouped[catLabel] = [];
    grouped[catLabel].push(card);
  }

  for (const cat of Object.keys(grouped)) {
    grouped[cat].sort((a, b) =>
      getCardLabel(a).localeCompare(getCardLabel(b)),
    );
  }

  const sortedCategories = Object.keys(grouped).sort((a, b) =>
    a.localeCompare(b),
  );

  return sortedCategories.flatMap((cat) => grouped[cat]);
}

export function DecisionBoardPanel() {
  const scenario = useGameStore((state) => state.scenario);
  const selectedDecisionIds = useGameStore(
    (state) => state.selectedDecisionIds,
  );
  const toggleDecision = useGameStore((state) => state.toggleDecision);
  const selectedSet = new Set(selectedDecisionIds);
  const totalCorrect = scenario.correct_decision_ids.length;
  const visibleCards = sortCardsByCategory(
    scenario.decision_cards.slice(0, VISIBLE_CARD_COUNT),
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
