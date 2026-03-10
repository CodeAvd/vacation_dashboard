"use client";

import { useState } from "react";
import { HeroHeader } from "@/components/hero-header";
import { GlobalFilters, ActiveFilterChips, type Filters } from "@/components/global-filters";
import { TopRisks } from "@/components/top-risks";
import { BugTriage } from "@/components/bug-triage";
import { EvidenceDrawer } from "@/components/evidence-drawer";
import { CollapsibleSection } from "@/components/collapsible-section";
import { ActionBoard } from "@/components/action-board";
import { PsychologyInsights } from "@/components/psychology-insights";
import { CompetitorSection } from "@/components/competitors";
import { RoadmapSection } from "@/components/roadmap";
import { SourceBreakdown } from "@/components/source-breakdown";
import {
  Zap,
  Brain,
  Users,
  Map,
  Database,
  CheckSquare,
  Lightbulb,
} from "lucide-react";

export default function DashboardPage() {
  const [filters, setFilters] = useState<Filters>({
    theme: "all",
    source: "all",
    severity: "all",
    status: "all",
    sort: "priority",
  });

  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <HeroHeader />

      {/* Global Filters - Sticky */}
      <GlobalFilters filters={filters} onFiltersChange={setFilters} />

      {/* Active Filter Chips */}
      <div className="mx-auto max-w-7xl">
        <ActiveFilterChips filters={filters} onFiltersChange={setFilters} />
      </div>

      {/* Main Content */}
      <main>
        {/* Top Risks - Above the fold */}
        <TopRisks />

        {/* Bug Triage Board */}
        <BugTriage />

        {/* Evidence Drawer */}
        <EvidenceDrawer />

        {/* Secondary Collapsed Sections */}
        <div className="mx-auto max-w-7xl py-8">
          <div className="overflow-hidden rounded-2xl border border-border-subtle bg-surface shadow-card">
            <CollapsibleSection
              id="actions"
              icon={<CheckSquare className="h-5 w-5" />}
              title="Action Board"
              description="Prioritized tasks with effort/impact analysis"
              count={5}
            >
              <ActionBoard />
            </CollapsibleSection>

            <CollapsibleSection
              id="psychology"
              icon={<Brain className="h-5 w-5" />}
              title="Psychology & Friction"
              description="Player behavior patterns and emotional triggers"
              count={3}
            >
              <PsychologyInsights />
            </CollapsibleSection>

            <CollapsibleSection
              id="validation"
              icon={<Lightbulb className="h-5 w-5" />}
              title="Insight Validation"
              description="Cross-referenced patterns and hypothesis testing"
              count="Coming soon"
            >
              <div className="rounded-xl border border-border-subtle bg-cream/50 p-8 text-center">
                <p className="text-sm text-foreground-muted">
                  Insight validation module is under development. This section
                  will allow you to test hypotheses against aggregated data.
                </p>
              </div>
            </CollapsibleSection>

            <CollapsibleSection
              id="competitors"
              icon={<Users className="h-5 w-5" />}
              title="Competitor Snapshot"
              description="Market positioning and opportunity analysis"
              count={3}
            >
              <CompetitorSection />
            </CollapsibleSection>

            <CollapsibleSection
              id="roadmap"
              icon={<Map className="h-5 w-5" />}
              title="Roadmap"
              description="0-3 month execution plan with dependencies"
              count={8}
            >
              <RoadmapSection />
            </CollapsibleSection>

            <CollapsibleSection
              id="sources"
              icon={<Database className="h-5 w-5" />}
              title="Source Basis"
              description="Data distribution across collection channels"
              count="676 signals"
            >
              <SourceBreakdown />
            </CollapsibleSection>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border-subtle bg-surface py-6">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="font-mono text-xs text-foreground-muted">
            Vacation Cafe Simulator - Product Feedback Dashboard v0.9.2
          </p>
          <p className="mt-1 text-xs text-foreground-muted">
            Data aggregated from Steam, Discord, YouTube, and community forums
          </p>
        </div>
      </footer>
    </div>
  );
}
