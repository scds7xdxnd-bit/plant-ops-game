import { Check, Send } from "lucide-react";
import { ScreenHeader } from "../../components/ScreenHeader";
import { useGameStore } from "../../store/useGameStore";

export function DecisionBoardScreen() {
  const scenario = useGameStore((state) => state.scenario);
  const selectedDecisionIds = useGameStore((state) => state.selectedDecisionIds);
  const toggleDecision = useGameStore((state) => state.toggleDecision);
  const submitDesignReview = useGameStore((state) => state.submitDesignReview);
  const goTo = useGameStore((state) => state.goTo);
  const selected = new Set(selectedDecisionIds);

  return (
    <section className="screen">
      <ScreenHeader eyebrow={scenario.stage.name} title="Select Supported Decisions">
        <button className="secondary-button" onClick={() => goTo("bod-reader")}>
          Back
        </button>
        <button
          className="primary-button"
          disabled={selectedDecisionIds.length === 0}
          onClick={submitDesignReview}
        >
          <Send size={18} />
          Submit
        </button>
      </ScreenHeader>

      <section className="prompt-band">
        <p>{scenario.instructions.prompt}</p>
        <span>{selectedDecisionIds.length} selected</span>
      </section>

      <section className="decision-layout">
        {scenario.categories.map((category) => {
          const cards = scenario.decision_cards.filter(
            (card) => card.category === category.id,
          );

          return (
            <section className="decision-category" key={category.id}>
              <h2>{category.label}</h2>
              <div className="decision-cards">
                {cards.map((card) => {
                  const isSelected = selected.has(card.id);
                  return (
                    <button
                      className={`decision-card ${isSelected ? "selected" : ""}`}
                      key={card.id}
                      onClick={() => toggleDecision(card.id)}
                    >
                      <span className="decision-check" aria-hidden="true">
                        {isSelected && <Check size={16} />}
                      </span>
                      <span>{card.label}</span>
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </section>
    </section>
  );
}
