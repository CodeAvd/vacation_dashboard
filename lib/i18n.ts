import type { Locale } from '@/lib/data';

export const uiCopy = {
  ru: {
    page_title: 'VCS - Операционный дашборд по багам и фидбеку',
    hero_title: 'VCS - Операционный дашборд по багам и фидбеку',
    hero_sub: 'Операционный дашборд для продуктовых решений: в приоритете критичные баги и сигналы игроков, затем инициативы, инсайты, поведенческая аналитика и дорожная карта. Дата актуальности:',
    meta_date: 'Актуальность данных',
    meta_raw: 'Сырые сигналы',
    meta_unique: 'Уникальные сигналы',
    meta_method: 'Метод скоринга',
    nav_risks: 'Топ-риски',
    nav_bugs: 'Баг-триаж',
    nav_evidence: 'Сигналы',
    nav_actions: 'План действий',
    nav_psychology: 'Психология',
    nav_improvements: 'Пул улучшений',
    nav_insights: 'Инсайты',
    nav_competitors: 'Конкуренты',
    nav_roadmap: 'Дорожная карта',
    nav_sources: 'Источники',
    locale_ru: 'RU',
    locale_en: 'EN',
    filters_title: 'Глобальные фильтры',
    filters_desc: 'Фильтры синхронно влияют на риски, баг-триаж, сигналы, план действий, улучшения и инсайты. Кнопка Reset всегда возвращает sort=desc.',
    filters_state_prefix: 'UIStateV3',
    label_theme: 'Тема',
    label_source: 'Источник',
    label_severity: 'Серьезность',
    label_category: 'Категория',
    label_status: 'Статус',
    label_sort: 'Сортировка по баллу',
    label_reset: 'Сброс',
    label_problem: 'Проблема',
    label_solution: 'Решение',
    label_impact_effort: 'Эффект/трудоемкость',
    label_owner: 'Владелец',
    label_eta: 'Срок',
    label_link: 'Ссылка',
    quick_sources: 'Быстрые источники',
    quick_themes: 'Быстрые темы',
    reset_btn: 'Сбросить фильтры',
    all_themes: 'Все темы',
    all_sources: 'Все источники',
    all_severity: 'Все',
    all_categories: 'Все',
    all_statuses: 'Все',
    sort_desc: 'По убыванию',
    sort_asc: 'По возрастанию',
    source_chip_all: 'Все',
    source_chip_steam: 'Steam',
    source_chip_discord: 'Discord',
    source_chip_youtube: 'YouTube',
    source_chip_forum: 'Форум',
    expand: 'Развернуть',
    collapse: 'Свернуть',
    visible_top_risks: 'Рисков в выдаче',
    visible_bug_clusters: 'Баг-кластеров в выдаче',
    signals_in_view: 'Сигналов в выдаче',
    visible_actions: 'Действий в выдаче',
    visible_insights: 'Инсайтов в выдаче',
    no_risks: 'Нет топ-рисков для выбранных фильтров.',
    no_bug_clusters: 'Нет баг-кластеров для выбранных фильтров.',
    no_evidence: 'Нет сигналов для выбранных фильтров.',
    no_actions: 'Нет задач для выбранных фильтров.',
    no_improvements: 'Нет элементов для выбранных фильтров.',
    no_insights: 'Нет инсайтов для выбранных фильтров.',
    no_competitors: 'Нет данных по конкурентам.',
    no_roadmap: 'Нет данных по дорожной карте.',
    no_personas: 'Нет персон.',
    no_friction: 'Нет точек трения.',
    no_dopamine: 'Нет дофаминовых якорей.',
    risks_title: 'Топ рисков по обратной связи',
    risks_desc: 'В верхней части экрана: 3 ключевых риска по PriorityScore для немедленных продуктовых решений.',
    risks_intro: 'Каждая карточка отвечает на четыре вопроса: что болит, почему это важно, какой бизнес-эффект и какое следующее действие нужно запускать в ближайшем спринте.',
    retention_legend: 'Метрика удержания: D1 = игрок вернулся через 1 день, D7 = через 7 дней, D14 = через 14 дней.',
    score_label: 'балл',
    metric_frequency: 'Частота',
    metric_severity: 'Серьезность',
    metric_recency: 'Свежесть',
    evidence_preview: 'Оригинальная цитата',
    risk_context_label: 'Контекст',
    risk_risk_label: 'Почему это риск',
    risk_impact_label: 'Бизнес-эффект',
    risk_action_label: 'Рекомендуемое действие',
    source_link: 'Источник ↗',
    bugs_title: 'Доска баг-триажа',
    bugs_desc: 'Кластеры багов и операционный приоритет (P0/P1/P2): подтверждено источниками и учитывает серьезность.',
    bugs_intro: 'В таблице триажа по каждому кластеру есть симптом, вероятная причина и ожидаемый трек исправления. Это сокращает время согласования между продакт-менеджером, QA и разработкой.',
    bug_th_cluster: 'Кластер',
    bug_th_severity: 'Серьезность',
    bug_th_priority: 'Приоритет',
    bug_th_frequency: 'Частота',
    bug_th_score: 'Балл',
    bug_th_hints: 'Шаги воспроизведения',
    bug_th_sources: 'Источники',
    bug_detail_symptom: 'Симптом',
    bug_detail_cause: 'Вероятная причина',
    bug_detail_track: 'Трек исправления',
    evidence_title: 'Evidence Drawer',
    evidence_desc: 'Сырые сигналы из Steam, Discord, YouTube и форумов, приведенные к общему слою evidence.',
    evidence_intro: 'Карточки сигналов показывают источник, серьезность и тему. Детали открываются по потребности, чтобы экран оставался плотным, но читабельным.',
    evidence_details: 'Детали',
    open_source_link: 'Открыть источник ↗',
    actions_title: 'План действий',
    actions_desc: 'Перенесено из предыдущих дашбордов: владелец, срок, KPI и трассировка источников.',
    actions_intro: 'План действий связывает проблемы с конкретными решениями и KPI. Формат рассчитан на еженедельный обзор релизов: что запускаем сейчас, кто владелец и какой эффект ожидаем.',
    psychology_title: 'Психология / Трение / Дофамин',
    psychology_desc: 'Слой психологии продукта: персоны поздней игры, точки трения и мотивационные якоря.',
    psychology_intro: 'Раздел отвечает на вопрос, почему игрок возвращается или уходит. Персоны, точки трения и дофаминовые якоря удерживают фокус на дизайне удержания, а не на случайных функциях.',
    personas_heading: 'Персоны',
    friction_heading: 'Точки трения',
    dopamine_heading: 'Дофаминовые якоря',
    action_label: 'Действие',
    friction_th_trigger: 'Триггер',
    friction_th_issue: 'Проблема',
    friction_th_solution: 'Решение',
    friction_th_impact: 'Влияние',
    friction_expected_result: 'Ожидаемый результат: меньше трения в основном цикле.',
    improvements_title: 'Пул улучшений',
    improvements_desc: 'Группы инициатив: быстрые победы, среднесрочные и стратегические.',
    improvements_intro: 'Секция агрегирует изменения по этапам поставки и показывает, какие задачи дают быстрый эффект, а какие требуют инвестиционного цикла.',
    insights_title: 'Панель валидации инсайтов',
    insights_desc: 'Инсайты в статусах «в поставке» и «гипотеза» со ссылками на источники и KPI.',
    insights_intro: 'Здесь проверяются продуктовые гипотезы, насколько они подтверждены evidence, какой у них риск и какой KPI они реально двигают.',
    competitors_title: 'Снимок конкурентов',
    competitors_desc: 'Собрано на основе локальных снимков, разборов отзывов и сравнительных рыночных материалов.',
    competitors_intro: 'Секция показывает не просто соседей по жанру, а контекст позиционирования: какие сильные стороны уже заняты на рынке и где у VCS остаётся право на дифференциацию.',
    competitor_th_game: 'Игра',
    competitor_th_role: 'Рыночная роль',
    competitor_th_strengths: 'Сильные стороны',
    competitor_th_weaknesses: 'Слабые стороны',
    competitor_th_opportunity: 'Возможность для VCS',
    roadmap_title: 'Дорожная карта 0-3 месяца',
    roadmap_desc: 'Порядок внедрения с учетом зависимостей: сначала стабильность ядра, затем рост.',
    roadmap_intro: 'Дорожная карта отражает критический порядок поставки: сначала исправляем системные блокеры, затем масштабируем инициативы роста без потери качества.',
    roadmap_delivery_note: 'Примечание: закрыть зависимость перед следующей волной задач.',
    sources_title: 'Основание по источникам',
    sources_desc: 'Кратко: какие источники данных были учтены в анализе, на какой дате зафиксирована выборка и какие офлайн-артефакты были скомпилированы в дашборд.',
    sources_intro: 'Блок фиксирует состав источников и технический аудит ссылок, чтобы дашборд оставался проверяемым артефактом, а не набором неявных выводов.',
    source_status: 'Покрытие Steam и store-status',
    source_platforms: 'Платформы / охват',
    source_verified: 'Дата верификации',
    source_http: 'HTTP-проверки',
    source_release: 'Релиз',
    source_reviews: 'Отзывы',
    status_shipping: 'В поставке',
    status_hypothesis: 'Гипотеза',
    severity_critical: 'Критично',
    severity_major: 'Серьезно',
    severity_minor: 'Минорно',
    evidence_strength_suffix: 'подтвержденность',
    kpi_label: 'KPI',
  },
  en: {
    page_title: 'VCS - Operational dashboard for bugs and feedback',
    hero_title: 'VCS - Operational dashboard for bugs and feedback',
    hero_sub: 'Operational dashboard for product decisions: critical bugs and player feedback first, then initiatives, insights, behavioral signals, and roadmap execution. Data actuality:',
    meta_date: 'Data actuality',
    meta_raw: 'Raw signals',
    meta_unique: 'Unique signals',
    meta_method: 'Scoring method',
    nav_risks: 'Top Risks',
    nav_bugs: 'Bug Triage',
    nav_evidence: 'Evidence',
    nav_actions: 'Action Board',
    nav_psychology: 'Psychology',
    nav_improvements: 'Improvements',
    nav_insights: 'Insights',
    nav_competitors: 'Competitors',
    nav_roadmap: 'Roadmap',
    nav_sources: 'Sources',
    locale_ru: 'RU',
    locale_en: 'EN',
    filters_title: 'Global filters',
    filters_desc: 'Filters affect risks, triage, evidence, actions, improvements, and insights together. Reset always restores sort=desc.',
    filters_state_prefix: 'UIStateV3',
    label_theme: 'Theme',
    label_source: 'Source',
    label_severity: 'Severity',
    label_category: 'Category',
    label_status: 'Status',
    label_sort: 'Sort by score',
    label_reset: 'Reset',
    label_problem: 'Problem',
    label_solution: 'Solution',
    label_impact_effort: 'Impact/effort',
    label_owner: 'Owner',
    label_eta: 'ETA',
    label_link: 'Link',
    quick_sources: 'Quick sources',
    quick_themes: 'Quick themes',
    reset_btn: 'Reset filters',
    all_themes: 'All themes',
    all_sources: 'All sources',
    all_severity: 'All',
    all_categories: 'All',
    all_statuses: 'All',
    sort_desc: 'Descending',
    sort_asc: 'Ascending',
    source_chip_all: 'All',
    source_chip_steam: 'Steam',
    source_chip_discord: 'Discord',
    source_chip_youtube: 'YouTube',
    source_chip_forum: 'Forum',
    expand: 'Expand',
    collapse: 'Collapse',
    visible_top_risks: 'Top risks in view',
    visible_bug_clusters: 'Visible bug clusters',
    signals_in_view: 'Signals in view',
    visible_actions: 'Visible actions',
    visible_insights: 'Visible insights',
    no_risks: 'No top risks for active filters.',
    no_bug_clusters: 'No bug clusters for active filters.',
    no_evidence: 'No evidence for active filters.',
    no_actions: 'No action items for active filters.',
    no_improvements: 'No improvement items for active filters.',
    no_insights: 'No insights for active filters.',
    no_competitors: 'No competitor data.',
    no_roadmap: 'No roadmap data.',
    no_personas: 'No personas.',
    no_friction: 'No friction rows.',
    no_dopamine: 'No dopamine anchors.',
    risks_title: 'Top feedback risks',
    risks_desc: 'Above the fold: the 3 highest-priority negative themes by PriorityScore for immediate product action.',
    risks_intro: 'Each card answers four questions: what hurts, why it matters, what business impact it drives, and which action should move first.',
    retention_legend: 'Retention shorthand: D1 = day-1 return, D7 = day-7 return, D14 = day-14 return.',
    score_label: 'score',
    metric_frequency: 'Frequency',
    metric_severity: 'Severity',
    metric_recency: 'Recency',
    evidence_preview: 'Original quote',
    risk_context_label: 'Context',
    risk_risk_label: 'Why it matters',
    risk_impact_label: 'Business impact',
    risk_action_label: 'Recommended action',
    source_link: 'Source ↗',
    bugs_title: 'Bug triage board',
    bugs_desc: 'Clustered bugs with P0/P1/P2 operational priority validated by real source volume and severity.',
    bugs_intro: 'Every row includes a symptom snapshot, probable cause, and expected fix track so PM, QA, and engineering can align quickly.',
    bug_th_cluster: 'Cluster',
    bug_th_severity: 'Severity',
    bug_th_priority: 'Priority',
    bug_th_frequency: 'Frequency',
    bug_th_score: 'Score',
    bug_th_hints: 'Repro hints',
    bug_th_sources: 'Sources',
    bug_detail_symptom: 'Symptom',
    bug_detail_cause: 'Probable cause',
    bug_detail_track: 'Fix track',
    evidence_title: 'Evidence drawer',
    evidence_desc: 'Raw signals from Steam, Discord, YouTube, and forums normalized into a shared evidence layer.',
    evidence_intro: 'Cards stay compact by default and expand only when needed, so the dashboard remains dense without becoming noisy.',
    evidence_details: 'Details',
    open_source_link: 'Open source ↗',
    actions_title: 'Action Board',
    actions_desc: 'Migrated from previous dashboards: owner, ETA, KPI, and source traceability.',
    actions_intro: 'The action board maps problems to concrete delivery steps and KPI expectations, optimized for weekly release review.',
    psychology_title: 'Psychology / Friction / Dopamine',
    psychology_desc: 'Product psychology layer: late-game personas, friction points, and motivation anchors.',
    psychology_intro: 'This section explains why players return or churn, so retention design stays intentional rather than reactive.',
    personas_heading: 'Personas',
    friction_heading: 'Friction points',
    dopamine_heading: 'Dopamine anchors',
    action_label: 'Action',
    friction_th_trigger: 'Trigger',
    friction_th_issue: 'Issue',
    friction_th_solution: 'Solution',
    friction_th_impact: 'Impact',
    friction_expected_result: 'Expected result: lower friction in the core loop.',
    improvements_title: 'Shipping improvements',
    improvements_desc: 'Initiatives grouped as quick wins, mid-term, and big bets.',
    improvements_intro: 'This pool shows which changes can move quickly and which ones belong to a larger delivery investment cycle.',
    insights_title: 'Insight validation',
    insights_desc: 'Insights in shipping and hypothesis states with source references and KPI linkage.',
    insights_intro: 'Use this section to validate which hypotheses are already evidenced and which ones still require careful testing.',
    competitors_title: 'Competitor snapshot',
    competitors_desc: 'Built from local review snapshots, market comparisons, and competitive synthesis.',
    competitors_intro: 'This is not just a list of adjacent games. It frames market expectations and where VCS can differentiate with reliability and cozy co-op.',
    competitor_th_game: 'Game',
    competitor_th_role: 'Market role',
    competitor_th_strengths: 'Strengths',
    competitor_th_weaknesses: 'Weaknesses',
    competitor_th_opportunity: 'VCS opportunity',
    roadmap_title: 'Roadmap 0-3 months',
    roadmap_desc: 'Dependency-aware rollout order: reliability first, growth second.',
    roadmap_intro: 'The roadmap reflects the required delivery order: remove systemic blockers first, then scale differentiation without quality debt.',
    roadmap_delivery_note: 'Delivery note: close this dependency before the next wave.',
    sources_title: 'Source basis',
    sources_desc: 'What data sources were used, when the snapshot was verified, and which offline artifacts were compiled into the dashboard.',
    sources_intro: 'This keeps the dashboard auditable instead of turning it into an opaque opinion layer.',
    source_status: 'Steam/store status',
    source_platforms: 'Platforms / coverage',
    source_verified: 'Verified at',
    source_http: 'HTTP checks',
    source_release: 'Release',
    source_reviews: 'Reviews',
    status_shipping: 'Shipping',
    status_hypothesis: 'Hypothesis',
    severity_critical: 'Critical',
    severity_major: 'Major',
    severity_minor: 'Minor',
    evidence_strength_suffix: 'evidence',
    kpi_label: 'KPI',
  },
} as const;

