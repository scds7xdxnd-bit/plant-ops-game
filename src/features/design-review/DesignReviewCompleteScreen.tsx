import { useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  Lock,
  Minus,
  RefreshCw,
  X,
} from "lucide-react";
import { useGameStore } from "../../store/useGameStore";
import { TopMissionHeader } from "../mission-dashboard/TopMissionHeader";
import {
  getDecisionDisplayLabel,
  sortDecisionIdsByBoardOrder,
} from "../mission-dashboard/decisionPresentation";
import engineerSvgUrl from "../../assets/icons/plant-ops/icon-engineer.svg";
import bellIcon from "../../assets/icons/plant-ops/icon-bell.svg";
import cloudIcon from "../../assets/icons/plant-ops/icon-cloud.svg";
import cubeIcon from "../../assets/icons/plant-ops/icon-cube.svg";
import filterIcon from "../../assets/icons/plant-ops/icon-filter.svg";
import flameIcon from "../../assets/icons/plant-ops/icon-flame.svg";
import gearIcon from "../../assets/icons/plant-ops/icon-gear.svg";
import heatWavesIcon from "../../assets/icons/plant-ops/icon-heat-waves.svg";
import reliefValveIcon from "../../assets/icons/plant-ops/icon-relief-valve.svg";
import shieldIcon from "../../assets/icons/plant-ops/icon-shield.svg";
import thermometerIcon from "../../assets/icons/plant-ops/icon-thermometer.svg";
import waterDropIcon from "../../assets/icons/plant-ops/icon-water-drop.svg";
import waterNeutralizationIcon from "../../assets/icons/plant-ops/icon-water-neutralization.svg";
import "./designReviewComplete.css";

/** Items shown at a time before "View all" toggle */
const PREVIEW_COUNT = 3;

