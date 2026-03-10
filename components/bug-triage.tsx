"use client";

import { bugClusters, type BugCluster } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Bug, ExternalLink } from "lucide-react";

export function BugTriage() {
  return (
    <section id="triage" className="py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <Bug className="h-5 w-5 text-primary" />
              <h2
                className="text-2xl font-bold text-foreground md:text-3xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Bug Triage Board
              </h2>
            </div>
            <p className="text-sm text-foreground-muted">
              Clustered issues with reproduction hints and priority scores
            </p>
          </div>
          <span className="rounded-full bg-cream px-3 py-1 font-mono text-xs font-medium text-foreground-muted">
            {bugClusters.length} clusters
          </span>
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-hidden rounded-xl border border-border-subtle bg-surface shadow-card md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-subtle bg-cream/50">
                <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-wider text-foreground-muted">
                  Cluster
                </th>
                <th className="px-4 py-3 text-center font-mono text-[10px] uppercase tracking-wider text-foreground-muted">
                  Severity
                </th>
                <th className="px-4 py-3 text-center font-mono text-[10px] uppercase tracking-wider text-foreground-muted">
                  Priority
                </th>
                <th className="px-4 py-3 text-center font-mono text-[10px] uppercase tracking-wider text-foreground-muted">
                  Freq
                </th>
                <th className="px-4 py-3 text-center font-mono text-[10px] uppercase tracking-wider text-foreground-muted">
                  Score
                </th>
                <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-wider text-foreground-muted">
                  Repro Hints
                </th>
                <th className="px-4 py-3 text-center font-mono text-[10px] uppercase tracking-wider text-foreground-muted">
                  Sources
                </th>
                <th className="px-4 py-3 text-center font-mono text-[10px] uppercase tracking-wider text-foreground-muted">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {bugClusters.map((bug, index) => (
                <tr
                  key={bug.id}
                  className={cn(
                    "transition-colors hover:bg-cream/30",
                    index !== bugClusters.length - 1 &&
                      "border-b border-border-subtle"
                  )}
                >
                  <td className="px-4 py-3">
                    <span className="font-medium text-foreground">
                      {bug.cluster}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <SeverityBadge severity={bug.severity} />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-cream font-mono text-xs font-semibold text-foreground">
                      #{bug.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-mono text-sm text-foreground-muted">
                      {bug.frequency}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-mono text-sm font-semibold text-foreground">
                      {bug.score.toFixed(1)}
                    </span>
                  </td>
                  <td className="max-w-xs px-4 py-3">
                    <p className="line-clamp-2 text-sm text-foreground-muted">
                      {bug.reproHints}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-1">
                      {bug.sources.map((source) => (
                        <SourceIcon key={source} source={source} />
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <StatusBadge status={bug.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="space-y-3 md:hidden">
          {bugClusters.map((bug) => (
            <BugCard key={bug.id} bug={bug} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BugCard({ bug }: { bug: BugCluster }) {
  return (
    <div className="transition-card rounded-xl border border-border-subtle bg-surface p-4 shadow-card">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-cream font-mono text-xs font-semibold text-foreground-muted">
            #{bug.priority}
          </span>
          <SeverityBadge severity={bug.severity} />
        </div>
        <StatusBadge status={bug.status} />
      </div>

      <h3 className="mb-2 font-medium text-foreground">{bug.cluster}</h3>

      <p className="mb-3 text-sm text-foreground-muted">{bug.reproHints}</p>

      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {bug.sources.map((source) => (
            <SourceIcon key={source} source={source} />
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-foreground-muted">
            Freq: {bug.frequency}
          </span>
          <span className="font-mono text-sm font-semibold text-foreground">
            {bug.score.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
}

function SeverityBadge({ severity }: { severity: BugCluster["severity"] }) {
  const styles = {
    critical: "bg-critical-bg text-critical border-critical/20",
    high: "bg-high-bg text-high border-high/20",
    medium: "bg-medium-bg text-medium border-medium/20",
    low: "bg-low-bg text-low border-low/20",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-[10px] font-medium uppercase",
        styles[severity]
      )}
    >
      {severity}
    </span>
  );
}

function StatusBadge({ status }: { status: BugCluster["status"] }) {
  const styles = {
    open: "bg-cream text-foreground-muted",
    investigating: "bg-medium-bg text-medium",
    fixing: "bg-primary/10 text-primary",
    resolved: "bg-low-bg text-low",
  };

  const labels = {
    open: "Open",
    investigating: "Investigating",
    fixing: "Fixing",
    resolved: "Resolved",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 font-mono text-[10px] font-medium",
        styles[status]
      )}
    >
      {labels[status]}
    </span>
  );
}

function SourceIcon({ source }: { source: string }) {
  const colors: Record<string, string> = {
    steam: "bg-[#1b2838] text-white",
    discord: "bg-[#5865f2] text-white",
    youtube: "bg-[#ff0000] text-white",
    forum: "bg-stone text-surface",
  };

  return (
    <span
      className={cn(
        "inline-flex h-5 w-5 items-center justify-center rounded font-mono text-[9px] font-bold uppercase",
        colors[source] || "bg-cream text-foreground-muted"
      )}
      title={source}
    >
      {source.charAt(0)}
    </span>
  );
}