export function t(locale: Locale, key: keyof typeof uiCopy.ru): string {
  return uiCopy[locale][key] ?? uiCopy.ru[key] ?? key;
}

export const themeLabels: Record<Locale, Record<string, string>> = {
  ru: {
    'AI-art perception': 'Восприятие AI-арта',
    'Atmosphere/Cozy': 'Атмосфера/Уют',
    'Audio/ASMR': 'Аудио/ASMR',
    'Co-op stability': 'Стабильность кооператива',
    'Co-op task sync': 'Синхронизация задач в кооперативе',
    'Controls/UI friction': 'Трение в управлении/UI',
    'Customer flow stall': 'Остановка потока клиентов',
    'Day-cycle challenge': 'Цикл дня и уровень челленджа',
    'Delivery loop fantasy': 'Фантазия доставки и внешнего мира',
    'Dishwashing burnout': 'Выгорание от мойки посуды',
    'Inventory friction': 'Трение инвентаря',
    'Layout strategy': 'Стратегия расстановки',
    Localization: 'Локализация',
    'Memory load': 'Когнитивная нагрузка',
    'No-pressure flow': 'Спокойный темп без давления',
    'Object placement lock': 'Блокировка размещения предметов',
    Performance: 'Производительность',
    'Progression anchor': 'Якорь прогрессии',
    'Recipe authenticity': 'Аутентичность рецептов',
    'Shutdown hang': 'Зависание при закрытии',
    'Steam Deck cursor/input': 'Steam Deck: курсор и ввод',
    'Store economy exploit': 'Эксплойт оплаты в магазине',
    'Save loss': 'Потеря сохранений',
    'Simulation realism': 'Реализм симуляции',
  },
  en: {},
};

