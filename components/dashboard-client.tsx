'use client';

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { Brain, CheckSquare, Database, Lightbulb, Map, Rocket, Users } from 'lucide-react';
import { dashboardData, DEFAULT_UI_STATE, type DashboardUIState } from '@/lib/data';
import { t } from '@/lib/i18n';
import {
  getAllSources,
  getAllThemes,
  persistState,
  selectActions,
  selectBugClusters,
  selectEvidence,
  selectImprovements,
  selectInsights,
  selectTopRisks,
} from '@/lib/selectors';
import { HeroHeader } from '@/components/hero-header';
import { ActiveFilterChips, GlobalFilters } from '@/components/global-filters';
import { TopRisks } from '@/components/top-risks';
import { BugTriage } from '@/components/bug-triage';
import { EvidenceDrawer } from '@/components/evidence-drawer';
import { CollapsibleSection } from '@/components/collapsible-section';
import { ActionBoard } from '@/components/action-board';
import { PsychologyInsights } from '@/components/psychology-insights';
import { ImprovementGroups } from '@/components/improvement-groups';
import { InsightValidation } from '@/components/insight-validation';
import { CompetitorSection } from '@/components/competitors';
import { RoadmapSection } from '@/components/roadmap';
import { SourceBreakdown } from '@/components/source-breakdown';

