/* ---------------- InventoryPanel.tsx ---------------- */
type Props = {
    inventory: Record<string, number>;
    flags: Record<string, boolean>;
  };
  
  export function InventoryPanel({ inventory, flags }: Props) {
    const items     = Object.entries(inventory);
    const flagNames = Object.keys(flags).filter((k) => flags[k]);
  
    return (
      <aside className="w-52 shrink-0 bg-[#1a1a1a]/80 backdrop-blur-sm text-amber-100/90 border-l border-amber-900/40 p-2">
        {/* Inventory */}
        <h3 className="text-sm font-bold text-amber-200 font-runic mb-1">Inventory</h3>
        {items.length === 0 ? (
          <p className="text-xs italic text-amber-400/70">— empty —</p>
        ) : (
          <ul className="space-y-0.5">
            {items.map(([k, v]) => (
              <li key={k} className="flex justify-between text-xs bg-[#2d2d2d]/50 p-1 rounded border border-amber-900/30">
                <span className="text-amber-100">{k}</span>
                <span className="font-mono text-amber-400">{v}</span>
              </li>
            ))}
          </ul>
        )}
  
        {/* Flags */}
        <h3 className="text-sm font-bold text-amber-200 font-runic mt-3 mb-1">Achievements</h3>
        {flagNames.length === 0 ? (
          <p className="text-xs italic text-amber-400/70">— none —</p>
        ) : (
          <ul className="space-y-0.5">
            {flagNames.map((k) => (
              <li key={k} className="text-xs bg-[#2d2d2d]/50 p-1 rounded border border-amber-900/30 text-amber-100">
                {k}
              </li>
            ))}
          </ul>
        )}
      </aside>
    );
  }
  