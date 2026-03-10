"use client";

import { topRisks, type TopRisk } from "@/lib/data";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  TrendingUp,
  Zap,
  Clock,
  Quote,
  ArrowRight,
  Target,
  DollarSign,
} from "lucide-react";

export function TopRisks() {
  return (
    <section id="risks" className="py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-accent" />
              <h2
                className="text-2xl font-bold text-foreground md:text-3xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Top Risks
              </h2>
            </div>
            <p className="text-sm text-foreground-muted">
              Highest-priority issues requiring immediate attention
            </p>
          </div>
          <span className="rounded-full bg-critical-bg px-3 py-1 font-mono text-xs font-medium text-critical">
            {topRisks.length} Critical
          </span>
        </div>

        {/* Risk cards grid */}
        <div className="grid gap-4 lg:grid-cols-3">
          {topRisks.map((risk, index) => (
            <RiskCard key={risk.id} risk={risk} rank={index + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RiskCard({ risk, rank }: { risk: TopRisk; rank: number }) {
  const scoreColor =
    risk.score >= 4.5
      ? "bg-critical text-critical-foreground"
      : risk.score >= 4
        ? "bg-high text-high-foreground"
        : "bg-medium text-medium-foreground";

  return (
    <article className="transition-card group flex flex-col rounded-2xl border border-border-subtle bg-surface p-5 shadow-card hover:border-stone hover:shadow-card-hover">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cream font-mono text-sm font-semibold text-foreground-muted">
            #{rank}
          </span>
          <span
            className={cn(
              "rounded-lg px-2.5 py-1 font-mono text-sm font-bold",
              "bg-critical text-white"
            )}
          >
            {risk.score.toFixed(2)}
          </span>
        </div>
        <div className="rounded-full bg-cream px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-foreground-muted">
          {risk.theme}
        </div>
      </div>

      {/* Title */}
      <h3
        className="mb-3 text-lg font-semibold leading-tight text-foreground"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {risk.title}
      </h3>

      {/* Metrics row */}
      <div className="mb-4 flex gap-3">
        <MetricBadge
          icon={<TrendingUp className="h-3 w-3" />}
          label="Freq"
          value={risk.metrics.frequency}
        />
        <MetricBadge
          icon={<Zap className="h-3 w-3" />}
          label="Sev"
          value={risk.metrics.severity}
        />
        <MetricBadge
          icon={<Clock className="h-3 w-3" />}
          label="Rec"
          value={risk.metrics.recency}
        />
      </div>

      {/* Evidence preview */}
      <div className="mb-4 rounded-xl bg-cream/50 p-3">
        <div className="mb-1 flex items-center gap-1.5 text-foreground-muted">
          <Quote className="h-3 w-3" />
          <span className="font-mono text-[10px] uppercase tracking-wider">
            Evidence
          </span>
        </div>
        <p className="line-clamp-2 text-sm italic text-foreground-muted">
          {risk.evidencePreview}
        </p>
      </div>

      {/* Context */}
      <div className="mb-4">
        <p className="text-sm leading-relaxed text-foreground-muted">
          {risk.context}
        </p>
      </div>

      {/* Expandable details */}
      <div className="mt-auto space-y-3 border-t border-border-subtle pt-4">
        <DetailRow
          icon={<Target className="h-3.5 w-3.5 text-accent" />}
          label="Why it matters"
          text={risk.whyItMatters}
        />
        <DetailRow
          icon={<DollarSign className="h-3.5 w-3.5 text-critical" />}
          label="Business impact"
          text={risk.businessImpact}
        />
        <DetailRow
          icon={<ArrowRight className="h-3.5 w-3.5 text-primary" />}
          label="Recommended action"
          text={risk.recommendedAction}
          highlight
        />
      </div>
    </article>
  );
}

function MetricBadge({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center gap-1.5 rounded-lg bg-cream px-2 py-1">
      {icon}
      <span className="font-mono text-[10px] text-foreground-muted">
        {label}
      </span>
      <span className="font-mono text-xs font-semibold text-foreground">
        {value}
      </span>
    </div>
  );
}

function DetailRow({
  icon,
  label,
  text,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  text: string;
  highlight?: boolean;
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-1.5">
        {icon}
        <span className="font-mono text-[10px] uppercase tracking-wider text-foreground-muted">
          {label}
        </span>
      </div>
      <p
        className={cn(
          "text-sm leading-relaxed",
          highlight
            ? "font-medium text-primary"
            : "text-foreground-muted"
        )}
      >
        {text}
      </p>
    </div>
  );
}