export const sourceLabels: Record<Locale, Record<string, string>> = {
  ru: { Steam: 'Steam', Discord: 'Discord', YouTube: 'YouTube', Forum: 'Форум', Unknown: 'Неизвестно' },
  en: { Steam: 'Steam', Discord: 'Discord', YouTube: 'YouTube', Forum: 'Forum', Unknown: 'Unknown' },
};

export const categoryLabels: Record<Locale, Record<string, string>> = {
  ru: { QoL: 'Качество жизни', Gameplay: 'Геймплей', Retention: 'Удержание', USP: 'USP' },
  en: { QoL: 'QoL', Gameplay: 'Gameplay', Retention: 'Retention', USP: 'USP' },
};

export const impactLabels: Record<Locale, Record<string, string>> = {
  ru: { Critical: 'Критичный', High: 'Высокий', Medium: 'Средний', Low: 'Низкий' },
  en: { Critical: 'Critical', High: 'High', Medium: 'Medium', Low: 'Low' },
};

export const effortLabels: Record<Locale, Record<string, string>> = {
  ru: { XS: 'XS', S: 'S', M: 'M', L: 'L', XL: 'XL' },
  en: { XS: 'XS', S: 'S', M: 'M', L: 'L', XL: 'XL' },
};

export const evidenceStrengthLabels: Record<Locale, Record<string, string>> = {
  ru: { Strong: 'Сильная', Medium: 'Средняя', Weak: 'Слабая', Unknown: 'Неизвестная' },
  en: { Strong: 'Strong', Medium: 'Medium', Weak: 'Weak', Unknown: 'Unknown' },
};

export const ownerLabels: Record<Locale, Record<string, string>> = {
  ru: {
    Backend: 'Бэкенд',
    Netcode: 'Неткод',
    Engine: 'Движок',
    UX: 'UX',
    Gameplay: 'Геймплей',
    Systems: 'Системы',
    Content: 'Контент',
    Design: 'Дизайн',
    'Input/UX': 'Ввод/UX',
  },
  en: {},
};

