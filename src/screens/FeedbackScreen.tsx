import { RotateCcw, Unlock } from "lucide-react";
import { ScreenHeader } from "./ScreenHeader";
import { useGameStore } from "../store/useGameStore";

export function FeedbackScreen() {
  const scenario = useGameStore((state) => state.scenario);
  const scoreResult = useGameStore((state) => state.scoreResult);
  const resetLevel = useGameStore((state) => state.resetLevel);

  if (!scoreResult) {
    return null;
  }

  const correctFeedback = scoreResult.correctSelectedIds.map((id) => ({
    id,
    label: scenario.decision_cards.find((card) => card.id === id)?.label ?? id,
    text: scenario.senior_engineer_explanations.correct[id],
  }));
  const incorrectFeedback = scoreResult.incorrectSelectedIds.map((id) => ({
    id,
    label: scenario.decision_cards.find((card) => card.id === id)?.label ?? id,
    text: scenario.senior_engineer_explanations.incorrect[id],
  }));
  const missedFeedback = scoreResult.missedCorrectIds.map((id) => ({
    id,
    label: scenario.decision_cards.find((card) => card.id === id)?.label ?? id,
    text:
      scenario.senior_engineer_explanations.correct[id] ??
      scenario.senior_engineer_explanations.missed.default,
  }));

  return (
    <section className="screen">
      <ScreenHeader eyebrow="Senior Engineer Feedback" title="Design Review Notes">
        <button className="secondary-button" onClick={resetLevel}>
          <RotateCcw size={18} />
          Restart
        </button>
      </ScreenHeader>

      {scoreResult.passed && (
        <section className="unlock-band">
          <Unlock size={18} />
          <div>
            <strong>Unlocked</strong>
            <p>{scenario.stage.unlocks_on_pass.join(" + ")}</p>
          </div>
        </section>
      )}

      <section className="feedback-grid">
        <FeedbackColumn title="Supported Decisions" items={correctFeedback} />
        <FeedbackColumn title="Needs Revision" items={incorrectFeedback} />
        <FeedbackColumn title="Missed Decisions" items={missedFeedback} />
      </section>
    </section>
  );
}

interface FeedbackItem {
  id: string;
  label: string;
  text: string;
}

function FeedbackColumn({
  title,
  items,
}: {
  title: string;
  items: FeedbackItem[];
}) {
  return (
    <section className="feedback-column">
      <h2>{title}</h2>
      {items.length === 0 ? (
        <p className="empty-note">No items in this review group.</p>
      ) : (
        items.map((item) => (
          <article className="feedback-item" key={item.id}>
            <h3>{item.label}</h3>
            <p>{item.text}</p>
          </article>
        ))
      )}
    </section>
  );
}
