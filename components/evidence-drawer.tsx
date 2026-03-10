import type { FeedbackSignal, Locale } from '@/lib/data';
import { sourceLabel, t, themeLabel } from '@/lib/i18n';
import { getThemeSeverity, normalizeSource } from '@/lib/selectors';
import { MessageSquareQuote, ExternalLink } from 'lucide-react';

interface EvidenceDrawerProps {
  locale: Locale;
  rows: FeedbackSignal[];
}

const severityClass = {
  critical: 'badge-base badge-critical',
  major: 'badge-base badge-major',
  minor: 'badge-base badge-minor',
};

export function EvidenceDrawer({ locale, rows }: EvidenceDrawerProps) {
  return (
    <section id="evidence" data-section="evidence" data-collapsed="false" className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface-raised px-3 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-foreground-soft">
            <MessageSquareQuote className="h-3.5 w-3.5" />
            {t(locale, 'evidence_title')}
          </div>
          <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] text-foreground sm:text-3xl">{t(locale, 'evidence_desc')}</h2>
          <p className="max-w-3xl text-sm leading-6 text-foreground-muted">{t(locale, 'evidence_intro')}</p>
        </div>
        <div className="rounded-[1.25rem] border border-border-subtle bg-surface px-4 py-3 shadow-card">
          <div className="eyebrow">{t(locale, 'signals_in_view')}</div>
          <div className="mt-2 font-display text-2xl font-semibold tracking-[-0.03em] text-foreground">{rows.length}</div>
        </div>
      </div>

      {rows.length ? (
        <div id="evidenceGrid" className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {rows.map((row) => {
            const source = normalizeSource(row.source);
            const severity = row.severity || getThemeSeverity(row.theme);
            return (
              <details key={row.id} className="surface-card group overflow-hidden p-5 open:shadow-card-hover">
                <summary className="list-none cursor-pointer">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="badge-base badge-muted">{sourceLabel(locale, source)}</span>
                    <span className={severityClass[severity]}>{severity === 'critical' ? t(locale, 'severity_critical') : severity === 'major' ? t(locale, 'severity_major') : t(locale, 'severity_minor')}</span>
                    <span className="badge-base badge-positive">{themeLabel(locale, row.theme)}</span>
                  </div>
                  <p className="mt-4 line-clamp-5 text-sm leading-6 text-foreground-muted">{row.quote}</p>
                  <div className="mt-4 flex items-center justify-between gap-3 border-t border-border-subtle pt-4">
                    <span className="eyebrow">{row.id}</span>
                    <span className="font-mono text-xs uppercase tracking-[0.12em] text-primary">{t(locale, 'evidence_details')}</span>
                  </div>
                </summary>
                <div className="mt-4 space-y-3 border-t border-border-subtle pt-4">
                  <div>
                    <div className="eyebrow">{locale === 'ru' ? 'Тема' : 'Theme'}</div>
                    <p className="mt-2 text-sm leading-6 text-foreground">{themeLabel(locale, row.theme)}</p>
                  </div>
                  <div>
                    <div className="eyebrow">{locale === 'ru' ? 'Сигнал' : 'Signal'}</div>
                    <p className="mt-2 text-sm leading-6 text-foreground-muted">{row.quote}</p>
                  </div>
                  {row.url ? (
                    <a href={row.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-primary transition hover:text-primary-strong">
                      {shortSourceLabel(row.url, locale)}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ) : null}
                </div>
              </details>
            );
          })}
        </div>
      ) : (
        <div className="surface-card p-5 text-sm leading-6 text-foreground-muted">{t(locale, 'no_evidence')}</div>
      )}
    </section>
  );
}

function shortSourceLabel(url: string, locale: Locale): string {
  try {
    const host = new URL(url).hostname;
    if (host.includes('steam')) return locale === 'ru' ? 'Обсуждение Steam' : 'Steam discussion';
    if (host.includes('discord')) return 'Discord';
    if (host.includes('youtu')) return locale === 'ru' ? 'YouTube обзор' : 'YouTube review';
  } catch {}
  return t(locale, 'open_source_link');
}