export const narrativeMap = {
  'Save loss': {
    summary_ru: 'Пользователи теряют или не могут восстановить прогресс после обновлений и повторных запусков.',
    summary_en: 'Users lose progress or fail to restore sessions after updates and relaunches.',
    risk_ru: 'Если проблему не закрыть быстро, усиливается недоверие к стабильности и растет риск раннего оттока.',
    risk_en: 'If not fixed quickly, trust in reliability drops and early churn risk increases.',
    action_ru: 'Приоритет: система защиты сохранений, снимок восстановления и прозрачная коммуникация статуса сохранений.',
    action_en: 'Priority action: Save Guardrail System, recovery snapshots, and explicit save-status communication.',
    impact_ru: 'Влияет на D1 (возврат через 1 день) и D7 (возврат через 7 дней), а также на возврат игроков в кооператив и давление по возвратам средств.',
    impact_en: 'Affects D1/D7, co-op return rate, and refund pressure.',
  },
  'Co-op stability': {
    summary_ru: 'Сбои в синхронизации и переподключении ломают основную социальную петлю.',
    summary_en: 'Sync and reconnect failures break the core social loop.',
    risk_ru: 'Нестабильный кооператив снижает длительность сессии и уменьшает вероятность повторных совместных сессий.',
    risk_en: 'Unstable co-op reduces session length and repeat squad sessions.',
    action_ru: 'Запускать единым пакетом: поток переподключения, диагностический интерфейс и резервную ресинхронизацию.',
    action_en: 'Ship reconnect flow, diagnostics UI, and fallback resync as one reliability package.',
    impact_ru: 'Даёт прямой вклад в D7 (возврат через 7 дней) и органический рост через рекомендации в кооперативе.',
    impact_en: 'Directly impacts D7 and organic co-op word-of-mouth growth.',
  },
  Performance: {
    summary_ru: 'Высокая нагрузка на GPU/CPU, просадки FPS и жалобы даже от игроков с сильными ПК бьют по базовому UX и доверию к релизной готовности.',
    summary_en: 'High GPU/CPU load, FPS drops, and complaints even from players with solid PCs hurt baseline UX and launch-readiness trust.',
    risk_ru: 'Проблемы производительности уменьшают длительность сессии, провоцируют ранние негативные отзывы и усиливают чувствительность к другим багам.',
    risk_en: 'Performance pain cuts session duration, triggers early negative reviews, and amplifies frustration around other bugs.',
    action_ru: 'Приоритетный техтриаж, динамические профили качества, прозрачные графические пресеты и отдельный разбор ошибок при закрытии игры.',
    action_en: 'Priority triage, dynamic quality profiles, transparent presets, and a dedicated pass on shutdown-related technical failures.',
    impact_ru: 'Влияет на тональность отзывов, снижает технический отток и повышает шанс, что игрок дойдет до длинной уютной сессии.',
    impact_en: 'Affects review sentiment, technical churn, and the chance that players reach the long cozy session the game is built around.',
  },
  'Controls/UI friction': {
    summary_ru: 'Лишние клики и неочевидные паттерны взаимодействия создают усталость в основном игровом цикле.',
    summary_en: 'Excess clicks and unclear interaction patterns create friction in the core loop.',
    risk_ru: 'Трение в интерфейсе ускоряет выгорание при длинных сессиях и снижает удовлетворенность.',
    risk_en: 'UX friction accelerates burnout in long sessions and cuts satisfaction.',
    action_ru: 'Удержание действия, пакет комфорта управления и точечные правки интерфейса.',
    action_en: 'Hold-to-action, input comfort bundle, and targeted UI fix patches.',
    impact_ru: 'Снижает отток после первых сессий и повышает долю завершения заказов.',
    impact_en: 'Lowers early-session churn and improves completion rate.',
  },
  'Inventory friction': {
    summary_ru: 'Игрокам не хватает пространства и гибкости: неудобно переставлять хотбар, выбрасывать лишнее и готовить ингредиенты заранее.',
    summary_en: 'Players lack space and flexibility: reordering the hotbar, discarding extras, and prepping ahead are all awkward.',
    risk_ru: 'Если не разгрузить инвентарь, кулинарная петля становится не медитативной, а суетной, особенно в кооперативе и на поздних рецептах.',
    risk_en: 'If inventory flow stays constrained, the cooking loop feels hectic instead of meditative, especially in co-op and late recipes.',
    action_ru: 'Собрать QoL-пакет: переупорядочивание хотбара, корзина/мусорка, контейнеры для заготовок и понятные точки хранения.',
    action_en: 'Ship a QoL pack: hotbar reorder, trash/bin handling, prep containers, and clearer storage surfaces.',
    impact_ru: 'Снижает операционное трение, ускоряет сборку заказов и помогает игрокам дольше оставаться в потоке.',
    impact_en: 'Reduces operational friction, speeds up order assembly, and helps players stay in flow longer.',
  },
  'Steam Deck cursor/input': {
    summary_ru: 'На Steam Deck и Linux курсор может быть невидимым или ломаться после работы за столом нарезки; часть игроков находит только временные Proton-обходы.',
    summary_en: 'On Steam Deck and Linux, the cursor can become invisible or break after cutting-table interaction; players rely on temporary Proton workarounds.',
    risk_ru: 'Баг режет совместимость с заметной частью аудитории Steam и превращает первые минуты в блокер вместо уютного онбординга.',
    risk_en: 'The bug cuts compatibility for a meaningful Steam audience and turns first-session onboarding into a blocker.',
    action_ru: 'Исправить фокус и рендер курсора, пройти Linux/Proton матрицу и зафиксировать воспроизводимый сценарий через стол нарезки.',
    action_en: 'Fix cursor focus/rendering, validate Linux/Proton paths, and lock a reliable cut-table repro for regression testing.',
    impact_ru: 'Повышает долю успешного первого запуска, снижает платформенный негатив и открывает путь к Steam Deck-совместимости.',
    impact_en: 'Improves first-session success, lowers platform-specific negativity, and clears the path toward Steam Deck compatibility.',
  },
  'Co-op task sync': {
    summary_ru: 'В кооперативе часть общих задач и покупок не синхронизируется между участниками, что ломает прогрессию и ощущение командной игры.',
    summary_en: 'Some shared tasks and purchases do not sync correctly in co-op, breaking progression and the team-play fantasy.',
    risk_ru: 'Когда чеклист не закрывается после действий напарника, кооператив воспринимается как нестабильный и теряет магию совместной кухни.',
    risk_en: 'When teammate actions fail to clear shared checklists, co-op feels unreliable and loses its shared-kitchen magic.',
    action_ru: 'Приоритетно чинить общие состояния задач, масштабирование нагрузки и логику покупок, которую должен видеть весь лобби.',
    action_en: 'Prioritize shared task state, scaling logic, and purchase ownership so the whole lobby sees the same progression.',
    impact_ru: 'Напрямую влияет на повторные кооперативные сессии, сарафанный рост и удержание игровых компаний.',
    impact_en: 'Directly affects repeat co-op sessions, word-of-mouth growth, and squad retention.',
  },
  'Day-cycle challenge': {
    summary_ru: 'Игроки видят уют, но не чувствуют ставок: нет ясного конца дня, терпения клиентов и понятного ежедневного результата.',
    summary_en: 'Players feel the coziness, but not the stakes: there is no clear end-of-day, customer patience, or daily outcome framing.',
    risk_ru: 'Без этого цикл становится слишком безопасным и быстро теряет напряжение для игроков, которым нужен управляемый челлендж.',
    risk_en: 'Without this layer, the loop feels too fail-safe and loses tension for players who want manageable challenge.',
    action_ru: 'Протестировать конец дня, дневной отчет и опциональный таймер терпения, не ломая cozy-режим по умолчанию.',
    action_en: 'Test end-of-day cadence, daily ledger, and an optional patience timer without breaking the default cozy mode.',
    impact_ru: 'Даёт больше глубины D1/D7-петле и повышает вероятность, что игроки будут обсуждать не только атмосферу, но и мастерство.',
    impact_en: 'Adds depth to the D1/D7 loop and increases the chance players talk about mastery, not just atmosphere.',
  },
  'Atmosphere/Cozy': {
    summary_ru: 'Позитивный контур сильный: игроки хвалят уют, итальянскую атмосферу, терапевтичность и способность залипать на длинные сессии.',
    summary_en: 'The positive contour is strong: players praise the coziness, Italian atmosphere, therapeutic feel, and long-session stickiness.',
    risk_ru: 'Это главный эмоциональный актив проекта, поэтому любые технические баги и трение особенно опасны: они разрушают именно то, за что игру уже любят.',
    risk_en: 'This is the project’s main emotional asset, so technical bugs and friction are especially dangerous because they damage what players already love.',
    action_ru: 'Сохранять cozy-ядро, но защищать его надежностью, плавным UX и более четкой структурой прогрессии.',
    action_en: 'Preserve the cozy core, but protect it with reliability, smoother UX, and clearer progression structure.',
    impact_ru: 'Работает на рекомендации, долгие сессии и будущую конверсию в покупку после демо.',
    impact_en: 'Supports word-of-mouth, long sessions, and eventual conversion from demo to purchase.',
  },
  'Customer flow stall': {
    summary_ru: 'После уровней 6-8 у части игроков поток клиентов останавливается полностью, хотя кафе открыто и игровой день продолжается.',
    summary_en: 'After levels 6-8, some players see customer flow stop completely even though the cafe is open and daytime continues.',
    risk_ru: 'Это прямой блокер прогрессии: игрок больше не может продолжать сессию и уходит не по собственному желанию, а из-за поломанного цикла.',
    risk_en: 'This is a direct progression blocker: players stop because the loop is broken, not because they chose to end the session.',
    action_ru: 'Добавить watchdog на спавн клиентов, телеметрию состояния кафе и аварийное восстановление потока без перезапуска.',
    action_en: 'Add a customer-spawn watchdog, cafe-state telemetry, and emergency recovery so flow resumes without restart.',
    impact_ru: 'Снижает критичный отток в середине демо и защищает самую конверсионную часть петли после открытия новых рецептов.',
    impact_en: 'Reduces critical mid-demo churn and protects the most conversion-relevant part of the loop after new recipes unlock.',
  },
  'Shutdown hang': {
    summary_ru: 'Игра визуально закрывается, но Steam продолжает считать процесс активным и не дает быстро запустить новую сессию.',
    summary_en: 'The game appears closed, but Steam still treats the process as active and blocks relaunch.',
    risk_ru: 'Проблема ломает доверие к техническому качеству и превращает даже короткий тест в раздражающий опыт с перезагрузкой компьютера.',
    risk_en: 'The issue undermines technical trust and turns even a short test into a frustrating reboot-required experience.',
    action_ru: 'Исправить graceful shutdown, очистку overlay/Steam hooks и журналирование состояния выхода.',
    action_en: 'Fix graceful shutdown, clear overlay/Steam hooks, and log exit-state failures.',
    impact_ru: 'Снижает «технический rage quit» и повышает готовность игроков возвращаться к демо после первого сбоя.',
    impact_en: 'Reduces technical rage-quits and increases the chance players return after the first failure.',
  },
  'Object placement lock': {
    summary_ru: 'В поздней игре может сломаться размещение предметов: еду и напитки нельзя положить обратно на поверхности, что мягко блокирует кухню.',
    summary_en: 'Late in the run, item placement can break so food and drinks cannot be put back on surfaces, softly locking the kitchen.',
    risk_ru: 'Проблема разрушает весь prep-flow: игрок не может безопасно разгрузить руки и вынужден ждать случайного сброса состояния.',
    risk_en: 'The issue breaks the entire prep flow: players cannot safely unload their hands and must wait for random state recovery.',
    action_ru: 'Добавить безопасный recovery path для held-item state и перепривязку поверхностей при ошибке размещения.',
    action_en: 'Add a safe held-item recovery path and surface rebinding when placement fails.',
    impact_ru: 'Снижает мягкие блокеры кухни и повышает стабильность поздних кооперативных и соло-сессий.',
    impact_en: 'Reduces kitchen soft-locks and improves late-session stability in solo and co-op.',
  },
  'Store economy exploit': {
    summary_ru: 'Игроки заметили, что из магазина можно уйти с полной корзиной без оплаты, что ломает экономическую рамку.',
    summary_en: 'Players noticed they can leave stores with a full basket without paying, breaking the economy frame.',
    risk_ru: 'Даже редкий эксплойт подрывает ощущение «честного» симулятора и делает экономический баланс менее достоверным.',
    risk_en: 'Even a niche exploit weakens the sense of a fair simulation and makes the economy feel less trustworthy.',
    action_ru: 'Проверить логику покупки и заблокировать выход с неоплаченными товарами.',
    action_en: 'Validate purchase state and block exits with unpaid goods.',
    impact_ru: 'Поддерживает целостность экономики и снижает риск нелепых пользовательских гайдов по абьюзу.',
    impact_en: 'Protects economy integrity and reduces the risk of exploit-focused community guides.',
  },
  'Simulation realism': {
    summary_ru: 'Часть аудитории хочет более аутентичный ресторанный цикл: порчу продуктов, ошибки в заказах и возможность реально потерять деньги.',
    summary_en: 'Part of the audience wants a more authentic restaurant loop: spoilage, order mistakes, and the ability to actually lose money.',
    risk_ru: 'Без слоя ставок игра остается уютной, но для продвинутых игроков может показаться слишком безопасной и быстро исчерпаемой.',
    risk_en: 'Without a stakes layer, the game stays cozy but may feel too safe and shallow for advanced players.',
    action_ru: 'Проверить опциональный realism-mode вместо обязательного усложнения для всей аудитории.',
    action_en: 'Validate an optional realism mode instead of forcing complexity on the full audience.',
    impact_ru: 'Помогает расширить охват: сохранить cozy-базу и одновременно дать глубину игрокам, которым нужен ресторанный сим.',
    impact_en: 'Helps widen the audience: keep the cozy base while offering depth to players who want a restaurant sim.',
  },
  'Delivery loop fantasy': {
    summary_ru: 'Игроки видят потенциал мира за пределами патио: доставку, скутеры, новые локации и более живой кооперативный челлендж.',
    summary_en: 'Players see fantasy potential beyond the patio: deliveries, scooters, new locations, and a livelier co-op challenge.',
    risk_ru: 'Если не развивать эту фантазию, VCS может остаться только «уютной кухней», не раскрыв обещание отпускного мира и расширяемого сервиса.',
    risk_en: 'If this fantasy is not explored, VCS may remain just a cozy kitchen instead of delivering on its vacation-world promise.',
    action_ru: 'Прототипировать доставку и внешние маршруты как ограниченный слой, не руша базовую кухонную петлю.',
    action_en: 'Prototype deliveries and external routes as a bounded layer that does not break the core kitchen loop.',
    impact_ru: 'Даёт потенциал USP, контент для роликов и более сильный аргумент для покупки полной версии.',
    impact_en: 'Creates USP potential, stronger video-friendly moments, and a better reason to buy the full version.',
  },
  __default: {
    summary_ru: 'Сигналы указывают на точку улучшения в игровом опыте, требующую приоритизации.',
    summary_en: 'Signals indicate a prioritized gameplay improvement opportunity.',
    risk_ru: 'Без решения растет скрытая стоимость поддержки и продуктового долга.',
    risk_en: 'Without action, hidden support and product debt costs increase.',
    action_ru: 'Сформировать проверяемую гипотезу и закрепить владельца + KPI.',
    action_en: 'Define a testable hypothesis and assign owner + KPI.',
    impact_ru: 'Повышает предсказуемость поставки и качество петли удержания.',
    impact_en: 'Improves delivery predictability and retention loop quality.',
  },
} as const;

