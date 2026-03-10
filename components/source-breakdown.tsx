"use client";

import { sourceBreakdown } from "@/lib/data";
import { cn } from "@/lib/utils";

const sourceColors: Record<string, { bar: string; bg: string; icon: string }> = {
  steam: {
    bar: "bg-[#1b2838]",
    bg: "bg-[#1b2838]/10",
    icon: "bg-[#1b2838] text-white",
  },
  discord: {
    bar: "bg-[#5865f2]",
    bg: "bg-[#5865f2]/10",
    icon: "bg-[#5865f2] text-white",
  },
  youtube: {
    bar: "bg-[#ff0000]",
    bg: "bg-[#ff0000]/10",
    icon: "bg-[#ff0000] text-white",
  },
  forum: {
    bar: "bg-stone",
    bg: "bg-stone/10",
    icon: "bg-stone text-surface",
  },
};

const sourceLabels: Record<string, string> = {
  steam: "Steam Reviews",
  discord: "Discord Discussions",
  youtube: "YouTube Comments",
  forum: "Forum Posts",
};

export function SourceBreakdown() {
  const entries = Object.entries(sourceBreakdown) as [
    keyof typeof sourceBreakdown,
    { count: number; percentage: number }
  ][];

  return (
    <div className="space-y-4">
      {/* Bar chart */}
      <div className="flex h-4 overflow-hidden rounded-full bg-cream">
        {entries.map(([source, data]) => (
          <div
            key={source}
            className={cn(
              "transition-all duration-500",
              sourceColors[source].bar
            )}
            style={{ width: `${data.percentage}%` }}
            title={`${sourceLabels[source]}: ${data.count} (${data.percentage}%)`}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {entries.map(([source, data]) => (
          <div
            key={source}
            className={cn(
              "flex items-center gap-3 rounded-xl p-3",
              sourceColors[source].bg
            )}
          >
            <span
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg font-mono text-xs font-bold uppercase",
                sourceColors[source].icon
              )}
            >
              {source.charAt(0)}
            </span>
            <div>
              <p className="text-sm font-medium text-foreground">
                {sourceLabels[source]}
              </p>
              <p className="font-mono text-xs text-foreground-muted">
                {data.count} signals ({data.percentage}%)
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
