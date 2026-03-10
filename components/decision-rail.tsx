import type { Locale } from '@/lib/data';
import { DECISION_RAIL_SECTIONS } from '@/lib/dashboard-sections';
import { t } from '@/lib/i18n';

interface DecisionRailProps {
  locale: Locale;
}

export function DecisionRail({ locale }: DecisionRailProps) {
  return (
    <div className="sticky top-0 z-30 overflow-x-hidden border-b border-border-subtle/80 bg-[rgba(246,241,232,0.9)] backdrop-blur md:static md:border-b-0 md:bg-transparent md:backdrop-blur-0">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="surface-card motion-fade-up motion-delay-2 flex w-full max-w-full items-center gap-3 overflow-hidden rounded-[1.35rem] px-3 py-2.5">
          <span className="hidden shrink-0 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-foreground-soft sm:inline">
            {locale === 'ru' ? 'Решения по разделам' : 'Decision rail'}
          </span>
          <nav className="decision-rail-scroller flex min-w-0 flex-1 gap-2 overflow-x-auto" aria-label="Section anchors">
            {DECISION_RAIL_SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="inline-flex shrink-0 items-center rounded-full border border-border-subtle bg-surface px-3 py-2 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-foreground-muted transition hover:border-border-strong hover:text-foreground"
              >
                {t(locale, section.navKey as Parameters<typeof t>[1])}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
