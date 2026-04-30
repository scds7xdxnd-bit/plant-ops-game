import { useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  Lock,
  Minus,
  RefreshCw,
  X,
} from "lucide-react";
import { useGameStore } from "../../store/useGameStore";
import { TopMissionHeader } from "../mission-dashboard/TopMissionHeader";
import engineerSvgUrl from "../../assets/icons/plant-ops/icon-engineer.svg";
import "./designReviewComplete.css";

/** Items shown at a time before "View all" toggle */
const PREVIEW_COUNT = 3;

/** SVG ring constants: viewBox 0 0 120 120, radius 44 */
const RING_RADIUS = 44;
const CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export function DesignReviewCompleteScreen() {
  const scenario = useGameStore((state) => state.scenario);
  const scoreResult = useGameStore((state) => state.scoreResult);
  const resetLevel = useGameStore((state) => state.resetLevel);
  const goTo = useGameStore((state) => state.goTo);

  const [supportedExpanded, setSupportedExpanded] = useState(false);
  const [missedExpanded, setMissedExpanded] = useState(false);

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

  const perfect = scoreResult.perfect;
  const correctCount = scoreResult.correctSelectedIds.length;
  const missedCount = scoreResult.missedCorrectIds.length;
  const incorrectCount = scoreResult.incorrectSelectedIds.length;
  const totalCorrect = correctCount + missedCount;

  const fillOffset =
    CIRCUMFERENCE - (scoreResult.scorePercent / 100) * CIRCUMFERENCE;

  return (
    <div className="review-complete">
      <TopMissionHeader />

      <section className="review-content">
        {/* ── Summary panel ── */}
        <div className="summary-panel">
          <div className="summary-left">
            <p className="summary-eyebrow">Design Review Results</p>
            <h1 className="summary-title">Design Review Complete</h1>
            <p className="summary-body">
              Here is your score and the senior engineer&rsquo;s feedback on
              your early design decisions.
            </p>
          </div>

          <div className="summary-center">
            <div className="score-ring">
              <svg viewBox="0 0 120 120">
                <circle
                  className="score-ring__track"
                  cx="60"
                  cy="60"
                  r={RING_RADIUS}
                />
                <circle
                  className="score-ring__fill"
                  cx="60"
                  cy="60"
                  r={RING_RADIUS}
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={fillOffset}
                />
              </svg>
              <div className="score-ring__text">
                <span className="score-ring__pct">
                  {scoreResult.scorePercent}%
                </span>
                <span className="score-ring__sub">
                  {correctCount} / {totalCorrect} correct
                </span>
              </div>
            </div>
          </div>

          <div className="summary-right">
            <div className="metric-card metric-card--correct">
              <div className="metric-icon metric-icon--correct">
                <Check size={20} strokeWidth={3} />
              </div>
              <div className="metric-body">
                <span className="metric-count">{correctCount}</span>
                <p className="metric-label">Correct decisions</p>
                <p className="metric-note">
                  Well done! These choices are supported by the design basis.
                </p>
              </div>
            </div>

            <div className="metric-card metric-card--unsupported">
              <div className="metric-icon metric-icon--unsupported">
                <Minus size={20} strokeWidth={3} />
              </div>
              <div className="metric-body">
                <span className="metric-count">{incorrectCount}</span>
                <p className="metric-label">Unsupported decisions</p>
                <p className="metric-note">
                  These are not required by the current design basis. Avoid
                  over-design.
                </p>
              </div>
            </div>

            <div className="metric-card metric-card--missed">
              <div className="metric-icon metric-icon--missed">
                <X size={20} strokeWidth={3} />
              </div>
              <div className="metric-body">
                <span className="metric-count">{missedCount}</span>
                <p className="metric-label">Missed required decisions</p>
                <p className="metric-note">
                  Important items are missing. Add these to strengthen the
                  design.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Feedback section ── */}
        <section className="feedback-section">
          <h2 className="feedback-section__title">Senior Engineer&rsquo;s Notes</h2>
          <div className="feedback-grid--results">
            {/* Supported Decisions column */}
            <div className="feedback-col feedback-col--supported">
              <div className="feedback-col__tab">
                <span className="feedback-col__tab-label">
                  SUPPORTED DECISIONS ({correctCount})
                </span>
              </div>
              <div className="feedback-col__body">
                {correctFeedback.length === 0 ? (
                  <p className="feedback-col__empty">
                    No supported decisions in this review.
                  </p>
                ) : (
                  <>
                    {(supportedExpanded
                      ? correctFeedback
                      : correctFeedback.slice(0, PREVIEW_COUNT)
                    ).map((item) => (
                      <FeedbackResultItem
                        key={item.id}
                        title={item.label}
                        text={item.text}
                        variant="supported"
                      />
                    ))}
                    {correctFeedback.length > PREVIEW_COUNT && (
                      <button
                        className="feedback-col__toggle"
                        onClick={() => setSupportedExpanded((v) => !v)}
                        type="button"
                      >
                        {supportedExpanded ? (
                          <>
                            Show less <ChevronUp size={14} />
                          </>
                        ) : (
                          <>
                            View all supported ({correctFeedback.length}){" "}
                            <ChevronDown size={14} />
                          </>
                        )}
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Needs Revision column */}
            <div className="feedback-col feedback-col--revision">
              <div className="feedback-col__tab">
                <span className="feedback-col__tab-label">
                  NEEDS REVISION ({incorrectCount})
                </span>
              </div>
              <div className="feedback-col__body">
                {incorrectFeedback.length === 0 ? (
                  <p className="feedback-col__empty">
                    No unsupported decisions selected. Great job!
                  </p>
                ) : (
                  incorrectFeedback.map((item) => (
                    <FeedbackResultItem
                      key={item.id}
                      title={item.label}
                      text={item.text}
                      variant="revision"
                    />
                  ))
                )}
              </div>
            </div>

            {/* Missed Decisions column */}
            <div className="feedback-col feedback-col--missed">
              <div className="feedback-col__tab">
                <span className="feedback-col__tab-label">
                  MISSED DECISIONS ({missedCount})
                </span>
              </div>
              <div className="feedback-col__body">
                {missedFeedback.length === 0 ? (
                  <p className="feedback-col__empty">
                    All required decisions were selected. Excellent!
                  </p>
                ) : (
                  <>
                    {(missedExpanded
                      ? missedFeedback
                      : missedFeedback.slice(0, PREVIEW_COUNT)
                    ).map((item) => (
                      <FeedbackResultItem
                        key={item.id}
                        title={item.label}
                        text={item.text}
                        variant="missed"
                      />
                    ))}
                    {missedFeedback.length > PREVIEW_COUNT && (
                      <button
                        className="feedback-col__toggle"
                        onClick={() => setMissedExpanded((v) => !v)}
                        type="button"
                      >
                        {missedExpanded ? (
                          <>
                            Show less <ChevronUp size={14} />
                          </>
                        ) : (
                          <>
                            View all missed ({missedFeedback.length}){" "}
                            <ChevronDown size={14} />
                          </>
                        )}
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* ── Mentor action bar ── */}
      <footer className="review-mentor-zone">
        <div className="review-mentor-panel">
          <div className="review-mentor-identity">
            <div className="review-mentor-avatar-wrap">
              <img
                src={engineerSvgUrl}
                alt="Senior Engineer"
                className="review-mentor-avatar-img"
              />
            </div>
            <div className="review-mentor-info">
              <p className="review-mentor-name">Senior Engineer</p>
              <p className="review-mentor-msg">
                Good effort! Review the notes above, adjust your decisions, and
                move forward.
              </p>
            </div>
          </div>

          <div className="review-mentor-actions">
            <div className="btn-restart">
              <button
                className="btn-restart-main"
                onClick={resetLevel}
                type="button"
              >
                <RefreshCw size={18} />
                Restart Level
              </button>
              {!perfect && (
                <span className="btn-restart-status">Score below 100%</span>
              )}
            </div>

            <div className="btn-continue">
              <button
                className="btn-continue-main"
                disabled={!perfect}
                onClick={() => goTo("level-map")}
                type="button"
              >
                {perfect ? (
                  <>
                    Continue to Level 2
                    <ArrowRight size={18} />
                  </>
                ) : (
                  <>
                    <Lock size={16} />
                    Continue to Level 2
                  </>
                )}
              </button>
              <span className="btn-continue-sub">Next: Reaction Section</span>
              {perfect ? (
                <span className="btn-continue-status">
                  Level 2 Unlocked
                </span>
              ) : (
                <span className="btn-restart-status">
                  Score 100% to unlock
                </span>
              )}
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

/* ───────────────────────────────────────────────
   Feedback result item sub-component
   ─────────────────────────────────────────────── */

function extractWhy(text: string): string {
  const firstLine = text.split(/[.\n]/)[0].trim();
  if (firstLine.length > 100) {
    return firstLine.slice(0, 97) + "...";
  }
  return firstLine;
}

interface FeedbackResultItemProps {
  title: string;
  text: string;
  variant: "supported" | "revision" | "missed";
}

function FeedbackResultItem({ title, text, variant }: FeedbackResultItemProps) {
  return (
    <article className="feedback-item--result">
      <div className={`feedback-item__icon-tile feedback-item__icon-tile--${variant}`}>
        {variant === "supported" && <Check size={16} strokeWidth={3} />}
        {variant === "revision" && <Minus size={16} strokeWidth={3} />}
        {variant === "missed" && <X size={16} strokeWidth={3} />}
      </div>

      <div className="feedback-item__body">
        <h3 className="feedback-item__title">{title}</h3>
        <p className="feedback-item__text">{text}</p>
        {variant !== "supported" && (
          <div
            className={`feedback-item__why feedback-item__why--${variant}`}
          >
            <strong>Why:</strong> {extractWhy(text)}
          </div>
        )}
      </div>

      {variant === "supported" && (
        <div className="feedback-item__check">
          <Check size={16} strokeWidth={3} color="#1a3d24" />
        </div>
      )}
    </article>
  );
}
