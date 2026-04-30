import type { Scenario } from "../domain/scenarioTypes";
import { loadSolvexCampaign } from "./loadCampaign";

/**
 * Compatibility wrapper: returns the first mission from the Solvex-A campaign.
 * All UI components continue to use `Scenario` unchanged.
 */
export function loadSolvexLevelOne(): Scenario {
  const campaign = loadSolvexCampaign();
  const mission = campaign.missions[0];
  if (!mission) {
    throw new Error("Campaign has no missions.");
  }
  return mission;
}
