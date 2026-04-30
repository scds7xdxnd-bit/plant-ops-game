import { describe, expect, it } from "vitest";
import { loadSolvexCampaign } from "../content/loadCampaign";
import { loadSolvexLevelOne } from "../content/loadScenario";
import { scoreScenario } from "../domain/scoring";
import { validateCampaign, isCampaignValid } from "../domain/validateCampaign";
import {
  categoryLabels,
  getDecisionDisplayLabel,
  sortCardsByCategoryDisplayLabel,
} from "../features/mission-dashboard/decisionPresentation";

describe("campaign loader", () => {
  const campaign = loadSolvexCampaign();

  it("loads with at least one mission", () => {
    expect(campaign.missions.length).toBeGreaterThanOrEqual(1);
  });

  it("contains at least 2 missions after Mission 2 is added", () => {
    expect(campaign.missions.length).toBeGreaterThanOrEqual(2);
  });

  it("has Mission 1 as the first mission", () => {
    expect(campaign.missions[0].id).toBe("solvex_a_mission_1");
    expect(campaign.missions[0].mission_number).toBe(1);
  });

  it("has a campaign id and title", () => {
    expect(campaign.id).toBe("solvex_a_campaign");
    expect(campaign.title).toBe("Solvex-A: Basis to Plant");
  });

  it("has a plant profile", () => {
    expect(campaign.plant.product).toBe("Solvex-A");
    expect(campaign.plant.annual_capacity_tpy).toBe(5000);
  });

  it("mission IDs are unique across the campaign", () => {
    const ids = campaign.missions.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("Mission 1 data integrity", () => {
  const mission = loadSolvexLevelOne();

  it("has the correct id", () => {
    expect(mission.id).toBe("solvex_a_mission_1");
  });

  it("has 10 correct decisions", () => {
    expect(mission.correct_decision_ids).toHaveLength(10);
  });

  it("has 7 wrong-but-plausible decisions", () => {
    expect(mission.wrong_but_plausible_decision_ids).toHaveLength(7);
  });

  it("has 17 total decision cards", () => {
    expect(mission.decision_cards).toHaveLength(17);
  });

  it("all correct decision IDs exist in decision_cards", () => {
    const cardIds = new Set(mission.decision_cards.map((c) => c.id));
    for (const correctId of mission.correct_decision_ids) {
      expect(cardIds.has(correctId)).toBe(true);
    }
  });

  it("all wrong-but-plausible decision IDs exist in decision_cards", () => {
    const cardIds = new Set(mission.decision_cards.map((c) => c.id));
    for (const wrongId of mission.wrong_but_plausible_decision_ids) {
      expect(cardIds.has(wrongId)).toBe(true);
    }
  });

  it("every correct decision has a senior engineer explanation", () => {
    const explanations = Object.keys(mission.senior_engineer_explanations.correct);
    for (const correctId of mission.correct_decision_ids) {
      expect(explanations).toContain(correctId);
    }
  });

  it("has mission_number set to 1", () => {
    expect(mission.mission_number).toBe(1);
  });

  it("has status set to current", () => {
    expect(mission.status).toBe("current");
  });

  it("has unlock configuration (pass-based for multi-mission progression)", () => {
    expect(mission.unlock).toBeDefined();
    expect(mission.unlock!.next_mission_id).toBe("solvex_a_mission_2");
    expect(mission.unlock!.requires_score_percent).toBe(70);
    expect(mission.unlock!.requires_perfect_score).toBe(false);
  });

  it("unlock.unlocks_on_pass includes Mission 2 reference", () => {
    expect(mission.unlock!.unlocks_on_pass).toContain(
      "Mission 2: The Reactor Runs Hot",
    );
  });
});

describe("Mission 2 data integrity", () => {
  const campaign = loadSolvexCampaign();
  const mission = campaign.missions[1];

  it("has the correct id", () => {
    expect(mission.id).toBe("solvex_a_mission_2");
  });

  it("has mission_number set to 2", () => {
    expect(mission.mission_number).toBe(2);
  });

  it("has the correct title", () => {
    expect(mission.title).toBe("Mission 2: The Reactor Runs Hot");
    expect(mission.short_title).toBe("The Reactor Runs Hot");
  });

  it("has status set to locked initially", () => {
    expect(mission.status).toBe("locked");
  });

  it("has 9 correct decisions", () => {
    expect(mission.correct_decision_ids).toHaveLength(9);
  });

  it("has 6 wrong-but-plausible decisions", () => {
    expect(mission.wrong_but_plausible_decision_ids).toHaveLength(6);
  });

  it("has 15 total decision cards", () => {
    expect(mission.decision_cards).toHaveLength(15);
  });

  it("all correct decision IDs exist in decision_cards", () => {
    const cardIds = new Set(mission.decision_cards.map((c) => c.id));
    for (const correctId of mission.correct_decision_ids) {
      expect(cardIds.has(correctId)).toBe(true);
    }
  });

  it("all wrong-but-plausible decision IDs exist in decision_cards", () => {
    const cardIds = new Set(mission.decision_cards.map((c) => c.id));
    for (const wrongId of mission.wrong_but_plausible_decision_ids) {
      expect(cardIds.has(wrongId)).toBe(true);
    }
  });

  it("every correct decision has a senior engineer explanation", () => {
    const explanations = Object.keys(mission.senior_engineer_explanations.correct);
    for (const correctId of mission.correct_decision_ids) {
      expect(explanations).toContain(correctId);
    }
  });

  it("every unsupported decision has a senior engineer explanation", () => {
    const explanations = Object.keys(mission.senior_engineer_explanations.incorrect);
    for (const wrongId of mission.wrong_but_plausible_decision_ids) {
      expect(explanations).toContain(wrongId);
    }
  });

  it("has valid unlock configuration", () => {
    expect(mission.unlock).toBeDefined();
    expect(mission.unlock!.next_mission_id).toBe("solvex_a_mission_3");
    expect(mission.unlock!.requires_score_percent).toBe(70);
    expect(mission.unlock!.requires_perfect_score).toBe(false);
  });

  it("has valid scoring configuration", () => {
    expect(mission.scoring.pass_threshold_percent).toBe(70);
    expect(mission.scoring.perfect_threshold_percent).toBe(100);
    expect(mission.scoring.points.correct_selection).toBe(1);
    expect(mission.scoring.points.missed_correct).toBe(-0.5);
    expect(mission.scoring.points.incorrect_selection).toBe(-0.25);
    expect(mission.scoring.points.perfect_bonus).toBe(1);
    expect(mission.scoring.result_bands).toHaveLength(3);
  });
});

describe("decision board ordering", () => {
  const campaign = loadSolvexCampaign();

  it("sorts Mission 1 and Mission 2 decisions by category display label, then card display label", () => {
    for (const mission of campaign.missions.slice(0, 2)) {
      const sortedCards = sortCardsByCategoryDisplayLabel(mission.decision_cards);

      expect(sortedCards).toHaveLength(mission.decision_cards.length);

      const sortKeys = sortedCards.map((card) => [
        categoryLabels[card.category],
        getDecisionDisplayLabel(card.id, card.label),
      ]);
      const expectedSortKeys = [...sortKeys].sort(
        ([categoryA, labelA], [categoryB, labelB]) => {
          const categoryCompare = categoryA.localeCompare(categoryB);
          if (categoryCompare !== 0) return categoryCompare;
          return labelA.localeCompare(labelB);
        },
      );

      expect(sortKeys).toEqual(expectedSortKeys);
    }
  });
});

describe("scoring with mission 2", () => {
  const campaign = loadSolvexCampaign();
  const mission = campaign.missions[1];

  it("returns 100% for a perfect selection", () => {
    const result = scoreScenario(mission, mission.correct_decision_ids);
    expect(result.scorePercent).toBe(100);
    expect(result.passed).toBe(true);
    expect(result.perfect).toBe(true);
    expect(result.incorrectSelectedIds).toEqual([]);
    expect(result.missedCorrectIds).toEqual([]);
  });

  it("penalizes unsupported over-selection", () => {
    const result = scoreScenario(mission, [
      ...mission.correct_decision_ids,
      "ignore_summer_cw_use_annual_avg",
    ]);
    expect(result.scorePercent).toBeLessThan(100);
    expect(result.incorrectSelectedIds).toEqual([
      "ignore_summer_cw_use_annual_avg",
    ]);
  });

  it("returns retry when no correct decisions are selected", () => {
    const result = scoreScenario(mission, ["ignore_summer_cw_use_annual_avg"]);
    expect(result.passed).toBe(false);
    expect(result.band.id).toBe("retry");
  });
});

describe("scoring with campaign-loaded mission", () => {
  const mission = loadSolvexLevelOne();

  it("returns 100% for a perfect selection", () => {
    const result = scoreScenario(mission, mission.correct_decision_ids);
    expect(result.scorePercent).toBe(100);
    expect(result.passed).toBe(true);
    expect(result.perfect).toBe(true);
    expect(result.incorrectSelectedIds).toEqual([]);
    expect(result.missedCorrectIds).toEqual([]);
  });

  it("penalizes unsupported over-selection (same as before)", () => {
    const result = scoreScenario(mission, [
      ...mission.correct_decision_ids,
      "full_plant_3d_model",
    ]);
    expect(result.scorePercent).toBeLessThan(100);
    expect(result.incorrectSelectedIds).toEqual(["full_plant_3d_model"]);
  });

  it("returns retry when too many required decisions are missed", () => {
    const result = scoreScenario(mission, ["full_plant_3d_model"]);
    expect(result.passed).toBe(false);
    expect(result.band.id).toBe("retry");
  });
});

describe("campaign validation", () => {
  it("valid campaign passes validation", () => {
    const campaign = loadSolvexCampaign();
    expect(isCampaignValid(campaign)).toBe(true);
    expect(validateCampaign(campaign)).toHaveLength(0);
  });

  it("rejects a campaign with no missions", () => {
    const errors = validateCampaign({
      id: "test",
      version: "0.1.0",
      title: "Test",
      subtitle: "",
      player_role: "Engineer",
      plant: {
        product: "Test",
        product_type: "Test",
        plant_type: "Test",
        annual_capacity_tpy: 100,
      },
      missions: [],
    });
    expect(errors.length).toBeGreaterThan(0);
  });

  it("detects duplicate mission IDs", () => {
    const mission = loadSolvexLevelOne();
    const errors = validateCampaign({
      id: "test",
      version: "0.1.0",
      title: "Test",
      subtitle: "",
      player_role: "Engineer",
      plant: {
        product: "Test",
        product_type: "Test",
        plant_type: "Test",
        annual_capacity_tpy: 100,
      },
      missions: [{ ...mission }, { ...mission }],
    });
    const dupErrors = errors.filter((e) => e.message.includes("Duplicate"));
    expect(dupErrors.length).toBeGreaterThan(0);
  });

  it("detects duplicate mission numbers", () => {
    const campaign = loadSolvexCampaign();
    const m1 = { ...campaign.missions[0], mission_number: 1 };
    const m2 = { ...campaign.missions[1], mission_number: 1, id: "different_id" };
    const errors = validateCampaign({
      id: "test",
      version: "0.1.0",
      title: "Test",
      subtitle: "",
      player_role: "Engineer",
      plant: {
        product: "Test",
        product_type: "Test",
        plant_type: "Test",
        annual_capacity_tpy: 100,
      },
      missions: [m1, m2],
    });
    const dupErrors = errors.filter(
      (e) =>
        e.message.includes("Duplicate mission_number"),
    );
    expect(dupErrors.length).toBeGreaterThan(0);
  });

  it("detects a correct decision ID not in decision_cards", () => {
    const mission = loadSolvexLevelOne();
    const badMission = {
      ...mission,
      correct_decision_ids: ["nonexistent_id"],
    };
    const errors = validateCampaign({
      id: "test",
      version: "0.1.0",
      title: "Test",
      subtitle: "",
      player_role: "Engineer",
      plant: {
        product: "Test",
        product_type: "Test",
        plant_type: "Test",
        annual_capacity_tpy: 100,
      },
      missions: [badMission],
    });
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].message).toContain("nonexistent_id");
  });

  it("detects duplicate decision card IDs", () => {
    const mission = loadSolvexLevelOne();
    const badMission = {
      ...mission,
      decision_cards: [
        ...mission.decision_cards,
        mission.decision_cards[0], // duplicate
      ],
    };
    const errors = validateCampaign({
      id: "test",
      version: "0.1.0",
      title: "Test",
      subtitle: "",
      player_role: "Engineer",
      plant: {
        product: "Test",
        product_type: "Test",
        plant_type: "Test",
        annual_capacity_tpy: 100,
      },
      missions: [badMission],
    });
    const dupErrors = errors.filter((e) => e.message.includes("Duplicate"));
    expect(dupErrors.length).toBeGreaterThan(0);
  });

  it("requires campaign mission metadata", () => {
    const mission = loadSolvexLevelOne();
    const badMission = {
      ...mission,
      mission_number: undefined,
      short_title: undefined,
      status: undefined,
      unlock: undefined,
    };
    const errors = validateCampaign({
      id: "test",
      version: "0.1.0",
      title: "Test",
      subtitle: "",
      player_role: "Engineer",
      plant: {
        product: "Test",
        product_type: "Test",
        plant_type: "Test",
        annual_capacity_tpy: 100,
      },
      missions: [badMission],
    });

    expect(errors.map((error) => error.path)).toContain(
      "missions[0].mission_number",
    );
    expect(errors.map((error) => error.path)).toContain(
      "missions[0].short_title",
    );
    expect(errors.map((error) => error.path)).toContain("missions[0].status");
    expect(errors.map((error) => error.path)).toContain("missions[0].unlock");
  });

  it("requires unsupported decisions to have senior engineer explanations", () => {
    const mission = loadSolvexLevelOne();
    const badMission = {
      ...mission,
      senior_engineer_explanations: {
        ...mission.senior_engineer_explanations,
        incorrect: {},
      },
    };
    const errors = validateCampaign({
      id: "test",
      version: "0.1.0",
      title: "Test",
      subtitle: "",
      player_role: "Engineer",
      plant: {
        product: "Test",
        product_type: "Test",
        plant_type: "Test",
        annual_capacity_tpy: 100,
      },
      missions: [badMission],
    });

    expect(
      errors.some((error) =>
        error.message.includes(
          "Missing senior engineer explanation for unsupported decision",
        ),
      ),
    ).toBe(true);
  });
});
