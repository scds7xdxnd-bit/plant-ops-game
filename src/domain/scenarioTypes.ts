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
  stage: {
    id: string;
    name: string;
    gantt_position: number;
    unlocks_on_pass: string[];
  };
  learning_goals: string[];
  briefing: {
    senior_engineer_message: string;
  };
  bod_excerpt: Record<string, string[]>;
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
