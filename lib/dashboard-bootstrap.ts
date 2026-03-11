import 'server-only';

import type { DashboardBootstrap } from '@/lib/data';
import { DEFAULT_UI_STATE } from '@/lib/data';
import { dashboardData } from '@/lib/dashboard-static';
import { getAllSources, getAllThemes, selectActions, selectBugClusters, selectInsights, selectImprovements, selectTopRisks } from '@/lib/selectors';

export function getDashboardBootstrap(): DashboardBootstrap {
  const initialState = DEFAULT_UI_STATE;

  return {
    meta: dashboardData.meta,
    themes: getAllThemes(dashboardData),
    sources: getAllSources(dashboardData),
    initialTopRisks: selectTopRisks(initialState, dashboardData),
    initialBugClusters: selectBugClusters(initialState, dashboardData),
    sectionCounts: {
      evidence: dashboardData.feedback_signals.length,
      actions: selectActions(initialState, dashboardData).length,
      improvements: selectImprovements(initialState, dashboardData).length,
      insights: selectInsights(initialState, dashboardData).length,
      psychology: `${dashboardData.psychology.personas.length}/${dashboardData.psychology.friction.length}/${dashboardData.psychology.dopamine.length}`,
      competitors: dashboardData.competitor_snapshot.length,
      roadmap: dashboardData.roadmap.length,
      sources:
        dashboardData.source_snapshot.url_checks.length +
        dashboardData.source_snapshot.compiled_artifacts.length +
        dashboardData.source_snapshot.update_notes.length,
    },
  };
}
