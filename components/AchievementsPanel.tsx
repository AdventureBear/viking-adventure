import React from 'react';

interface AchievementsPanelProps {
  achievements: Record<string, boolean>;
}

export function AchievementsPanel({ achievements }: AchievementsPanelProps) {
  const achievementNames = Object.keys(achievements).filter((k) => achievements[k]);

  return (
    <aside className="w-52 shrink-0 bg-[#1a1a1a]/80 backdrop-blur-sm text-amber-100/90 border-l border-amber-900/40 p-2">
      {/* Achievements */}
      <h3 className="text-sm font-bold text-amber-200 font-runic mb-1">Achievements</h3>
      {achievementNames.length === 0 ? (
        <p className="text-xs italic text-amber-400/70">— none —</p>
      ) : (
        <ul className="space-y-0.5">
          {achievementNames.map((name) => (
            <li key={name} className="text-xs bg-[#2d2d2d]/50 p-1 rounded border border-amber-900/30 text-amber-100">
              {name}
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
} 