import { create } from "zustand";
import { loadSolvexCampaign } from "../content/loadCampaign";
import { scoreScenario, type ScoreResult } from "../domain/scoring";
import type { Scenario, Campaign } from "../domain/scenarioTypes";

export type Screen =
  | "mission-dashboard"
  | "level-map"
  | "bod-reader"
  | "decision-board"
  | "design-review";

interface GameState {
  campaign: Campaign;
  scenario: Scenario;
  currentMissionId: string;
  currentScreen: Screen;
  selectedDecisionIds: string[];
  scoreResult: ScoreResult | null;
  goTo: (screen: Screen) => void;
  toggleDecision: (decisionId: string) => void;
  clearSelections: () => void;
  submitDesignReview: () => void;
  resetLevel: () => void;
  advanceToNextMission: () => void;
}

const campaign = loadSolvexCampaign();
const initialMission =
  campaign.missions.find((mission) => mission.status === "current") ??
  campaign.missions[0];

if (!initialMission) {
  throw new Error("Campaign has no playable missions.");
}

export const useGameStore = create<GameState>((set, get) => ({
  campaign,
  scenario: initialMission,
  currentMissionId: initialMission.id,
  currentScreen: "mission-dashboard",
  selectedDecisionIds: [],
  scoreResult: null,
  goTo: (screen) => set({ currentScreen: screen }),
  toggleDecision: (decisionId) =>
    set((state) => {
      const selected = new Set(state.selectedDecisionIds);
      if (selected.has(decisionId)) {
        selected.delete(decisionId);
      } else {
        selected.add(decisionId);
      }
      return { selectedDecisionIds: [...selected] };
    }),
  clearSelections: () => set({ selectedDecisionIds: [] }),
  submitDesignReview: () => {
    const { campaign: activeCampaign, currentMissionId, selectedDecisionIds } =
      get();
    const activeScenario = getCurrentMission(activeCampaign, currentMissionId);
    set({
      scoreResult: scoreScenario(activeScenario, selectedDecisionIds),
      scenario: activeScenario,
      currentScreen: "design-review",
    });
  },
  resetLevel: () =>
    set({
      currentScreen: "mission-dashboard",
      selectedDecisionIds: [],
      scoreResult: null,
    }),
  advanceToNextMission: () => {
    const { campaign: activeCampaign, currentMissionId } = get();
    const currentMission = activeCampaign.missions.find(
      (m) => m.id === currentMissionId,
    );
    if (!currentMission?.unlock?.next_mission_id) return;

    const nextMissionId = currentMission.unlock.next_mission_id;
    const nextMission = activeCampaign.missions.find(
      (m) => m.id === nextMissionId,
    );
    if (!nextMission) return;

    const updatedMissions = activeCampaign.missions.map((m) => {
      if (m.id === currentMissionId)
        return { ...m, status: "completed" as const };
      if (m.id === nextMissionId)
        return { ...m, status: "current" as const };
      return m;
    });

    set({
      campaign: { ...activeCampaign, missions: updatedMissions },
      scenario: { ...nextMission, status: "current" },
      currentMissionId: nextMissionId,
      currentScreen: "mission-dashboard",
      selectedDecisionIds: [],
      scoreResult: null,
    });
  },
}));

/** Derived selector: resolves the current mission from the campaign. */
export function getCurrentMission(
  campaign: Campaign,
  missionId: string,
): Scenario {
  const mission = campaign.missions.find((m) => m.id === missionId);
  if (!mission) {
    throw new Error(`Mission "${missionId}" not found in campaign.`);
  }
  return mission;
}
