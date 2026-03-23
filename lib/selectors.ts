import {
  DEFAULT_UI_STATE,
  SEVERITY_BY_THEME,
  SOURCE_KEY_MAP,
  type ActionRow,
  type ActionStatus,
  type BugCluster,
  type Category,
  type DashboardData,
  type DashboardUIState,
  type FeedbackSignal,
  type ImprovementRow,
  type InsightRow,
  type Locale,
  type Severity,
  type Source,
  type TopRisk,
} from '@/lib/data';
import {
  buildBugClustersFromSignals,
  buildTopRisksFromSignals,
  inferFeedbackDescriptor,
  isSignalWithinDateRange,
  normalizeDateValue,
  sortSignalsByObservedDate,
} from '@/lib/signal-analytics';

export const SOURCE_OPTIONS: Array<Source | 'all'> = ['all', 'Steam', 'Discord', 'YouTube', 'Forum'];
export const SEVERITY_OPTIONS: Array<Severity | 'all'> = ['all', 'critical', 'major', 'minor'];
export const CATEGORY_OPTIONS: Array<Category | 'all'> = ['all', 'QoL', 'Gameplay', 'Retention', 'USP'];
export const STATUS_OPTIONS: Array<ActionRow['status'] | 'all'> = ['all', 'shipping', 'hypothesis'];
export const SORT_OPTIONS: Array<DashboardUIState['sort']> = ['desc', 'asc'];

export function normalizeSource(value: string | undefined | null): Source {
  return SOURCE_KEY_MAP[String(value || '')] || 'Unknown';
}

export function normalizeSourceFromUrl(url: string | undefined | null): Source | '' {
  const href = String(url || '').trim();
  if (!href) return '';
  try {
    const host = new URL(href).hostname.toLowerCase();
    if (host.includes('steamcommunity.com') || host.includes('steampowered.com')) return 'Steam';
    if (host.includes('discord.com')) return 'Discord';
    if (host.includes('youtube.com') || host.includes('youtu.be')) return 'YouTube';
  } catch {}
  return '';
}

export function getAllThemes(data: DashboardData): string[] {
  const set = new Set<string>();
  data.theme_scores.forEach((row) => row.theme && set.add(row.theme));
  data.feedback_signals.forEach((row) => row.theme && set.add(row.theme));
  data.actions.forEach((row) => row.theme && set.add(row.theme));
  data.improvements.forEach((row) => row.linked_theme && set.add(row.linked_theme));
  [...data.insights_shipping, ...data.insights_hypothesis].forEach((row) => {
    const theme = getItemTheme(row as unknown as Record<string, unknown>, data);
    if (theme) set.add(theme);
  });
  return [...set].sort((a, b) => a.localeCompare(b));
}

export function getAllSources(data: DashboardData): Source[] {
  const set = new Set<Source>();
  data.feedback_signals.forEach((row) => set.add(normalizeSource(row.source)));
  set.delete('Unknown');
  set.add('Forum');
  return [...set].sort((a, b) => a.localeCompare(b)) as Source[];
}

export function getCandidateSources(item: Record<string, unknown>, data: DashboardData): Source[] {
  const sources = new Set<Source>();
  const push = (value?: string | null) => {
    const normalized = normalizeSource(value);
    if (normalized !== 'Unknown') sources.add(normalized);
  };

  push(item.source as string | undefined);
  push(normalizeSourceFromUrl(item.url as string | undefined));
  push(normalizeSourceFromUrl(item.problem_link as string | undefined));
  (item.source_refs as string[] | undefined)?.forEach((ref) => push(normalizeSourceFromUrl(ref)));

  const theme = getItemTheme(item, data);
  if (theme) {
    data.feedback_signals.forEach((signal) => {
      if (signal.theme === theme) push(signal.source);
    });
  }

  return sources.size ? [...sources] : ['Unknown'];
}

export function getThemeSeverity(theme: string): Severity {
  return SEVERITY_BY_THEME[theme] || 'minor';
}

export function severityRank(severity: Severity): number {
  if (severity === 'critical') return 3;
  if (severity === 'major') return 2;
  return 1;
}

export function priorityRank(priority: string): number {
  if (priority === 'P0') return 3;
  if (priority === 'P1') return 2;
  return 1;
}

export function guessCategory(theme: string, data: DashboardData): Category {
  return (data.actions.find((row) => row.theme === theme)?.category || 'QoL') as Category;
}

export function selectFilteredSignals(state: DashboardUIState, data: DashboardData): FeedbackSignal[] {
  const rows = data.feedback_signals.filter((row) => {
    const source = normalizeSource(row.source);
    const theme = row.theme || '';
    const severity = row.severity || getThemeSeverity(theme);
    const category = guessCategory(theme, data);
    const statuses = getThemeStatuses(theme, data);

    const sourceOk = state.source === 'all' || source === state.source;
    const themeOk = state.theme === 'all' || theme === state.theme;
    const severityOk = state.severity === 'all' || severity === state.severity;
    const categoryOk = state.category === 'all' || category === state.category;
    const statusOk = state.status === 'all' || statuses.has(state.status);
    const dateOk = isSignalWithinDateRange(row, state.dateFrom, state.dateTo);
    return sourceOk && themeOk && severityOk && categoryOk && statusOk && dateOk;
  });

  return sortSignalsByObservedDate(rows);
}

