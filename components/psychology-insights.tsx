import type { Locale, PsychologyData } from '@/lib/data';
import { dopamineCopy, frictionCopy, impactLabel, personaCopy, t } from '@/lib/i18n';
import { Brain, HeartPulse, Sparkles } from 'lucide-react';

interface PsychologyInsightsProps {
  locale: Locale;
  data: PsychologyData;
}

export function PsychologyInsights({ locale, data }: PsychologyInsightsProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {data.personas.length ? data.personas.map((persona) => (
          <article key={persona.name} className="surface-card p-5">
            <div className="flex items-center gap-3 text-foreground-soft">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-accent-soft/60"><Brain className="h-4 w-4" /></span>
              <div>
                <div className="eyebrow">{t(locale, 'personas_heading')}</div>
                <h3 className="mt-1 font-display text-xl font-semibold tracking-[-0.03em] text-foreground">{personaCopy(locale, persona.name, 'name', persona.name)}</h3>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-foreground"><strong>{personaCopy(locale, persona.name, 'role', persona.role)}</strong></p>
            <p className="mt-3 text-sm leading-6 text-foreground-muted">{personaCopy(locale, persona.name, 'desc', persona.desc)}</p>
            <div className="mt-4 rounded-[1.2rem] border border-border-subtle bg-surface-raised p-4">
              <div className="eyebrow">{t(locale, 'action_label')}</div>
              <p className="mt-2 text-sm leading-6 text-foreground">{personaCopy(locale, persona.name, 'action', persona.action)}</p>
            </div>
          </article>
        )) : <div className="surface-card p-5 text-sm text-foreground-muted">{t(locale, 'no_personas')}</div>}
      </div>

      <div className="surface-card overflow-hidden">
        <div className="border-b border-border-subtle px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-accent-soft/60"><HeartPulse className="h-4 w-4" /></span>
            <div>
              <div className="eyebrow">{t(locale, 'friction_heading')}</div>
              <p className="mt-1 text-sm leading-6 text-foreground-muted">{t(locale, 'friction_expected_result')}</p>
            </div>
          </div>
        </div>
        {data.friction.length ? (
          <div className="overflow-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>{t(locale, 'friction_th_trigger')}</th>
                  <th>{t(locale, 'friction_th_issue')}</th>
                  <th>{t(locale, 'friction_th_solution')}</th>
                  <th>{t(locale, 'friction_th_impact')}</th>
                </tr>
              </thead>
              <tbody>
                {data.friction.map((row) => (
                  <tr key={row.trigger}>
                    <td>{frictionCopy(locale, row.trigger, 'trigger', row.trigger)}</td>
                    <td className="text-sm leading-6 text-foreground-muted">{frictionCopy(locale, row.trigger, 'issue', row.issue)}</td>
                    <td className="text-sm leading-6 text-foreground">{frictionCopy(locale, row.trigger, 'solution', row.solution)}</td>
                    <td><span className="badge-base badge-muted">{impactLabel(locale, row.impact)}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-5 text-sm text-foreground-muted">{t(locale, 'no_friction')}</div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {data.dopamine.length ? data.dopamine.map((row) => (
          <article key={row.name} className="surface-card p-5">
            <div className="flex items-center gap-3 text-foreground-soft">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[rgba(40,95,89,0.12)]"><Sparkles className="h-4 w-4" /></span>
              <div>
                <div className="eyebrow">{t(locale, 'dopamine_heading')}</div>
                <h3 className="mt-1 font-display text-xl font-semibold tracking-[-0.03em] text-foreground">{dopamineCopy(locale, row.name, 'name', row.name)}</h3>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-foreground-muted">{dopamineCopy(locale, row.name, 'desc', row.desc)}</p>
          </article>
        )) : <div className="surface-card p-5 text-sm text-foreground-muted">{t(locale, 'no_dopamine')}</div>}
      </div>
    </div>
  );
}
