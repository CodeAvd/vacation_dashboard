import assert from 'node:assert/strict';
import test from 'node:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import rawDashboardData from '../GDD/dashboard-data.generated.json';
import { EvidenceDrawer } from '../components/evidence-drawer';
import { DEFAULT_UI_STATE, type DashboardData } from '../lib/data';
import { buildEvidenceRenderItems } from '../lib/evidence-render';
import { getThemeSeverity, normalizeSource, selectEvidence } from '../lib/selectors';

const dashboardData = rawDashboardData as unknown as DashboardData;

test('Steam critical evidence renders 9 cards with unique stable keys', () => {
  const rows = selectEvidence(
    {
      ...DEFAULT_UI_STATE,
      source: 'Steam',
      severity: 'critical',
    },
    dashboardData,
  );

  assert.equal(rows.length, 9);

  rows.forEach((row) => {
    assert.equal(normalizeSource(row.source), 'Steam');
    assert.equal(row.severity ?? getThemeSeverity(row.theme), 'critical');
  });

  const renderItems = buildEvidenceRenderItems(rows);

  assert.equal(renderItems.length, 9);
  assert.equal(new Set(renderItems.map((item) => item.renderKey)).size, 9);

  const markup = renderToStaticMarkup(createElement(EvidenceDrawer, { locale: 'en', rows }));

  assert.equal((markup.match(/<details/g) ?? []).length, 9);
  assert.equal(markup.includes('Discord'), false);
  assert.equal(markup.includes('Major'), false);
  assert.equal(markup.includes('Minor'), false);
});
