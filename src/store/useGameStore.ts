import { create } from "zustand";
import { scoreScenario, type ScoreResult } from "../domain/scoring";
import { loadSolvexLevelOne } from "../domain/loadScenario";
import type { Scenario } from "../domain/scenarioTypes";

export type Screen =
  | "level-map"
  | "bod-reader"
  | "decision-board"
  | "design-review"
  | "feedback";

interface GameState {
  scenario: Scenario;
  currentScreen: Screen;
  selectedDecisionIds: string[];
  scoreResult: ScoreResult | null;
  goTo: (screen: Screen) => void;
  toggleDecision: (decisionId: string) => void;
  submitDesignReview: () => void;
  resetLevel: () => void;
}

const scenario = loadSolvexLevelOne();

export const useGameStore = create<GameState>((set, get) => ({
  scenario,
  currentScreen: "level-map",
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
  submitDesignReview: () => {
    const { scenario: activeScenario, selectedDecisionIds } = get();
    set({
      scoreResult: scoreScenario(activeScenario, selectedDecisionIds),
      currentScreen: "design-review",
    });
  },
  resetLevel: () =>
    set({
      currentScreen: "level-map",
      selectedDecisionIds: [],
      scoreResult: null,
    }),
}));
