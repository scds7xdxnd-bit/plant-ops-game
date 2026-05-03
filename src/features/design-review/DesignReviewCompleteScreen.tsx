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
    <div className="review-complete" data-testid="design-review-screen">
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
                <span className="score-ring__pct" data-testid="score-percent">
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
                    data-testid="continue-next"
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
  hazardous_area_classification_feed_a: {
    supported: {
      text: "Flammable Feed A requires hazardous area classification for electrical equipment selection.",
    },
    missed: {
      text: "Feed A area needs electrical area classification before equipment can be specified.",
      why: "Flammable vapors can form ignitable mixtures — this is a regulatory and design-basis requirement.",
    },
  },
  emergency_isolation_valves_feed_a: {
    supported: {
      text: "Emergency isolation valves on Feed A supply lines are a primary ESD requirement.",
    },
    missed: {
      text: "The flammable feed supply needs emergency isolation capability.",
      why: "Cutting off flammable feed is a primary action in any major process emergency.",
    },
  },
  plant_esd_system: {
    supported: {
      text: "An ESD system is explicitly required by the design basis to cover all process sections.",
    },
    missed: {
      text: "A plant-wide emergency shutdown system must be specified in the design basis.",
      why: "The design basis directly requires an ESD system to safely isolate and depressurize.",
    },
  },
  fire_and_gas_detection: {
    supported: {
      text: "Fire and gas detection is a standard first protection layer for flammable material areas.",
    },
    missed: {
      text: "Fire and gas detection must cover all flammable material handling areas.",
      why: "Early warning of flammable gas or fire is a basic safety requirement.",
    },
  },
  bunding_for_liquid_storage: {
    supported: {
      text: "Both flammable Feed A and corrosive Feed B require secondary containment bunding.",
    },
    missed: {
      text: "Secondary containment bunding is required for all chemical storage areas.",
      why: "Bunding prevents flammable spills from reaching ignition sources and confines corrosive spills.",
    },
  },
  mandate_hazop_before_detailed_design: {
    supported: {
      text: "HAZOP is a design-basis commitment that must drive — not confirm — the detailed design.",
    },
    missed: {
      text: "A formal HAZOP must be completed before detailed safety engineering begins.",
      why: "Safety-critical equipment specification depends on hazard analysis outputs.",
    },
  },
  identify_relief_scenarios_reactor_and_separation: {
    supported: {
      text: "Identifying overpressure scenarios is within design-basis scope; sizing comes later.",
    },
    missed: {
      text: "Relief device scenarios for reactor and separation sections must be identified now.",
      why: "Runaway can cause overpressure — scenarios must be scoped even if sizing is deferred.",
    },
  },
  closed_safe_disposal_for_relief_and_vents: {
    supported: {
      text: "Relief and vent discharges from flammable systems must go to a closed disposal system.",
    },
    missed: {
      text: "All pressure relief and emergency venting needs a closed safe disposal route.",
      why: "Open-atmosphere relief of flammable or potentially toxic streams is not acceptable.",
    },
  },
  passive_fire_protection_steelwork: {
    supported: {
      text: "Structural steel in hazardous areas needs passive fire protection for pool-fire scenarios.",
    },
    missed: {
      text: "Passive fire protection must be specified for structural steelwork in hazardous areas.",
      why: "A pool fire can heat steel to failure in minutes, causing vessel collapse and escalation.",
    },
  },
  atex_zone_0_entire_plant: {
    revision: {
      text: "Blanket Zone 0 avoids proper zone analysis but massively over-specifies equipment and cost.",
      why: "Zone classification must be based on a formal study of release sources and ventilation.",
    },
  },
  operator_procedures_only_for_esd: {
    revision: {
      text: "Human response time is insufficient as the sole protection for a credible runaway.",
      why: "Independent protection layers require automatic systems, not operator action alone.",
    },
  },
  size_all_relief_valves_now: {
    revision: {
      text: "Relief valve sizing requires hazard study outputs not yet available at this stage.",
      why: "Worst-case scenarios per vessel (fire, blocked outlet, runaway) come from formal HAZOP.",
    },
  },
  extra_controllers_as_safety_layers: {
    revision: {
      text: "Adding more BPCS controllers does not create independent safety layers.",
      why: "The basic process control system and safety system must be independent by definition.",
    },
  },
  skip_bunding_for_feed_b: {
    revision: {
      text: "Corrosive materials need secondary containment regardless of flammability classification.",
      why: "Feed B is corrosive at high concentration — bunding protects personnel and the environment.",
    },
  },
  assign_sil_before_hazop: {
    revision: {
      text: "SIL determination needs hazard frequency and consequence data from the formal study.",
      why: "Assigning SIL levels without data produces numbers without a technical basis.",
    },
  },
  inherently_safer_over_layers_of_protection: {
    revision: {
      text: "Inherent safety applies at process-development stage — feedstock and chemistry are now fixed.",
      why: "At detailed design the task is to manage accepted hazards through protection layers.",
    },
  },
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
  list_all_heat_demands_across_plant: {
    supported: {
      text: "The utility system must cover every heat consumer in the plant, not just the reactor.",
    },
    missed: {
      text: "All heat demands across the plant must be listed before sizing any utility system.",
      why: "Missing even one demand leaves the utility supply undersized.",
    },
  },
  match_lp_steam_to_reboiler_duty: {
    supported: {
      text: "LP steam covers the temperature range and is the preferred lower-cost option.",
    },
    missed: {
      text: "LP steam is available and preferred for duties below 150 C.",
      why: "All separation steps must operate below 130 C — LP steam saturation covers this.",
    },
  },
  size_cw_against_summer_limit: {
    supported: {
      text: "Summer CW conditions are the governing case for all cooling equipment.",
    },
    missed: {
      text: "All coolers must be sized against summer CW supply temperature and flow limit.",
      why: "A condenser sized on winter conditions will underperform in summer.",
    },
  },
  assess_heat_recovery_effluent_to_feed: {
    supported: {
      text: "Hot effluent to cold feed is a classic heat recovery opportunity worth assessing.",
    },
    missed: {
      text: "Heat recovery between reactor effluent and cold feeds should be assessed.",
      why: "Heat recovery reduces steam demand and cooling load simultaneously.",
    },
  },
  flag_summer_cw_constraint_for_all_cooling: {
    supported: {
      text: "The 50 m³/h limit is a plant-wide budget for all cooling consumers.",
    },
    missed: {
      text: "Summer CW limit must be flagged as a design constraint for every cooler and condenser.",
      why: "Every cooling duty competes for the same limited resource.",
    },
  },
  confirm_lp_steam_temp_adequate_for_reboiler: {
    supported: {
      text: "Confirming LP steam saturation temperature avoids a utility-temperature mismatch.",
    },
    missed: {
      text: "LP steam saturation temperature must be checked against reboiler duty before committing.",
      why: "Steam pressure sets saturation temperature; it must exceed the process duty.",
    },
  },
  include_utility_balance_in_design_basis: {
    supported: {
      text: "Identifying all steam, CW, and electrical demands prevents surprise utility shortfalls.",
    },
    missed: {
      text: "A utility balance covering steam, CW, and electricity belongs in the design basis.",
      why: "Identifying demands now prevents expensive utility infrastructure gaps later.",
    },
  },
  account_for_heat_tracing_needs: {
    supported: {
      text: "Organic and aqueous lines may need tracing to remain pumpable in cold conditions.",
    },
    missed: {
      text: "Heat tracing requirements should be acknowledged in the design basis.",
      why: "Liquid organics and aqueous solutions may freeze or become viscous in cold ambient conditions.",
    },
  },
  fired_heater_for_reboiler_no_justification: {
    revision: {
      text: "A fired heater needs a temperature-gap justification — LP steam covers this duty.",
      why: "LP steam is available and its saturation temperature is adequate for the separation duties.",
    },
  },
  refrigeration_for_condensers_no_data: {
    revision: {
      text: "Refrigeration requires evidence that CW temperature is genuinely inadequate.",
      why: "No data in this design basis shows 32 C summer CW is insufficient for the condenser duty.",
    },
  },
  design_coolers_on_winter_cw_only: {
    revision: {
      text: "Winter is the best case for cooling — summer is the design case.",
      why: "A cooler sized on 25 C winter supply will fail when 32 C summer supply arrives.",
    },
  },
  skip_heat_recovery_plant_too_small: {
    revision: {
      text: "Heat recovery potential depends on stream duties, not plant size as a rule of thumb.",
      why: "This must be assessed with stream temperatures and duties before it can be dismissed.",
    },
  },
  size_steam_on_reactor_only: {
    revision: {
      text: "The reboiler and drying step are also steam consumers.",
      why: "A steam supply scoped only for the reactor will be undersized for the full plant.",
    },
  },
  mp_steam_for_all_heating: {
    revision: {
      text: "MP steam adds cost without benefit when LP steam already covers the duty.",
      why: "LP steam is the preferred heating medium for duties below 150 C.",
    },
  },
  design_coolers_independently_ignore_total_cw_budget: {
    revision: {
      text: "Each cooler competes for the same 50 m³/h CW budget.",
      why: "The summed demand must be checked against the budget before approving individual designs.",
    },
  },
  voc_recovery_or_destruction_on_all_vents: {
    supported: {
      text: "Every vent handling organic vapors must have VOC recovery or destruction.",
    },
    missed: {
      text: "VOC control is required on all process and storage vents handling organic materials.",
      why: "VOC emissions from vents are regulated and must be controlled at every potential release point.",
    },
  },
  define_all_wastewater_streams_by_source: {
    supported: {
      text: "Each wastewater stream needs separate characterization before treatment design.",
    },
    missed: {
      text: "All wastewater stream sources must be identified before designing any treatment system.",
      why: "Different streams carry different contaminants requiring different treatment approaches.",
    },
  },
  ph_neutralization_before_discharge: {
    supported: {
      text: "Wastewater must be neutralized before discharge, as stated in the design basis.",
    },
    missed: {
      text: "pH neutralization is an explicit environmental requirement in the design basis.",
      why: "The catalyst solution is corrosive, making the aqueous phase likely acidic or basic.",
    },
  },
  secondary_containment_all_chemical_storage: {
    supported: {
      text: "Secondary containment is required for all liquid chemical storage areas.",
    },
    missed: {
      text: "All chemical storage areas need secondary containment for environmental protection.",
      why: "It prevents both safety incidents from flammable spills and environmental damage from corrosive releases.",
    },
  },
  quantified_emission_estimates_for_permit: {
    supported: {
      text: "Permit applications require quantified emission estimates for all regulated streams.",
    },
    missed: {
      text: "Quantified emission estimates must be part of the permit application process.",
      why: "Regulators need numbers, not just a list of emission points and control technologies.",
    },
  },
  fugitive_emission_monitoring_program: {
    supported: {
      text: "A fugitive emission monitoring program is required for equipment in organic service.",
    },
    missed: {
      text: "Fugitive emissions from seals, flanges, and valves in organic service must be monitored.",
      why: "Small but aggregated fugitive emissions are a regulated VOC source.",
    },
  },
  recover_organic_vapor_before_destruction: {
    supported: {
      text: "Recover organic vapors for recycle before sending to any destruction device.",
    },
    missed: {
      text: "The waste minimisation hierarchy requires recovery before destruction.",
      why: "Recovering vapors recovers feedstock value and reduces load on downstream VOC control.",
    },
  },
  define_disposal_route_for_solid_waste: {
    supported: {
      text: "A disposal route for catalyst residues and solid waste must be confirmed in the design basis.",
    },
    missed: {
      text: "Solid waste disposal must be confirmed before the plant is built, not after.",
      why: "Even small quantities may be classified as hazardous requiring specific handling and disposal.",
    },
  },
  full_biological_ww_treatment_no_data: {
    revision: {
      text: "Biological treatment design requires biodegradability and organic loading data not yet available.",
      why: "Without characterisation data, a biological treatment plant cannot be sized or specified.",
    },
  },
  open_flame_flare_for_voc_control: {
    revision: {
      text: "Open-flame flaring is over-engineered for a small specialty chemical plant.",
      why: "It creates ignition risk near flammable feed areas for the low VOC volumes involved.",
    },
  },
  fugitive_emissions_negligible_no_basis: {
    revision: {
      text: "Dismissing fugitive emissions without data is not defensible with regulators.",
      why: "A regulatory permit requires fugitive emission estimates for plants handling organic materials.",
    },
  },
  skip_secondary_containment_for_feed_b_aqueous: {
    revision: {
      text: "Aqueous does not mean benign — Feed B is a corrosive catalyst solution requiring containment.",
      why: "A spill would damage infrastructure, harm personnel, and potentially contaminate drainage.",
    },
  },
  discharge_wastewater_after_neutralization_only: {
    revision: {
      text: "Neutralization addresses pH only — dissolved organics and catalyst residues may exceed other permit limits.",
      why: "A final effluent quality checkpoint is needed to confirm all permit parameters are met.",
    },
  },
  env_compliance_as_paperwork_only: {
    revision: {
      text: "Environmental requirements drive process design — they cannot be deferred to a permit exercise.",
      why: "Deferring to the permit stage risks redesign costs and permitting delays.",
    },
  },
  ignore_solid_waste_negligible: {
    revision: {
      text: "Even small quantities of hazardous solid waste need a confirmed disposal route.",
      why: "Spent catalyst and filter residues may require specific handling, transport, and disposal arrangements.",
    },
  },
  all_major_process_units_as_labeled_blocks: {
    supported: {
      text: "Every confirmed process section must appear as a labeled block on the PFD.",
    },
    missed: {
      text: "All major process sections confirmed in prior missions must be shown as labeled blocks.",
      why: "Omitting any section creates a gap in the process narrative on the PFD.",
    },
  },
  all_main_streams_with_flow_direction: {
    supported: {
      text: "Streams without flow direction arrows are ambiguous on a process flow diagram.",
    },
    missed: {
      text: "Flow direction must be shown on every main process stream.",
      why: "Streams without direction are not readable as a process flow diagram.",
    },
  },
  utility_connections_at_each_major_unit: {
    supported: {
      text: "Utility connections at each unit make the PFD a complete energy reference.",
    },
    missed: {
      text: "Steam and cooling water connections belong on the PFD at each consuming unit.",
      why: "The reactor requires cooling and the reboiler requires steam — these must be shown.",
    },
  },
  recycle_stream_on_pfd: {
    supported: {
      text: "The Feed A recycle is a defining feature of the material balance.",
    },
    missed: {
      text: "The unreacted Feed A recycle must appear on the PFD.",
      why: "A PFD without the recycle stream is missing a major process feature.",
    },
  },
  wastewater_and_vent_routing_on_pfd: {
    supported: {
      text: "Environmental streams connect treatment units to their sources on the PFD.",
    },
    missed: {
      text: "Wastewater and vent routing to environmental treatment must be shown.",
      why: "Omitting these gives an incomplete picture of the process.",
    },
  },
  numbered_streams_for_stream_table: {
    supported: {
      text: "Stream numbers link the PFD drawing to the stream table data.",
    },
    missed: {
      text: "All main streams must be numbered for stream table reference.",
      why: "Without numbers, the stream table cannot be referenced.",
    },
  },
  stream_table_with_key_properties: {
    supported: {
      text: "The stream table makes the PFD a quantitative engineering document.",
    },
    missed: {
      text: "Temperature, pressure, phase, and flow data belong in the stream table.",
      why: "The stream table elevates the PFD from a sketch to an engineering reference.",
    },
  },
  feed_entry_and_product_exit_labeled: {
    supported: {
      text: "Battery-limit streams define the plant boundary interface.",
    },
    missed: {
      text: "Feed entry and product exit must be labeled as battery-limit streams.",
      why: "Battery-limit labels make the plant boundary and tie-in points unambiguous.",
    },
  },
  heat_recovery_exchangers_on_pfd: {
    supported: {
      text: "Heat recovery exchangers are major process units that affect stream conditions.",
    },
    missed: {
      text: "Heat recovery exchangers must be shown as process units on the PFD.",
      why: "They affect stream temperatures and energy consumption.",
    },
  },
  control_valve_symbols_on_pfd: {
    revision: {
      text: "Control valves and instruments are P&ID level detail, not PFD.",
      why: "The PFD shows process function; the P&ID shows instrumentation and control.",
    },
  },
  pipe_sizes_on_pfd: {
    revision: {
      text: "Pipe sizes and material specs belong on the P&ID and line list.",
      why: "Adding pipe specs to the PFD clutters the drawing with unnecessary detail.",
    },
  },
  every_drain_and_vent_on_pfd: {
    revision: {
      text: "Individual drain and vent connections are P&ID level detail.",
      why: "Including every minor connection makes the PFD unreadable as a concept document.",
    },
  },
  relief_valve_symbols_on_pfd_vessels: {
    revision: {
      text: "Relief device detail belongs on the P&ID, not the PFD.",
      why: "Specific relief device decisions are made after the hazard study.",
    },
  },
  full_mechanical_equipment_list_on_pfd: {
    revision: {
      text: "Mechanical specifications belong in the separate equipment list document.",
      why: "Integrating equipment data into the PFD overloads the drawing.",
    },
  },
  omit_env_and_utility_streams_for_simplicity: {
    revision: {
      text: "Omitting environmental and utility streams makes the PFD incomplete.",
      why: "A PFD missing these gives a false impression of the process.",
    },
  },
  three_d_plant_layout_on_pfd: {
    revision: {
      text: "Physical locations and dimensions are plant layout, not PFD scope.",
      why: "The PFD shows process concept, not 3D routing or structural elements.",
    },
  },

  // Mission 8
  all_instruments_in_isa_notation: {
    supported: {
      text: "Every instrument must use standard ISA symbols on the P&ID.",
    },
    missed: {
      text: "All instruments must be shown with ISA notation on the P&ID.",
      why: "The P&ID is the definitive instrument reference — ambiguous symbols cause commissioning and maintenance errors.",
    },
  },
  all_control_loops_fully_shown: {
    supported: {
      text: "Each control loop must show measurement, controller, and final element.",
    },
    missed: {
      text: "Incomplete control loops cannot be used for commissioning or maintenance.",
      why: "A control loop is incomplete without all three elements shown on the P&ID.",
    },
  },
  independent_high_high_temp_interlock_shown_separately: {
    supported: {
      text: "Safety and control must be independent systems on the P&ID.",
    },
    missed: {
      text: "The high-high temperature interlock must be separate from the control loop.",
      why: "Control and safety instrumented functions must be independent by definition.",
    },
  },
  manual_block_valves_on_major_lines: {
    supported: {
      text: "Block valves make equipment isolatable for safe maintenance.",
    },
    missed: {
      text: "Manual block valves on major process lines define the isolation philosophy.",
      why: "Without block valves, equipment cannot be safely isolated for maintenance.",
    },
  },
  check_valves_on_feed_and_product_lines: {
    supported: {
      text: "Check valves prevent backflow that can contaminate feeds or damage equipment.",
    },
    missed: {
      text: "Check valves are required on feed and product lines.",
      why: "Backflow can contaminate feeds, damage equipment, or reverse-rotate pumps.",
    },
  },
  pipe_spec_breaks_on_pid: {
    supported: {
      text: "Pipe spec breaks tell fabricators where material or rating changes.",
    },
    missed: {
      text: "Pipe specification breaks must be shown on the P&ID.",
      why: "Without spec breaks, fabricators do not know which pipe class applies where.",
    },
  },
  reactor_relief_valve_with_discharge_routing: {
    supported: {
      text: "Relief valve and discharge routing are both safety-critical and must appear.",
    },
    missed: {
      text: "The reactor relief valve must include its discharge line to safe disposal.",
      why: "Showing only the valve without its discharge destination leaves the P&ID incomplete.",
    },
  },
  sample_points_on_product_and_key_streams: {
    supported: {
      text: "Sample points are physical connections that must be on the P&ID.",
    },
    missed: {
      text: "Sample points on product and key intermediate streams are required P&ID items.",
      why: "Sample points must be on the P&ID so they are fabricated and accessible to operators.",
    },
  },
  esd_connections_to_final_elements: {
    supported: {
      text: "ESD connections to final elements must be traceable on the P&ID.",
    },
    missed: {
      text: "Every ESD-operated valve must show its connection on the P&ID.",
      why: "ESD traceability from logic solver to valve is essential for hazard review and testing.",
    },
  },
  three_d_pipe_routing_on_pid: {
    revision: {
      text: "3D pipe routing belongs on isometric drawings, not the P&ID.",
      why: "Pipe routing is detailed engineering produced after the P&ID scope is set.",
    },
  },
  structural_civil_details_on_pid: {
    revision: {
      text: "Structural and civil details are on civil drawings, not the P&ID.",
      why: "Including them overloads the P&ID and misrepresents its scope.",
    },
  },
  vendor_internal_details_on_pid: {
    revision: {
      text: "Vendor internal details appear on vendor drawings, not the P&ID.",
      why: "The P&ID shows equipment as a block with external connections only.",
    },
  },
  electrical_wiring_on_pid: {
    revision: {
      text: "Electrical wiring schematics are separate loop diagram documents.",
      why: "ISA instrument symbols on the P&ID are not electrical wiring diagrams.",
    },
  },
  utility_header_full_detail_on_process_pid: {
    revision: {
      text: "Utility distribution headers are shown on separate utility P&IDs.",
      why: "Only utility connections at each process unit belong on the process P&ID.",
    },
  },
  require_fea_before_package_approval: {
    revision: {
      text: "FEA is detailed mechanical design, not a process package prerequisite.",
      why: "Holding the package for FEA delays the project — process design and mechanical design run in parallel.",
    },
  },
  approve_package_despite_open_data_gaps: {
    revision: {
      text: "Open data gaps must be documented as open items in the design package.",
      why: "Unconfirmed VLE data, waste characterisation, and summer CW validation create downstream risk if undocumented.",
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
    hazardous_area_classification_feed_a: flameIcon,
    emergency_isolation_valves_feed_a: shieldIcon,
    plant_esd_system: shieldIcon,
    fire_and_gas_detection: bellIcon,
    bunding_for_liquid_storage: waterDropIcon,
    mandate_hazop_before_detailed_design: gearIcon,
    identify_relief_scenarios_reactor_and_separation: reliefValveIcon,
    closed_safe_disposal_for_relief_and_vents: shieldIcon,
    passive_fire_protection_steelwork: shieldIcon,
    atex_zone_0_entire_plant: gearIcon,
    operator_procedures_only_for_esd: bellIcon,
    size_all_relief_valves_now: gearIcon,
    extra_controllers_as_safety_layers: gearIcon,
    skip_bunding_for_feed_b: waterDropIcon,
    assign_sil_before_hazop: gearIcon,
    inherently_safer_over_layers_of_protection: shieldIcon,
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
    list_all_heat_demands_across_plant: heatWavesIcon,
    match_lp_steam_to_reboiler_duty: heatWavesIcon,
    size_cw_against_summer_limit: waterDropIcon,
    assess_heat_recovery_effluent_to_feed: heatWavesIcon,
    flag_summer_cw_constraint_for_all_cooling: waterDropIcon,
    confirm_lp_steam_temp_adequate_for_reboiler: thermometerIcon,
    include_utility_balance_in_design_basis: gearIcon,
    account_for_heat_tracing_needs: heatWavesIcon,
    fired_heater_for_reboiler_no_justification: flameIcon,
    refrigeration_for_condensers_no_data: heatWavesIcon,
    design_coolers_on_winter_cw_only: waterDropIcon,
    skip_heat_recovery_plant_too_small: heatWavesIcon,
    size_steam_on_reactor_only: heatWavesIcon,
    mp_steam_for_all_heating: heatWavesIcon,
    design_coolers_independently_ignore_total_cw_budget: waterDropIcon,
    all_major_process_units_as_labeled_blocks: cubeIcon,
    all_main_streams_with_flow_direction: heatWavesIcon,
    utility_connections_at_each_major_unit: heatWavesIcon,
    recycle_stream_on_pfd: filterIcon,
    wastewater_and_vent_routing_on_pfd: waterNeutralizationIcon,
    numbered_streams_for_stream_table: gearIcon,
    stream_table_with_key_properties: gearIcon,
    feed_entry_and_product_exit_labeled: cubeIcon,
    heat_recovery_exchangers_on_pfd: heatWavesIcon,
    control_valve_symbols_on_pfd: gearIcon,
    pipe_sizes_on_pfd: gearIcon,
    every_drain_and_vent_on_pfd: waterDropIcon,
    relief_valve_symbols_on_pfd_vessels: reliefValveIcon,
    full_mechanical_equipment_list_on_pfd: cubeIcon,
    omit_env_and_utility_streams_for_simplicity: waterDropIcon,
    three_d_plant_layout_on_pfd: cubeIcon,
    voc_recovery_or_destruction_on_all_vents: cloudIcon,
    define_all_wastewater_streams_by_source: waterDropIcon,
    ph_neutralization_before_discharge: waterNeutralizationIcon,
    secondary_containment_all_chemical_storage: waterDropIcon,
    quantified_emission_estimates_for_permit: gearIcon,
    fugitive_emission_monitoring_program: bellIcon,
    recover_organic_vapor_before_destruction: filterIcon,
    define_disposal_route_for_solid_waste: cubeIcon,
    full_biological_ww_treatment_no_data: cubeIcon,
    open_flame_flare_for_voc_control: flameIcon,
    fugitive_emissions_negligible_no_basis: cloudIcon,
    skip_secondary_containment_for_feed_b_aqueous: waterDropIcon,
    discharge_wastewater_after_neutralization_only: waterDropIcon,
    env_compliance_as_paperwork_only: gearIcon,
    ignore_solid_waste_negligible: cubeIcon,

    // Mission 8
    all_instruments_in_isa_notation: gearIcon,
    all_control_loops_fully_shown: gearIcon,
    independent_high_high_temp_interlock_shown_separately: bellIcon,
    manual_block_valves_on_major_lines: shieldIcon,
    check_valves_on_feed_and_product_lines: shieldIcon,
    pipe_spec_breaks_on_pid: gearIcon,
    reactor_relief_valve_with_discharge_routing: reliefValveIcon,
    sample_points_on_product_and_key_streams: waterDropIcon,
    esd_connections_to_final_elements: shieldIcon,
    three_d_pipe_routing_on_pid: cubeIcon,
    structural_civil_details_on_pid: cubeIcon,
    vendor_internal_details_on_pid: gearIcon,
    electrical_wiring_on_pid: gearIcon,
    utility_header_full_detail_on_process_pid: heatWavesIcon,
    require_fea_before_package_approval: cubeIcon,
    approve_package_despite_open_data_gaps: gearIcon,
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
