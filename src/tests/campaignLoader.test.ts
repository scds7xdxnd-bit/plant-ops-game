import { describe, expect, it } from "vitest";
import { loadSolvexCampaign } from "../content/loadCampaign";
import { loadSolvexLevelOne } from "../content/loadScenario";
import { scoreScenario } from "../domain/scoring";
import { validateCampaign, isCampaignValid } from "../domain/validateCampaign";
import { getBodForMission } from "../store/useGameStore";
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

  it("contains the full 8-mission easy-mode campaign", () => {
    expect(campaign.missions).toHaveLength(8);
    expect(campaign.missions.map((mission) => mission.mission_number)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8,
    ]);
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

describe("Mission 3 data integrity", () => {
  const campaign = loadSolvexCampaign();
  const mission = campaign.missions[2];

  it("has the correct id, title, and locked initial status", () => {
    expect(mission.id).toBe("solvex_a_mission_3");
    expect(mission.mission_number).toBe(3);
    expect(mission.title).toBe("Mission 3: Separation Section");
    expect(mission.short_title).toBe("Separation Section");
    expect(mission.status).toBe("locked");
  });

  it("has 9 correct decisions, 7 wrong-but-plausible decisions, and 16 cards", () => {
    expect(mission.correct_decision_ids).toHaveLength(9);
    expect(mission.wrong_but_plausible_decision_ids).toHaveLength(7);
    expect(mission.decision_cards).toHaveLength(16);
  });

  it("all answer-key IDs exist in decision_cards", () => {
    const cardIds = new Set(mission.decision_cards.map((c) => c.id));
    for (const id of [
      ...mission.correct_decision_ids,
      ...mission.wrong_but_plausible_decision_ids,
    ]) {
      expect(cardIds.has(id)).toBe(true);
    }
  });

  it("every answer-key decision has a senior engineer explanation", () => {
    for (const correctId of mission.correct_decision_ids) {
      expect(mission.senior_engineer_explanations.correct[correctId]).toBeTruthy();
    }
    for (const wrongId of mission.wrong_but_plausible_decision_ids) {
      expect(mission.senior_engineer_explanations.incorrect[wrongId]).toBeTruthy();
    }
  });

  it("unlocks Mission 4 on pass", () => {
    expect(mission.unlock).toBeDefined();
    expect(mission.unlock!.next_mission_id).toBe("solvex_a_mission_4");
    expect(mission.unlock!.requires_score_percent).toBe(70);
    expect(mission.unlock!.requires_perfect_score).toBe(false);
  });
});

describe("Mission 4 data integrity", () => {
  const campaign = loadSolvexCampaign();
  const mission = campaign.missions[3];

  it("has the correct id, title, and locked initial status", () => {
    expect(mission.id).toBe("solvex_a_mission_4");
    expect(mission.mission_number).toBe(4);
    expect(mission.title).toBe("Mission 4: Heat & Utilities");
    expect(mission.short_title).toBe("Heat & Utilities");
    expect(mission.status).toBe("locked");
  });

  it("has 8 correct decisions, 7 wrong-but-plausible decisions, and 15 cards", () => {
    expect(mission.correct_decision_ids).toHaveLength(8);
    expect(mission.wrong_but_plausible_decision_ids).toHaveLength(7);
    expect(mission.decision_cards).toHaveLength(15);
  });

  it("all answer-key IDs exist in decision_cards", () => {
    const cardIds = new Set(mission.decision_cards.map((c) => c.id));
    for (const id of [
      ...mission.correct_decision_ids,
      ...mission.wrong_but_plausible_decision_ids,
    ]) {
      expect(cardIds.has(id)).toBe(true);
    }
  });

  it("every answer-key decision has a senior engineer explanation", () => {
    for (const correctId of mission.correct_decision_ids) {
      expect(mission.senior_engineer_explanations.correct[correctId]).toBeTruthy();
    }
    for (const wrongId of mission.wrong_but_plausible_decision_ids) {
      expect(mission.senior_engineer_explanations.incorrect[wrongId]).toBeTruthy();
    }
  });

  it("has 70% pass threshold and 100% perfect threshold", () => {
    expect(mission.scoring.pass_threshold_percent).toBe(70);
    expect(mission.scoring.perfect_threshold_percent).toBe(100);
    expect(mission.scoring.points.correct_selection).toBe(1);
    expect(mission.scoring.points.missed_correct).toBe(-0.5);
    expect(mission.scoring.points.incorrect_selection).toBe(-0.25);
  });

  it("unlocks Mission 5 on pass", () => {
    expect(mission.unlock).toBeDefined();
    expect(mission.unlock!.next_mission_id).toBe("solvex_a_mission_5");
    expect(mission.unlock!.requires_score_percent).toBe(70);
    expect(mission.unlock!.requires_perfect_score).toBe(false);
    expect(mission.unlock!.unlocks_on_pass).toContain(
      "Mission 5: Layers of Protection",
    );
  });

  it("every decision card has a display label", () => {
    for (const card of mission.decision_cards) {
      expect(getDecisionDisplayLabel(card.id, card.label)).toBeTruthy();
    }
  });
});

describe("Mission 5 data integrity", () => {
  const campaign = loadSolvexCampaign();
  const mission = campaign.missions[4];

  it("has the correct id, title, and locked initial status", () => {
    expect(mission.id).toBe("solvex_a_mission_5");
    expect(mission.mission_number).toBe(5);
    expect(mission.title).toBe("Mission 5: Layers of Protection");
    expect(mission.short_title).toBe("Layers of Protection");
    expect(mission.status).toBe("locked");
  });

  it("has 9 correct decisions, 7 wrong-but-plausible decisions, and 16 cards", () => {
    expect(mission.correct_decision_ids).toHaveLength(9);
    expect(mission.wrong_but_plausible_decision_ids).toHaveLength(7);
    expect(mission.decision_cards).toHaveLength(16);
  });

  it("all answer-key IDs exist in decision_cards", () => {
    const cardIds = new Set(mission.decision_cards.map((c) => c.id));
    for (const id of [
      ...mission.correct_decision_ids,
      ...mission.wrong_but_plausible_decision_ids,
    ]) {
      expect(cardIds.has(id)).toBe(true);
    }
  });

  it("every answer-key decision has a senior engineer explanation", () => {
    for (const correctId of mission.correct_decision_ids) {
      expect(mission.senior_engineer_explanations.correct[correctId]).toBeTruthy();
    }
    for (const wrongId of mission.wrong_but_plausible_decision_ids) {
      expect(mission.senior_engineer_explanations.incorrect[wrongId]).toBeTruthy();
    }
  });

  it("has 70% pass threshold and 100% perfect threshold", () => {
    expect(mission.scoring.pass_threshold_percent).toBe(70);
    expect(mission.scoring.perfect_threshold_percent).toBe(100);
    expect(mission.scoring.points.correct_selection).toBe(1);
    expect(mission.scoring.points.missed_correct).toBe(-0.5);
    expect(mission.scoring.points.incorrect_selection).toBe(-0.25);
  });

  it("unlocks Mission 6 on pass", () => {
    expect(mission.unlock).toBeDefined();
    expect(mission.unlock!.next_mission_id).toBe("solvex_a_mission_6");
    expect(mission.unlock!.requires_score_percent).toBe(70);
    expect(mission.unlock!.requires_perfect_score).toBe(false);
    expect(mission.unlock!.unlocks_on_pass).toContain(
      "Mission 6: What Leaves the Fence",
    );
  });

  it("every decision card has a display label", () => {
    for (const card of mission.decision_cards) {
      expect(getDecisionDisplayLabel(card.id, card.label)).toBeTruthy();
    }
  });
});

describe("decision board ordering", () => {
  const campaign = loadSolvexCampaign();

  it("sorts campaign decisions by category display label, then card display label", () => {
    for (const mission of campaign.missions) {
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

describe("progressive BoD document", () => {
  const campaign = loadSolvexCampaign();

  it("shows only sections introduced by the current mission", () => {
    const mission2Keys = getBodForMission(campaign, 2).map((entry) => entry.key);
    const mission3Keys = getBodForMission(campaign, 3).map((entry) => entry.key);

    expect(mission2Keys).not.toContain("environmental_interfaces");
    expect(mission3Keys).toContain("environmental_interfaces");
  });

  it("marks only current-mission BoD sections as new", () => {
    const mission3Sections = getBodForMission(campaign, 3);
    const newKeys = mission3Sections
      .filter((entry) => entry.isNew)
      .map((entry) => entry.key);

    expect(newKeys).toContain("reactor_effluent_composition");
    expect(newKeys).toContain("environmental_interfaces");
    expect(
      mission3Sections.find((entry) => entry.key === "project_context")?.isNew,
    ).toBe(false);
  });

  it("shows Mission 4 BoD sections at mission 4 and marks them as new", () => {
    const mission4Sections = getBodForMission(campaign, 4);
    const mission4Keys = mission4Sections.map((entry) => entry.key);

    expect(mission4Keys).toContain("utility_supply");
    expect(mission4Keys).toContain("plant_heat_demands");
    expect(mission4Keys).toContain("heat_recovery_note");
    expect(mission4Keys).toContain("utility_scope");

    const newMission4Keys = mission4Sections
      .filter((entry) => entry.isNew)
      .map((entry) => entry.key);
    expect(newMission4Keys).toContain("utility_supply");
    expect(newMission4Keys).toContain("plant_heat_demands");
    expect(newMission4Keys).toContain("heat_recovery_note");
    expect(newMission4Keys).toContain("utility_scope");
  });

  it("does not show Mission 5+ BoD sections at mission 4", () => {
    const mission4Keys = getBodForMission(campaign, 4).map((entry) => entry.key);
    expect(mission4Keys).not.toContain("hazard_summary");
    expect(mission4Keys).not.toContain("regulatory_requirements");
    expect(mission4Keys).not.toContain("protection_philosophy");
    expect(mission4Keys).not.toContain("safety_scope");
  });

  it("shows Mission 5 BoD sections at mission 5 and marks them as new", () => {
    const mission5Sections = getBodForMission(campaign, 5);
    const mission5Keys = mission5Sections.map((entry) => entry.key);

    expect(mission5Keys).toContain("hazard_summary");
    expect(mission5Keys).toContain("regulatory_requirements");
    expect(mission5Keys).toContain("protection_philosophy");
    expect(mission5Keys).toContain("safety_scope");

    const newMission5Keys = mission5Sections
      .filter((entry) => entry.isNew)
      .map((entry) => entry.key);
    expect(newMission5Keys).toContain("hazard_summary");
    expect(newMission5Keys).toContain("regulatory_requirements");
    expect(newMission5Keys).toContain("protection_philosophy");
    expect(newMission5Keys).toContain("safety_scope");
  });

  it("does not show Mission 6+ BoD sections at mission 5", () => {
    const mission5Keys = getBodForMission(campaign, 5).map((entry) => entry.key);
    expect(mission5Keys).not.toContain("emission_sources");
    expect(mission5Keys).not.toContain("pfd_purpose");
  });

  it("Mission 3 sections are not marked as new at mission 4", () => {
    const mission4Sections = getBodForMission(campaign, 4);
    expect(
      mission4Sections.find((entry) => entry.key === "reactor_effluent_composition")
        ?.isNew,
    ).toBe(false);
    expect(
      mission4Sections.find((entry) => entry.key === "separation_constraints")
        ?.isNew,
    ).toBe(false);
  });

  it("Mission 4 sections are not marked as new at mission 5", () => {
    const mission5Sections = getBodForMission(campaign, 5);
    expect(
      mission5Sections.find((entry) => entry.key === "utility_supply")?.isNew,
    ).toBe(false);
    expect(
      mission5Sections.find((entry) => entry.key === "plant_heat_demands")?.isNew,
    ).toBe(false);
  });

  it("shows Mission 7 BoD sections at mission 7 and marks them as new", () => {
    const mission7Sections = getBodForMission(campaign, 7);
    const mission7Keys = mission7Sections.map((entry) => entry.key);

    expect(mission7Keys).toContain("pfd_purpose");
    expect(mission7Keys).toContain("confirmed_process_sections");
    expect(mission7Keys).toContain("pfd_stream_requirements");
    expect(mission7Keys).toContain("pfd_scope");

    const newMission7Keys = mission7Sections
      .filter((entry) => entry.isNew)
      .map((entry) => entry.key);
    expect(newMission7Keys).toContain("pfd_purpose");
    expect(newMission7Keys).toContain("confirmed_process_sections");
    expect(newMission7Keys).toContain("pfd_stream_requirements");
    expect(newMission7Keys).toContain("pfd_scope");
  });

  it("Mission 7 sections are not marked as new at mission 8", () => {
    const mission8Sections = getBodForMission(campaign, 8);
    expect(
      mission8Sections.find((entry) => entry.key === "pfd_purpose")?.isNew,
    ).toBe(false);
    expect(
      mission8Sections.find((entry) => entry.key === "confirmed_process_sections")?.isNew,
    ).toBe(false);
  });

  it("does not show Mission 8 BoD sections at mission 7", () => {
    const mission7Keys = getBodForMission(campaign, 7).map((entry) => entry.key);
    expect(mission7Keys).not.toContain("pid_versus_pfd");
    expect(mission7Keys).not.toContain("control_and_safety_requirements");
    expect(mission7Keys).not.toContain("isolation_and_protection_hardware");
    expect(mission7Keys).not.toContain("pid_scope");
    expect(mission7Keys).not.toContain("design_package_review");
  });

  it("shows Mission 8 BoD sections at mission 8 and marks them as new", () => {
    const mission8Sections = getBodForMission(campaign, 8);
    const mission8Keys = mission8Sections.map((entry) => entry.key);

    expect(mission8Keys).toContain("pid_versus_pfd");
    expect(mission8Keys).toContain("control_and_safety_requirements");
    expect(mission8Keys).toContain("isolation_and_protection_hardware");
    expect(mission8Keys).toContain("pid_scope");
    expect(mission8Keys).toContain("design_package_review");

    const newMission8Keys = mission8Sections
      .filter((entry) => entry.isNew)
      .map((entry) => entry.key);
    expect(newMission8Keys).toContain("pid_versus_pfd");
    expect(newMission8Keys).toContain("control_and_safety_requirements");
    expect(newMission8Keys).toContain("isolation_and_protection_hardware");
    expect(newMission8Keys).toContain("pid_scope");
    expect(newMission8Keys).toContain("design_package_review");
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

describe("scoring with mission 3", () => {
  const campaign = loadSolvexCampaign();
  const mission = campaign.missions[2];

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
      "sep_full_simulation",
    ]);
    expect(result.scorePercent).toBeLessThan(100);
    expect(result.incorrectSelectedIds).toEqual(["sep_full_simulation"]);
  });

  it("returns retry when no correct decisions are selected", () => {
    const result = scoreScenario(mission, ["sep_full_simulation"]);
    expect(result.passed).toBe(false);
    expect(result.band.id).toBe("retry");
  });
});

describe("scoring with mission 5", () => {
  const campaign = loadSolvexCampaign();
  const mission = campaign.missions[4];

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
      "atex_zone_0_entire_plant",
    ]);
    expect(result.scorePercent).toBeLessThan(100);
    expect(result.incorrectSelectedIds).toEqual(["atex_zone_0_entire_plant"]);
  });

  it("returns retry when no correct decisions are selected", () => {
    const result = scoreScenario(mission, [
      "atex_zone_0_entire_plant",
      "operator_procedures_only_for_esd",
    ]);
    expect(result.passed).toBe(false);
    expect(result.band.id).toBe("retry");
  });
});

describe("scoring with mission 4", () => {
  const campaign = loadSolvexCampaign();
  const mission = campaign.missions[3];

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
      "mp_steam_for_all_heating",
    ]);
    expect(result.scorePercent).toBeLessThan(100);
    expect(result.incorrectSelectedIds).toEqual(["mp_steam_for_all_heating"]);
  });

  it("returns retry when no correct decisions are selected", () => {
    const result = scoreScenario(mission, [
      "mp_steam_for_all_heating",
      "fired_heater_for_reboiler_no_justification",
    ]);
    expect(result.passed).toBe(false);
    expect(result.band.id).toBe("retry");
  });
});

