// actionRunner.ts
import { Trigger, Action, GameState } from "@/app/types";
import { allActions } from "@/lib/actions";
import { passesConditions } from "./passesConditions";
import { useGameStore } from "@/store/gameStore";
import { applyChanges } from "./applyChanges";
import { ModalChoice, useModalStore } from "@/store/modalStore";

export function runActions(
  ids: string[],
  trigger: Trigger,
  stateSnapshot: GameState,
) {
  ids.forEach((id) => {
    const action: Action | undefined = allActions[id];
      /* ---------- missing id ---------- */
    if (!action) {
        console.log("⛔ unknown action id – skipped\n");
        return;
      }
  
    console.log(`\nChecking ${id} with ${trigger} trigger`)
    
  
  
    /* ---------- trigger mismatch ---------- */
    if (action.trigger !== trigger) {
      console.log(`\n↪︎ skipped:  ${trigger} does not match ${action.trigger}\n`);
      return;
    }

    /* ---------- conditions ---------- */
    const { passed, reports } = passesConditions(
      action.conditions,
      stateSnapshot
    );

    reports.forEach((report, idx) =>
      console.log(`${action.id} ${action.conditions?.[idx].type ?? "no conditions"} cond[${idx}] → ${report.pass ? "PASS" : "FAIL"} • ${report.msg}`)
    );

    /* ---------- final verdict ---------- */
    if (!passed) {
      console.log(`✖ RESULT: conditions failed – ${action.id} NOT run\n`);
      return;
    }

    console.log(`✔ RESULT: conditions passed – ${action.id} WILL run\n`);



    /* ---- Step 4 logic (stateChanges) will go here ---- */
    const outcome = action.outcomes[0];     // step‑4: use first outcome only
    
    if (outcome) {
      // Queue the modal update for the next tick
      setTimeout(() => {
        const md = {
          id: `${id}/0`,
          description: outcome.description ?? '',
          choices: outcome.choices as ModalChoice[],   // optional
        };
        
        useModalStore.getState().push(md);

        // Apply state changes immediately if there are no choices
        if (!outcome.choices?.length && outcome.stateChanges?.length) {
          const prev = useGameStore.getState().gameState;
          const next = applyChanges(prev, outcome.stateChanges);
          useGameStore.getState().setGameState(next);
          console.log("📦 stateChanges applied:", outcome.stateChanges);
        }
      }, 0);
    } 
  });
}

// New function to handle choice selection
export function handleModalChoice(choice: ModalChoice) {
  if (choice.nextAction) {
    // Run the follow-up action
    runActions([choice.nextAction], 'onChoice', useGameStore.getState().gameState);
  }
  // Remove the current modal
  useModalStore.getState().pop();
}