export function selectTopRisks(state: DashboardUIState, data: DashboardData): TopRisk[] {
  return buildTopRisksFromSignals(selectFilteredSignals(state, data), state.sort);
}

export function selectBugClusters(state: DashboardUIState, data: DashboardData): BugCluster[] {
  return buildBugClustersFromSignals(selectFilteredSignals(state, data), state.sort);
}

export function selectEvidence(state: DashboardUIState, data: DashboardData): FeedbackSignal[] {
  return selectFilteredSignals(state, data);
}

export function selectActions(state: DashboardUIState, data: DashboardData): ActionRow[] {
  return [...data.actions]
    .filter((row) => matchesBaseFilters(row as unknown as Record<string, unknown>, state, data))
    .sort((left, right) => priorityRank(right.priority) - priorityRank(left.priority));
}

export function selectImprovements(state: DashboardUIState, data: DashboardData): ImprovementRow[] {
  return data.improvements.filter((row) => matchesBaseFilters(row as unknown as Record<string, unknown>, state, data));
}

export function selectInsights(state: DashboardUIState, data: DashboardData): InsightRow[] {
  return [...data.insights_shipping, ...data.insights_hypothesis].filter((row) =>
    matchesBaseFilters(row as unknown as Record<string, unknown>, state, data),
  );
}

