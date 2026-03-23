import assert from 'node:assert/strict';
import test from 'node:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import rawDashboardData from '../GDD/dashboard-data.generated.json';
import { EvidenceDrawer } from '../components/evidence-drawer';
import { DEFAULT_UI_STATE, type DashboardData } from '../lib/data';
import { buildEvidenceRenderItems } from '../lib/evidence-render';
import { normalizeSource, selectActions, selectBugClusters, selectEvidence, selectTopRisks } from '../lib/selectors';

const dashboardData = rawDashboardData as unknown as DashboardData;

test('Evidence drawer renders stable filtered rows with observed dates', () => {
  const rows = selectEvidence(
    {
      ...DEFAULT_UI_STATE,
      source: 'Steam',
      severity: 'major',
    },
    dashboardData,
  );

  assert.ok(rows.length > 0);
  assert.ok(rows.every((row) => Boolean(row.observed_date)));
  assert.ok(rows.every((row) => normalizeSource(row.source) === 'Steam'));

  const renderItems = buildEvidenceRenderItems(rows);
  assert.equal(renderItems.length, rows.length);
  assert.equal(new Set(renderItems.map((item) => item.renderKey)).size, rows.length);

  const markup = renderToStaticMarkup(createElement(EvidenceDrawer, { locale: 'en', rows }));
  assert.equal((markup.match(/<details/g) ?? []).length, rows.length);
  assert.ok(markup.includes(rows[0].observed_date));
});

test('Date filter is inclusive and reorders inverted range boundaries', () => {
  const sampleData: DashboardData = {
    meta: {
      actuality_date: '2026-03-12',
      signals_raw: 3,
      signals_unique: 3,
      method: 'PriorityScore = 0.5×Frequency + 0.3×Severity + 0.2×Recency',
    },
    theme_scores: [],
    bug_clusters: [],
    feedback_signals: [
      {
        source: 'Steam',
        source_type: 'steam_post',
        id: 'save-1',
        url: 'https://steamcommunity.com/app/3196440/discussions/1',
        quote: 'My save is gone after relaunch.',
        theme: 'Save loss',
        severity: 'critical',
        sentiment: 'negative',
        observed_date: '2026-03-10',
        observed_at: '2026-03-10T10:00:00Z',
        date_precision: 'minute',
      },
      {
        source: 'Discord',
        source_type: 'discord_message',
        id: 'perf-1',
        url: 'https://discord.com/channels/test',
        quote: 'Optimization is rough and FPS keeps dropping.',
        theme: 'Performance',
        severity: 'major',
        sentiment: 'negative',
        observed_date: '2026-03-11',
        observed_at: '2026-03-11T10:00:00Z',
        date_precision: 'minute',
      },
      {
        source: 'Discord',
        source_type: 'discord_message',
        id: 'perf-2',
        url: 'https://discord.com/channels/test',
        quote: 'Performance is still rough after the latest build.',
        theme: 'Performance',
        severity: 'major',
        sentiment: 'negative',
        observed_date: '2026-03-12',
        observed_at: '2026-03-12T10:00:00Z',
        date_precision: 'minute',
      },
    ],
    actions: [
      {
        id: 'A-perf',
        category: 'Gameplay',
        status: 'shipping',
        theme: 'Performance',
        severity: 'major',
        problem_link: 'https://discord.com/channels/test',
        solution: 'Optimize CPU and GPU hotspots.',
        impact: 'High',
        effort: 'M',
        priority: 'P0',
        kpi: 'Lower performance complaints',
        owner: 'Engine',
        eta: 'Week 1',
      },
    ],
    improvements: [],
    insights_shipping: [],
    insights_hypothesis: [],
    psychology: {
      personas: [],
      friction: [],
      dopamine: [],
    },
    competitor_snapshot: [],
    roadmap: [],
    source_snapshot: {
      steam_store_status: {
        name: 'Vacation Cafe Simulator',
        release_date: '2026',
        review_state: 'No user reviews',
        platforms: {
          windows: true,
          mac: false,
          linux: false,
        },
      },
      verified_at: '2026-03-12',
      url_checks: [],
      compiled_artifacts: [],
      update_notes: [],
    },
  };

  const directRows = selectEvidence(
    {
      ...DEFAULT_UI_STATE,
      dateFrom: '2026-03-10',
      dateTo: '2026-03-11',
    },
    sampleData,
  );
  const invertedRows = selectEvidence(
    {
      ...DEFAULT_UI_STATE,
      dateFrom: '2026-03-11',
      dateTo: '2026-03-10',
    },
    sampleData,
  );

  assert.deepEqual(
    directRows.map((row) => row.id),
    ['perf-1', 'save-1'],
  );
  assert.deepEqual(
    invertedRows.map((row) => row.id),
    ['perf-1', 'save-1'],
  );

  const risks = selectTopRisks(
    {
      ...DEFAULT_UI_STATE,
      dateFrom: '2026-03-12',
      dateTo: '2026-03-12',
    },
    sampleData,
  );
  assert.equal(risks.length, 1);
  assert.equal(risks[0].theme, 'Performance');

  const bugClusters = selectBugClusters(
    {
      ...DEFAULT_UI_STATE,
      dateFrom: '2026-03-12',
      dateTo: '2026-03-12',
    },
    sampleData,
  );
  assert.equal(bugClusters.length, 1);
  assert.equal(bugClusters[0].name, 'Performance');

  const actionsInRange = selectActions(
    {
      ...DEFAULT_UI_STATE,
      dateFrom: '2026-03-12',
      dateTo: '2026-03-12',
    },
    sampleData,
  );
  const actionsOutOfRange = selectActions(
    {
      ...DEFAULT_UI_STATE,
      dateFrom: '2026-03-10',
      dateTo: '2026-03-10',
    },
    sampleData,
  );

  assert.equal(actionsInRange.length, 1);
  assert.equal(actionsOutOfRange.length, 0);
});
