'use client';

import dynamic from 'next/dynamic';
import { startTransition, useDeferredValue, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { Brain, CheckSquare, Database, Lightbulb, Map, MessageSquareQuote, Rocket, Users } from 'lucide-react';
import type { DashboardBootstrap, DashboardData, DashboardUIState } from '@/lib/data';
import { DEFAULT_UI_STATE } from '@/lib/data';
import { loadDashboardData } from '@/lib/dashboard-data-loader';
import { getSectionManifest, type DashboardSectionId } from '@/lib/dashboard-sections';
import { t } from '@/lib/i18n';
import {
  persistState,
  selectActions,
  selectBugClusters,
  selectEvidence,
  selectImprovements,
  selectInsights,
  selectTopRisks,
} from '@/lib/selectors';
import { BugTriage } from '@/components/bug-triage';
import { CollapsibleSection } from '@/components/collapsible-section';
import { DecisionRail } from '@/components/decision-rail';
import { ActiveFilterChips, GlobalFilters } from '@/components/global-filters';
import { HeroHeader } from '@/components/hero-header';
import { SectionSkeleton, SectionState } from '@/components/section-state';
import { TopRisks } from '@/components/top-risks';

const EvidenceDrawer = dynamic(() => import('@/components/evidence-drawer').then((module) => module.EvidenceDrawer), {
  loading: () => <SectionSkeleton />,
});
const ActionBoard = dynamic(() => import('@/components/action-board').then((module) => module.ActionBoard), {
  loading: () => <SectionSkeleton />,
});
const PsychologyInsights = dynamic(() => import('@/components/psychology-insights').then((module) => module.PsychologyInsights), {
  loading: () => <SectionSkeleton />,
});
const ImprovementGroups = dynamic(() => import('@/components/improvement-groups').then((module) => module.ImprovementGroups), {
  loading: () => <SectionSkeleton />,
});
const InsightValidation = dynamic(() => import('@/components/insight-validation').then((module) => module.InsightValidation), {
  loading: () => <SectionSkeleton />,
});
const CompetitorSection = dynamic(() => import('@/components/competitors').then((module) => module.CompetitorSection), {
  loading: () => <SectionSkeleton />,
});
const RoadmapSection = dynamic(() => import('@/components/roadmap').then((module) => module.RoadmapSection), {
  loading: () => <SectionSkeleton />,
});
const SourceBreakdown = dynamic(() => import('@/components/source-breakdown').then((module) => module.SourceBreakdown), {
  loading: () => <SectionSkeleton />,
});

interface DashboardClientProps {
  bootstrap: DashboardBootstrap;
}

export function DashboardClient({ bootstrap }: DashboardClientProps) {
  const persistedSnapshot = useSyncExternalStore(
    subscribeDashboardState,
    getDashboardStateSnapshot,
    () => DEFAULT_DASHBOARD_SNAPSHOT,
  );
  const persistedState = useMemo(() => parseDashboardStateSnapshot(persistedSnapshot), [persistedSnapshot]);
  const [overrides, setOverrides] = useState<DashboardUIState | null>(null);
  const [fullData, setFullData] = useState<DashboardData | null>(null);
  const [dataStatus, setDataStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const hasMountedRef = useRef(false);
  const uiState = overrides ?? persistedState;
  const deferredUiState = useDeferredValue(uiState);
  const locale = uiState.locale;
  const fullDataReady = dataStatus === 'ready' && fullData !== null;
  const sectionState = dataStatus === 'error' ? 'error' : 'loading';

  useEffect(() => {
    let cancelled = false;

    loadDashboardData()
      .then((nextData) => {
        if (cancelled) return;
        startTransition(() => {
          setFullData(nextData);
          setDataStatus('ready');
        });
      })
      .catch(() => {
        if (!cancelled) {
          setDataStatus('error');
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = uiState.locale;
    document.title = t(uiState.locale, 'page_title');
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    persistState(uiState);
  }, [uiState]);

  const topRisks = useMemo(
    () => (fullDataReady ? selectTopRisks(deferredUiState, fullData) : bootstrap.initialTopRisks),
    [bootstrap.initialTopRisks, deferredUiState, fullData, fullDataReady],
  );
  const bugClusters = useMemo(
    () => (fullDataReady ? selectBugClusters(deferredUiState, fullData) : bootstrap.initialBugClusters),
    [bootstrap.initialBugClusters, deferredUiState, fullData, fullDataReady],
  );
  const evidence = useMemo(
    () => (fullDataReady ? selectEvidence(deferredUiState, fullData) : []),
    [deferredUiState, fullData, fullDataReady],
  );
  const actions = useMemo(
    () => (fullDataReady ? selectActions(deferredUiState, fullData) : []),
    [deferredUiState, fullData, fullDataReady],
  );
  const improvements = useMemo(
    () => (fullDataReady ? selectImprovements(deferredUiState, fullData) : []),
    [deferredUiState, fullData, fullDataReady],
  );
  const insights = useMemo(
    () => (fullDataReady ? selectInsights(deferredUiState, fullData) : []),
    [deferredUiState, fullData, fullDataReady],
  );

  const sectionCounts = useMemo(
    () =>
      fullDataReady
        ? {
          evidence: evidence.length,
          actions: actions.length,
          improvements: improvements.length,
          insights: insights.length,
          psychology: `${fullData.psychology.personas.length}/${fullData.psychology.friction.length}/${fullData.psychology.dopamine.length}`,
          competitors: fullData.competitor_snapshot.length,
          roadmap: fullData.roadmap.length,
          sources:
            fullData.source_snapshot.url_checks.length +
            fullData.source_snapshot.compiled_artifacts.length +
            fullData.source_snapshot.update_notes.length,
        }
        : bootstrap.sectionCounts,
    [actions.length, bootstrap.sectionCounts, evidence.length, fullData, fullDataReady, improvements.length, insights.length],
  );

  const setLocale = (nextLocale: DashboardUIState['locale']) => {
    setOverrides((current) => ({ ...(current ?? persistedState), locale: nextLocale }));
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

  const toggleSection = (section: DashboardSectionId) => {
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

  const activeFilterCount = countActiveFilters(uiState);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroHeader locale={locale} meta={bootstrap.meta} leadRisk={topRisks[0]} onLocaleChange={setLocale} />
      <DecisionRail locale={locale} />

      <GlobalFilters
        locale={locale}
        uiState={uiState}
        themes={bootstrap.themes}
        sources={bootstrap.sources}
        activeCount={activeFilterCount}
        isOpen={uiState.expandedSections.filters}
        dataReady={fullDataReady}
        onChange={setFilters}
        onToggleOpen={() => toggleSection('filters')}
        onReset={resetFilters}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ActiveFilterChips locale={locale} uiState={uiState} onChange={setFilters} onReset={resetFilters} />
      </div>

      <main id="main" className="pb-16">
        <TopRisks locale={locale} risks={topRisks} />
        <BugTriage locale={locale} rows={bugClusters} />

        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] border border-border-subtle bg-surface shadow-card [content-visibility:auto] [contain-intrinsic-size:auto_560px]">
            <CollapsibleSection
              id="evidence"
              locale={locale}
              title={t(locale, 'evidence_title')}
              description={t(locale, 'evidence_desc')}
              summary={t(locale, 'evidence_intro')}
              count={sectionCounts.evidence}
              open={uiState.expandedSections.evidence}
              onToggle={() => toggleSection('evidence')}
              icon={<MessageSquareQuote className="h-5 w-5" />}
              lazyMount={getSectionManifest('evidence').lazy === 'on-demand'}
              motionDelayMs={getSectionManifest('evidence').motionDelayMs}
            >
              {fullDataReady ? <EvidenceDrawer locale={locale} rows={evidence} /> : <SectionState locale={locale} status={sectionState} />}
            </CollapsibleSection>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] border border-border-subtle bg-surface shadow-card [content-visibility:auto] [contain-intrinsic-size:auto_1000px]">
            <CollapsibleSection
              id="actions"
              locale={locale}
              title={t(locale, 'actions_title')}
              description={t(locale, 'actions_desc')}
              summary={t(locale, 'actions_intro')}
              count={sectionCounts.actions}
              open={uiState.expandedSections.actions}
              onToggle={() => toggleSection('actions')}
              icon={<CheckSquare className="h-5 w-5" />}
              lazyMount={getSectionManifest('actions').lazy === 'on-demand'}
              motionDelayMs={getSectionManifest('actions').motionDelayMs}
            >
              {fullDataReady ? <ActionBoard locale={locale} rows={actions} /> : <SectionState locale={locale} status={sectionState} />}
            </CollapsibleSection>

            <CollapsibleSection
              id="psychology"
              locale={locale}
              title={t(locale, 'psychology_title')}
              description={t(locale, 'psychology_desc')}
              summary={t(locale, 'psychology_intro')}
              count={sectionCounts.psychology}
              open={uiState.expandedSections.psychology}
              onToggle={() => toggleSection('psychology')}
              icon={<Brain className="h-5 w-5" />}
              lazyMount={getSectionManifest('psychology').lazy === 'on-demand'}
              motionDelayMs={getSectionManifest('psychology').motionDelayMs}
            >
              {fullDataReady ? <PsychologyInsights locale={locale} data={fullData.psychology} /> : <SectionState locale={locale} status={sectionState} />}
            </CollapsibleSection>

            <CollapsibleSection
              id="improvements"
              locale={locale}
              title={t(locale, 'improvements_title')}
              description={t(locale, 'improvements_desc')}
              summary={t(locale, 'improvements_intro')}
              count={sectionCounts.improvements}
              open={uiState.expandedSections.improvements}
              onToggle={() => toggleSection('improvements')}
              icon={<Rocket className="h-5 w-5" />}
              lazyMount={getSectionManifest('improvements').lazy === 'on-demand'}
              motionDelayMs={getSectionManifest('improvements').motionDelayMs}
            >
              {fullDataReady ? <ImprovementGroups locale={locale} rows={improvements} /> : <SectionState locale={locale} status={sectionState} />}
            </CollapsibleSection>

            <CollapsibleSection
              id="insights"
              locale={locale}
              title={t(locale, 'insights_title')}
              description={t(locale, 'insights_desc')}
              summary={t(locale, 'insights_intro')}
              count={sectionCounts.insights}
              open={uiState.expandedSections.insights}
              onToggle={() => toggleSection('insights')}
              icon={<Lightbulb className="h-5 w-5" />}
              lazyMount={getSectionManifest('insights').lazy === 'on-demand'}
              motionDelayMs={getSectionManifest('insights').motionDelayMs}
            >
              {fullDataReady ? <InsightValidation locale={locale} rows={insights} /> : <SectionState locale={locale} status={sectionState} />}
            </CollapsibleSection>

            <CollapsibleSection
              id="competitors"
              locale={locale}
              title={t(locale, 'competitors_title')}
              description={t(locale, 'competitors_desc')}
              summary={t(locale, 'competitors_intro')}
              count={sectionCounts.competitors}
              open={uiState.expandedSections.competitors}
              onToggle={() => toggleSection('competitors')}
              icon={<Users className="h-5 w-5" />}
              lazyMount={getSectionManifest('competitors').lazy === 'on-demand'}
              motionDelayMs={getSectionManifest('competitors').motionDelayMs}
            >
              {fullDataReady ? <CompetitorSection locale={locale} rows={fullData.competitor_snapshot} /> : <SectionState locale={locale} status={sectionState} />}
            </CollapsibleSection>

            <CollapsibleSection
              id="roadmap"
              locale={locale}
              title={t(locale, 'roadmap_title')}
              description={t(locale, 'roadmap_desc')}
              summary={t(locale, 'roadmap_intro')}
              count={sectionCounts.roadmap}
              open={uiState.expandedSections.roadmap}
              onToggle={() => toggleSection('roadmap')}
              icon={<Map className="h-5 w-5" />}
              lazyMount={getSectionManifest('roadmap').lazy === 'on-demand'}
              motionDelayMs={getSectionManifest('roadmap').motionDelayMs}
            >
              {fullDataReady ? <RoadmapSection locale={locale} rows={fullData.roadmap} /> : <SectionState locale={locale} status={sectionState} />}
            </CollapsibleSection>

            <CollapsibleSection
              id="sources"
              locale={locale}
              title={t(locale, 'sources_title')}
              description={t(locale, 'sources_desc')}
              summary={t(locale, 'sources_intro')}
              count={sectionCounts.sources}
              open={uiState.expandedSections.sources}
              onToggle={() => toggleSection('sources')}
              icon={<Database className="h-5 w-5" />}
              lazyMount={getSectionManifest('sources').lazy === 'on-demand'}
              motionDelayMs={getSectionManifest('sources').motionDelayMs}
            >
              {fullDataReady ? (
                <SourceBreakdown locale={locale} snapshot={fullData.source_snapshot} signals={fullData.feedback_signals} />
              ) : (
                <SectionState locale={locale} status={sectionState} />
              )}
            </CollapsibleSection>
          </div>
        </div>
      </main>
    </div>
  );
}

function countActiveFilters(state: DashboardUIState): number {
  let count = 0;
  if (state.theme !== 'all') count += 1;
  if (state.source !== 'all') count += 1;
  if (state.severity !== 'all') count += 1;
  if (state.category !== 'all') count += 1;
  if (state.status !== 'all') count += 1;
  if (state.sort !== 'desc') count += 1;
  return count;
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
