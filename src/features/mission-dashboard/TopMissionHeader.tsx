import { Music } from "lucide-react";
import plantIcon from "../../assets/icons/plant-ops/icon-plant.svg";
import engineerIcon from "../../assets/icons/plant-ops/icon-engineer.svg";
import { useGameStore } from "../../store/useGameStore";

const STAGE_LABELS = [
  "Design Basis Review",
  "Reaction Section",
  "Separation Section",
  "Heat & Utilities",
  "Safety Review",
  "Environmental Review",
  "PFD Assembly",
  "P&ID Basics",
];

export function TopMissionHeader() {
  const scenario = useGameStore((state) => state.scenario);
  const missionNumber = scenario.mission_number ?? 1;
  const missionTitle = scenario.short_title ?? scenario.title;
  const currentStageIndex = (missionNumber - 1) % STAGE_LABELS.length;

  return (
    <header className="top-mission-header">
      <div className="header-brand">
        <img className="header-brand-icon" src={plantIcon} alt="" />
        <div className="header-brand-text">
          <h1 className="header-brand-title">Plant Ops Academy</h1>
          <p className="header-brand-subtitle">Design Basis Challenge</p>
        </div>
      </div>

      <div className="mission-hud">
        <div className="mission-hud__objective">
          <span className="mission-hud__mission-pill" data-testid="current-mission">Mission {missionNumber}</span>
          <span className="mission-hud__title">{missionTitle}</span>
        </div>

        <div className="mission-hud__progress-track">
          <ol className="mission-hud__progress" aria-label="Mission progress">
            {STAGE_LABELS.map((_label, i) => (
              <li key={i} className={i === currentStageIndex ? "is-current" : ""}>
                {i + 1}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="header-right">
        <button className="audio-button" type="button" aria-label="Music">
          <Music size={24} />
        </button>

        <div className="profile-card">
          <div className="profile-info">
            <p className="profile-role">Junior Engineer</p>
            <p className="profile-level">Level {missionNumber}</p>
          </div>
          <img className="profile-avatar" src={engineerIcon} alt="" />
        </div>
      </div>
    </header>
  );
}
