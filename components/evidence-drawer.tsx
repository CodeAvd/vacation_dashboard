"use client";

import { useState } from "react";
import { evidenceItems, type Evidence } from "@/lib/data";
import { cn, formatDate } from "@/lib/utils";
import {
  MessageSquareQuote,
  ExternalLink,
  ChevronDown,
  Calendar,
} from "lucide-react";

export function EvidenceDrawer() {
  return (
    <section id="evidence" className="py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <MessageSquareQuote className="h-5 w-5 text-primary" />
              <h2
                className="text-2xl font-bold text-foreground md:text-3xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Evidence Drawer
              </h2>
            </div>
            <p className="text-sm text-foreground-muted">
              Raw player feedback organized by theme and severity
            </p>
          </div>
          <span className="rounded-full bg-cream px-3 py-1 font-mono text-xs font-medium text-foreground-muted">
            {evidenceItems.length} items
          </span>
        </div>

        {/* Evidence cards grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {evidenceItems.map((evidence) => (
            <EvidenceCard key={evidence.id} evidence={evidence} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EvidenceCard({ evidence }: { evidence: Evidence }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const sourceColors: Record<string, { bg: string; text: string }> = {
    steam: { bg: "bg-[#1b2838]", text: "text-white" },
    discord: { bg: "bg-[#5865f2]", text: "text-white" },
    youtube: { bg: "bg-[#ff0000]", text: "text-white" },
    forum: { bg: "bg-stone", text: "text-surface" },
  };

  const severityColors: Record<string, string> = {
    critical: "bg-critical-bg text-critical border-critical/20",
    high: "bg-high-bg text-high border-high/20",
    medium: "bg-medium-bg text-medium border-medium/20",
    low: "bg-low-bg text-low border-low/20",
  };

  const sentimentStyles = evidence.theme === "Atmosphere/Cozy" || 
    evidence.theme === "No-pressure flow" || 
    evidence.theme === "Audio/ASMR"
      ? "border-l-low"
      : "border-l-accent";

  return (
    <article
      className={cn(
        "transition-card group flex flex-col rounded-xl border border-border-subtle bg-surface shadow-card hover:shadow-card-hover",
        "border-l-[3px]",
        sentimentStyles
      )}
    >
      <div className="p-4">
        {/* Chips row */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center rounded px-2 py-0.5 font-mono text-[10px] font-medium uppercase",
              sourceColors[evidence.source]?.bg,
              sourceColors[evidence.source]?.text
            )}
          >
            {evidence.source}
          </span>
          <span
            className={cn(
              "inline-flex items-center rounded border px-2 py-0.5 font-mono text-[10px] font-medium uppercase",
              severityColors[evidence.severity]
            )}
          >
            {evidence.severity}
          </span>
          <span className="rounded-full bg-cream px-2 py-0.5 font-mono text-[10px] text-foreground-muted">
            {evidence.theme}
          </span>
        </div>

        {/* Quote */}
        <blockquote
          className={cn(
            "mb-3 text-sm leading-relaxed text-foreground",
            !isExpanded && "line-clamp-3"
          )}
        >
          "{evidence.quote}"
        </blockquote>

        {/* Expand button */}
        {evidence.quote.length > 150 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mb-3 flex items-center gap-1 text-xs font-medium text-primary hover:text-teal-light"
          >
            {isExpanded ? "Show less" : "Show more"}
            <ChevronDown
              className={cn(
                "h-3 w-3 transition-transform",
                isExpanded && "rotate-180"
              )}
            />
          </button>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border-subtle pt-3">
          <div className="flex items-center gap-1 text-xs text-foreground-muted">
            <Calendar className="h-3 w-3" />
            {formatDate(evidence.date)}
          </div>
          {evidence.url && (
            <a
              href={evidence.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-medium text-primary hover:text-teal-light"
            >
              Source
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
