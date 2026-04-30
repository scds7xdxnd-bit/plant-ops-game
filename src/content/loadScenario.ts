import { parse } from "yaml";
import type { Scenario } from "../domain/scenarioTypes";
import solvexLevelOneYaml from "./scenarios/solvex-a-level-1.yaml?raw";

export function loadSolvexLevelOne(): Scenario {
  return parse(solvexLevelOneYaml) as Scenario;
}
