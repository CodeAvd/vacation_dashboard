import type { FeedbackSignal, Severity, Source } from '@/lib/data';
import { getThemeSeverity, normalizeSource } from '@/lib/selectors';

export interface EvidenceRenderItem {
  renderKey: string;
  row: FeedbackSignal;
  severity: Severity;
  source: Source;
}

export function buildEvidenceRenderItems(rows: FeedbackSignal[]): EvidenceRenderItem[] {
  const seenBaseKeys = new Map<string, number>();

  return rows.map((row) => {
    const source = normalizeSource(row.source);
    const severity = row.severity || getThemeSeverity(row.theme);
    const baseKey = [source, row.theme, row.id, row.quote].join('::');
    const occurrence = seenBaseKeys.get(baseKey) ?? 0;

    seenBaseKeys.set(baseKey, occurrence + 1);

    return {
      renderKey: occurrence === 0 ? baseKey : `${baseKey}::${occurrence + 1}`,
      row,
      severity,
      source,
    };
  });
}