export const dataCopyRu = {
  actions: {
    A1: { solution: 'Система защиты сохранений: автосейв + ручной слот + снимок восстановления.', kpi: '-60% жалоб на потерю прогресса; >=99.5% успешных загрузок.' },
    A2: { solution: 'Поток переподключения + резервная ресинхронизация + сетевые диагностики.', kpi: '-50% баг-репортов по кооперативу; +15% кооперативных сессий длиннее 30 минут.' },
    A3: { solution: 'Динамический профиль качества + раздельные графические настройки.', kpi: '-40% жалоб на производительность; +20% медианного FPS.' },
    A4: { solution: 'Удержание для нарезки + пакет комфорта управления + исправление текста на вывесках.', kpi: '-30% жалоб на усталость от частых кликов.' },
    A5: { solution: 'Разгрузка инвентаря и быстрый возврат предметов в хранилище.', kpi: '-25% жалоб на трение инвентаря.' },
    A6: { solution: 'Автоматизация мойки посуды с ранней разблокировкой на уровне 4.', kpi: '+8% D7 удержания в сегменте 8h+.' },
    A7: { solution: 'Этап «Печь для пиццы» на уровне 7 как сильный якорь прогрессии.', kpi: '+15% D14 удержания к уровню 7.' },
    A8: { solution: 'Блокнот бариста для закрепленных предпочтений гостей и рецептов.', kpi: '-15% упоминаний фрустрации (A/B).' },
    A9: { solution: 'VIP-зонирование с умным определением зон и типов гостей.', kpi: '+длина сессии и глубина экспериментов с планировкой.' },
    A10: { solution: 'Пакет надежности ввода на Steam Deck: стабильный курсор, защита фокуса интерфейса и паритет удержания при уборке.', kpi: '-40% жалоб на Steam Deck ввод; +успешное завершение первой сессии.' },
    A11: { solution: 'Патч синхронизации задач в кооперативе: покупки союзника корректно закрывают общий чеклист.', kpi: '-35% блокеров прогрессии в кооперативе.' },
    A12: { solution: 'Прототип цикла конца дня + ежедневный отчет (доход, расходы, качество сервиса).', kpi: '+намерение вернуться по итогам опросов после сессии.' },
    A13: { solution: 'Пасс аутентичности рецептов для ключевых итальянских блюд + визуальная консистентность рецептурной книги.', kpi: '+упоминания аутентичности; -критика рецептов.' },
    A14: { solution: 'Добавить watchdog на поток клиентов, телеметрию состояния открытия кафе и аварийное восстановление спавна для уровней 6-8.', kpi: '-80% жалоб на отсутствие клиентов после уровня 6; +завершенные демо-сессии.' },
    A15: { solution: 'Пасс корректного закрытия: чисто завершать Steam hooks, overlay и логировать состояние выхода для кейсов со stuck stopping.', kpi: '-90% жалоб на зависание при закрытии.' },
    A16: { solution: 'Добавить путь восстановления для предметов в руках: сброс невалидного состояния и безопасное размещение на поверхности.', kpi: '-70% жалоб на soft-lock при подготовке заказов.' },
    A17: { solution: 'Проверка оплаты в магазине и блокировка выхода с неоплаченными товарами.', kpi: '0 воспроизводимых эксплойтов с бесплатной корзиной.' },
    A18: { solution: 'Прототип пресета сложности с опциональным таймером терпения клиентов и видимым переключателем давления.', kpi: '+удовлетворенность челленджем без просадки у cozy-сегмента.' },
    A19: { solution: 'QoL-пакет подготовки: переупорядочивание хотбара, мусорка, контейнеры для заготовок и ясные точки хранения.', kpi: '-35% жалоб на инвентарь и подготовку ингредиентов.' },
    A20: { solution: 'Прототип опционального realism-mode: порча продуктов, штрафы за ошибки и реальные дневные ставки.', kpi: '+упоминания глубины симуляции и удовлетворенность челленджем.' },
    A21: { solution: 'Прототип доставок со скутером, маршрутами и переносом нескольких заказов за раз.', kpi: '+намерение добавить в wishlist и обсуждения расширения мира.' },
  },
  improvements: {
    I1: { solution: 'Система защиты сохранений: автосейв, ручной слот и снимок восстановления.', kpi: '-60% жалоб на потерю прогресса.' },
    I2: { solution: 'Поток переподключения, резервная ресинхронизация и диагностический интерфейс.', kpi: '-50% баг-репортов по кооперативу.' },
    I3: { solution: 'Технический триаж производительности + динамические графические профили.', kpi: '-40% жалоб на производительность.' },
    I4: { solution: 'Пакет комфорта управления: удержание действия, переупорядочивание инвентаря, исправление текста на вывесках.', kpi: '-35% жалоб на интерфейс и управление.' },
    I6: { solution: 'Еженедельный курортный цикл: мини-события + доска целей.', kpi: '+10 п.п. D7 удержания.' },
    I7: { solution: 'Именные туристы и «открыточные» истории для усиления пользовательских упоминаний.', kpi: '+20% пользовательских упоминаний и шеринга.' },
  },
  insights: {
    IC1: { title: 'Удержание действия при нарезке', solution: 'Снизить повторяющиеся клики через удержание действия с прогресс-баром.', kpi: '-30% жалоб на усталость от частых кликов.' },
    IC2: { title: 'Исправление «стены» инвентаря', solution: 'Расширить инвентарь или разрешить часть подготовительных операций на месте.', kpi: '-25% жалоб на трение инвентаря.' },
    IC3: { title: 'Автоматизация мойки посуды', solution: 'Открывать роль помощника по мойке посуды с уровня 4.', kpi: '+D7 удержание в сегменте 8h+.' },
    IC5: { title: 'Блокнот бариста', solution: 'Закрепляемые рецепты и предпочтения гостей.', kpi: 'A/B: -15% упоминаний фрустрации.' },
    IC6: { title: 'VIP-зоны', solution: 'Умное определение зон и назначение типов гостей.', kpi: '+длина сессии.' },
    IC7: { title: 'Надежность ввода на Steam Deck', solution: 'Исправить исчезающий курсор и сделать взаимодействия с удержанием стабильными в уборке и кулинарном потоке.', kpi: '-блокеры Steam Deck в первые 20 минут.' },
    IC8: { title: 'Синхронизация задач в кооперативе', solution: 'Исправить общий прогресс задач, чтобы действия напарника корректно закрывали список задач хоста.', kpi: '-упоминания багов прогрессии в кооперативе.' },
    IC9: { title: 'Ритм конца дня + дневной отчет', solution: 'Добавить ритуал завершения дня и итоговый экран для усиления ясности цикла и ставок.', kpi: '+намерение вернуться в постсессионных опросах.' },
    IC10: { title: 'Пасс аутентичности рецептов', solution: 'Привести ключевые рецепты к ожидаемой кулинарной логике и убрать ингредиенты, выбивающие из погружения.', kpi: '+упоминания аутентичности, -критика рецептов.' },
    IC11: { title: 'Watchdog потока клиентов', solution: 'Добавить watchdog для открытого кафе, чтобы поток клиентов самовосстанавливался до того, как сессия станет непроходимой.', kpi: '-блокеры «нет клиентов» после уровня с пиццей.' },
    IC12: { title: 'Восстановление размещения предметов', solution: 'Отлавливать невалидные состояния предметов в руках и давать безопасный путь сброса вместо soft-lock на кухне.', kpi: '-упоминания soft-lock при размещении предметов.' },
    IC13: { title: 'Надежное закрытие игры', solution: 'Закрывать игру корректно в Steam и убирать остаточное состояние overlay, чтобы игрок мог сразу перезапустить сессию.', kpi: '-жалобы на зависание при закрытии.' },
    IC14: { title: 'Режим ресторанных ставок', solution: 'Проверить опциональный режим реализма с порчей продуктов и штрафами за ошибки.', kpi: '+удовлетворенность глубиной симуляции в продвинутых когортах.' },
    IC15: { title: 'Прототип доставки', solution: 'Проверить, усиливают ли доставки, скутеры и внешний маршрут кооперативную новизну без потери темпа.', kpi: '+упоминания расширения мира и намерение вернуться в кооператив.' },
    IC16: { title: 'Опция таймера терпения', solution: 'Проверить, повышает ли опциональная шкала терпения ощущение мастерства без потери cozy-режима по умолчанию.', kpi: '+удовлетворенность челленджем без снижения комфорта сессии.' },
  },
} as const;

