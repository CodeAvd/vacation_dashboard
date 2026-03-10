import type { CompetitorRow, Locale } from '@/lib/data';
import { competitorCopy, t } from '@/lib/i18n';
import { Sparkles } from 'lucide-react';

interface CompetitorSectionProps {
  locale: Locale;
  rows: CompetitorRow[];
}

export function CompetitorSection({ locale, rows }: CompetitorSectionProps) {
  if (!rows.length) return <div className="surface-card p-5 text-sm leading-6 text-foreground-muted">{t(locale, 'no_competitors')}</div>;

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      {rows.map((row) => (
        <article key={row.game} className="surface-card min-w-0 p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="eyebrow">{t(locale, 'competitor_th_role')}</div>
              <h3 className="mt-2 font-display text-xl font-semibold tracking-[-0.03em] text-foreground">{row.game}</h3>
              <p className="mt-2 text-sm leading-6 text-foreground-muted">{competitorCopy(locale, row.game, 'market_role', row.market_role)}</p>
            </div>
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-accent-soft/60 text-foreground-muted"><Sparkles className="h-4 w-4" /></span>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="rounded-[1.2rem] border border-border-subtle bg-surface-raised p-4">
              <div className="eyebrow">{t(locale, 'competitor_th_strengths')}</div>
              <p className="mt-2 text-sm leading-6 text-foreground-muted">{competitorCopy(locale, row.game, 'strengths', row.strengths)}</p>
            </div>
            <div className="rounded-[1.2rem] border border-border-subtle bg-surface-raised p-4">
              <div className="eyebrow">{t(locale, 'competitor_th_weaknesses')}</div>
              <p className="mt-2 text-sm leading-6 text-foreground-muted">{competitorCopy(locale, row.game, 'weaknesses', row.weaknesses)}</p>
            </div>
          </div>
          <div className="mt-4 rounded-[1.2rem] border border-border-subtle bg-[rgba(40,95,89,0.08)] p-4">
            <div className="eyebrow">{t(locale, 'competitor_th_opportunity')}</div>
            <p className="mt-2 text-sm leading-6 text-foreground">{competitorCopy(locale, row.game, 'opportunity', row.opportunity)}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
