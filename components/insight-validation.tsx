import type { InsightRow, Locale } from '@/lib/data';
import { categoryLabel, effortLabel, evidenceStrengthLabel, impactLabel, localizedField, t } from '@/lib/i18n';
import { ExternalLink, Lightbulb } from 'lucide-react';

interface InsightValidationProps {
  locale: Locale;
  rows: InsightRow[];
}

const priorityClass = {
  P0: 'badge-base priority-p0',
  P1: 'badge-base priority-p1',
  P2: 'badge-base priority-p2',
};

export function InsightValidation({ locale, rows }: InsightValidationProps) {
  if (!rows.length) return <div className="surface-card p-5 text-sm leading-6 text-foreground-muted">{t(locale, 'no_insights')}</div>;

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      {rows.map((row) => (
        <article key={row.id} className="surface-card p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                <span className={priorityClass[row.priority]}>{row.priority}</span>
                <span className="badge-base badge-muted">{row.status === 'shipping' ? t(locale, 'status_shipping') : t(locale, 'status_hypothesis')}</span>
                <span className="badge-base badge-positive">{categoryLabel(locale, row.category)}</span>
              </div>
              <h3 className="font-display text-xl font-semibold tracking-[-0.03em] text-foreground">{localizedField(locale, 'insights', row.id, 'title', row.title)}</h3>
            </div>
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-accent-soft/60 text-foreground-muted"><Lightbulb className="h-4 w-4" /></span>
          </div>
          <p className="mt-4 text-sm leading-6 text-foreground">{localizedField(locale, 'insights', row.id, 'solution', row.solution)}</p>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl border border-border-subtle bg-surface-raised p-3"><div className="eyebrow">{t(locale, 'label_impact_effort')}</div><div className="mt-1 text-foreground">{impactLabel(locale, row.impact)} / {effortLabel(locale, row.effort)}</div></div>
            <div className="rounded-2xl border border-border-subtle bg-surface-raised p-3"><div className="eyebrow">{t(locale, 'kpi_label')}</div><div className="mt-1 text-foreground-muted">{localizedField(locale, 'insights', row.id, 'kpi', row.kpi)}</div></div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="badge-base badge-muted">{evidenceStrengthLabel(locale, row.evidence_strength || 'Unknown')} {t(locale, 'evidence_strength_suffix')}</span>
            <span className="badge-base badge-muted">{row.id}</span>
          </div>
          {row.source_refs?.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {row.source_refs.map((ref) => (
                <a key={ref} href={ref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface px-3 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.08em] text-primary">
                  {shortSourceLabel(ref, locale)}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          ) : null}
        </article>
      ))}
    </div>
  );
}

function shortSourceLabel(url: string, locale: Locale): string {
  try {
    const host = new URL(url).hostname;
    if (host.includes('steam')) return locale === 'ru' ? 'Обсуждение Steam' : 'Steam discussion';
    if (host.includes('discord')) return 'Discord';
    if (host.includes('youtu')) return locale === 'ru' ? 'YouTube обзор' : 'YouTube review';
  } catch {}
  return t(locale, 'source_link');
}
