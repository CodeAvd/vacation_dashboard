"use client";

import { actionItems, type ActionItem } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Zap, ArrowUp, ArrowRight, ArrowDown } from "lucide-react";

export function ActionBoard() {
  return (
    <div className="space-y-3">
      {actionItems.map((action) => (
        <ActionCard key={action.id} action={action} />
      ))}
    </div>
  );
}

function ActionCard({ action }: { action: ActionItem }) {
  const categoryColors: Record<string, string> = {
    bug: "bg-critical-bg text-critical",
    feature: "bg-primary/10 text-primary",
    ux: "bg-medium-bg text-medium",
    content: "bg-low-bg text-low",
  };

  const impactIcons: Record<string, React.ReactNode> = {
    high: <ArrowUp className="h-3 w-3" />,
    medium: <ArrowRight className="h-3 w-3" />,
    low: <ArrowDown className="h-3 w-3" />,
  };

  const impactColors: Record<string, string> = {
    high: "text-critical",
    medium: "text-medium",
    low: "text-low",
  };

  return (
    <div className="transition-card flex items-center gap-4 rounded-xl border border-border-subtle bg-surface p-4 shadow-card hover:shadow-card-hover">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cream font-mono text-sm font-semibold text-foreground-muted">
        #{action.priority}
      </span>

      <div className="min-w-0 flex-1">
        <p className="font-medium text-foreground">{action.title}</p>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "rounded px-2 py-0.5 font-mono text-[10px] font-medium uppercase",
              categoryColors[action.category]
            )}
          >
            {action.category}
          </span>
          <span className="flex items-center gap-1 font-mono text-[10px] text-foreground-muted">
            Effort: <span className="font-medium capitalize">{action.effort}</span>
          </span>
        </div>
      </div>

      <div
        className={cn(
          "flex items-center gap-1 rounded-lg bg-cream px-2 py-1",
          impactColors[action.impact]
        )}
      >
        {impactIcons[action.impact]}
        <span className="font-mono text-xs font-medium capitalize">
          {action.impact}
        </span>
      </div>
    </div>
  );
}
