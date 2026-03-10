"use client";

import { roadmapItems, type RoadmapItem } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Circle, CheckCircle2, Clock, AlertCircle } from "lucide-react";

const phases = [
  { id: "0-1m", label: "0-1 Month", description: "Immediate priorities" },
  { id: "1-2m", label: "1-2 Months", description: "Short-term goals" },
  { id: "2-3m", label: "2-3 Months", description: "Medium-term planning" },
];

export function RoadmapSection() {
  return (
    <div className="space-y-6">
      {phases.map((phase) => {
        const phaseItems = roadmapItems.filter((item) => item.phase === phase.id);
        return (
          <div key={phase.id}>
            <div className="mb-3 flex items-center gap-3">
              <div
                className={cn(
                  "h-2 w-2 rounded-full",
                  phase.id === "0-1m"
                    ? "bg-critical"
                    : phase.id === "1-2m"
                      ? "bg-medium"
                      : "bg-low"
                )}
              />
              <div>
                <h3
                  className="font-semibold text-foreground"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {phase.label}
                </h3>
                <p className="text-xs text-foreground-muted">{phase.description}</p>
              </div>
            </div>

            <div className="ml-1 space-y-2 border-l-2 border-border-subtle pl-5">
              {phaseItems.map((item) => (
                <RoadmapCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function RoadmapCard({ item }: { item: RoadmapItem }) {
  const statusIcons: Record<RoadmapItem["status"], React.ReactNode> = {
    planned: <Circle className="h-4 w-4" />,
    "in-progress": <Clock className="h-4 w-4" />,
    blocked: <AlertCircle className="h-4 w-4" />,
  };

  const statusColors: Record<RoadmapItem["status"], string> = {
    planned: "text-foreground-muted",
    "in-progress": "text-primary",
    blocked: "text-critical",
  };

  const urgencyStyles: Record<RoadmapItem["urgency"], string> = {
    critical: "border-l-critical",
    high: "border-l-high",
    medium: "border-l-medium",
  };

  return (
    <div
      className={cn(
        "transition-card flex items-center gap-3 rounded-lg border border-border-subtle border-l-[3px] bg-surface p-3 shadow-card hover:shadow-card-hover",
        urgencyStyles[item.urgency]
      )}
    >
      <span className={cn(statusColors[item.status])}>
        {statusIcons[item.status]}
      </span>

      <div className="min-w-0 flex-1">
        <p className="font-medium text-foreground">{item.title}</p>
        {item.dependencies.length > 0 && (
          <p className="mt-0.5 text-xs text-foreground-muted">
            Depends on: {item.dependencies.join(", ")}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <span
          className={cn(
            "rounded px-2 py-0.5 font-mono text-[10px] font-medium uppercase",
            item.urgency === "critical"
              ? "bg-critical-bg text-critical"
              : item.urgency === "high"
                ? "bg-high-bg text-high"
                : "bg-medium-bg text-medium"
          )}
        >
          {item.urgency}
        </span>
        <span
          className={cn(
            "rounded-full px-2 py-0.5 font-mono text-[10px]",
            item.status === "in-progress"
              ? "bg-primary/10 text-primary"
              : item.status === "blocked"
                ? "bg-critical-bg text-critical"
                : "bg-cream text-foreground-muted"
          )}
        >
          {item.status}
        </span>
      </div>
    </div>
  );
}
