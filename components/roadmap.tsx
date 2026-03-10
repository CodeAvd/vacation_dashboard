import type { Locale, RoadmapRow } from '@/lib/data';
import { t } from '@/lib/i18n';
import { cn } from '@/lib/utils';

interface RoadmapSectionProps {
  locale: Locale;
  rows: RoadmapRow[];
}

export function RoadmapSection({ locale, rows }: RoadmapSectionProps) {
  if (!rows.length) return <div className="surface-card p-5 text-sm leading-6 text-foreground-muted">{t(locale, 'no_roadmap')}</div>;

  const groups = rows.reduce<Record<string, RoadmapRow[]>>((acc, row) => {
    acc[row.window] ||= [];
    acc[row.window].push(row);
    return acc;
  }, {});

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
      {Object.entries(groups).map(([window, items]) => (
        <section key={window} className="surface-card p-5">
          <div className="eyebrow">{locale === 'ru' ? 'Окно поставки' : 'Delivery window'}</div>
          <h3 className="mt-2 font-display text-xl font-semibold tracking-[-0.03em] text-foreground">{window}</h3>
          <div className="mt-5 space-y-4 border-l border-border-subtle pl-4">
            {items.map((item) => (
              <article key={`${window}-${item.initiative}`} className={cn('timeline-step', item.urgency)}>
                <div className="rounded-[1.15rem] border border-border-subtle bg-surface-raised p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={item.urgency === 'critical' ? 'badge-base badge-critical' : item.urgency === 'major' ? 'badge-base badge-major' : 'badge-base badge-minor'}>
                      {item.urgency === 'critical' ? t(locale, 'severity_critical') : item.urgency === 'major' ? t(locale, 'severity_major') : t(locale, 'severity_minor')}
                    </span>
                  </div>
                  <h4 className="mt-3 text-base font-semibold text-foreground">{item.initiative}</h4>
                    <p className="mt-3 text-sm leading-6 text-foreground-muted"><strong>{locale === 'ru' ? 'Зависимость:' : 'Dependency:'}</strong> {localizeDependency(locale, item.dependency)}</p>
                  <p className="mt-3 font-mono text-xs uppercase tracking-[0.12em] text-foreground-soft">{t(locale, 'roadmap_delivery_note')}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function localizeDependency(locale: Locale, dependency: string) {
  if (locale === 'ru') return dependency;

  const map: Record<string, string> = {
    'Блокер reliability #1': 'Reliability blocker #1',
    'После базовой save-stability': 'After baseline save stability is secured',
    'После первой телеметрии патча': 'After the first telemetry patch lands',
    'После закрытия P0 reliability': 'After P0 reliability work is closed',
  };

  return map[dependency] || dependency;
}
