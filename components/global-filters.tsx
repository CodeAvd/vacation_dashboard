'use client';

import type { Category, DashboardUIState, Locale, Severity, Source } from '@/lib/data';
import { categoryLabel, sourceLabel, t, themeLabel } from '@/lib/i18n';
import { CATEGORY_OPTIONS, SEVERITY_OPTIONS, SORT_OPTIONS } from '@/lib/selectors';
import { cn } from '@/lib/utils';
import { ChevronDown, RotateCcw, SlidersHorizontal, X } from 'lucide-react';

interface GlobalFiltersProps {
  locale: Locale;
  uiState: DashboardUIState;
  themes: string[];
  sources: Source[];
  signalDateRange: {
    min: string;
    max: string;
  };
  activeCount: number;
  isOpen: boolean;
  dataReady: boolean;
  onChange: (patch: Partial<DashboardUIState>) => void;
  onToggleOpen: () => void;
  onReset: () => void;
}

export function GlobalFilters({
  locale,
  uiState,
  themes,
  sources,
  signalDateRange,
  activeCount,
  isOpen,
  dataReady,
  onChange,
  onToggleOpen,
  onReset,
}: GlobalFiltersProps) {
  const toggleLabel = locale === 'ru' ? (isOpen ? 'Скрыть фильтры' : 'Показать фильтры') : isOpen ? 'Hide filters' : 'Show filters';
  const activeSummary =
    activeCount === 0
      ? locale === 'ru'
        ? 'Фильтры не активны'
        : 'No active filters'
      : locale === 'ru'
        ? `Активных фильтров: ${activeCount}`
        : `${activeCount} active filters`;
  const dataSummary = dataReady
    ? locale === 'ru'
      ? 'Полный датасет готов'
      : 'Full dataset ready'
    : locale === 'ru'
      ? 'Подгружаем интерактивные секции'
      : 'Loading interactive sections';
  const showResetButton = activeCount > 0;

  return (
    <section id="filters" data-section="filters" data-collapsed={String(!isOpen)} className="section-divider">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="surface-card rounded-[1.4rem] p-3.5 md:p-4">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <div className="min-w-0 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface-raised px-3 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-foreground-soft">
                    <SlidersHorizontal className="h-3.5 w-3.5" />
                    {t(locale, 'filters_title')}
                  </div>
                  <span className={cn('badge-base', activeCount > 0 ? 'badge-positive' : 'badge-muted')}>{activeSummary}</span>
                  {signalDateRange.min && signalDateRange.max ? (
                    <span className="badge-base badge-muted">
                      {t(locale, 'signals_date_range')}: {signalDateRange.min} → {signalDateRange.max}
                    </span>
                  ) : null}
                </div>
                <p className="max-w-3xl text-[0.92rem] leading-5 text-foreground-muted">{t(locale, 'filters_desc')}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2 xl:justify-end">
                <span className="badge-base badge-muted hidden sm:inline-flex">{dataSummary}</span>
                <div className="hidden items-center gap-2 rounded-full border border-border-subtle bg-surface px-3 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-foreground-soft lg:inline-flex">
                  <span>{t(locale, 'filters_state_prefix')}</span>
                  <span className="rounded-full bg-accent-soft px-2 py-1 text-[0.68rem] text-foreground">sort={uiState.sort}</span>
                </div>
                {showResetButton ? (
                  <button
                    type="button"
                    onClick={onReset}
                    className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface px-3.5 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-foreground-muted transition hover:border-border-strong hover:text-foreground"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    {t(locale, 'reset_btn')}
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={onToggleOpen}
                  aria-expanded={isOpen}
                  aria-controls="filters-panel"
                  className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface px-3.5 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-foreground-muted transition hover:border-border-strong hover:text-foreground"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  {toggleLabel}
                  <ChevronDown className={cn('h-3.5 w-3.5 transition-transform duration-200', isOpen && 'rotate-180')} />
                </button>
              </div>
            </div>

            <div
              id="filters-panel"
              className={cn(
                'grid transition-[grid-template-rows,opacity] duration-300 ease-out',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
              )}
            >
              <div className="overflow-hidden">
                <div className="grid grid-cols-1 gap-3 border-t border-border-subtle/70 pt-3 md:grid-cols-2 xl:grid-cols-4">
                  <FilterField
                    fieldId="filter-theme"
                    label={t(locale, 'label_theme')}
                    value={uiState.theme}
                    onChange={(value) => onChange({ theme: value })}
                    options={[{ value: 'all', label: t(locale, 'all_themes') }, ...themes.map((theme) => ({ value: theme, label: themeLabel(locale, theme) }))]}
                  />
                  <FilterField
                    fieldId="filter-source"
                    label={t(locale, 'label_source')}
                    value={uiState.source}
                    onChange={(value) => onChange({ source: value as DashboardUIState['source'] })}
                    options={[{ value: 'all', label: t(locale, 'all_sources') }, ...sources.map((source) => ({ value: source, label: sourceLabel(locale, source) }))]}
                  />
                  <FilterField
                    fieldId="filter-severity"
                    label={t(locale, 'label_severity')}
                    value={uiState.severity}
                    onChange={(value) => onChange({ severity: value as Severity | 'all' })}
                    options={SEVERITY_OPTIONS.map((severity) => ({
                      value: severity,
                      label:
                        severity === 'all'
                          ? t(locale, 'all_severity')
                          : severity === 'critical'
                            ? t(locale, 'severity_critical')
                            : severity === 'major'
                              ? t(locale, 'severity_major')
                              : t(locale, 'severity_minor'),
                    }))}
                  />
                  <FilterField
                    fieldId="filter-category"
                    label={t(locale, 'label_category')}
                    value={uiState.category}
                    onChange={(value) => onChange({ category: value as Category | 'all' })}
                    options={CATEGORY_OPTIONS.map((category) => ({
                      value: category,
                      label: category === 'all' ? t(locale, 'all_categories') : categoryLabel(locale, category),
                    }))}
                  />
                  <FilterField
                    fieldId="filter-status"
                    label={t(locale, 'label_status')}
                    value={uiState.status}
                    onChange={(value) => onChange({ status: value as DashboardUIState['status'] })}
                    options={[
                      { value: 'all', label: t(locale, 'all_statuses') },
                      { value: 'shipping', label: t(locale, 'status_shipping') },
                      { value: 'hypothesis', label: t(locale, 'status_hypothesis') },
                    ]}
                  />
                  <DateField
                    fieldId="filter-date-from"
                    label={t(locale, 'label_date_from')}
                    value={uiState.dateFrom ?? ''}
                    min={signalDateRange.min}
                    max={signalDateRange.max}
                    onChange={(value) => onChange({ dateFrom: value || null })}
                  />
                  <DateField
                    fieldId="filter-date-to"
                    label={t(locale, 'label_date_to')}
                    value={uiState.dateTo ?? ''}
                    min={signalDateRange.min}
                    max={signalDateRange.max}
                    onChange={(value) => onChange({ dateTo: value || null })}
                  />
                  <FilterField
                    fieldId="filter-sort"
                    label={t(locale, 'label_sort')}
                    value={uiState.sort}
                    onChange={(value) => onChange({ sort: value as DashboardUIState['sort'] })}
                    options={SORT_OPTIONS.map((sort) => ({ value: sort, label: sort === 'desc' ? t(locale, 'sort_desc') : t(locale, 'sort_asc') }))}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FilterField({
  fieldId,
  label,
  value,
  onChange,
  options,
}: {
  fieldId: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <label htmlFor={fieldId} className="flex min-w-0 flex-col gap-1.5">
      <span className="eyebrow">{label}</span>
      <select id={fieldId} name={fieldId} className="filter-select h-11 py-0" value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function DateField({
  fieldId,
  label,
  value,
  min,
  max,
  onChange,
}: {
  fieldId: string;
  label: string;
  value: string;
  min?: string;
  max?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label htmlFor={fieldId} className="flex min-w-0 flex-col gap-1.5">
      <span className="eyebrow">{label}</span>
      <input
        id={fieldId}
        name={fieldId}
        type="date"
        className="filter-select h-11 py-0"
        value={value}
        min={min}
        max={max}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

interface ActiveFilterChipsProps {
  locale: Locale;
  uiState: DashboardUIState;
  onChange: (patch: Partial<DashboardUIState>) => void;
  onReset: () => void;
}

export function ActiveFilterChips({ locale, uiState, onChange, onReset }: ActiveFilterChipsProps) {
  const chips: Array<{ key: string; label: string; clear: Partial<DashboardUIState> }> = [];

  if (uiState.theme !== 'all') chips.push({ key: 'theme', label: `${t(locale, 'label_theme')}: ${themeLabel(locale, uiState.theme)}`, clear: { theme: 'all' } });
  if (uiState.source !== 'all') chips.push({ key: 'source', label: `${t(locale, 'label_source')}: ${sourceLabel(locale, uiState.source)}`, clear: { source: 'all' } });
  if (uiState.severity !== 'all') chips.push({ key: 'severity', label: `${t(locale, 'label_severity')}: ${uiState.severity === 'critical' ? t(locale, 'severity_critical') : uiState.severity === 'major' ? t(locale, 'severity_major') : t(locale, 'severity_minor')}`, clear: { severity: 'all' } });
  if (uiState.category !== 'all') chips.push({ key: 'category', label: `${t(locale, 'label_category')}: ${categoryLabel(locale, uiState.category)}`, clear: { category: 'all' } });
  if (uiState.status !== 'all') chips.push({ key: 'status', label: `${t(locale, 'label_status')}: ${uiState.status === 'shipping' ? t(locale, 'status_shipping') : t(locale, 'status_hypothesis')}`, clear: { status: 'all' } });
  if (uiState.dateFrom || uiState.dateTo) {
    const dateLabel =
      uiState.dateFrom && uiState.dateTo
        ? `${uiState.dateFrom} → ${uiState.dateTo}`
        : uiState.dateFrom
          ? `${t(locale, 'label_date_from')}: ${uiState.dateFrom}`
          : `${t(locale, 'label_date_to')}: ${uiState.dateTo}`;
    chips.push({ key: 'date-range', label: `${t(locale, 'label_date_range')}: ${dateLabel}`, clear: { dateFrom: null, dateTo: null } });
  }
  if (uiState.sort !== 'desc') chips.push({ key: 'sort', label: `${t(locale, 'label_sort')}: ${uiState.sort === 'asc' ? t(locale, 'sort_asc') : t(locale, 'sort_desc')}`, clear: { sort: 'desc' } });

  if (!chips.length) return null;

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={() => onChange(chip.clear)}
          className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface px-3 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.08em] text-foreground-muted transition hover:border-border-strong hover:text-foreground"
        >
          <span>{chip.label}</span>
          <X className="h-3.5 w-3.5" />
        </button>
      ))}
      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center gap-2 rounded-full bg-foreground px-3 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.08em] text-white"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        {t(locale, 'label_reset')}
      </button>
    </div>
  );
}
