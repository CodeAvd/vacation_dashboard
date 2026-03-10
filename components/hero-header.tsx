import type { DashboardData, Locale } from '@/lib/data';
import { formatNumber } from '@/lib/utils';
import { t } from '@/lib/i18n';
import { CalendarDays, Languages, Signal, Sparkles, Sigma } from 'lucide-react';

const sections = [
  { id: 'risks', key: 'nav_risks' },
  { id: 'bugs', key: 'nav_bugs' },
  { id: 'evidence', key: 'nav_evidence' },
  { id: 'actions', key: 'nav_actions' },
  { id: 'psychology', key: 'nav_psychology' },
  { id: 'improvements', key: 'nav_improvements' },
  { id: 'insights', key: 'nav_insights' },
  { id: 'competitors', key: 'nav_competitors' },
  { id: 'roadmap', key: 'nav_roadmap' },
  { id: 'sources', key: 'nav_sources' },
] as const;

interface HeroHeaderProps {
  locale: Locale;
  data: DashboardData;
  onLocaleChange: (locale: Locale) => void;
}

export function HeroHeader({ locale, data, onLocaleChange }: HeroHeaderProps) {
  const metaCards = [
    { icon: CalendarDays, label: t(locale, 'meta_date'), value: data.meta.actuality_date },
    { icon: Signal, label: t(locale, 'meta_raw'), value: formatNumber(data.meta.signals_raw) },
    { icon: Sparkles, label: t(locale, 'meta_unique'), value: formatNumber(data.meta.signals_unique) },
    { icon: Sigma, label: t(locale, 'meta_method'), value: '0.5F / 0.3S / 0.2R', hint: data.meta.method },
  ];

  return (
    <header className="relative overflow-hidden border-b border-border-subtle/80 bg-[linear-gradient(180deg,rgba(255,252,247,0.92),rgba(246,241,232,0.42))]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(196,120,90,0.12),transparent_34%),radial-gradient(circle_at_top_right,rgba(40,95,89,0.08),transparent_36%)]" />
      <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-7 sm:px-6 lg:px-8 lg:pb-10 lg:pt-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-[0.72rem] uppercase tracking-[0.16em] text-foreground-soft">
              <span className="rounded-full border border-border-subtle bg-surface/80 px-3 py-1 font-mono">Vacation Cafe Simulator</span>
              <span className="rounded-full border border-border-subtle bg-surface/70 px-3 py-1 font-mono">Bug-first cockpit</span>
              <span className="rounded-full border border-border-subtle bg-surface/70 px-3 py-1 font-mono">GitHub Pages static export</span>
            </div>
            <div className="space-y-3">
              <p className="eyebrow">{locale === 'ru' ? 'Product feedback operating layer' : 'Product feedback operating layer'}</p>
              <h1 className="max-w-4xl text-balance font-display text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl xl:text-[3.5rem] xl:leading-[1.02]">
                {t(locale, 'hero_title')}
              </h1>
              <p className="max-w-3xl text-pretty text-[1rem] leading-7 text-foreground-muted sm:text-[1.05rem]">
                {t(locale, 'hero_sub')} <span className="font-semibold text-foreground">{data.meta.actuality_date}</span>
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
            <p className="max-w-sm text-right text-sm leading-6 text-foreground-soft">
              {locale === 'ru'
                ? 'Главный экран отвечает на один вопрос: что чинить и выпускать первым, чтобы не сломать cozy-ядро игры.'
                : 'The first screen answers one question: what must ship or be fixed first to protect the cozy core of the game.'}
            </p>
          </div>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {metaCards.map(({ icon: Icon, label, value, hint }) => (
            <div key={label} className="surface-card surface-card-hover flex min-h-[108px] flex-col justify-between p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="eyebrow">{label}</span>
                <Icon className="h-4 w-4 text-foreground-soft" />
              </div>
              <div>
                <div className="font-display text-2xl font-semibold tracking-[-0.03em] text-foreground">
                  {value}
                </div>
                {hint ? <p className="mt-2 text-sm leading-6 text-foreground-muted">{hint}</p> : null}
              </div>
            </div>
          ))}
        </div>

        <nav className="mt-6 flex flex-wrap gap-2" aria-label="Section anchors">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="inline-flex items-center rounded-full border border-border-subtle bg-surface/90 px-4 py-2 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-foreground-muted transition hover:border-border-strong hover:text-foreground"
            >
              {t(locale, section.key)}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
