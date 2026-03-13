import {
  dashboardData,
  DEFAULT_UI_STATE,
  SEVERITY_BY_THEME,
  SOURCE_KEY_MAP,
  type ActionRow,
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
  type ThemeScore,
} from '@/lib/data';

export interface RiskRow extends ThemeScore {
  severity: Severity;
  evidencePreview: string;
  sourceUrl?: string;
}

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

export function getAllThemes(data: DashboardData = dashboardData): string[] {
  const set = new Set<string>();
  data.theme_scores.forEach((row) => row.theme && set.add(row.theme));
  data.feedback_signals.forEach((row) => row.theme && set.add(row.theme));
  data.actions.forEach((row) => row.theme && set.add(row.theme));
  data.improvements.forEach((row) => row.linked_theme && set.add(row.linked_theme));
  return [...set].sort((a, b) => a.localeCompare(b));
}

export function getQuickThemes(data: DashboardData = dashboardData): string[] {
  return data.theme_scores
    .filter((row) => String(row.sentiment).toLowerCase() === 'negative')
    .sort((a, b) => b.priority_score - a.priority_score)
    .slice(0, 6)
    .map((row) => row.theme);
}

export function getAllSources(data: DashboardData = dashboardData): Source[] {
  const set = new Set<Source>();
  data.feedback_signals.forEach((row) => set.add(normalizeSource(row.source)));
  set.delete('Unknown');
  set.add('Forum');
  return [...set].sort((a, b) => a.localeCompare(b)) as Source[];
}

export function getCandidateSources(item: Record<string, unknown>, data: DashboardData = dashboardData): Source[] {
  const sources = new Set<Source>();
  const push = (value?: string | null) => {
    const normalized = normalizeSource(value);
    if (normalized !== 'Unknown') sources.add(normalized);
  };

  push(item.source as string | undefined);
  push(normalizeSourceFromUrl(item.url as string | undefined));
  push(normalizeSourceFromUrl(item.problem_link as string | undefined));
  (item.source_refs as string[] | undefined)?.forEach((ref) => push(normalizeSourceFromUrl(ref)));

  const theme = String(item.theme || item.linked_theme || item.name || '');
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

export function scoreSort<T extends { priority_score?: number; score?: number }>(rows: T[], sort: DashboardUIState['sort']): T[] {
  return [...rows].sort((a, b) => {
    const left = Number(a.priority_score ?? a.score ?? 0);
    const right = Number(b.priority_score ?? b.score ?? 0);
    return sort === 'asc' ? left - right : right - left;
  });
}

export function matchesBaseFilters(item: Record<string, unknown>, state: DashboardUIState, data: DashboardData = dashboardData): boolean {
  const theme = String(item.theme || item.name || item.linked_theme || '');
  const sources = getCandidateSources(item, data);
  const severity = (item.severity as Severity | undefined) || getThemeSeverity(theme);
  const status = String(item.status || 'shipping');
  const category = String(item.category || 'QoL');

  const passTheme = state.theme === 'all' || theme === state.theme;
  const passSource = state.source === 'all' || sources.includes(state.source);
  const passSeverity = state.severity === 'all' || severity === state.severity;
  const passStatus = state.status === 'all' || status === state.status;
  const passCategory = state.category === 'all' || category === state.category;
  return passTheme && passSource && passSeverity && passStatus && passCategory;
}

export function selectTopRisks(state: DashboardUIState, data: DashboardData = dashboardData): RiskRow[] {
  const rows = data.theme_scores
    .filter((row) => String(row.sentiment).toLowerCase() === 'negative')
    .map((row) => ({ ...row, severity: getThemeSeverity(row.theme) }))
    .filter((row) => {
      const passTheme = state.theme === 'all' || row.theme === state.theme;
      const passSeverity = state.severity === 'all' || row.severity === state.severity;
      const passSource =
        state.source === 'all' ||
        data.feedback_signals.some((signal) => signal.theme === row.theme && normalizeSource(signal.source) === state.source);
      return passTheme && passSeverity && passSource;
    });

  return scoreSort(rows, state.sort)
    .slice(0, 3)
    .map((row) => {
      const riskSignals = data.feedback_signals.filter((signal) => signal.theme === row.theme);
      return {
        ...row,
        evidencePreview: riskSignals[0]?.quote || '',
        sourceUrl: riskSignals.find((signal) => signal.url)?.url,
      };
    });
}

export function selectBugClusters(state: DashboardUIState, data: DashboardData = dashboardData): BugCluster[] {
  const rows = data.bug_clusters.filter((row) => {
    const sourceOk =
      state.source === 'all' ||
      Object.entries(row.source_breakdown || {}).some(([source, count]) => Number(count) > 0 && normalizeSource(source) === state.source);
    const themeOk = state.theme === 'all' || row.name === state.theme;
    const severityOk = state.severity === 'all' || row.severity === state.severity;
    return sourceOk && themeOk && severityOk;
  });

  return scoreSort(rows, state.sort);
}

export function guessCategory(theme: string, data: DashboardData = dashboardData): Category {
  return (data.actions.find((row) => row.theme === theme)?.category || 'QoL') as Category;
}

export function selectEvidence(state: DashboardUIState, data: DashboardData = dashboardData): FeedbackSignal[] {
  const rows = data.feedback_signals.filter((row) => {
    const source = normalizeSource(row.source);
    const theme = row.theme || '';
    const severity = row.severity || getThemeSeverity(theme);
    const category = guessCategory(theme, data);

    const sourceOk = state.source === 'all' || source === state.source;
    const themeOk = state.theme === 'all' || theme === state.theme;
    const severityOk = state.severity === 'all' || severity === state.severity;
    const categoryOk = state.category === 'all' || category === state.category;
    return sourceOk && themeOk && severityOk && categoryOk;
  });

  return rows;
}

export function selectActions(state: DashboardUIState, data: DashboardData = dashboardData): ActionRow[] {
  return [...data.actions]
    .filter((row) => matchesBaseFilters(row as unknown as Record<string, unknown>, state, data))
    .sort((a, b) => priorityRank(b.priority) - priorityRank(a.priority));
}

export function selectImprovements(state: DashboardUIState, data: DashboardData = dashboardData): ImprovementRow[] {
  return data.improvements.filter((row) => {
    const themeOk = state.theme === 'all' || row.linked_theme === state.theme;
    const severityOk = state.severity === 'all' || getThemeSeverity(row.linked_theme) === state.severity;
    const categoryOk = state.category === 'all' || row.category === state.category;
    const sourceOk = state.source === 'all' || getCandidateSources(row as unknown as Record<string, unknown>, data).includes(state.source);
    return themeOk && severityOk && categoryOk && sourceOk;
  });
}

export function selectInsights(state: DashboardUIState, data: DashboardData = dashboardData): InsightRow[] {
  return [...data.insights_shipping, ...data.insights_hypothesis].filter((row) => matchesBaseFilters(row as unknown as Record<string, unknown>, state, data));
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
      expandedSections: {
        ...DEFAULT_UI_STATE.expandedSections,
        ...(parsed.expandedSections || {}),
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
        sort: state.sort,
        expandedSections: state.expandedSections,
      }),
    );
  } catch {}
}
