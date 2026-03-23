'use client';

import { cn } from '@/lib/utils';
import { t } from '@/lib/i18n';
import type { Locale } from '@/lib/data';
import { ChevronDown } from 'lucide-react';

type IconVariant = 'default' | 'evidence' | 'actions' | 'psychology' | 'improvements' | 'insights' | 'competitors' | 'roadmap' | 'sources';

const iconVariantStyles: Record<IconVariant, string> = {
  default: 'bg-accent-soft/60 text-foreground-muted',
  evidence: 'bg-surface-strong text-foreground-muted',
  actions: 'bg-positive-bg text-positive',
  psychology: 'bg-accent-soft text-accent',
  improvements: 'bg-primary/10 text-primary',
  insights: 'bg-minor-bg text-minor',
  competitors: 'bg-surface-strong text-foreground-muted',
  roadmap: 'bg-primary/10 text-primary',
  sources: 'bg-surface-strong text-foreground-soft',
};

interface CollapsibleSectionProps {
  id: string;
  icon: React.ReactNode;
  locale: Locale;
  title: string;
  description: string;
  summary: string;
  count?: number | string;
  children: React.ReactNode;
  open: boolean;
  onToggle: () => void;
  lazyMount?: boolean;
  motionDelayMs?: number;
  iconVariant?: IconVariant;
}

export function CollapsibleSection({
  id,
  icon,
  locale,
  title,
  description,
  summary,
  count,
  children,
  open,
  onToggle,
  lazyMount = false,
  motionDelayMs = 0,
  iconVariant = 'default',
}: CollapsibleSectionProps) {
  const iconStyle = iconVariantStyles[iconVariant] || iconVariantStyles.default;
  
  return (
    <section id={id} data-section={id} data-collapsed={String(!open)} className="section-divider first:border-t-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        className="group flex w-full items-start justify-between gap-4 px-5 py-6 text-left transition hover:bg-[rgba(255,250,243,0.5)] sm:px-6"
      >
        <div className="flex min-w-0 items-start gap-4">
          <span className={cn('mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition', iconStyle)}>
            {icon}
          </span>
          <div className="min-w-0 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-display text-xl font-semibold tracking-[-0.03em] text-foreground">{title}</h2>
              {count !== undefined ? <span className="badge-base badge-muted">{count}</span> : null}
            </div>
            <p className="text-sm leading-6 text-foreground-muted">{description}</p>
            <p className="text-sm leading-6 text-foreground-soft">{summary}</p>
          </div>
        </div>
        <span className="mt-0.5 inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface px-3 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-foreground-muted transition-colors group-hover:border-border-strong">
          {open ? t(locale, 'collapse') : t(locale, 'expand')}
          <ChevronDown className={cn('h-4 w-4 transition-transform duration-200', open && 'rotate-180')} />
        </span>
      </button>
      <div
        id={`${id}-panel`}
        style={open ? { transitionDelay: `${motionDelayMs}ms` } : undefined}
        className={cn(
          'grid transition-[grid-template-rows,opacity] duration-300 ease-out',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="overflow-hidden px-5 pb-6 sm:px-6">{open || !lazyMount ? children : null}</div>
      </div>
    </section>
  );
}
