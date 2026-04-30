import type { ResultBand, Scenario } from "./scenarioTypes";

export interface ScoreResult {
  correctSelectedIds: string[];
  missedCorrectIds: string[];
  incorrectSelectedIds: string[];
  rawScore: number;
  maxScore: number;
  scorePercent: number;
  passed: boolean;
  perfect: boolean;
  band: ResultBand;
}

export function scoreScenario(
  scenario: Scenario,
  selectedDecisionIds: string[],
): ScoreResult {
  const selected = new Set(selectedDecisionIds);
  const correct = new Set(scenario.correct_decision_ids);

  const correctSelectedIds = scenario.correct_decision_ids.filter((id) =>
    selected.has(id),
  );
  const missedCorrectIds = scenario.correct_decision_ids.filter(
    (id) => !selected.has(id),
  );
  const incorrectSelectedIds = selectedDecisionIds.filter(
    (id) => !correct.has(id),
  );

  const points = scenario.scoring.points;
  const selectionScore =
    correctSelectedIds.length * points.correct_selection +
    missedCorrectIds.length * points.missed_correct +
    incorrectSelectedIds.length * points.incorrect_selection;
  const perfect =
    missedCorrectIds.length === 0 && incorrectSelectedIds.length === 0;
  const rawScore = selectionScore + (perfect ? points.perfect_bonus : 0);
  const maxScore =
    scenario.correct_decision_ids.length * points.correct_selection +
    points.perfect_bonus;
  const scorePercent = Math.max(0, Math.round((rawScore / maxScore) * 100));
  const band = pickResultBand(scenario.scoring.result_bands, scorePercent);

  return {
    correctSelectedIds,
    missedCorrectIds,
    incorrectSelectedIds,
    rawScore,
    maxScore,
    scorePercent,
    passed: scorePercent >= scenario.scoring.pass_threshold_percent,
    perfect: scorePercent >= scenario.scoring.perfect_threshold_percent,
    band,
  };
}

function pickResultBand(bands: ResultBand[], scorePercent: number): ResultBand {
  const sortedBands = [...bands].sort((a, b) => b.min_percent - a.min_percent);
  const matchingBand = sortedBands.find(
    (band) => scorePercent >= band.min_percent,
  );

  if (!matchingBand) {
    throw new Error("Scenario must define at least one result band.");
  }

  return matchingBand;
}
