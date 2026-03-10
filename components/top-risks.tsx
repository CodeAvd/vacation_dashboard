import type { FeedbackSignal, Locale } from '@/lib/data';
import type { RiskRow } from '@/lib/selectors';
import { narrative, t, themeLabel } from '@/lib/i18n';
import { AlertTriangle, ArrowRight, Clock3, MessageSquareQuote, Siren, Target } from 'lucide-react';

interface TopRisksProps {
  locale: Locale;
  risks: RiskRow[];
  signals: FeedbackSignal[];
}

const severityBadge = {
  critical: 'badge-base badge-critical',
  major: 'badge-base badge-major',
  minor: 'badge-base badge-minor',
};

export function TopRisks({ locale, risks, signals }: TopRisksProps) {
  return (
    <section id="risks" data-section="risks" data-collapsed="false" className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8 lg:pt-10">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface-raised px-3 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-foreground-soft">
            <AlertTriangle className="h-3.5 w-3.5" />
            {t(locale, 'risks_title')}
          </div>
          <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] text-foreground sm:text-3xl">{t(locale, 'risks_desc')}</h2>
          <p className="max-w-3xl text-sm leading-6 text-foreground-muted">{t(locale, 'risks_intro')}</p>
        </div>
        <div className="rounded-[1.25rem] border border-border-subtle bg-surface px-4 py-3 shadow-card">
          <div className="eyebrow">{t(locale, 'retention_legend')}</div>
          <div className="mt-2 font-mono text-sm text-foreground-muted">{t(locale, 'visible_top_risks')}: <span className="font-semibold text-foreground">{risks.length}</span></div>
        </div>
      </div>

      {risks.length ? (
        <div className="grid gap-4 xl:grid-cols-3">
          {risks.map((risk, index) => {
            const totalSignals = signals.filter((signal) => signal.theme === risk.theme).length;
            return (
              <article key={risk.theme} className="surface-card surface-card-hover flex h-full flex-col p-5 lg:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-2">
                    <div className="eyebrow">#{index + 1} / PriorityScore</div>
                    <h3 className="font-display text-2xl font-semibold tracking-[-0.03em] text-foreground">
                      {themeLabel(locale, risk.theme)}
                    </h3>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={severityBadge[risk.severity]}>
                      <Siren className="h-3 w-3" />
                      {risk.severity === 'critical' ? t(locale, 'severity_critical') : risk.severity === 'major' ? t(locale, 'severity_major') : t(locale, 'severity_minor')}
                    </span>
                    <span className="rounded-2xl bg-foreground px-3 py-2 font-display text-lg font-semibold tracking-[-0.03em] text-white">
                      {risk.priority_score.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3">
                  <MetricCard label={t(locale, 'metric_frequency')} value={risk.frequency} />
                  <MetricCard label={t(locale, 'metric_severity')} value={risk.severity_score} />
                  <MetricCard label={t(locale, 'metric_recency')} value={risk.recency_score} />
                </div>

                <div className="mt-5 rounded-[1.3rem] border border-border-subtle bg-[rgba(255,250,243,0.82)] p-4">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="eyebrow">{t(locale, 'evidence_preview')}</span>
                    <span className="font-mono text-xs text-foreground-soft">{totalSignals} signals</span>
                  </div>
                  <p className="line-clamp-4 text-sm leading-6 text-foreground-muted">{risk.evidencePreview || narrative(locale, risk.theme, 'summary')}</p>
                </div>

                <div className="mt-5 space-y-4">
                  <NarrativeBlock icon={<MessageSquareQuote className="h-4 w-4" />} label={t(locale, 'risk_context_label')} text={narrative(locale, risk.theme, 'summary')} />
                  <NarrativeBlock icon={<Target className="h-4 w-4" />} label={t(locale, 'risk_risk_label')} text={narrative(locale, risk.theme, 'risk')} />
                  <NarrativeBlock icon={<Clock3 className="h-4 w-4" />} label={t(locale, 'risk_impact_label')} text={narrative(locale, risk.theme, 'impact')} />
                  <NarrativeBlock icon={<ArrowRight className="h-4 w-4" />} label={t(locale, 'risk_action_label')} text={narrative(locale, risk.theme, 'action')} emphasize />
                </div>

                {risk.sourceUrl ? (
                  <div className="mt-5 pt-4">
                    <a href={risk.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-xs uppercase tracking-[0.12em] text-primary transition hover:text-primary-strong">
                      {t(locale, 'source_link')}
                    </a>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      ) : (
        <EmptyState text={t(locale, 'no_risks')} />
      )}
    </section>
  );
}

function MetricCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[1.2rem] border border-border-subtle bg-surface-raised px-3 py-3">
      <div className="eyebrow">{label}</div>
      <div className="mt-2 font-display text-2xl font-semibold tracking-[-0.03em] text-foreground">{value}</div>
    </div>
  );
}

function NarrativeBlock({ icon, label, text, emphasize = false }: { icon: React.ReactNode; label: string; text: string; emphasize?: boolean }) {
  return (
    <div className="rounded-[1.2rem] border border-border-subtle/90 bg-surface p-4">
      <div className="mb-2 flex items-center gap-2 text-foreground-soft">
        {icon}
        <span className="eyebrow">{label}</span>
      </div>
      <p className={emphasize ? 'text-sm leading-6 text-foreground' : 'text-sm leading-6 text-foreground-muted'}>{text}</p>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return <div className="surface-card p-5 text-sm leading-6 text-foreground-muted">{text}</div>;
}