describe("Mission 6 data integrity", () => {
  const campaign = loadSolvexCampaign();
  const mission = campaign.missions[5];

  it("has the correct id, title, and locked initial status", () => {
    expect(mission.id).toBe("solvex_a_mission_6");
    expect(mission.mission_number).toBe(6);
    expect(mission.title).toBe("Mission 6: What Leaves the Fence");
    expect(mission.short_title).toBe("What Leaves the Fence");
    expect(mission.status).toBe("locked");
  });

  it("has 8 correct decisions, 7 wrong-but-plausible decisions, and 15 cards", () => {
    expect(mission.correct_decision_ids).toHaveLength(8);
    expect(mission.wrong_but_plausible_decision_ids).toHaveLength(7);
    expect(mission.decision_cards).toHaveLength(15);
  });

  it("all answer-key IDs exist in decision_cards", () => {
    const cardIds = new Set(mission.decision_cards.map((c) => c.id));
    for (const id of [
      ...mission.correct_decision_ids,
      ...mission.wrong_but_plausible_decision_ids,
    ]) {
      expect(cardIds.has(id)).toBe(true);
    }
  });

  it("every answer-key decision has a senior engineer explanation", () => {
    for (const correctId of mission.correct_decision_ids) {
      expect(mission.senior_engineer_explanations.correct[correctId]).toBeTruthy();
    }
    for (const wrongId of mission.wrong_but_plausible_decision_ids) {
      expect(mission.senior_engineer_explanations.incorrect[wrongId]).toBeTruthy();
    }
  });

  it("has 70% pass threshold and 100% perfect threshold", () => {
    expect(mission.scoring.pass_threshold_percent).toBe(70);
    expect(mission.scoring.perfect_threshold_percent).toBe(100);
    expect(mission.scoring.points.correct_selection).toBe(1);
    expect(mission.scoring.points.missed_correct).toBe(-0.5);
    expect(mission.scoring.points.incorrect_selection).toBe(-0.25);
  });

  it("unlocks Mission 7 on pass", () => {
    expect(mission.unlock).toBeDefined();
    expect(mission.unlock!.next_mission_id).toBe("solvex_a_mission_7");
    expect(mission.unlock!.requires_score_percent).toBe(70);
    expect(mission.unlock!.requires_perfect_score).toBe(false);
    expect(mission.unlock!.unlocks_on_pass).toContain(
      "Mission 7: Draw the Process",
    );
  });

  it("every decision card has a display label", () => {
    for (const card of mission.decision_cards) {
      expect(getDecisionDisplayLabel(card.id, card.label)).toBeTruthy();
    }
  });
});