export function selectSourceBreakdown(signals: FeedbackSignal[]): Array<{ source: Source; count: number; percentage: number }> {
  const total = signals.length || 1;
  const counts = signals.reduce<Record<string, number>>((acc, row) => {
    const source = normalizeSource(row.source);
    acc[source] = (acc[source] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts)
    .map(([source, count]) => ({ source: source as Source, count, percentage: Math.round((count / total) * 100) }))
    .sort((a, b) => b.count - a.count);
}

function matchesBaseFilters(item: Record<string, unknown>, state: DashboardUIState, data: DashboardData): boolean {
  const theme = getItemTheme(item, data);
  const sources = getCandidateSources(item, data);
  const severity = (item.severity as Severity | undefined) || getThemeSeverity(theme);
  const category = String(item.category || guessCategory(theme, data));
  const rowStatus = String(item.status || '');

  const passTheme = state.theme === 'all' || theme === state.theme;
  const passSource = state.source === 'all' || sources.includes(state.source);
  const passSeverity = state.severity === 'all' || severity === state.severity;
  const passStatus =
    state.status === 'all' || (rowStatus ? rowStatus === state.status : getThemeStatuses(theme, data).has(state.status));
  const passCategory = state.category === 'all' || category === state.category;
  const passDate = !hasActiveDateRange(state) || hasSignalsInActiveWindow(theme, state, data);

  return passTheme && passSource && passSeverity && passStatus && passCategory && passDate;
}

function getItemTheme(item: Record<string, unknown>, data: DashboardData): string {
  const explicitTheme = String(item.theme || item.name || item.linked_theme || '').trim();
  if (explicitTheme) return explicitTheme;

  const matchedBySourceRef = (item.source_refs as string[] | undefined)
    ?.map((ref) => data.feedback_signals.find((signal) => signal.url === ref)?.theme)
    .find(Boolean);
  if (matchedBySourceRef) return matchedBySourceRef;

  const inferred = inferFeedbackDescriptor(`${String(item.title || '')} ${String(item.solution || '')}`);
  return inferred?.theme || '';
}

function getThemeStatuses(theme: string, data: DashboardData): Set<ActionStatus> {
  const statuses = new Set<ActionStatus>();
  if (!theme) return statuses;

  data.actions.forEach((row) => {
    if (row.theme === theme) statuses.add(row.status);
  });

  [...data.insights_shipping, ...data.insights_hypothesis].forEach((row) => {
    if (getItemTheme(row as unknown as Record<string, unknown>, data) === theme) {
      statuses.add(row.status);
    }
  });

  return statuses;
}

function hasActiveDateRange(state: DashboardUIState): boolean {
  return Boolean(normalizeDateValue(state.dateFrom) || normalizeDateValue(state.dateTo));
}

function hasSignalsInActiveWindow(theme: string, state: DashboardUIState, data: DashboardData): boolean {
  if (!theme) return true;

  return data.feedback_signals.some((signal) => {
    if (signal.theme !== theme) return false;
    if (state.source !== 'all' && normalizeSource(signal.source) !== state.source) return false;
    return isSignalWithinDateRange(signal, state.dateFrom, state.dateTo);
  });
}

export function inferBugCause(locale: Locale, theme: string): string {
  const map: Record<string, { ru: string; en: string }> = {
    'Save loss': {
      ru: 'Несогласованность формата сохранений между версиями и неполный путь восстановления.',
      en: 'Save format drift between builds and an incomplete recovery path.',
    },
    'Co-op stability': {
      ru: 'Сетевые таймауты и рассинхронизация состояния между хостом и клиентами.',
      en: 'Network timeout and state desync between host and clients.',
    },
    'Co-op task sync': {
      ru: 'Общая логика задач и покупок не синхронизирует состояние между участниками лобби.',
      en: 'Shared task and purchase logic is not synchronizing across the lobby.',
    },
    Performance: {
      ru: 'Переизбыточная нагрузка рендера и неоптимальные графические профили.',
      en: 'Render overload and non-optimal quality profiles.',
    },
    'Controls/UI friction': {
      ru: 'Неинтуитивные паттерны ввода и высокая стоимость действий в основном цикле.',
      en: 'Unintuitive input patterns and high click-cost in the core loop.',
    },
    'Inventory friction': {
      ru: 'Инвентарь и поверхности хранения не поддерживают нужную глубину подготовки и контроль слотов.',
      en: 'Inventory and storage surfaces do not support the prep depth and slot control players expect.',
    },
    'Steam Deck cursor/input': {
      ru: 'Сбой фокуса курсора и платформенная несовместимость, воспроизводимая после стола нарезки на Steam Deck/Linux.',
      en: 'Cursor focus/rendering failure with platform-specific incompatibility after cut-table interaction on Steam Deck/Linux.',
    },
    'Day-cycle challenge': {
      ru: 'В цикле дня отсутствуют явные ставки, таймер терпения и понятный ритуал завершения дня.',
      en: 'The day loop lacks clear stakes, patience pressure, and a proper end-of-day ritual.',
    },
    'Customer flow stall': {
      ru: 'Поток клиентов зависает из-за ошибки состояния открытия кафе или сломанного триггера спавна.',
      en: 'Customer flow stalls due to broken open-state logic or a failed spawn trigger.',
    },
    'Shutdown hang': {
      ru: 'Процесс закрытия не освобождает Steam/overlay hooks и оставляет игру в подвешенном состоянии.',
      en: 'Shutdown does not fully release Steam/overlay hooks and leaves the app in limbo.',
    },
    'Object placement lock': {
      ru: 'Состояние предмета в руках и валидность поверхностей расходятся, из-за чего объект нельзя положить обратно.',
      en: 'Held-item state and valid surface binding drift apart, so the object can no longer be placed.',
    },
    'AI-art perception': {
      ru: 'Сигнал по доверию к бренду и ощущению визуальной аутентичности.',
      en: 'A concern around brand trust and perceived authenticity.',
    },
    Localization: {
      ru: 'Нехватка языкового покрытия и непоследовательный текстовый слой интерфейса.',
      en: 'Insufficient language coverage and an inconsistent copy layer.',
    },
  };
  return map[theme]?.[locale] || (locale === 'ru' ? 'Требуется дополнительная диагностика источников.' : 'Needs additional source diagnostics.');
}

export function inferFixTrack(locale: Locale, priority: string): string {
  if (priority === 'P0') {
    return locale === 'ru' ? 'Горячее исправление + регрессионная проверка QA в текущем цикле.' : 'Hotfix + QA regression in the current cycle.';
  }
  if (priority === 'P1') {
    return locale === 'ru' ? 'Спринтовое исправление с проверкой KPI-эффекта.' : 'Sprint fix with KPI impact validation.';
  }
  return locale === 'ru'
    ? 'Бэклог + A/B-тест или исследование перед выпуском в продакшен.'
    : 'Backlog + A/B or discovery before production rollout.';
}

export function getPersistedState(): DashboardUIState {
  if (typeof window === 'undefined') return DEFAULT_UI_STATE;
  try {
    const localeRaw = window.localStorage.getItem('vcs_locale');
    const filtersRaw = window.localStorage.getItem('vcs_filters');
    const locale = localeRaw === 'en' ? 'en' : 'ru';
    const parsed = filtersRaw ? (JSON.parse(filtersRaw) as Partial<DashboardUIState>) : {};
    return {
      ...DEFAULT_UI_STATE,
      ...parsed,
      locale,
      dateFrom: normalizeDateValue(parsed.dateFrom) ?? null,
      dateTo: normalizeDateValue(parsed.dateTo) ?? null,
      expandedSections: {
        ...DEFAULT_UI_STATE.expandedSections,
        ...(parsed.expandedSections || {}),
        filters: DEFAULT_UI_STATE.expandedSections.filters,
      },
      sort: parsed.sort === 'asc' ? 'asc' : 'desc',
    };
  } catch {
    return DEFAULT_UI_STATE;
  }
}

export function persistState(state: DashboardUIState): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem('vcs_locale', state.locale);
    window.localStorage.setItem(
      'vcs_filters',
      JSON.stringify({
        theme: state.theme,
        source: state.source,
        severity: state.severity,
        category: state.category,
        status: state.status,
        dateFrom: state.dateFrom,
        dateTo: state.dateTo,
        sort: state.sort,
        expandedSections: {
          ...state.expandedSections,
          filters: DEFAULT_UI_STATE.expandedSections.filters,
        },
      }),
    );
  } catch {}
}
