import { X } from "lucide-react";
import { useGameStore } from "../../store/useGameStore";

const displayLabels: Record<string, string> = {
  reactor_temperature_control_loop: "Reactor temperature control loop",
  reactor_heat_removal_system: "Reactor heat-removal system",
  high_temperature_alarm: "High reactor temperature alarm",
  reactor_pressure_relief_valve: "Reactor pressure relief protection",
  flammable_feed_vapor_control: "Flammable feed vapor / ignition-source control",
  corrosion_resistant_feed_b_contact_parts: "Corrosion-resistant materials for Feed B",
  light_impurity_removal_step: "Light-impurity removal step",
  product_drying_or_water_removal: "Product water-removal / drying step",
  wastewater_neutralization: "Wastewater neutralization",
  voc_emission_control: "VOC emission control",
  full_plant_3d_model: "Full 3D plant model",
  finite_element_analysis_reactor_shell: "FEA on reactor vessel",
  cryogenic_distillation_column: "Cryogenic distillation",
  nuclear_grade_containment: "Nuclear-grade containment",
  food_grade_sterile_design: "Food-grade sterile design",
  maximize_reactor_temperature: "Operate near max reactor temperature",
  ignore_summer_cooling_constraint: "Ignore summer cooling limit",
};

export function SelectedDecisionTray() {
  const scenario = useGameStore((state) => state.scenario);
  const selectedIds = useGameStore((state) => state.selectedDecisionIds);
  const toggleDecision = useGameStore((state) => state.toggleDecision);

  return (
    <div className="selected-tray">
      <h4 className="selected-tray__header">
        Selected Decisions ({selectedIds.length})
      </h4>

      {selectedIds.length === 0 ? (
        <p className="selected-tray__empty">
          Select decision cards from the grid above.
        </p>
      ) : (
        <div className="selected-tray__chips">
          {selectedIds.map((id) => {
            const card = scenario.decision_cards.find((c) => c.id === id);
            const label = displayLabels[id] ?? card?.label ?? id;
            return (
              <span className="selected-tray__chip" key={id}>
                {label}
                <button
                  type="button"
                  onClick={() => toggleDecision(id)}
                  aria-label={`Remove ${label}`}
                >
                  <X size={10} strokeWidth={3} />
                </button>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
