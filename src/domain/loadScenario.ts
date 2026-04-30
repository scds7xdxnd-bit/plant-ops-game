import { parse } from "yaml";
import solvexLevelOneYaml from "../data/solvex-a-level-1.yaml?raw";
import type { Scenario } from "./scenarioTypes";

export function loadSolvexLevelOne(): Scenario {
  return parse(solvexLevelOneYaml) as Scenario;
}
