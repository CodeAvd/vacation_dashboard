"use client";

import { competitors, type Competitor } from "@/lib/data";
import { Check, X, Sparkles } from "lucide-react";

export function CompetitorSection() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {competitors.map((competitor) => (
        <CompetitorCard key={competitor.name} competitor={competitor} />
      ))}
    </div>
  );
}

function CompetitorCard({ competitor }: { competitor: Competitor }) {
  return (
    <div className="transition-card flex flex-col rounded-xl border border-border-subtle bg-surface p-5 shadow-card hover:shadow-card-hover">
      <div className="mb-4">
        <h3
          className="mb-1 text-lg font-semibold text-foreground"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {competitor.name}
        </h3>
        <p className="text-sm text-foreground-muted">{competitor.marketRole}</p>
      </div>

      <div className="mb-4 space-y-3">
        <div>
          <div className="mb-2 flex items-center gap-1 text-low">
            <Check className="h-3.5 w-3.5" />
            <span className="font-mono text-[10px] uppercase tracking-wider">
              Strengths
            </span>
          </div>
          <ul className="space-y-1">
            {competitor.strengths.map((strength, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-foreground-muted"
              >
                <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-low" />
                {strength}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-2 flex items-center gap-1 text-critical">
            <X className="h-3.5 w-3.5" />
            <span className="font-mono text-[10px] uppercase tracking-wider">
              Weaknesses
            </span>
          </div>
          <ul className="space-y-1">
            {competitor.weaknesses.map((weakness, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-foreground-muted"
              >
                <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-critical" />
                {weakness}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-auto rounded-lg bg-primary/5 p-3">
        <div className="mb-1 flex items-center gap-1 text-primary">
          <Sparkles className="h-3 w-3" />
          <span className="font-mono text-[10px] uppercase tracking-wider">
            VCS Opportunity
          </span>
        </div>
        <p className="text-sm font-medium text-primary">{competitor.opportunity}</p>
      </div>
    </div>
  );
}
