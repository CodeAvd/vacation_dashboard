import rawDashboardData from '@/GDD/dashboard-data.generated.json';

export type Locale = 'ru' | 'en';
export type Severity = 'critical' | 'major' | 'minor';
export type Category = 'QoL' | 'Gameplay' | 'Retention' | 'USP';
export type ActionStatus = 'shipping' | 'hypothesis';
export type SortOrder = 'desc' | 'asc';
export type Source = 'Steam' | 'Discord' | 'YouTube' | 'Forum' | 'Unknown';
export type Priority = 'P0' | 'P1' | 'P2';
export type Impact = 'Critical' | 'High' | 'Medium' | 'Low';
export type Effort = 'XS' | 'S' | 'M' | 'L' | 'XL';

export interface DashboardMeta {
  actuality_date: string;
  signals_raw: number;
  signals_unique: number;
  method: string;
  docs_loaded?: {
    market_md_lines?: number;
    deep_md_lines?: number;
    insight_txt_lines?: number;
    comp_english_samples?: number;
  };
}

export interface ThemeScore {
  theme: string;
  sentiment: 'negative' | 'positive' | 'neutral';
  frequency: number;
  frequency_score: number;
  severity_score: number;
  recency_score: number;
  priority_score: number;
}

export interface BugCluster {
  name: string;
  severity: Severity;
  frequency: number;
  priority: Priority;
  score: number;
  priority_score?: number;
  repro_notes: string;
  source_count: number;
  source_breakdown: Record<string, number>;
}

export interface FeedbackSignal {
  source: string;
  id: string;
  url?: string;
  quote: string;
  theme: string;
  severity?: Severity;
  sentiment?: 'negative' | 'positive' | 'neutral';
}

export interface ActionRow {
  id: string;
  category: Category;
  status: ActionStatus;
  theme: string;
  severity: Severity;
  problem_link?: string;
  solution: string;
  impact: Impact;
  effort: Effort;
  priority: Priority;
  kpi: string;
  owner: string;
  eta: string;
}

export interface ImprovementRow {
  id: string;
  stage: 'Quick Wins' | 'Mid-term' | 'Big Bet';
  category: Category;
  linked_theme: string;
  problem_link?: string;
  solution: string;
  impact: Impact;
  effort: Effort;
  priority: Priority;
  kpi: string;
}

export interface InsightRow {
  id: string;
  title: string;
  status: ActionStatus;
  category: Category;
  solution: string;
  impact: Impact;
  effort: Effort;
  priority: Priority;
  kpi: string;
  evidence_strength?: 'Strong' | 'Medium' | 'Weak' | 'Unknown';
  source_refs?: string[];
}

export interface Persona {
  name: string;
  role: string;
  desc: string;
  action: string;
}

export interface FrictionRow {
  trigger: string;
  issue: string;
  solution: string;
  impact: Impact;
}

export interface DopamineRow {
  name: string;
  desc: string;
}

export interface PsychologyData {
  personas: Persona[];
  friction: FrictionRow[];
  dopamine: DopamineRow[];
}

export interface CompetitorRow {
  game: string;
  market_role: string;
  strengths: string;
  weaknesses: string;
  opportunity: string;
}

export interface RoadmapRow {
  window: string;
  initiative: string;
  dependency: string;
  urgency: Severity;
}

export interface SourceSnapshot {
  steam_store_status: {
    name: string;
    release_date: string;
    review_state: string;
    platforms: Record<string, boolean>;
  };
  verified_at: string;
  url_checks: { url: string; status: number }[];
  compiled_artifacts: string[];
  update_notes: string[];
}

export interface DashboardData {
  meta: DashboardMeta;
  theme_scores: ThemeScore[];
  bug_clusters: BugCluster[];
  feedback_signals: FeedbackSignal[];
  actions: ActionRow[];
  improvements: ImprovementRow[];
  insights_shipping: InsightRow[];
  insights_hypothesis: InsightRow[];
  psychology: PsychologyData;
  competitor_snapshot: CompetitorRow[];
  roadmap: RoadmapRow[];
  source_snapshot: SourceSnapshot;
}

export interface DashboardUIState {
  locale: Locale;
  theme: string;
  source: Source | 'all';
  severity: Severity | 'all';
  category: Category | 'all';
  status: ActionStatus | 'all';
  sort: SortOrder;
  expandedSections: Record<string, boolean>;
}

export const SOURCE_KEY_MAP: Record<string, Source> = {
  steam_forum: 'Steam',
  discord_chat: 'Discord',
  discord_bug_forum: 'Forum',
  Steam: 'Steam',
  Discord: 'Discord',
  Forum: 'Forum',
  YouTube: 'YouTube',
};

export const SEVERITY_BY_THEME: Record<string, Severity> = {
  'Save loss': 'critical',
  'Co-op stability': 'critical',
  Performance: 'major',
  'Controls/UI friction': 'major',
  'AI-art perception': 'major',
  Localization: 'minor',
  'Atmosphere/Cozy': 'minor',
  'No-pressure flow': 'minor',
  'Audio/ASMR': 'minor',
  'Inventory friction': 'major',
  'Dishwashing burnout': 'major',
  'Progression anchor': 'minor',
  'Layout strategy': 'minor',
  'Memory load': 'minor',
  'Steam Deck cursor/input': 'major',
  'Co-op task sync': 'major',
  'Recipe authenticity': 'minor',
  'Day-cycle challenge': 'minor',
  'Customer flow stall': 'major',
  'Shutdown hang': 'major',
  'Object placement lock': 'major',
  'Store economy exploit': 'minor',
  'Simulation realism': 'minor',
  'Delivery loop fantasy': 'minor',
};

export const dashboardData = rawDashboardData as unknown as DashboardData;

export const DEFAULT_UI_STATE: DashboardUIState = {
  locale: 'ru',
  theme: 'all',
  source: 'all',
  severity: 'all',
  category: 'all',
  status: 'all',
  sort: 'desc',
  expandedSections: {
    filters: true,
    risks: true,
    bugs: true,
    evidence: true,
    actions: false,
    psychology: false,
    improvements: false,
    insights: false,
    competitors: false,
    roadmap: false,
    sources: false,
  },
};