export const competitorCopyRu: Record<string, { market_role: string; strengths: string; weaknesses: string; opportunity: string }> = {
  'Espresso Tycoon': {
    market_role: 'Классический менеджмент-симулятор кофейни',
    strengths: 'Понятный управленческий цикл, сильная фантазия роли владельца кофейни, прозрачная экономическая рамка и четкие цели прогрессии.',
    weaknesses: 'Местами жесткое ощущение рутины в менеджмент-петле, регулярные жалобы на производительность и дискуссии о визуальной аутентичности.',
    opportunity: 'VCS может выиграть за счет более теплого темпа, стабильного кооператива, меньшего трения в управлении и более живого сервиса.',
  },
  'Travellers Rest': {
    market_role: 'Глубокий уютный симулятор таверны',
    strengths: 'Большая контентная глубина, длинный хвост удержания, богатая система развития и ощущение «долгой жизни» проекта.',
    weaknesses: 'Жалобы на темп и гринд, а также на растянутый цикл изменений в раннем доступе.',
    opportunity: 'VCS может дать более быстрый путь к удовольствию без тяжелого гринда в первые часы.',
  },
  'Coffee Caravan': {
    market_role: 'Роглайт-цикл мобильной кофейни',
    strengths: 'Быстрый цикл «запустил и играешь», понятный порог входа и короткие игровые сессии.',
    weaknesses: 'Ограниченная реиграбельность на длинной дистанции и меньше глубины в мета-слое.',
    opportunity: 'VCS может предложить более глубокую мету при сохранении доступности основного игрового цикла.',
  },
  'Chef RPG': {
    market_role: 'Симулятор жизни + ресторанная игра',
    strengths: 'Сильная связка мира, персонажей и кулинарии; высокий эмоциональный контекст и хорошая «историйная» вовлеченность.',
    weaknesses: 'Трение в управлении и интерфейсе, локальные проблемы удобства, из-за которых часть игроков быстрее устает.',
    opportunity: 'VCS может дифференцироваться через удобный кооператив, надежность и более плавное введение игрока в цикл.',
  },
};