describe("Mission 7 data integrity", () => {
  const campaign = loadSolvexCampaign();
  const mission = campaign.missions[6];

  it("has the correct id, title, and locked initial status", () => {
    expect(mission.id).toBe("solvex_a_mission_7");
    expect(mission.mission_number).toBe(7);
    expect(mission.title).toBe("Mission 7: Draw the Process");
    expect(mission.short_title).toBe("Draw the Process");
    expect(mission.status).toBe("locked");
  });

  it("has 9 correct decisions, 7 wrong-but-plausible decisions, and 16 cards", () => {
    expect(mission.correct_decision_ids).toHaveLength(9);
    expect(mission.wrong_but_plausible_decision_ids).toHaveLength(7);
    expect(mission.decision_cards).toHaveLength(16);
  });

  it("all answer-key IDs exist in decision_cards", () => {
    const cardIds = new Set(mission.decision_cards.map((c) => c.id));
    for (const id of [
      ...mission.correct_decision_ids,
      ...mission.wrong_but_plausible_decision_ids,
    ]) {
      expect(cardIds.has(id)).toBe(true);
    }
  });

  it("every answer-key decision has a senior engineer explanation", () => {
    for (const correctId of mission.correct_decision_ids) {
      expect(mission.senior_engineer_explanations.correct[correctId]).toBeTruthy();
    }
    for (const wrongId of mission.wrong_but_plausible_decision_ids) {
      expect(mission.senior_engineer_explanations.incorrect[wrongId]).toBeTruthy();
    }
  });

  it("has 70% pass threshold and 100% perfect threshold", () => {
    expect(mission.scoring.pass_threshold_percent).toBe(70);
    expect(mission.scoring.perfect_threshold_percent).toBe(100);
    expect(mission.scoring.points.correct_selection).toBe(1);
    expect(mission.scoring.points.missed_correct).toBe(-0.5);
    expect(mission.scoring.points.incorrect_selection).toBe(-0.25);
  });

  it("unlocks Mission 8 on pass", () => {
    expect(mission.unlock).toBeDefined();
    expect(mission.unlock!.next_mission_id).toBe("solvex_a_mission_8");
    expect(mission.unlock!.requires_score_percent).toBe(70);
    expect(mission.unlock!.requires_perfect_score).toBe(false);
    expect(mission.unlock!.unlocks_on_pass).toContain(
      "Mission 8: Tag Everything",
    );
  });

  it("every decision card has a display label", () => {
    for (const card of mission.decision_cards) {
      expect(getDecisionDisplayLabel(card.id, card.label)).toBeTruthy();
    }
  });
});

