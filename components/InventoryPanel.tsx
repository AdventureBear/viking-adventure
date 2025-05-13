/* ---------------- InventoryPanel.tsx ---------------- */
type Props = {
    inventory: Record<string, number>;
    flags: Record<string, boolean>;
  };
  
  export function InventoryPanel({ inventory, flags }: Props) {
    const items     = Object.entries(inventory);
    const flagNames = Object.keys(flags).filter((k) => flags[k]);
  
    return (
      <aside className="w-52 shrink-0 bg-[#111] text-amber-100/90 border-l border-amber-900/40 p-2">
        {/* Inventory */}
        <h3 className="text-sm font-bold mb-1">Inventory</h3>
        {items.length === 0 ? (
          <p className="text-xs italic text-amber-400/70">— empty —</p>
        ) : (
          <ul className="space-y-0.5">
            {items.map(([k, v]) => (
              <li key={k} className="flex justify-between text-xs">
                <span>{k}</span>
                <span className="font-mono">{v}</span>
              </li>
            ))}
          </ul>
        )}
  
        {/* Flags */}
        <h3 className="text-sm font-bold mt-3 mb-1">Flags</h3>
        {flagNames.length === 0 ? (
          <p className="text-xs italic text-amber-400/70">— none —</p>
        ) : (
          <ul className="space-y-0.5">
            {flagNames.map((k) => (
              <li key={k} className="text-xs">{k}</li>
            ))}
          </ul>
        )}
      </aside>
    );
  }
  