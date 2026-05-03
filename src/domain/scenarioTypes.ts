export type DecisionCategoryId =
  | "reactor_system"
  | "separation_system"
  | "heat_transfer_and_utilities"
  | "process_control_and_safety"
  | "environmental_treatment"
  | "unsupported_for_now";

export type DecisionCardType = "correct" | "wrong_plausible";

export interface ScenarioCategory {
  id: DecisionCategoryId;
  label: string;
}

export interface DecisionCard {
  id: string;
  category: DecisionCategoryId;
  label: string;
  type: DecisionCardType;
  linked_clues: string[];
  short_hint: string;
}

export interface ScoringPoints {
  correct_selection: number;
  missed_correct: number;
  incorrect_selection: number;
  perfect_bonus: number;
}

export interface ResultBand {
  id: "excellent" | "pass" | "retry";
  min_percent: number;
  title: string;
  message: string;
}

/* ── Campaign schema ── */

/**
 * A single section in the progressive Basis of Design document.
 * introduced_in_mission controls which missions see this section:
 * a player on mission N sees all sections where introduced_in_mission <= N.
 */
export interface BodSection {
  introduced_in_mission: number;
  items: string[];
}

export interface Campaign {
  id: string;
  version: string;
  title: string;
  subtitle: string;
  player_role: string;
  plant: PlantProfile;
  /** Progressive BoD — one document that grows section by section across missions. */
  bod_document: Record<string, BodSection>;
  missions: Scenario[];
}

export interface PlantProfile {
  product: string;
  product_type: string;
  plant_type: string;
  annual_capacity_tpy: number;
}

export interface MissionUnlock {
  unlocks_on_pass: string[];
  next_mission_id: string | null;
  requires_score_percent: number;
  requires_perfect_score: boolean;
}

/* ── Scenario (single mission view — compatible with Campaign missions) ── */

export interface Scenario {
  id: string;
  version: string;
  title: string;
  industry: string;
  plant: {
    product: string;
    product_type: string;
    plant_type: string;
    annual_capacity_tpy: number;
  };
  player_role: string;
  difficulty: "easy" | "medium" | "hard";
  mission_number?: number;
  short_title?: string;
  status?: "current" | "locked" | "completed";
  stage: {
    id: string;
    name: string;
    gantt_position: number;
    unlocks_on_pass: string[];
  };
  unlock?: MissionUnlock;
  learning_goals: string[];
  briefing: {
    senior_engineer_message: string;
  };
  instructions: {
    prompt: string;
    selection_rule: string;
    expected_time_minutes: number;
  };
  categories: ScenarioCategory[];
  decision_cards: DecisionCard[];
  correct_decision_ids: string[];
  wrong_but_plausible_decision_ids: string[];
  scoring: {
    mode: string;
    pass_threshold_percent: number;
    perfect_threshold_percent: number;
    points: ScoringPoints;
    result_bands: ResultBand[];
  };
  senior_engineer_explanations: {
    correct: Record<string, string>;
    incorrect: Record<string, string>;
    missed: {
      default: string;
    };
  };
  review_summary_template: string[];
  telemetry_events: string[];
}
