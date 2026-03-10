import type { ActionRow, Locale } from '@/lib/data';
import { categoryLabel, effortLabel, impactLabel, localizedField, ownerLabel, t, themeLabel, etaLabel } from '@/lib/i18n';
import { ExternalLink } from 'lucide-react';

interface ActionBoardProps {
  locale: Locale;
  rows: ActionRow[];
}

const priorityClass = {
  P0: 'badge-base priority-p0',
  P1: 'badge-base priority-p1',
  P2: 'badge-base priority-p2',
};

export function ActionBoard({ locale, rows }: ActionBoardProps) {
  if (!rows.length) {
    return <div className="surface-card p-5 text-sm leading-6 text-foreground-muted">{t(locale, 'no_actions')}</div>;
  }

  return (
    <>
      <div className="hidden overflow-hidden rounded-[1.5rem] border border-border-subtle bg-surface lg:block">
        <div className="overflow-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>{t(locale, 'label_problem')}</th>
                <th>{t(locale, 'label_solution')}</th>
                <th>{t(locale, 'label_impact_effort')}</th>
                <th>{t(locale, 'kpi_label')}</th>
                <th>{t(locale, 'label_owner')}</th>
                <th>{t(locale, 'label_eta')}</th>
              </tr>
            </thead>
            <tbody id="actionRows">
              {rows.map((row) => (
                <tr key={row.id}>
                  <td className="min-w-[220px]">
                    <div className="font-medium text-foreground">{themeLabel(locale, row.theme)}</div>
                    <span className="table-detail">{categoryLabel(locale, row.category)} · {row.status === 'shipping' ? t(locale, 'status_shipping') : t(locale, 'status_hypothesis')}</span>
                    <div className="mt-3">
                      {row.problem_link ? (
                        <a href={row.problem_link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-primary">
                          {t(locale, 'source_link')}
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      ) : (
                        <span className="font-mono text-xs uppercase tracking-[0.12em] text-foreground-soft">—</span>
                      )}
                    </div>
                  </td>
                  <td className="min-w-[280px]">
                    <div className="flex flex-wrap gap-2">
                      <span className={priorityClass[row.priority]}>{row.priority}</span>
                      <span className="badge-base badge-muted">{row.id}</span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-foreground">{localizedField(locale, 'actions', row.id, 'solution', row.solution)}</p>
                  </td>
                  <td>
                    <div className="font-medium text-foreground">{impactLabel(locale, row.impact)}</div>
                    <span className="table-detail">{effortLabel(locale, row.effort)} effort</span>
                  </td>
                  <td className="min-w-[220px] text-sm leading-6 text-foreground-muted">{localizedField(locale, 'actions', row.id, 'kpi', row.kpi)}</td>
                  <td>{ownerLabel(locale, row.owner)}</td>
                  <td>{etaLabel(locale, row.eta)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-4 lg:hidden">
        {rows.map((row) => (
          <article key={row.id} className="surface-card p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="eyebrow">{categoryLabel(locale, row.category)}</div>
                <h3 className="mt-2 font-display text-xl font-semibold tracking-[-0.03em] text-foreground">{themeLabel(locale, row.theme)}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className={priorityClass[row.priority]}>{row.priority}</span>
                <span className="badge-base badge-muted">{row.status === 'shipping' ? t(locale, 'status_shipping') : t(locale, 'status_hypothesis')}</span>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-foreground">{localizedField(locale, 'actions', row.id, 'solution', row.solution)}</p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl border border-border-subtle bg-surface-raised p-3"><div className="eyebrow">{t(locale, 'label_impact_effort')}</div><div className="mt-1 text-foreground">{impactLabel(locale, row.impact)} / {effortLabel(locale, row.effort)}</div></div>
              <div className="rounded-2xl border border-border-subtle bg-surface-raised p-3"><div className="eyebrow">{t(locale, 'label_owner')}</div><div className="mt-1 text-foreground">{ownerLabel(locale, row.owner)}</div></div>
            </div>
            <div className="mt-4 rounded-[1.2rem] border border-border-subtle bg-[rgba(255,250,243,0.72)] p-4 text-sm leading-6 text-foreground-muted">{localizedField(locale, 'actions', row.id, 'kpi', row.kpi)}</div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.12em] text-foreground-soft">{etaLabel(locale, row.eta)}</span>
              {row.problem_link ? <a href={row.problem_link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-primary">{t(locale, 'source_link')}<ExternalLink className="h-3.5 w-3.5" /></a> : null}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
