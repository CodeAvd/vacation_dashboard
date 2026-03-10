import { loadDashboardData } from '../lib/dashboard-data-loader';
import { selectEvidence } from '../lib/selectors';
import { buildEvidenceRenderItems } from '../lib/evidence-render';
import { DEFAULT_UI_STATE } from '../lib/data';

async function runRegressionCheck() {
    console.log('Running evidence rendering regression check...');

    // 1. Data-level check
    const fullData = await loadDashboardData();
    const mockState = {
        ...DEFAULT_UI_STATE,
        source: 'Steam' as const,
        severity: 'critical' as const,
    };

    const rows = selectEvidence(mockState, fullData);

    console.log(`[Data-level check] selectEvidence rows: ${rows.length}`);
    if (rows.length !== 9) {
        console.error(`❌ Expected 9 selector rows, got ${rows.length}`);
        process.exit(1);
    } else {
        console.log('✅ Data-level check passed (9 rows)');
    }

    // 2. Render-level check
    const renderItems = buildEvidenceRenderItems(rows);
    const keys = new Set(renderItems.map(item => item.renderKey));

    console.log(`[Render-level check] Total renderItems: ${renderItems.length}, unique keys: ${keys.size}`);

    if (keys.size !== 9 || renderItems.length !== 9) {
        console.error(`❌ Expected 9 unique render keys, got ${keys.size} unique keys out of ${renderItems.length} items`);
        process.exit(1);
    } else {
        // 3. Confirm no stale cards
        const unallowed = renderItems.filter(item => item.source !== 'Steam' || item.severity !== 'critical');
        if (unallowed.length > 0) {
            console.error(`❌ Expected all items to be Steam + critical, but found some mismatches.`);
            process.exit(1);
        }
        console.log('✅ Render-level check passed (9 unique keys, all cards match Source: Steam and Severity: Critical)');
        console.log('✅ All tests passed.');
        process.exit(0);
    }
}

runRegressionCheck().catch(err => {
    console.error(err);
    process.exit(1);
});
