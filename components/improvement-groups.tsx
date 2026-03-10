import type { ImprovementRow, Locale } from '@/lib/data';
import { categoryLabel, effortLabel, impactLabel, localizedField, t, themeLabel } from '@/lib/i18n';
import { ExternalLink, Rocket } from 'lucide-react';

interface ImprovementGroupsProps {
  locale: Locale;
  rows: ImprovementRow[];
}

const stages: ImprovementRow['stage'][] = ['Quick Wins', 'Mid-term', 'Big Bet'];
const priorityClass = {
  P0: 'badge-base priority-p0',
  P1: 'badge-base priority-p1',
  P2: 'badge-base priority-p2',
};

export function ImprovementGroups({ locale, rows }: ImprovementGroupsProps) {
  if (!rows.length) return <div className="surface-card p-5 text-sm leading-6 text-foreground-muted">{t(locale, 'no_improvements')}</div>;

  return (
    <div className="space-y-6">
      {stages.map((stage) => {
        const stageRows = rows.filter((row) => row.stage === stage);
        if (!stageRows.length) return null;
        return (
          <section key={stage} className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="eyebrow">{locale === 'ru' ? 'Группа поставки' : 'Delivery group'}</div>
                <h3 className="mt-1 font-display text-xl font-semibold tracking-[-0.03em] text-foreground">{stage}</h3>
              </div>
              <span className="badge-base badge-muted">{stageRows.length}</span>
            </div>
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              {stageRows.map((row) => (
                <article key={row.id} className="surface-card p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="eyebrow">{categoryLabel(locale, row.category)}</div>
                      <h4 className="mt-2 font-display text-xl font-semibold tracking-[-0.03em] text-foreground">{themeLabel(locale, row.linked_theme)}</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className={priorityClass[row.priority]}>{row.priority}</span>
                      <span className="badge-base badge-muted">{row.id}</span>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-foreground">{localizedField(locale, 'improvements', row.id, 'solution', row.solution)}</p>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-2xl border border-border-subtle bg-surface-raised p-3"><div className="eyebrow">{t(locale, 'label_impact_effort')}</div><div className="mt-1 text-foreground">{impactLabel(locale, row.impact)} / {effortLabel(locale, row.effort)}</div></div>
                    <div className="rounded-2xl border border-border-subtle bg-surface-raised p-3"><div className="eyebrow">{t(locale, 'kpi_label')}</div><div className="mt-1 text-foreground-muted">{localizedField(locale, 'improvements', row.id, 'kpi', row.kpi)}</div></div>
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-foreground-soft"><Rocket className="h-3.5 w-3.5" />{stage}</span>
                    {row.problem_link ? <a href={row.problem_link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-primary">{t(locale, 'source_link')}<ExternalLink className="h-3.5 w-3.5" /></a> : null}
                  </div>
                </article>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
