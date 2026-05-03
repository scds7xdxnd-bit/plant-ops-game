import { beforeEach, describe, expect, it } from "vitest";
import { loadSolvexCampaign } from "../content/loadCampaign";
import { useGameStore } from "../store/useGameStore";

function resetGameStore() {
  const campaign = loadSolvexCampaign();
  const initialMission =
    campaign.missions.find((mission) => mission.status === "current") ??
    campaign.missions[0];

  useGameStore.setState({
    campaign,
    scenario: initialMission,
    currentMissionId: initialMission.id,
    currentScreen: "mission-dashboard",
    selectedDecisionIds: [],
    scoreResult: null,
  });
}

function selectDecisionIds(ids: string[]) {
  for (const id of ids) {
    useGameStore.getState().toggleDecision(id);
  }
}

describe("automated campaign playthrough", () => {
  beforeEach(() => {
    resetGameStore();
  });

  it("plays every mission with perfect selections and advances through the campaign", () => {
    const missionCount = useGameStore.getState().campaign.missions.length;

    for (let missionIndex = 0; missionIndex < missionCount; missionIndex++) {
      const stateBeforeSelection = useGameStore.getState();
      const mission = stateBeforeSelection.scenario;

      expect(mission.mission_number).toBe(missionIndex + 1);
      expect(stateBeforeSelection.currentMissionId).toBe(mission.id);
      expect(stateBeforeSelection.currentScreen).toBe("mission-dashboard");

      selectDecisionIds(mission.correct_decision_ids);
      useGameStore.getState().submitDesignReview();

      const reviewedState = useGameStore.getState();
      expect(reviewedState.currentScreen).toBe("design-review");
      expect(reviewedState.scoreResult?.passed).toBe(true);
      expect(reviewedState.scoreResult?.perfect).toBe(true);
      expect(reviewedState.scoreResult?.scorePercent).toBe(100);
      expect(reviewedState.scoreResult?.incorrectSelectedIds).toEqual([]);
      expect(reviewedState.scoreResult?.missedCorrectIds).toEqual([]);

      const nextMissionId = mission.unlock?.next_mission_id;
      if (!nextMissionId) {
        expect(missionIndex).toBe(missionCount - 1);
        continue;
      }

      useGameStore.getState().advanceToNextMission();

      const advancedState = useGameStore.getState();
      expect(advancedState.currentMissionId).toBe(nextMissionId);
      expect(advancedState.scenario.id).toBe(nextMissionId);
      expect(advancedState.currentScreen).toBe("mission-dashboard");
      expect(advancedState.selectedDecisionIds).toEqual([]);
      expect(advancedState.scoreResult).toBeNull();

      const completedMission = advancedState.campaign.missions.find(
        (candidate) => candidate.id === mission.id,
      );
      const currentMission = advancedState.campaign.missions.find(
        (candidate) => candidate.id === nextMissionId,
      );

      expect(completedMission?.status).toBe("completed");
      expect(currentMission?.status).toBe("current");
    }
  });

  it("does not advance when the submitted review fails", () => {
    const initialMission = useGameStore.getState().scenario;
    const unsupportedDecision = initialMission.wrong_but_plausible_decision_ids[0];

    selectDecisionIds([unsupportedDecision]);
    useGameStore.getState().submitDesignReview();

    const failedState = useGameStore.getState();
    expect(failedState.scoreResult?.passed).toBe(false);
    expect(failedState.currentMissionId).toBe(initialMission.id);

    useGameStore.getState().advanceToNextMission();

    const blockedState = useGameStore.getState();
    expect(blockedState.currentMissionId).toBe(initialMission.id);
    expect(blockedState.scenario.id).toBe(initialMission.id);
    expect(blockedState.currentScreen).toBe("design-review");
  });
});
