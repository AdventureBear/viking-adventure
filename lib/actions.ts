
import { Action } from "@/app/types";
// import allActions from "@/app/lib/actions";


// lib/actions.ts

export const allActions: Record<string, Action> = {
//Opening scene actions
    children_dancing: {
        id: "children_dancing",
        trigger: "onEnter",
        outcomes: [
          {
            description: "The village children dance around a maypole and sing songs.",
            stateChanges: []
          }
        ]
      },
      gain_map_from_elder: {
        id: "gain_map_from_elder",
        trigger: "onExit",
        outcomes: [
          {
            description: "The elder secretly slips you a *hand‑drawn map*.",
            stateChanges: [{ type: "addItem", key: "map", amount: 1 }],
          },
        ],
      },    

  // --- example #1: 25 % chance of a storm -----------------
  storm_at_sea: {
    id: "storm_at_sea",
    trigger: "onEnter",
    conditions: [
      { type: "random", chance: 0.25 }
    ],
    outcomes: [
      {
        description: "Stormy seas batter your hull (test stub).",
        stateChanges: []   // nothing yet; we're just logging
      }
    ]
  },

  // --- example #2: always fires onExit ---------------------
  farewell_from_elder: {
    id: "farewell_from_elder",
    trigger: "onExit",
    outcomes: [
      {
        description: "The village elder wishes you luck.",
        stateChanges: []
      }
    ]
  },

};


