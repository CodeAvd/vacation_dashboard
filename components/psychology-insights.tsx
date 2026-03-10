"use client";

import { psychologyInsights } from "@/lib/data";
import { Lightbulb, ArrowRight } from "lucide-react";

export function PsychologyInsights() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {psychologyInsights.map((insight, index) => (
        <div
          key={index}
          className="transition-card rounded-xl border border-border-subtle bg-surface p-5 shadow-card hover:shadow-card-hover"
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Lightbulb className="h-4 w-4" />
            </span>
            <h3
              className="font-semibold text-foreground"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {insight.title}
            </h3>
          </div>
          <p className="mb-4 text-sm leading-relaxed text-foreground-muted">
            {insight.description}
          </p>
          <div className="rounded-lg bg-primary/5 p-3">
            <div className="mb-1 flex items-center gap-1 text-primary">
              <ArrowRight className="h-3 w-3" />
              <span className="font-mono text-[10px] uppercase tracking-wider">
                Recommendation
              </span>
            </div>
            <p className="text-sm font-medium text-primary">
              {insight.recommendation}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
