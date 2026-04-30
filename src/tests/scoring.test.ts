import { describe, expect, it } from "vitest";
import { loadSolvexLevelOne } from "../content/loadScenario";
import { scoreScenario } from "../domain/scoring";

describe("scoreScenario", () => {
  const scenario = loadSolvexLevelOne();

  it("awards a perfect score when all required decisions are selected", () => {
    const result = scoreScenario(scenario, scenario.correct_decision_ids);

    expect(result.scorePercent).toBe(100);
    expect(result.passed).toBe(true);
    expect(result.perfect).toBe(true);
    expect(result.incorrectSelectedIds).toEqual([]);
    expect(result.missedCorrectIds).toEqual([]);
  });

  it("penalizes unsupported over-selection", () => {
    const result = scoreScenario(scenario, [
      ...scenario.correct_decision_ids,
      "full_plant_3d_model",
    ]);

    expect(result.scorePercent).toBeLessThan(100);
    expect(result.incorrectSelectedIds).toEqual(["full_plant_3d_model"]);
  });

  it("returns retry when too many required decisions are missed", () => {
    const result = scoreScenario(scenario, ["full_plant_3d_model"]);

    expect(result.passed).toBe(false);
    expect(result.band.id).toBe("retry");
  });
});
