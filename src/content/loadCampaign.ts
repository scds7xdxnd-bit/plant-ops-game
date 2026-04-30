import { parse } from "yaml";
import type { Campaign } from "../domain/scenarioTypes";
import { validateCampaign } from "../domain/validateCampaign";
import solvexCampaignYaml from "./scenarios/solvex-a-campaign.yaml?raw";

export function loadSolvexCampaign(): Campaign {
  const campaign = parse(solvexCampaignYaml) as Campaign;
  const errors = validateCampaign(campaign);

  if (errors.length > 0) {
    const details = errors
      .map((error) => `${error.path}: ${error.message}`)
      .join("\n");
    throw new Error(`Invalid Solvex campaign data:\n${details}`);
  }

  return campaign;
}
