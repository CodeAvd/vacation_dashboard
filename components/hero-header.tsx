import type { DashboardMeta, Locale, TopRisk } from '@/lib/data';
import { narrative, t, themeLabel } from '@/lib/i18n';
import { formatNumber } from '@/lib/utils';
import { CalendarDays, Languages, Signal, Sparkles, Sigma, Siren, Target } from 'lucide-react';

interface HeroHeaderProps {
  locale: Locale;
  meta: DashboardMeta;
  leadRisk?: TopRisk;
  onLocaleChange: (locale: Locale) => void;
}

export function HeroHeader({ locale, meta, leadRisk, onLocaleChange }: HeroHeaderProps) {
  const metaCards = [
    { icon: CalendarDays, label: t(locale, 'meta_date'), value: meta.actuality_date },
    { icon: Signal, label: t(locale, 'meta_raw'), value: formatNumber(meta.signals_raw) },
    { icon: Sparkles, label: t(locale, 'meta_unique'), value: formatNumber(meta.signals_unique) },
    { icon: Sigma, label: t(locale, 'meta_method'), value: '0.5F / 0.3S / 0.2R', hint: meta.method },
  ];

  return (
    <header className="relative overflow-hidden border-b border-border-subtle/80 bg-[linear-gradient(180deg,rgba(255,252,247,0.92),rgba(246,241,232,0.42))]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(196,120,90,0.12),transparent_34%),radial-gradient(circle_at_top_right,rgba(40,95,89,0.08),transparent_36%)]" />
      <div className="relative mx-auto max-w-7xl px-4 pb-7 pt-6 sm:px-6 lg:px-8 lg:pb-9 lg:pt-7">
        <div className="flex flex-col gap-6 xl:grid xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)]">
          <div className="space-y-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-[0.72rem] uppercase tracking-[0.16em] text-foreground-soft">
                  <span className="rounded-full border border-border-subtle bg-surface/80 px-3 py-1 font-mono">Vacation Cafe Simulator</span>
                  <span className="rounded-full border border-border-subtle bg-surface/70 px-3 py-1 font-mono">Bug-first cockpit</span>
                  <span className="rounded-full border border-border-subtle bg-surface/70 px-3 py-1 font-mono">GitHub Pages static export</span>
                </div>
                <div className="space-y-3">
                  <p className="eyebrow">Product feedback operating layer</p>
                  <h1 className="max-w-4xl text-balance font-display text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl xl:text-[3.5rem] xl:leading-[1.02]">
                    {t(locale, 'hero_title')}
                  </h1>
                  <p className="max-w-3xl text-pretty text-[0.98rem] leading-7 text-foreground-muted sm:text-[1.04rem]">
                    {t(locale, 'hero_sub')} <span className="font-semibold text-foreground">{meta.actuality_date}</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-start gap-3 lg:items-end">
                <div
                  id="localeSwitch"
                  className="inline-flex items-center gap-1 rounded-full border border-border-subtle bg-surface/90 p-1 shadow-card"
                  role="group"
                  aria-label="Locale switch"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft/60 text-foreground-soft">
                    <Languages className="h-4 w-4" />
                  </span>
                  {(['ru', 'en'] as const).map((value) => {
                    const active = locale === value;
                    return (
                      <button
                        key={value}
                        id={value === 'ru' ? 'localeRuBtn' : 'localeEnBtn'}
                        type="button"
                        aria-pressed={active}
                        onClick={() => onLocaleChange(value)}
                        className={active
                          ? 'rounded-full bg-foreground px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-white transition'
                          : 'rounded-full px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-foreground-soft transition hover:text-foreground'}
                      >
                        {value.toUpperCase()}
                      </button>
                    );
                  })}
                </div>
                <p className="max-w-sm text-sm leading-6 text-foreground-soft lg:text-right">
                  {locale === 'ru'
                    ? 'Первый экран отвечает на один вопрос: что исправить или выпустить первым, чтобы не задеть cozy-ядро игры.'
                    : 'The first screen answers one question: what must ship or be fixed first to protect the cozy core of the game.'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {metaCards.map(({ icon: Icon, label, value, hint }) => (
                <div key={label} className="surface-card surface-card-hover flex min-h-[96px] flex-col justify-between p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="eyebrow">{label}</span>
                    <Icon className="h-4 w-4 text-foreground-soft" />
                  </div>
                  <div>
                    <div className="font-display text-xl font-semibold tracking-[-0.03em] text-foreground sm:text-2xl">
                      {value}
                    </div>
                    {hint ? <p className="mt-2 text-sm leading-6 text-foreground-muted">{hint}</p> : null}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="surface-card flex h-full flex-col justify-between gap-5 p-5 lg:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="eyebrow">{locale === 'ru' ? 'Немедленный фокус' : 'Immediate focus'}</div>
                <h2 className="mt-2 font-display text-2xl font-semibold tracking-[-0.03em] text-foreground">
                  {leadRisk ? themeLabel(locale, leadRisk.theme) : locale === 'ru' ? 'Приоритет загружается' : 'Priority is loading'}
                </h2>
              </div>
              {leadRisk ? (
                <span className="badge-base badge-critical">
                  <Siren className="h-3 w-3" />
                  {leadRisk.priority_score.toFixed(2)}
                </span>
              ) : null}
            </div>

            {leadRisk ? (
              <>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-[1.25rem] border border-border-subtle bg-surface-raised p-4">
                    <div className="eyebrow">{locale === 'ru' ? 'Сигналов в теме' : 'Signals in theme'}</div>
                    <div className="mt-2 font-display text-3xl font-semibold tracking-[-0.03em] text-foreground">{leadRisk.totalSignals}</div>
                  </div>
                  <div className="rounded-[1.25rem] border border-border-subtle bg-surface-raised p-4">
                    <div className="eyebrow">{t(locale, 'risk_action_label')}</div>
                    <div className="mt-2 flex items-start gap-2 text-sm leading-6 text-foreground">
                      <Target className="mt-1 h-4 w-4 shrink-0 text-primary" />
                      <span>{narrative(locale, leadRisk.theme, 'action')}</span>
                    </div>
                  </div>
                </div>
                <div className="rounded-[1.25rem] border border-border-subtle bg-[rgba(255,250,243,0.8)] p-4">
                  <div className="eyebrow">{t(locale, 'evidence_preview')}</div>
                  <p className="mt-2 text-sm leading-6 text-foreground-muted">
                    {leadRisk.evidencePreview || narrative(locale, leadRisk.theme, 'summary')}
                  </p>
                </div>
              </>
            ) : (
              <div className="rounded-[1.25rem] border border-dashed border-border-subtle bg-surface-raised p-4 text-sm leading-6 text-foreground-muted">
                {locale === 'ru'
                  ? 'Подгружаем приоритетный фокус и полный датасет для интерактивных секций.'
                  : 'Loading the immediate focus and the full dataset for interactive sections.'}
              </div>
            )}
          </aside>
        </div>
      </div>
    </header>
  );
}