export function DashboardClient() {
  const persistedSnapshot = useSyncExternalStore(
    subscribeDashboardState,
    getDashboardStateSnapshot,
    () => DEFAULT_DASHBOARD_SNAPSHOT,
  );
  const persistedState = useMemo(() => parseDashboardStateSnapshot(persistedSnapshot), [persistedSnapshot]);
  const [overrides, setOverrides] = useState<DashboardUIState | null>(null);
  const hasMountedRef = useRef(false);
  const uiState = overrides ?? persistedState;

  useEffect(() => {
    document.documentElement.lang = uiState.locale;
    document.title = t(uiState.locale, 'page_title');
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    persistState(uiState);
  }, [uiState]);

  const themes = useMemo(() => getAllThemes(dashboardData), []);
  const sources = useMemo(() => getAllSources(dashboardData), []);
  const topRisks = useMemo(() => selectTopRisks(uiState, dashboardData), [uiState]);
  const bugClusters = useMemo(() => selectBugClusters(uiState, dashboardData), [uiState]);
  const evidence = useMemo(() => selectEvidence(uiState, dashboardData), [uiState]);
  const actions = useMemo(() => selectActions(uiState, dashboardData), [uiState]);
  const improvements = useMemo(() => selectImprovements(uiState, dashboardData), [uiState]);
  const insights = useMemo(() => selectInsights(uiState, dashboardData), [uiState]);
  const locale = uiState.locale;

  const setLocale = (locale: DashboardUIState['locale']) => {
    setOverrides((current) => ({ ...(current ?? persistedState), locale }));
  };

  const setFilters = (patch: Partial<DashboardUIState>) => {
    setOverrides((current) => ({ ...(current ?? persistedState), ...patch }));
  };

  const resetFilters = () => {
    setOverrides((current) => ({
      ...(current ?? persistedState),
      theme: 'all',
      source: 'all',
      severity: 'all',
      category: 'all',
      status: 'all',
      sort: 'desc',
    }));
  };

  const toggleSection = (section: keyof DashboardUIState['expandedSections']) => {
    setOverrides((current) => {
      const base = current ?? persistedState;
      return {
        ...base,
        expandedSections: {
          ...base.expandedSections,
          [section]: !base.expandedSections[section],
        },
      };
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroHeader
        locale={locale}
        data={dashboardData}
        onLocaleChange={setLocale}
      />

      <GlobalFilters
        locale={locale}
        uiState={uiState}
        themes={themes}
        sources={sources}
        onChange={setFilters}
        onReset={resetFilters}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ActiveFilterChips locale={locale} uiState={uiState} onChange={setFilters} onReset={resetFilters} />
      </div>

      <main id="main" className="pb-16">
        <TopRisks locale={locale} risks={topRisks} signals={dashboardData.feedback_signals} />
        <BugTriage locale={locale} rows={bugClusters} />
        <EvidenceDrawer locale={locale} rows={evidence} />

        <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] border border-border-subtle bg-surface shadow-card">
            <CollapsibleSection
              id="actions"
              locale={locale}
              title={t(locale, 'actions_title')}
              description={t(locale, 'actions_desc')}
              summary={t(locale, 'actions_intro')}
              count={actions.length}
              open={uiState.expandedSections.actions}
              onToggle={() => toggleSection('actions')}
              icon={<CheckSquare className="h-5 w-5" />}
            >
              <ActionBoard locale={locale} rows={actions} />
            </CollapsibleSection>

            <CollapsibleSection
              id="psychology"
              locale={locale}
              title={t(locale, 'psychology_title')}
              description={t(locale, 'psychology_desc')}
              summary={t(locale, 'psychology_intro')}
              count={`${dashboardData.psychology.personas.length}/${dashboardData.psychology.friction.length}/${dashboardData.psychology.dopamine.length}`}
              open={uiState.expandedSections.psychology}
              onToggle={() => toggleSection('psychology')}
              icon={<Brain className="h-5 w-5" />}
            >
              <PsychologyInsights locale={locale} data={dashboardData.psychology} />
            </CollapsibleSection>

            <CollapsibleSection
              id="improvements"
              locale={locale}
              title={t(locale, 'improvements_title')}
              description={t(locale, 'improvements_desc')}
              summary={t(locale, 'improvements_intro')}
              count={improvements.length}
              open={uiState.expandedSections.improvements}
              onToggle={() => toggleSection('improvements')}
              icon={<Rocket className="h-5 w-5" />}
            >
              <ImprovementGroups locale={locale} rows={improvements} />
            </CollapsibleSection>

            <CollapsibleSection
              id="insights"
              locale={locale}
              title={t(locale, 'insights_title')}
              description={t(locale, 'insights_desc')}
              summary={t(locale, 'insights_intro')}
              count={insights.length}
              open={uiState.expandedSections.insights}
              onToggle={() => toggleSection('insights')}
              icon={<Lightbulb className="h-5 w-5" />}
            >
              <InsightValidation locale={locale} rows={insights} />
            </CollapsibleSection>

            <CollapsibleSection
              id="competitors"
              locale={locale}
              title={t(locale, 'competitors_title')}
              description={t(locale, 'competitors_desc')}
              summary={t(locale, 'competitors_intro')}
              count={dashboardData.competitor_snapshot.length}
              open={uiState.expandedSections.competitors}
              onToggle={() => toggleSection('competitors')}
              icon={<Users className="h-5 w-5" />}
            >
              <CompetitorSection locale={locale} rows={dashboardData.competitor_snapshot} />
            </CollapsibleSection>

            <CollapsibleSection
              id="roadmap"
              locale={locale}
              title={t(locale, 'roadmap_title')}
              description={t(locale, 'roadmap_desc')}
              summary={t(locale, 'roadmap_intro')}
              count={dashboardData.roadmap.length}
              open={uiState.expandedSections.roadmap}
              onToggle={() => toggleSection('roadmap')}
              icon={<Map className="h-5 w-5" />}
            >
              <RoadmapSection locale={locale} rows={dashboardData.roadmap} />
            </CollapsibleSection>

            <CollapsibleSection
              id="sources"
              locale={locale}
              title={t(locale, 'sources_title')}
              description={t(locale, 'sources_desc')}
              summary={t(locale, 'sources_intro')}
              count={dashboardData.source_snapshot.url_checks.length + dashboardData.source_snapshot.compiled_artifacts.length + dashboardData.source_snapshot.update_notes.length}
              open={uiState.expandedSections.sources}
              onToggle={() => toggleSection('sources')}
              icon={<Database className="h-5 w-5" />}
            >
              <SourceBreakdown locale={locale} snapshot={dashboardData.source_snapshot} signals={dashboardData.feedback_signals} />
            </CollapsibleSection>
          </div>
        </div>
      </main>
    </div>
  );
}

function subscribeDashboardState(onStoreChange: () => void) {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const handler = (event: StorageEvent) => {
    if (!event.key || event.key === 'vcs_locale' || event.key === 'vcs_filters') {
      onStoreChange();
    }
  };

  window.addEventListener('storage', handler);
  return () => window.removeEventListener('storage', handler);
}

const DEFAULT_DASHBOARD_SNAPSHOT = JSON.stringify({
  locale: 'ru',
  filters: null,
});

function getDashboardStateSnapshot() {
  if (typeof window === 'undefined') {
    return DEFAULT_DASHBOARD_SNAPSHOT;
  }

  return JSON.stringify({
    locale: window.localStorage.getItem('vcs_locale'),
    filters: window.localStorage.getItem('vcs_filters'),
  });
}

function parseDashboardStateSnapshot(snapshot: string): DashboardUIState {
  try {
    const parsed = JSON.parse(snapshot) as { locale?: string | null; filters?: string | null };
    const filters = parsed.filters ? (JSON.parse(parsed.filters) as Partial<DashboardUIState>) : {};

    return {
      ...DEFAULT_UI_STATE,
      ...filters,
      locale: parsed.locale === 'en' ? 'en' : 'ru',
      expandedSections: {
        ...DEFAULT_UI_STATE.expandedSections,
        ...(filters.expandedSections || {}),
      },
      sort: filters.sort === 'asc' ? 'asc' : 'desc',
    };
  } catch {
    return DEFAULT_UI_STATE;
  }
}