describe("Mission 8 data integrity", () => {
  const campaign = loadSolvexCampaign();
  const mission = campaign.missions[7];

  it("has the correct id, title, and locked initial status", () => {
    expect(mission.id).toBe("solvex_a_mission_8");
    expect(mission.mission_number).toBe(8);
    expect(mission.title).toBe("Mission 8: Tag Everything");
    expect(mission.short_title).toBe("Tag Everything");
    expect(mission.status).toBe("locked");
  });

  it("has 9 correct decisions, 7 wrong-but-plausible decisions, and 16 cards", () => {
    expect(mission.correct_decision_ids).toHaveLength(9);
    expect(mission.wrong_but_plausible_decision_ids).toHaveLength(7);
    expect(mission.decision_cards).toHaveLength(16);
  });

  it("all answer-key IDs exist in decision_cards", () => {
    const cardIds = new Set(mission.decision_cards.map((c) => c.id));
    for (const id of [
      ...mission.correct_decision_ids,
      ...mission.wrong_but_plausible_decision_ids,
    ]) {
      expect(cardIds.has(id)).toBe(true);
    }
  });

  it("every answer-key decision has a senior engineer explanation", () => {
    for (const correctId of mission.correct_decision_ids) {
      expect(mission.senior_engineer_explanations.correct[correctId]).toBeTruthy();
    }
    for (const wrongId of mission.wrong_but_plausible_decision_ids) {
      expect(mission.senior_engineer_explanations.incorrect[wrongId]).toBeTruthy();
    }
  });

  it("has 70% pass threshold and 100% perfect threshold", () => {
    expect(mission.scoring.pass_threshold_percent).toBe(70);
    expect(mission.scoring.perfect_threshold_percent).toBe(100);
    expect(mission.scoring.points.correct_selection).toBe(1);
    expect(mission.scoring.points.missed_correct).toBe(-0.5);
    expect(mission.scoring.points.incorrect_selection).toBe(-0.25);
  });

  it("is the final mission with null next_mission_id", () => {
    expect(mission.unlock).toBeDefined();
    expect(mission.unlock!.next_mission_id).toBeNull();
    expect(mission.unlock!.requires_score_percent).toBe(70);
    expect(mission.unlock!.requires_perfect_score).toBe(false);
    expect(mission.unlock!.unlocks_on_pass).toContain("Campaign Complete");
  });

  it("every decision card has a display label", () => {
    for (const card of mission.decision_cards) {
      expect(getDecisionDisplayLabel(card.id, card.label)).toBeTruthy();
    }
  });
});