/** SVG ring constants: viewBox 0 0 120 120, radius 44 */
const RING_RADIUS = 44;
const CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export function DesignReviewCompleteScreen() {
  const scenario = useGameStore((state) => state.scenario);
  const scoreResult = useGameStore((state) => state.scoreResult);
  const resetLevel = useGameStore((state) => state.resetLevel);
  const advanceToNextMission = useGameStore((state) => state.advanceToNextMission);

  const [supportedExpanded, setSupportedExpanded] = useState(false);
  const [missedExpanded, setMissedExpanded] = useState(false);

  if (!scoreResult) {
    return null;
  }

  const correctFeedback = sortDecisionIdsByBoardOrder(
    scenario,
    scoreResult.correctSelectedIds,
  ).map((id) => ({
    id,
    label: getDecisionDisplayLabel(
      id,
      scenario.decision_cards.find((card) => card.id === id)?.label ?? id,
    ),
    text: scenario.senior_engineer_explanations.correct[id],
  }));
  const incorrectFeedback = sortDecisionIdsByBoardOrder(
    scenario,
    scoreResult.incorrectSelectedIds,
  ).map((id) => ({
    id,
    label: getDecisionDisplayLabel(
      id,
      scenario.decision_cards.find((card) => card.id === id)?.label ?? id,
    ),
    text: scenario.senior_engineer_explanations.incorrect[id],
  }));
  const missedFeedback = sortDecisionIdsByBoardOrder(
    scenario,
    scoreResult.missedCorrectIds,
  ).map((id) => ({
    id,
    label: getDecisionDisplayLabel(
      id,
      scenario.decision_cards.find((card) => card.id === id)?.label ?? id,
    ),
    text:
      scenario.senior_engineer_explanations.correct[id] ??
      scenario.senior_engineer_explanations.missed.default,
  }));

  const perfect = scoreResult.perfect;
  const passed = scoreResult.passed;
  const correctCount = scoreResult.correctSelectedIds.length;
  const missedCount = scoreResult.missedCorrectIds.length;
  const incorrectCount = scoreResult.incorrectSelectedIds.length;
  const totalCorrect = correctCount + missedCount;

  const fillOffset =
    CIRCUMFERENCE - (scoreResult.scorePercent / 100) * CIRCUMFERENCE;

  const hasNextMission =
    scenario.unlock?.next_mission_id != null &&
    useGameStore.getState().campaign.missions.some(
      (m) => m.id === scenario.unlock!.next_mission_id,
    );

  return (
    <div className="review-complete">
      <TopMissionHeader />

      <section className="review-content">
        {/* ── Summary panel ── */}
        <div className="summary-panel">
          <div className="summary-left">
            <p className="summary-eyebrow">Design Review Results</p>
            <h1 className="summary-title">Design Review Complete</h1>
            <p className="summary-body">
              Here is your score and the senior engineer&rsquo;s feedback on
              your early design decisions.
            </p>
          </div>

          <div className="summary-center">
            <div className="score-ring">
              <svg viewBox="0 0 120 120">
                <circle
                  className="score-ring__track"
                  cx="60"
                  cy="60"
                  r={RING_RADIUS}
                />
                <circle
                  className="score-ring__fill"
                  cx="60"
                  cy="60"
                  r={RING_RADIUS}
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={fillOffset}
                />
              </svg>
              <div className="score-ring__text">
                <span className="score-ring__pct">
                  {scoreResult.scorePercent}%
                </span>
                <span className="score-ring__sub">
                  {correctCount} / {totalCorrect}
                </span>
              </div>
            </div>
          </div>

          <div className="summary-right">
            <div className="metric-card metric-card--correct">
              <div className="metric-icon metric-icon--correct">
                <Check size={20} strokeWidth={3} />
              </div>
              <div className="metric-body">
                <span className="metric-count">{correctCount}</span>
                <p className="metric-label">Supported</p>
                <p className="metric-note">
                  Backed by the design basis.
                </p>
              </div>
            </div>

            <div className="metric-card metric-card--unsupported">
              <div className="metric-icon metric-icon--unsupported">
                <Minus size={20} strokeWidth={3} />
              </div>
              <div className="metric-body">
                <span className="metric-count">{incorrectCount}</span>
                <p className="metric-label">Unsupported</p>
                <p className="metric-note">
                  Not required yet.
                </p>
              </div>
            </div>

            <div className="metric-card metric-card--missed">
              <div className="metric-icon metric-icon--missed">
                <X size={20} strokeWidth={3} />
              </div>
              <div className="metric-body">
                <span className="metric-count">{missedCount}</span>
                <p className="metric-label">Missed</p>
                <p className="metric-note">
                  Required items left out.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Feedback section ── */}
        <section className="feedback-section">
          <h2 className="feedback-section__title">Senior Engineer&rsquo;s Notes</h2>
          <div className="feedback-grid--results">
            {/* Supported Decisions column */}
            <div className="feedback-col feedback-col--supported">
              <div className="feedback-col__tab">
                <span className="feedback-col__tab-label">
                  SUPPORTED DECISIONS ({correctCount})
                </span>
              </div>
              <div className="feedback-col__body">
                {correctFeedback.length === 0 ? (
                  <div className="feedback-col__empty">
                    <div className="feedback-col__empty-icon">
                      <Check size={20} strokeWidth={3} color="#4a7c59" />
                    </div>
                    <p className="feedback-col__empty-title">
                      No supported decisions in this review.
                    </p>
                  </div>
                ) : (
                  <>
                    {(supportedExpanded
                      ? correctFeedback
                      : correctFeedback.slice(0, PREVIEW_COUNT)
                    ).map((item) => (
                      <FeedbackResultItem
                        key={item.id}
                        id={item.id}
                        title={item.label}
                        text={item.text}
                        variant="supported"
                      />
                    ))}
                    {correctFeedback.length > PREVIEW_COUNT && (
                      <button
                        className="feedback-col__toggle"
                        onClick={() => setSupportedExpanded((v) => !v)}
                        type="button"
                      >
                        {supportedExpanded ? (
                          <>
                            Show less <ChevronUp size={14} />
                          </>
                        ) : (
                          <>
                            View all supported ({correctFeedback.length}){" "}
                            <ChevronDown size={14} />
                          </>
                        )}
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Needs Revision column */}
            <div className="feedback-col feedback-col--revision">
              <div className="feedback-col__tab">
                <span className="feedback-col__tab-label">
                  NEEDS REVISION ({incorrectCount})
                </span>
              </div>
              <div className="feedback-col__body">
                {incorrectFeedback.length === 0 ? (
                  <div className="feedback-col__empty">
                    <div className="feedback-col__empty-icon">
                      <Check size={20} strokeWidth={3} color="#4a7c59" />
                    </div>
                    <p className="feedback-col__empty-title">
                      No unsupported decisions selected.
                    </p>
                    <p className="feedback-col__empty-note">
                      Great job avoiding over-design.
                    </p>
                  </div>
                ) : (
                  incorrectFeedback.map((item) => (
                    <FeedbackResultItem
                      key={item.id}
                      id={item.id}
                      title={item.label}
                      text={item.text}
                      variant="revision"
                    />
                  ))
                )}
              </div>
            </div>

            {/* Missed Decisions column */}
            <div className="feedback-col feedback-col--missed">
              <div className="feedback-col__tab">
                <span className="feedback-col__tab-label">
                  MISSED DECISIONS ({missedCount})
                </span>
              </div>
              <div className="feedback-col__body">
                {missedFeedback.length === 0 ? (
                  <div className="feedback-col__empty">
                    <div className="feedback-col__empty-icon">
                      <Check size={20} strokeWidth={3} color="#4a7c59" />
                    </div>
                    <p className="feedback-col__empty-title">
                      All required decisions were selected.
                    </p>
                    <p className="feedback-col__empty-note">
                      Excellent work!
                    </p>
                  </div>
                ) : (
                  <>
                    {(missedExpanded
                      ? missedFeedback
                      : missedFeedback.slice(0, PREVIEW_COUNT)
                    ).map((item) => (
                      <FeedbackResultItem
                        key={item.id}
                        id={item.id}
                        title={item.label}
                        text={item.text}
                        variant="missed"
                      />
                    ))}
                    {missedFeedback.length > PREVIEW_COUNT && (
                      <button
                        className="feedback-col__toggle"
                        onClick={() => setMissedExpanded((v) => !v)}
                        type="button"
                      >
                        {missedExpanded ? (
                          <>
                            Show less <ChevronUp size={14} />
                          </>
                        ) : (
                          <>
                            View all missed ({missedFeedback.length}){" "}
                            <ChevronDown size={14} />
                          </>
                        )}
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* ── Mentor action bar ── */}
      <footer className="review-mentor-zone">
        <div className="review-mentor-panel">
          <div className="review-mentor-identity">
            <div className="review-mentor-avatar-wrap">
              <img
                src={engineerSvgUrl}
                alt="Senior Engineer"
                className="review-mentor-avatar-img"
              />
            </div>
            <div className="review-mentor-info">
              <p className="review-mentor-name">Senior Engineer</p>
              <p className="review-mentor-msg">
                Good effort! Review the notes above, adjust your decisions, and
                move forward.
              </p>
            </div>
          </div>

          <div className="review-mentor-actions">
            <div className="btn-restart">
              <button
                className="btn-restart-main"
                onClick={resetLevel}
                type="button"
              >
                <RefreshCw size={18} />
                Restart Level
              </button>
              {!perfect && (
                <span className="btn-restart-status">Score below 100%</span>
              )}
            </div>

            <div className="btn-continue">
              {hasNextMission ? (
                <>
                  <button
                    className="btn-continue-main"
                    disabled={!passed}
                    onClick={advanceToNextMission}
                    type="button"
                  >
                    {passed ? (
                      <>
                        Continue to Level {scenario.mission_number! + 1}
                        <ArrowRight size={18} />
                      </>
                    ) : (
                      <>
                        <Lock size={16} />
                        Continue to Level {scenario.mission_number! + 1}
                      </>
                    )}
                  </button>
                  <span className="btn-continue-sub">
                    Next: {scenario.unlock?.unlocks_on_pass?.[1] ?? "Next Stage"}
                  </span>
                  {passed ? (
                    <span className="btn-continue-status">
                      Level {scenario.mission_number! + 1} Unlocked
                    </span>
                  ) : (
                    <span className="btn-restart-status">
                      Score {scenario.scoring.pass_threshold_percent}% to unlock
                    </span>
                  )}
                </>
              ) : (
                <span className="btn-continue-sub">
                  Campaign Complete
                </span>
              )}
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

/* ───────────────────────────────────────────────
   Feedback result item sub-component
   ─────────────────────────────────────────────── */

function extractWhy(text: string): string {
  const firstLine = text.split(/[.\n]/)[0].trim();
  if (firstLine.length > 100) {
    return firstLine.slice(0, 97) + "...";
  }
  return firstLine;
}

const conciseFeedback: Record<
  string,
  Partial<Record<FeedbackResultItemProps["variant"], { text: string; why?: string }>>
> = {
  reactor_temperature_control_loop: {
    supported: {
      text: "The reactor is exothermic and capped at 120 C, so active temperature control is required.",
    },
    missed: {
      text: "The reactor needs active temperature control to stay below the 120 C limit.",
      why: "The design basis states the reaction is exothermic and temperature-limited.",
    },
  },
  reactor_heat_removal_system: {
    supported: {
      text: "Heat must be removed from the reactor, especially with limited summer cooling water.",
    },
    missed: {
      text: "A defined heat-removal path is required for the exothermic reactor section.",
      why: "Cooling capacity is constrained, so heat removal cannot be left generic.",
    },
  },
  high_temperature_alarm: {
    supported: {
      text: "Operators need warning before the reactor approaches unsafe temperature conditions.",
    },
    missed: {
      text: "A high-temperature alarm is needed to warn operators before unsafe operation.",
      why: "The 120 C limit requires both control and operator awareness.",
    },
  },
  reactor_pressure_relief_valve: {
    supported: {
      text: "Overpressure protection is explicitly required for the reactor section.",
    },
    missed: {
      text: "Reactor overpressure protection must be included as a safety requirement.",
      why: "The design basis directly requires overpressure protection.",
    },
  },
  flammable_feed_vapor_control: {
    supported: {
      text: "Feed A is flammable, so vapor and ignition-source controls are required.",
    },
    missed: {
      text: "Flammable feed handling needs vapor control and ignition-source control.",
      why: "Feed A is flammable before it reaches the reactor.",
    },
  },
  corrosion_resistant_feed_b_contact_parts: {
    supported: {
      text: "Feed B is corrosive at high concentration, so contact materials must resist corrosion.",
    },
    missed: {
      text: "Materials in contact with concentrated Feed B must be corrosion resistant.",
      why: "The design basis identifies Feed B as corrosive at high concentration.",
    },
  },
  light_impurity_removal_step: {
    supported: {
      text: "Feed A contains impurity X and the product purity target is 98.5 wt%.",
    },
    missed: {
      text: "An early separation step is needed to remove light impurity X.",
      why: "Impurity X threatens the 98.5 wt% product purity target.",
    },
  },
  product_drying_or_water_removal: {
    supported: {
      text: "Feed B is aqueous and product water must stay below 0.5 wt%.",
    },
    missed: {
      text: "A water-removal or drying step is needed for the final product.",
      why: "The final product water limit is below 0.5 wt%.",
    },
  },
  wastewater_neutralization: {
    supported: {
      text: "Wastewater must be neutralized before discharge.",
    },
    missed: {
      text: "Wastewater neutralization is required before discharge.",
      why: "The environmental constraints explicitly require neutralization.",
    },
  },
  voc_emission_control: {
    supported: {
      text: "VOC emissions must be controlled because the process uses organic feedstock.",
    },
    missed: {
      text: "VOC emission control must be included for the organic feed process.",
      why: "The environmental constraints explicitly require VOC control.",
    },
  },
  full_plant_3d_model: {
    revision: {
      text: "A 3D model can wait until layout or construction planning.",
      why: "The current task is early process design, not plant layout.",
    },
  },
  finite_element_analysis_reactor_shell: {
    revision: {
      text: "FEA belongs after basic process and pressure conditions are defined.",
      why: "This is later mechanical verification, not an early design-basis decision.",
    },
  },
  reactor_heat_removal_summer_duty: {
    supported: {
      text: "Reactor heat removal must be sized for the worst case — summer CW limits, not annual averages.",
    },
    missed: {
      text: "A heat-removal system sized only for average conditions will fail when it matters most.",
      why: "Summer cooling-water supply temperature and flow limits drive the sizing basis.",
    },
  },
  reactor_temp_control_coolant_loop: {
    supported: {
      text: "An active temperature control loop is needed because product quality is temperature-sensitive.",
    },
    missed: {
      text: "The reactor needs a control loop tied to coolant flow or jacket duty to stay within 80–110 C.",
      why: "Selectivity drops by 3 percentage points per 10 C above 110 C.",
    },
  },
  independent_high_temp_interlock: {
    supported: {
      text: "A separate safety interlock is required — the control loop is not a safety function.",
    },
    missed: {
      text: "An independent high-high temperature trip is needed for the credible runaway scenario.",
      why: "Independent layers of protection are a fundamental process-safety requirement.",
    },
  },
  define_max_reactor_operating_temp: {
    supported: {
      text: "A defined maximum allowable temperature is needed before equipment can be specified.",
    },
    missed: {
      text: "The design basis must state the maximum operating temperature for all downstream decisions.",
      why: "Decomposition becomes credible at 120 C — the limit must be explicit.",
    },
  },
  flag_cw_summer_design_constraint: {
    supported: {
      text: "The summer CW limitation must be flagged so the reactor design accounts for it.",
    },
    missed: {
      text: "If the CW constraint is not flagged, the plant may not achieve capacity in summer.",
      why: "Cooling water is limited to 50 m³/h with 32 C supply in summer.",
    },
  },
  relief_venting_review_runaway: {
    supported: {
      text: "Recognising the runaway overpressure hazard is required at the design-basis stage.",
    },
    missed: {
      text: "A relief/venting review must be included — the runaway can generate overpressure.",
      why: "Full sizing comes later, but acknowledging the hazard is a design-basis requirement.",
    },
  },
  check_coolant_supply_before_increase: {
    supported: {
      text: "Checking supply-side capacity before increasing flow is sound engineering.",
    },
    missed: {
      text: "Increasing coolant flow helps only if the supply side can deliver the needed temperature.",
      why: "The CW supply temperature varies between seasons and flow is limited in summer.",
    },
  },
  verify_utility_bottleneck_before_hx: {
    supported: {
      text: "More HX area cannot help if cooling water is already at its flow or return limit.",
    },
    missed: {
      text: "Always check for the limiting step before adding heat exchanger area.",
      why: "A utility bottleneck caps total heat removal regardless of exchanger size.",
    },
  },
  feed_rate_reduction_operating_fallback: {
    supported: {
      text: "Reducing feed rate on hot days is a legitimate operating fallback.",
    },
    missed: {
      text: "A feed rate reduction fallback is prudent for extreme summer conditions.",
      why: "It should be a contingency, not the primary design-basis solution.",
    },
  },
  ignore_summer_cw_use_annual_avg: {
    revision: {
      text: "Process plants are designed for the worst credible case, not the annual average.",
      why: "If the reactor cannot reject heat in summer, it cannot meet nameplate capacity.",
    },
  },
  operator_alarm_only_for_runaway: {
    revision: {
      text: "Operator response to an alarm is too slow for a credible exothermic runaway.",
      why: "An independent automatic interlock is needed as a layer of protection.",
    },
  },
  overdesign_reactor_volume_heat_removal: {
    revision: {
      text: "A larger reactor vessel increases holdup, not heat-transfer area.",
      why: "Heat removal depends on jacket/coil area, coolant flow, and temperature difference.",
    },
  },
  exotic_metallurgy_no_corrosion_evidence: {
    revision: {
      text: "Material upgrades need a corrosion or compatibility justification from the design basis.",
      why: "Mission 1 already covered Feed B corrosion — nothing else points to exotic alloys.",
    },
  },
  full_cfd_fea_3d_reactor_modeling: {
    revision: {
      text: "CFD, FEA, and 3D modelling belong to later detailed engineering, not the design basis.",
      why: "At this stage, fundamental decisions about heat removal and safety come first.",
    },
  },
  same_control_safety_protection_layer: {
    revision: {
      text: "Control and safety must be independent layers — a basic process-safety principle.",
      why: "If the controller fails, the same instrument cannot also trip the reactor.",
    },
  },
  sep_light_impurity_removal: {
    supported: {
      text: "Impurity X threatens product purity, so a removal step belongs in the separation basis.",
    },
    missed: {
      text: "The separation train needs a light-impurity removal step.",
      why: "Impurity X is present and final Solvex-A purity must reach 98.5 wt%.",
    },
  },
  sep_product_water_removal: {
    supported: {
      text: "Feed B introduces water and the product water limit is tight.",
    },
    missed: {
      text: "A water-removal or drying step is required.",
      why: "The final product water content must stay below 0.5 wt%.",
    },
  },
  sep_performance_targets: {
    supported: {
      text: "Purity and water targets must be defined before equipment is selected.",
    },
    missed: {
      text: "The separation basis needs explicit performance targets.",
      why: "Targets drive later equipment selection and sizing.",
    },
  },
  sep_request_vle_data: {
    supported: {
      text: "Confirmed VLE data is needed before locking a distillation design.",
    },
    missed: {
      text: "Request VLE or relative-volatility data before selecting final technology.",
      why: "The design basis says the equilibrium data is not confirmed.",
    },
  },
  sep_account_temp_sensitivity: {
    supported: {
      text: "Thermal sensitivity constrains separation temperature and pressure choices.",
    },
    missed: {
      text: "Separation conditions must respect the Solvex-A temperature limit.",
      why: "The product must not exceed 130 C for more than 5 minutes.",
    },
  },
  sep_water_routing_to_treatment: {
    supported: {
      text: "Water-rich purge streams must be routed to treatment.",
    },
    missed: {
      text: "Aqueous separation streams need a treatment route.",
      why: "Wastewater neutralisation is required before discharge.",
    },
  },
  sep_requirements_vs_sizing: {
    supported: {
      text: "This stage defines requirements; final sizing comes after data and simulation.",
    },
    missed: {
      text: "Document the separation requirements while deferring final sizing.",
      why: "Tray counts, diameters, and rigorous simulation are outside this mission.",
    },
  },
  sep_evaluate_alternatives: {
    supported: {
      text: "Azeotrope behavior and thermal limits justify evaluating alternatives.",
    },
    missed: {
      text: "Consider distillation and non-distillation options before selecting.",
      why: "Water azeotrope behavior and temperature sensitivity may limit standard distillation.",
    },
  },
  sep_link_feedb_to_water: {
    supported: {
      text: "The water entering with Feed B must leave through the separation train.",
    },
    missed: {
      text: "Link the aqueous catalyst feed to downstream water removal.",
      why: "Feed B is the source of water that threatens the product water spec.",
    },
  },
  sep_cryogenic_no_data: {
    revision: {
      text: "Cryogenic distillation needs stronger property and economic justification.",
      why: "A boiling-point difference alone does not justify cryogenic service.",
    },
  },
  sep_skip_water_removal: {
    revision: {
      text: "Water removal cannot be skipped just because the water came with a catalyst feed.",
      why: "The product water specification still applies.",
    },
  },
  sep_purity_packaging_only: {
    revision: {
      text: "Packaging cannot fix chemical purity.",
      why: "The 98.5 wt% purity target is a process design requirement.",
    },
  },
  sep_column_sizing_now: {
    revision: {
      text: "Final column sizing is premature at the design-basis stage.",
      why: "Tray count and diameter require VLE data and rigorous simulation.",
    },
  },
  sep_full_simulation: {
    revision: {
      text: "A full rigorous simulation comes after property data is confirmed.",
      why: "The current mission is to define the separation basis.",
    },
  },
  sep_ignore_light_impurity: {
    revision: {
      text: "Impurity X cannot be ignored because it enters the reactor effluent.",
      why: "Without removal, it can violate the Solvex-A purity target.",
    },
  },
  sep_high_temp_stripping: {
    revision: {
      text: "High-temperature stripping could degrade Solvex-A.",
      why: "The product has a 130 C exposure limit.",
    },
  },
};

function getFeedbackDisplay(
  id: string,
  fallbackText: string,
  variant: FeedbackResultItemProps["variant"],
): { text: string; why?: string } {
  const override = conciseFeedback[id]?.[variant];
  if (override) return override;

  const cleaned = fallbackText
    .replace(/^Correct\.\s*/i, "")
    .replace(/^Not justified\.\s*/i, "")
    .trim();

  return {
    text: cleaned.length > 120 ? cleaned.slice(0, 117) + "..." : cleaned,
    why:
      variant === "revision"
        ? "Not required by the current design basis."
        : variant === "missed"
          ? "Required by the design basis but not selected."
          : undefined,
  };
}

function getDecisionIcon(id: string): string {
  const map: Record<string, string> = {
    reactor_temperature_control_loop: thermometerIcon,
    reactor_heat_removal_system: heatWavesIcon,
    high_temperature_alarm: bellIcon,
    reactor_pressure_relief_valve: reliefValveIcon,
    flammable_feed_vapor_control: flameIcon,
    corrosion_resistant_feed_b_contact_parts: shieldIcon,
    light_impurity_removal_step: filterIcon,
    product_drying_or_water_removal: waterDropIcon,
    wastewater_neutralization: waterNeutralizationIcon,
    voc_emission_control: cloudIcon,
    full_plant_3d_model: cubeIcon,
    finite_element_analysis_reactor_shell: gearIcon,
    reactor_heat_removal_summer_duty: heatWavesIcon,
    reactor_temp_control_coolant_loop: thermometerIcon,
    independent_high_temp_interlock: bellIcon,
    define_max_reactor_operating_temp: thermometerIcon,
    flag_cw_summer_design_constraint: heatWavesIcon,
    relief_venting_review_runaway: reliefValveIcon,
    check_coolant_supply_before_increase: waterDropIcon,
    verify_utility_bottleneck_before_hx: gearIcon,
    feed_rate_reduction_operating_fallback: gearIcon,
    ignore_summer_cw_use_annual_avg: heatWavesIcon,
    operator_alarm_only_for_runaway: bellIcon,
    overdesign_reactor_volume_heat_removal: cubeIcon,
    exotic_metallurgy_no_corrosion_evidence: shieldIcon,
    full_cfd_fea_3d_reactor_modeling: cubeIcon,
    same_control_safety_protection_layer: gearIcon,
    sep_light_impurity_removal: filterIcon,
    sep_product_water_removal: waterDropIcon,
    sep_performance_targets: filterIcon,
    sep_request_vle_data: filterIcon,
    sep_account_temp_sensitivity: thermometerIcon,
    sep_water_routing_to_treatment: waterNeutralizationIcon,
    sep_requirements_vs_sizing: filterIcon,
    sep_evaluate_alternatives: filterIcon,
    sep_link_feedb_to_water: waterDropIcon,
    sep_cryogenic_no_data: filterIcon,
    sep_skip_water_removal: waterDropIcon,
    sep_purity_packaging_only: filterIcon,
    sep_column_sizing_now: cubeIcon,
    sep_full_simulation: cubeIcon,
    sep_ignore_light_impurity: filterIcon,
    sep_high_temp_stripping: flameIcon,
  };
  return map[id] ?? gearIcon;
}

interface FeedbackResultItemProps {
  id: string;
  title: string;
  text: string;
  variant: "supported" | "revision" | "missed";
}

function FeedbackResultItem({ id, title, text, variant }: FeedbackResultItemProps) {
  const iconSrc = getDecisionIcon(id);
  const display = getFeedbackDisplay(id, text, variant);
  return (
    <article className="feedback-item--result">
      <div className={`feedback-item__icon-tile feedback-item__icon-tile--${variant}`}>
        <img src={iconSrc} alt="" className="feedback-item__icon-img" />
      </div>

      <div className="feedback-item__body">
        <h3 className="feedback-item__title">{title}</h3>
        <p className="feedback-item__text">{display.text}</p>
        {variant !== "supported" && (
          <div
            className={`feedback-item__why feedback-item__why--${variant}`}
          >
            <strong>Why:</strong> {display.why ?? extractWhy(display.text)}
          </div>
        )}
      </div>

      {variant === "supported" && (
        <div className="feedback-item__check">
          <Check size={13} strokeWidth={3} color="#1a3d24" />
        </div>
      )}
    </article>
  );
}
