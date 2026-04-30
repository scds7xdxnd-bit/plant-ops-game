import { useGameStore } from "../../store/useGameStore";
import pfdBlocksUrl from "../../assets/icons/plant-ops/icon-pfd-blocks.svg";

const STAGES = [
  "Design Basis Review",
  "Reaction Section",
  "Separation Section",
  "Heat & Utilities",
  "Safety Review",
  "Environmental Review",
  "PFD Assembly",
  "P&ID Basics",
];

export function LevelSidebar() {
  const campaign = useGameStore((state) => state.campaign);
  const currentMissionId = useGameStore((state) => state.currentMissionId);
  const missions = campaign.missions;

  return (
    <aside className="dashboard-panel level-sidebar">
      <header className="level-sidebar__header">LEVEL MAP</header>

      <ol className="level-map">
        {STAGES.map((label, i) => {
          const mission = missions[i];
          const isCurrent = mission?.id === currentMissionId;
          const isCompleted = mission?.status === "completed";
          const status = isCurrent
            ? "Current"
            : isCompleted
              ? "Completed"
              : "Locked";
          const className = isCurrent
            ? "is-current"
            : isCompleted
              ? "is-completed"
              : "is-locked";

          return (
            <li key={i} className={`level-map__item ${className}`}>
              <div className="level-map__badge">{i + 1}</div>
              <div className="level-map__card">
                <div className="level-map__title">
                  {mission?.short_title ?? label}
                </div>
                <div className="level-map__status">{status}</div>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="next-unlock-card">
        <div className="next-unlock-card__copy">
          <div className="next-unlock-card__label">Next Unlock</div>
          <div className="next-unlock-card__title">Basic PFD Blocks</div>
        </div>
        <img
          className="next-unlock-card__icon"
          src={pfdBlocksUrl}
          alt=""
          role="presentation"
        />
      </div>
    </aside>
  );
}
