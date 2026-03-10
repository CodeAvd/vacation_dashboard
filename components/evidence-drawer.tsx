import type { FeedbackSignal, Locale } from '@/lib/data';
import { buildEvidenceRenderItems } from '@/lib/evidence-render';
import { sourceLabel, t, themeLabel } from '@/lib/i18n';
import { ExternalLink, MessageSquareQuote } from 'lucide-react';

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
  const renderRows = buildEvidenceRenderItems(rows);

  return renderRows.length ? (
    <div id="evidenceGrid" className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
      {renderRows.map(({ renderKey, row, severity, source }) => (
        <details key={renderKey} className="surface-card group min-w-0 overflow-hidden p-5 open:shadow-card-hover">
          <summary className="list-none cursor-pointer">
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge-base badge-muted">{sourceLabel(locale, source)}</span>
              <span className={severityClass[severity]}>
                {severity === 'critical'
                  ? t(locale, 'severity_critical')
                  : severity === 'major'
                    ? t(locale, 'severity_major')
                    : t(locale, 'severity_minor')}
              </span>
              <span className="badge-base badge-positive">{themeLabel(locale, row.theme)}</span>
            </div>
            <p className="mt-4 line-clamp-5 text-sm leading-6 text-foreground-muted">{row.quote}</p>
            <div className="mt-4 flex items-center justify-between gap-3 border-t border-border-subtle pt-4">
              <span className="eyebrow max-w-[70%] truncate">{row.id}</span>
              <span className="font-mono text-xs uppercase tracking-[0.12em] text-primary">{t(locale, 'evidence_details')}</span>
            </div>
          </summary>
          <div className="mt-4 space-y-3 border-t border-border-subtle pt-4">
            <div>
              <div className="eyebrow">{locale === 'ru' ? 'РўРµРјР°' : 'Theme'}</div>
              <p className="mt-2 text-sm leading-6 text-foreground">{themeLabel(locale, row.theme)}</p>
            </div>
            <div>
              <div className="eyebrow">{locale === 'ru' ? 'РЎРёРіРЅР°Р»' : 'Signal'}</div>
              <p className="mt-2 text-sm leading-6 text-foreground-muted">{row.quote}</p>
            </div>
            {row.url ? (
              <a
                href={row.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-primary transition hover:text-primary-strong"
              >
                {shortSourceLabel(row.url, locale)}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ) : null}
          </div>
        </details>
      ))}
    </div>
  ) : (
    <div className="surface-card p-5 text-sm leading-6 text-foreground-muted">
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface-raised px-3 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-foreground-soft">
        <MessageSquareQuote className="h-3.5 w-3.5" />
        {t(locale, 'evidence_title')}
      </div>
      {t(locale, 'no_evidence')}
    </div>
  );
}

function shortSourceLabel(url: string, locale: Locale): string {
  try {
    const host = new URL(url).hostname;
    if (host.includes('steam')) return locale === 'ru' ? 'РћР±СЃСѓР¶РґРµРЅРёРµ Steam' : 'Steam discussion';
    if (host.includes('discord')) return 'Discord';
    if (host.includes('youtu')) return locale === 'ru' ? 'YouTube РѕР±Р·РѕСЂ' : 'YouTube review';
  } catch {}
  return t(locale, 'open_source_link');
}