describe("scoring with mission 7", () => {
  const campaign = loadSolvexCampaign();
  const mission = campaign.missions[6];

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
      "control_valve_symbols_on_pfd",
    ]);
    expect(result.scorePercent).toBeLessThan(100);
    expect(result.incorrectSelectedIds).toEqual(["control_valve_symbols_on_pfd"]);
  });

  it("returns retry when no correct decisions are selected", () => {
    const result = scoreScenario(mission, [
      "control_valve_symbols_on_pfd",
      "pipe_sizes_on_pfd",
    ]);
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

  it("rejects an invalid bod_document introduced mission number", () => {
    const campaign = loadSolvexCampaign();
    const errors = validateCampaign({
      ...campaign,
      bod_document: {
        ...campaign.bod_document,
        bad_section: {
          introduced_in_mission: 0,
          items: ["Invalid section."],
        },
      },
    });

    expect(errors.map((error) => error.path)).toContain(
      "bod_document.bad_section.introduced_in_mission",
    );
  });

  it("rejects an empty bod_document section", () => {
    const campaign = loadSolvexCampaign();
    const errors = validateCampaign({
      ...campaign,
      bod_document: {
        ...campaign.bod_document,
        bad_section: {
          introduced_in_mission: 1,
          items: [],
        },
      },
    });

    expect(errors.map((error) => error.path)).toContain(
      "bod_document.bad_section.items",
    );
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
      bod_document: {},
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
      bod_document: {},
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
      bod_document: {},
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
      bod_document: {},
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
      bod_document: {},
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
      bod_document: {},
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
      bod_document: {},
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
