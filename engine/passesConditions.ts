
import { Condition } from "@/app/types";
import { GameState } from "@/app/types";

export interface ConditionReport {
    pass: boolean;      // did THIS condition pass?
    msg: string;        // human‑readable log line
  }
  
  export interface ConditionsResult {
    passed: boolean;          // all conditions passed?
    reports: ConditionReport[]; // one entry per condition
  }
  
  export function passesConditions(
    conds: Condition[] | undefined,
    _state: GameState
  ): ConditionsResult {
    if (!conds || conds.length === 0)
      return { passed: true, reports: [{ pass: true, msg: "always passes" }] };
  
    const reports = conds.map<ConditionReport>((c) => {
      switch (c.type) {
        case "random": {
          const chance = c.chance ?? 1;
          const roll   = Math.random();
          const pass   = roll < chance;
          return {
            pass,
            msg: `🎲 random • roll=${roll.toFixed(2)}  chance=${chance}  → ${
              pass ? "PASS" : "FAIL"
            }`,
          };
        }
  
        default:
          return {
            pass: true,
            msg: `ℹ︎ unsupported type '${c.type}' → PASS`,
          };
      }
    });
  
    const passed = reports.every((r) => r.pass);
    return { passed, reports };
  }