export const competitorCopyEn: Record<string, { market_role: string; strengths: string; weaknesses: string; opportunity: string }> = {
  'Espresso Tycoon': {
    market_role: 'Classic coffee tycoon management sim',
    strengths: 'Clear management loop, strong coffee-owner fantasy, explicit economic framing, and readable progression goals.',
    weaknesses: 'Can feel routine-heavy, with recurring performance complaints and debates around visual authenticity.',
    opportunity: 'VCS can win through warmer pacing, reliable co-op, lower interaction friction, and a more lived-in service fantasy.',
  },
  'Travellers Rest': {
    market_role: 'Deep cozy tavern simulation',
    strengths: 'Substantial content depth, long-tail retention, rich progression systems, and a strong feeling of project longevity.',
    weaknesses: 'Complaints cluster around grind, pacing drag, and slow early-access iteration loops.',
    opportunity: 'VCS can offer a faster route to delight without heavy grind in the opening hours.',
  },
  'Coffee Caravan': {
    market_role: 'Roguelite mobile-cafe loop',
    strengths: 'Fast start-to-play loop, low onboarding friction, and short-session accessibility.',
    weaknesses: 'Lower long-term replayability and less meta-depth over time.',
    opportunity: 'VCS can deliver a deeper meta layer while preserving approachability in the core service loop.',
  },
  'Chef RPG': {
    market_role: 'Life sim plus restaurant fantasy',
    strengths: 'Strong blend of worldbuilding, characters, and cooking with a rich emotional wrapper around the restaurant loop.',
    weaknesses: 'Interaction friction and local UX roughness make some players tire faster than expected.',
    opportunity: 'VCS can differentiate on co-op usability, reliability, and a smoother ramp into the main loop.',
  },
};

export const personaCopyRu: Record<string, { role?: string; desc?: string; action?: string }> = {
  'Медитативный Дзен': {
    role: 'Дзен-игрок',
    desc: 'Заходит на короткие сессии ради ритуала, расслабления и «тихого» прогресса.',
    action: 'Усилять атмосферное аудио, сезонные спокойные активности и цели без избыточного давления.',
  },
  'Архитектор-Перфекционист': {
    role: 'Архитектор-перфекционист',
    desc: 'Строит сложные схемы планировки и быстро упирается в UX-ограничения редактора.',
    action: 'Добавить привязку к сетке, зональность и более гибкие инструменты декора.',
  },
  'Магнат-Коллекционер': {
    role: 'Экономический оптимизатор',
    desc: 'Быстро достигает локального потолка и требует масштабной меты с долгой целью.',
    action: 'Развивать систему престижа и длинный хвост прогрессии.',
  },
};

