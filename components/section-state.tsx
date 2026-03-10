import type { Locale } from '@/lib/data';

interface SectionStateProps {
  locale: Locale;
  status: 'loading' | 'error';
}

export function SectionState({ locale, status }: SectionStateProps) {
  const copy =
    status === 'error'
      ? locale === 'ru'
        ? 'Не удалось загрузить полный датасет для этой секции.'
        : 'Could not load the full dataset for this section.'
      : locale === 'ru'
        ? 'Подгружаем полный датасет для интерактивной секции.'
        : 'Loading the full dataset for this interactive section.';

  return (
    <div className="rounded-[1.25rem] border border-dashed border-border-subtle bg-surface-raised px-4 py-5 text-sm leading-6 text-foreground-muted">
      {copy}
    </div>
  );
}

export function SectionSkeleton() {
  return (
      <div className="grid grid-cols-1 gap-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="overflow-hidden rounded-[1.25rem] border border-border-subtle bg-surface-raised p-4">
          <div className="h-3 w-24 rounded-full bg-border-subtle" />
          <div className="mt-3 h-6 w-2/3 rounded-full bg-border-subtle/80" />
          <div className="mt-4 space-y-2">
            <div className="h-3 rounded-full bg-border-subtle/70" />
            <div className="h-3 rounded-full bg-border-subtle/70" />
            <div className="h-3 w-5/6 rounded-full bg-border-subtle/70" />
          </div>
        </div>
      ))}
    </div>
  );
}
