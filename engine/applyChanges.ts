import { GameState, StateChange } from "@/app/types";

/** returns a *new* GameState with the changes applied */
export function applyChanges(
  state: GameState,
  changes: StateChange[]
): GameState {
  // shallow‑copy top level first
  const next: GameState = {
    ...state,
    inventory: { ...state.inventory },
    flags: { ...state.flags },
  };

  changes.forEach((change) => {
    switch (change.type) {
      case "addItem": {
        const qty = change.amount ?? 1;
        next.inventory[change.key] = (next.inventory[change.key] ?? 0) + qty;
        break;
      }
      case "removeItem": {
        const qty = change.amount ?? 1;
        const current = next.inventory[change.key] ?? 0;
        next.inventory[change.key] = Math.max(0, current - qty);
        break;
      }
      case "setFlag": {
        next.flags[change.key] = true;
        break;
      }
    }
  });

  return next;
}