export const personaCopyEn: Record<string, { name?: string; role?: string; desc?: string; action?: string }> = {
  'Медитативный Дзен': {
    name: 'Meditative Zen',
    role: 'Zen player',
    desc: 'Returns for short ritualistic sessions, relaxation, and quiet progress rather than hard pressure.',
    action: 'Deepen the ASMR layer, seasonal calm activities, and low-pressure goals that preserve the self-care fantasy.',
  },
  'Архитектор-Перфекционист': {
    name: 'Perfectionist Architect',
    role: 'Layout perfectionist',
    desc: 'Builds intricate floor plans and quickly hits the limits of the placement and decoration UX.',
    action: 'Add stronger grid snapping, zoning, and more flexible decoration tools.',
  },
  'Магнат-Коллекционер': {
    name: 'Collector Tycoon',
    role: 'Economic optimizer',
    desc: 'Reaches the local ceiling fast and starts demanding a larger long-tail meta and prestige loop.',
    action: 'Expand prestige systems and the long-term progression tail.',
  },
};

export const frictionCopyRu: Record<string, { trigger?: string; issue?: string; solution?: string }> = {
  '3-й стол / mid-run prep': {
    trigger: '3-й стол / подготовка на ходу',
    issue: '«Стена инвентаря» и вынужденные возвраты в хранилище ломают темп.',
    solution: 'Улучшения хранилища + подготовка на месте без лишних возвратов по карте.',
  },
  'Нарезка ингредиентов': {
    issue: 'Усталость от частых кликов разрушает расслабленный ритм основного цикла.',
    solution: 'Удержание действия при нарезке с сохранением приятного аудио-отклика.',
  },
  'Мытье посуды': {
    solution: 'Ранняя разблокировка автоматизации мойки посуды.',
  },
  'Заказы с тегами': {
    issue: 'Лишняя нагрузка на память вместо спокойного игрового цикла.',
    solution: 'Блокнот бариста и закрепление заказов для снижения когнитивной нагрузки.',
  },
};

export const frictionCopyEn: Record<string, { trigger?: string; issue?: string; solution?: string }> = {
  '3-й стол / mid-run prep': {
    trigger: 'Third table / mid-run prep',
    issue: 'The inventory wall and forced backtracking break the service rhythm.',
    solution: 'Improve storage QoL and allow more prep-in-place actions without map backtracking.',
  },
  'Нарезка ингредиентов': {
    trigger: 'Ingredient chopping',
    issue: 'Click fatigue breaks the relaxed cadence of the core loop.',
    solution: 'Hold-to-chop with preserved sound feedback and readable progress.',
  },
  'Мытье посуды': {
    trigger: 'Dishwashing',
    issue: 'The chore loop burns players out after longer sessions.',
    solution: 'Unlock dishwashing automation earlier.',
  },
  'Заказы с тегами': {
    trigger: 'Tagged orders',
    issue: 'Memory pressure replaces the intended chill-loop feeling.',
    solution: 'Introduce a barista notebook and order pinning to lower cognitive load.',
  },
};

export const dopamineCopyRu: Record<string, { name?: string; desc?: string }> = {
  'Pizza Oven Level 7': {
    name: 'Печь для пиццы (уровень 7)',
    desc: 'Сильный этап и эмоциональный пик прогрессии в середине игры.',
  },
  'Открытие внешних зон': {
    desc: 'Новый слой целей вне базовой кухни усиливает ощущение роста и открытия мира.',
  },
  'Memorable guests': {
    name: 'Запоминающиеся гости',
    desc: 'Пользовательские упоминания и желание делиться опытом растут за счет уникальных туристических историй и персональных моментов.',
  },
};

export const dopamineCopyEn: Record<string, { name?: string; desc?: string }> = {
  'Pizza Oven Level 7': {
    name: 'Pizza Oven Level 7',
    desc: 'A strong milestone and emotional progression peak in the middle of the game.',
  },
  'Открытие внешних зон': {
    name: 'Unlocking external zones',
    desc: 'A new layer of goals outside the core kitchen strengthens the sense of expansion and discovery.',
  },
  'Memorable guests': {
    name: 'Memorable guests',
    desc: 'Unique tourist stories create stronger UGC moments and make the experience easier to share.',
  },
};

export function mapLabel(locale: Locale, dict: Record<Locale, Record<string, string>>, value: string): string {
  return dict[locale][value] || value;
}

export function themeLabel(locale: Locale, value: string): string {
  return mapLabel(locale, themeLabels, value);
}

export function sourceLabel(locale: Locale, value: string): string {
  return mapLabel(locale, sourceLabels, value);
}

export function categoryLabel(locale: Locale, value: string): string {
  return mapLabel(locale, categoryLabels, value);
}

export function impactLabel(locale: Locale, value: string): string {
  return mapLabel(locale, impactLabels, value);
}

export function effortLabel(locale: Locale, value: string): string {
  return mapLabel(locale, effortLabels, value);
}

export function evidenceStrengthLabel(locale: Locale, value: string): string {
  return mapLabel(locale, evidenceStrengthLabels, value || 'Unknown');
}

export function ownerLabel(locale: Locale, value: string): string {
  return mapLabel(locale, ownerLabels, value);
}

export function etaLabel(locale: Locale, value: string): string {
  if (locale !== 'ru') return value;
  if (/^Week\s+/i.test(value)) return value.replace(/^Week\s+/i, 'Неделя ');
  if (/^Backlog$/i.test(value)) return 'Бэклог';
  return value;
}

export function localizedField(locale: Locale, scope: keyof typeof dataCopyRu, id: string, field: string, fallback: string): string {
  if (locale !== 'ru') return fallback;
  const row = dataCopyRu[scope]?.[id as keyof (typeof dataCopyRu)[typeof scope]] as Record<string, string> | undefined;
  return row?.[field] || fallback;
}

export function competitorCopy(locale: Locale, game: string, field: 'market_role' | 'strengths' | 'weaknesses' | 'opportunity', fallback: string): string {
  if (locale === 'ru') return competitorCopyRu[game]?.[field] || fallback;
  return competitorCopyEn[game]?.[field] || fallback;
}

export function personaCopy(locale: Locale, name: string, field: 'name' | 'role' | 'desc' | 'action', fallback: string): string {
  if (locale === 'ru') return personaCopyRu[name]?.[field as 'role' | 'desc' | 'action'] || fallback;
  return personaCopyEn[name]?.[field] || fallback;
}

export function frictionCopy(locale: Locale, trigger: string, field: 'trigger' | 'issue' | 'solution', fallback: string): string {
  if (locale === 'ru') return frictionCopyRu[trigger]?.[field] || fallback;
  return frictionCopyEn[trigger]?.[field] || fallback;
}

export function dopamineCopy(locale: Locale, name: string, field: 'name' | 'desc', fallback: string): string {
  if (locale === 'ru') return dopamineCopyRu[name]?.[field] || fallback;
  return dopamineCopyEn[name]?.[field] || fallback;
}

export function narrative(locale: Locale, theme: string, field: 'summary' | 'risk' | 'action' | 'impact'): string {
  const row = narrativeMap[theme as keyof typeof narrativeMap] || narrativeMap.__default;
  const key = `${field}_${locale}` as keyof typeof row;
  return String(row[key] || row[`${field}_ru` as keyof typeof row] || '');
}
