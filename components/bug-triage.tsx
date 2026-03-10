import type { BugCluster, Locale } from '@/lib/data';
import { inferBugCause, inferFixTrack } from '@/lib/selectors';
import { sourceLabel, t, themeLabel } from '@/lib/i18n';
import { Bug, TriangleAlert } from 'lucide-react';

interface BugTriageProps {
  locale: Locale;
  rows: BugCluster[];
}

const severityClass = {
  critical: 'badge-base badge-critical',
  major: 'badge-base badge-major',
  minor: 'badge-base badge-minor',
};

const priorityClass = {
  P0: 'badge-base priority-p0',
  P1: 'badge-base priority-p1',
  P2: 'badge-base priority-p2',
};

export function BugTriage({ locale, rows }: BugTriageProps) {
  return (
    <section id="bugs" data-section="bugs" data-collapsed="false" className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface-raised px-3 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-foreground-soft">
            <Bug className="h-3.5 w-3.5" />
            {t(locale, 'bugs_title')}
          </div>
          <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] text-foreground sm:text-3xl">{t(locale, 'bugs_desc')}</h2>
          <p className="max-w-3xl text-sm leading-6 text-foreground-muted">{t(locale, 'bugs_intro')}</p>
        </div>
        <div className="rounded-[1.25rem] border border-border-subtle bg-surface px-4 py-3 shadow-card">
          <div className="eyebrow">{t(locale, 'visible_bug_clusters')}</div>
          <div className="mt-2 font-display text-2xl font-semibold tracking-[-0.03em] text-foreground">{rows.length}</div>
        </div>
      </div>

      {rows.length ? (
        <>
          <div className="hidden overflow-hidden rounded-[1.75rem] border border-border-subtle bg-surface shadow-card lg:block">
            <div className="max-h-[720px] overflow-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>{t(locale, 'bug_th_cluster')}</th>
                    <th>{t(locale, 'bug_th_severity')}</th>
                    <th>{t(locale, 'bug_th_priority')}</th>
                    <th>{t(locale, 'bug_th_frequency')}</th>
                    <th>{t(locale, 'bug_th_score')}</th>
                    <th>{t(locale, 'bug_th_hints')}</th>
                    <th>{t(locale, 'bug_th_sources')}</th>
                  </tr>
                </thead>
                <tbody id="bugRows">
                  {rows.map((row) => (
                    <tr key={row.name}>
                      <td className="min-w-[180px]">
                        <div className="font-medium text-foreground">{themeLabel(locale, row.name)}</div>
                        <span className="table-detail">{t(locale, 'bug_detail_symptom')}: {row.repro_notes}</span>
                      </td>
                      <td><span className={severityClass[row.severity]}>{row.severity === 'critical' ? t(locale, 'severity_critical') : row.severity === 'major' ? t(locale, 'severity_major') : t(locale, 'severity_minor')}</span></td>
                      <td><span className={priorityClass[row.priority]}>{row.priority}</span></td>
                      <td>
                        <div className="font-display text-xl font-semibold tracking-[-0.03em] text-foreground">{row.frequency}</div>
                        <span className="table-detail">{locale === 'ru' ? 'упоминаний' : 'mentions'}</span>
                      </td>
                      <td>
                        <div className="font-display text-xl font-semibold tracking-[-0.03em] text-foreground">{row.score.toFixed(2)}</div>
                        <span className="table-detail">PriorityScore</span>
                      </td>
                      <td className="min-w-[320px]">
                        <span className="table-detail"><strong>{t(locale, 'bug_detail_cause')}:</strong> {inferBugCause(locale, row.name)}</span>
                        <span className="table-detail"><strong>{t(locale, 'bug_detail_track')}:</strong> {inferFixTrack(locale, row.priority)}</span>
                      </td>
                      <td>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(row.source_breakdown).map(([source, count]) => (
                            <span key={source} className="badge-base badge-muted">{sourceLabel(locale, source.includes('steam') ? 'Steam' : source.includes('discord') ? (source.includes('forum') ? 'Forum' : 'Discord') : source.includes('youtube') ? 'YouTube' : 'Forum')} · {count}</span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-4 lg:hidden">
            {rows.map((row) => (
              <article key={row.name} className="surface-card p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="eyebrow">{t(locale, 'bug_th_cluster')}</div>
                    <h3 className="mt-2 font-display text-xl font-semibold tracking-[-0.03em] text-foreground">{themeLabel(locale, row.name)}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className={severityClass[row.severity]}>{row.severity === 'critical' ? t(locale, 'severity_critical') : row.severity === 'major' ? t(locale, 'severity_major') : t(locale, 'severity_minor')}</span>
                    <span className={priorityClass[row.priority]}>{row.priority}</span>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-border-subtle bg-surface-raised p-3"><div className="eyebrow">{t(locale, 'bug_th_frequency')}</div><div className="mt-1 font-display text-2xl font-semibold tracking-[-0.03em] text-foreground">{row.frequency}</div></div>
                  <div className="rounded-2xl border border-border-subtle bg-surface-raised p-3"><div className="eyebrow">{t(locale, 'bug_th_score')}</div><div className="mt-1 font-display text-2xl font-semibold tracking-[-0.03em] text-foreground">{row.score.toFixed(2)}</div></div>
                </div>
                <div className="mt-4 space-y-3 rounded-[1.25rem] border border-border-subtle bg-[rgba(255,250,243,0.72)] p-4 text-sm leading-6">
                  <div><span className="eyebrow">{t(locale, 'bug_detail_symptom')}</span><p className="mt-1 text-foreground-muted">{row.repro_notes}</p></div>
                  <div><span className="eyebrow">{t(locale, 'bug_detail_cause')}</span><p className="mt-1 text-foreground-muted">{inferBugCause(locale, row.name)}</p></div>
                  <div><span className="eyebrow">{t(locale, 'bug_detail_track')}</span><p className="mt-1 text-foreground">{inferFixTrack(locale, row.priority)}</p></div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {Object.entries(row.source_breakdown).map(([source, count]) => (
                    <span key={source} className="badge-base badge-muted">{sourceLabel(locale, source.includes('steam') ? 'Steam' : source.includes('discord') ? (source.includes('forum') ? 'Forum' : 'Discord') : source.includes('youtube') ? 'YouTube' : 'Forum')} · {count}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </>
      ) : (
        <div className="surface-card p-5 text-sm leading-6 text-foreground-muted"><div className="flex items-center gap-2 text-foreground"><TriangleAlert className="h-4 w-4" />{t(locale, 'no_bug_clusters')}</div></div>
      )}
    </section>
  );
}
