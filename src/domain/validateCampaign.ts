import type { Campaign, Scenario } from "./scenarioTypes";

export interface CampaignValidationError {
  path: string;
  message: string;
}

/**
 * Validates a campaign and returns an array of errors.
 * An empty array means the campaign is valid.
 */
export function validateCampaign(
  campaign: Campaign,
): CampaignValidationError[] {
  const errors: CampaignValidationError[] = [];

  if (!campaign.id) {
    errors.push({ path: "id", message: "Campaign must have an id." });
  }

  if (!Array.isArray(campaign.missions) || campaign.missions.length === 0) {
    errors.push({
      path: "missions",
      message: "Campaign must have at least one mission.",
    });
    return errors;
  }

  const missionIds = new Set<string>();
  const missionNumbers = new Set<number>();

  for (let i = 0; i < campaign.missions.length; i++) {
    const mission = campaign.missions[i];
    const prefix = `missions[${i}]`;

    if (!mission.id) {
      errors.push({
        path: `${prefix}.id`,
        message: "Mission must have an id.",
      });
    } else if (missionIds.has(mission.id)) {
      errors.push({
        path: `${prefix}.id`,
        message: `Duplicate mission id "${mission.id}".`,
      });
    } else {
      missionIds.add(mission.id);
    }

    if (mission.mission_number !== undefined) {
      if (missionNumbers.has(mission.mission_number)) {
        errors.push({
          path: `${prefix}.mission_number`,
          message: `Duplicate mission_number "${mission.mission_number}".`,
        });
      } else {
        missionNumbers.add(mission.mission_number);
      }
    } else {
      errors.push({
        path: `${prefix}.mission_number`,
        message: "Campaign missions must define mission_number.",
      });
    }

    errors.push(...validateMission(mission, prefix));
  }

  return errors;
}

function validateMission(
  mission: Scenario,
  prefix: string,
): CampaignValidationError[] {
  const errors: CampaignValidationError[] = [];

  if (!mission.short_title) {
    errors.push({
      path: `${prefix}.short_title`,
      message: "Campaign missions must define short_title.",
    });
  }

  if (!mission.status) {
    errors.push({
      path: `${prefix}.status`,
      message: "Campaign missions must define status.",
    });
  }

  if (!mission.unlock) {
    errors.push({
      path: `${prefix}.unlock`,
      message: "Campaign missions must define unlock configuration.",
    });
  } else {
    if (!Array.isArray(mission.unlock.unlocks_on_pass)) {
      errors.push({
        path: `${prefix}.unlock.unlocks_on_pass`,
        message: "unlock.unlocks_on_pass must be an array.",
      });
    }

    if (
      typeof mission.unlock.requires_score_percent !== "number" ||
      mission.unlock.requires_score_percent < 0 ||
      mission.unlock.requires_score_percent > 100
    ) {
      errors.push({
        path: `${prefix}.unlock.requires_score_percent`,
        message: "unlock.requires_score_percent must be between 0 and 100.",
      });
    }
  }

  if (
    !Array.isArray(mission.correct_decision_ids) ||
    mission.correct_decision_ids.length === 0
  ) {
    errors.push({
      path: `${prefix}.correct_decision_ids`,
      message: "Mission must have at least one correct decision.",
    });
  }

  if (!Array.isArray(mission.decision_cards) || mission.decision_cards.length === 0) {
    errors.push({
      path: `${prefix}.decision_cards`,
      message: "Mission must have at least one decision card.",
    });
    return errors;
  }

  const cardIds = new Set(mission.decision_cards.map((c) => c.id));

  // Detect duplicate decision card IDs
  const seenCardIds = new Set<string>();
  for (const card of mission.decision_cards) {
    if (seenCardIds.has(card.id)) {
      errors.push({
        path: `${prefix}.decision_cards`,
        message: `Duplicate decision card id "${card.id}".`,
      });
    }
    seenCardIds.add(card.id);
  }

  // Every correct decision ID must exist in decision_cards
  for (const correctId of mission.correct_decision_ids) {
    if (!cardIds.has(correctId)) {
      errors.push({
        path: `${prefix}.correct_decision_ids`,
        message: `Correct decision "${correctId}" does not exist in decision_cards.`,
      });
    }
  }

  // Every wrong-but-plausible decision ID must exist in decision_cards
  if (Array.isArray(mission.wrong_but_plausible_decision_ids)) {
    for (const wrongId of mission.wrong_but_plausible_decision_ids) {
      if (!cardIds.has(wrongId)) {
        errors.push({
          path: `${prefix}.wrong_but_plausible_decision_ids`,
          message: `Wrong-but-plausible decision "${wrongId}" does not exist in decision_cards.`,
        });
      }
    }
  }

  // Every correct decision should have a senior engineer explanation
  if (mission.senior_engineer_explanations?.correct) {
    const explanationIds = Object.keys(
      mission.senior_engineer_explanations.correct,
    );
    for (const correctId of mission.correct_decision_ids) {
      if (!explanationIds.includes(correctId)) {
        errors.push({
          path: `${prefix}.senior_engineer_explanations.correct`,
          message: `Missing senior engineer explanation for correct decision "${correctId}".`,
        });
      }
    }
  }

  if (mission.senior_engineer_explanations?.incorrect) {
    const explanationIds = Object.keys(
      mission.senior_engineer_explanations.incorrect,
    );
    for (const wrongId of mission.wrong_but_plausible_decision_ids ?? []) {
      if (!explanationIds.includes(wrongId)) {
        errors.push({
          path: `${prefix}.senior_engineer_explanations.incorrect`,
          message: `Missing senior engineer explanation for unsupported decision "${wrongId}".`,
        });
      }
    }
  }

  // Result bands must have valid min_percent
  if (!mission.scoring?.result_bands?.length) {
    errors.push({
      path: `${prefix}.scoring.result_bands`,
      message: "Mission must define at least one result band.",
    });
  } else {
    for (let j = 0; j < mission.scoring.result_bands.length; j++) {
      const band = mission.scoring.result_bands[j];
      if (typeof band.min_percent !== "number" || band.min_percent < 0 || band.min_percent > 100) {
        errors.push({
          path: `${prefix}.scoring.result_bands[${j}].min_percent`,
          message: "Result band min_percent must be between 0 and 100.",
        });
      }
    }
  }

  // Scoring pass thresholds should be consistent
  if (mission.scoring) {
    if (
      typeof mission.scoring.pass_threshold_percent !== "number" ||
      mission.scoring.pass_threshold_percent < 0 ||
      mission.scoring.pass_threshold_percent > 100
    ) {
      errors.push({
        path: `${prefix}.scoring.pass_threshold_percent`,
        message: "pass_threshold_percent must be between 0 and 100.",
      });
    }

    if (
      typeof mission.scoring.perfect_threshold_percent !== "number" ||
      mission.scoring.perfect_threshold_percent < 0 ||
      mission.scoring.perfect_threshold_percent > 100
    ) {
      errors.push({
        path: `${prefix}.scoring.perfect_threshold_percent`,
        message: "perfect_threshold_percent must be between 0 and 100.",
      });
    }
  }

  return errors;
}

/**
 * Returns true if the campaign passes validation.
 */
export function isCampaignValid(campaign: Campaign): boolean {
  return validateCampaign(campaign).length === 0;
}
