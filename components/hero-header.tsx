"use client";

import { useState } from "react";
import { dashboardMeta } from "@/lib/data";
import { formatNumber } from "@/lib/utils";
import {
  Database,
  Signal,
  Sparkles,
  Calculator,
  ChevronDown,
} from "lucide-react";

const sections = [
  { id: "risks", label: "Top Risks" },
  { id: "triage", label: "Bug Triage" },
  { id: "evidence", label: "Evidence" },
  { id: "actions", label: "Actions" },
  { id: "psychology", label: "Psychology" },
  { id: "competitors", label: "Competitors" },
  { id: "roadmap", label: "Roadmap" },
];

export function HeroHeader() {
  const [locale, setLocale] = useState<"en" | "ru">("en");

  const labels = {
    en: {
      title: "Product Feedback Dashboard",
      subtitle:
        "Aggregated insights from Steam, Discord, YouTube reviews, and community discussions",
      dataActuality: "Data Actuality",
      rawSignals: "Raw Signals",
      uniqueSignals: "Unique Signals",
      scoringMethod: "Scoring Method",
    },
    ru: {
      title: "Панель Обратной Связи",
      subtitle:
        "Агрегированные данные из Steam, Discord, YouTube обзоров и сообщества",
      dataActuality: "Актуальность",
      rawSignals: "Сигналов",
      uniqueSignals: "Уникальных",
      scoringMethod: "Метод Оценки",
    },
  };

  const t = labels[locale];

  return (
    <header className="relative pb-6 pt-8 md:pt-12">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-cream via-parchment to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top bar with locale switch */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-wider text-muted">
              VCS
            </span>
            <span className="text-stone">/</span>
            <span className="font-mono text-xs text-muted">v0.9.2</span>
          </div>

          {/* Locale switch */}
          <div className="flex items-center rounded-lg border border-border-subtle bg-surface p-0.5 shadow-sm">
            <button
              onClick={() => setLocale("en")}
              className={`rounded-md px-3 py-1.5 font-mono text-xs font-medium transition-all ${
                locale === "en"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted hover:text-foreground"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLocale("ru")}
              className={`rounded-md px-3 py-1.5 font-mono text-xs font-medium transition-all ${
                locale === "ru"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted hover:text-foreground"
              }`}
            >
              RU
            </button>
          </div>
        </div>

        {/* Main title */}
        <div className="mb-8">
          <h1
            className="mb-3 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Vacation Cafe Simulator
          </h1>
          <p
            className="mb-2 text-xl font-medium text-primary md:text-2xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t.title}
          </p>
          <p className="max-w-2xl text-pretty text-foreground-muted">
            {t.subtitle}
          </p>
        </div>

        {/* Meta cards */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <MetaCard
            icon={<Database className="h-4 w-4" />}
            label={t.dataActuality}
            value={dashboardMeta.dataActuality}
          />
          <MetaCard
            icon={<Signal className="h-4 w-4" />}
            label={t.rawSignals}
            value={formatNumber(dashboardMeta.rawSignals)}
          />
          <MetaCard
            icon={<Sparkles className="h-4 w-4" />}
            label={t.uniqueSignals}
            value={formatNumber(dashboardMeta.uniqueSignals)}
          />
          <MetaCard
            icon={<Calculator className="h-4 w-4" />}
            label={t.scoringMethod}
            value="FxSxR"
            tooltip={dashboardMeta.scoringMethod}
          />
        </div>

        {/* Section navigation */}
        <nav className="flex flex-wrap gap-2">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="inline-flex items-center gap-1 rounded-lg border border-border-subtle bg-surface px-3 py-1.5 text-sm font-medium text-foreground-muted transition-all hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              {section.label}
              <ChevronDown className="h-3 w-3" />
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function MetaCard({
  icon,
  label,
  value,
  tooltip,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tooltip?: string;
}) {
  return (
    <div
      className="transition-card group relative rounded-xl border border-border-subtle bg-surface p-3 shadow-card hover:shadow-card-hover"
      title={tooltip}
    >
      <div className="mb-1 flex items-center gap-1.5 text-foreground-muted">
        {icon}
        <span className="font-mono text-[10px] uppercase tracking-wider">
          {label}
        </span>
      </div>
      <div className="font-mono text-sm font-medium text-foreground">
        {value}
      </div>
      {tooltip && (
        <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-espresso px-3 py-2 text-xs text-parchment opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
          {tooltip}
          <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-espresso" />
        </div>
      )}
    </div>
  );
}
