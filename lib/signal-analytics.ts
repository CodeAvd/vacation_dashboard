import { SEVERITY_BY_THEME, type BugCluster, type FeedbackSignal, type Priority, type Severity, type SortOrder, type ThemeScore, type TopRisk } from '@/lib/data';

type SignalSentiment = NonNullable<FeedbackSignal['sentiment']>;

const NEGATIVE_SENTIMENT: SignalSentiment = 'negative';
const POSITIVE_SENTIMENT: SignalSentiment = 'positive';
const NEUTRAL_SENTIMENT: SignalSentiment = 'neutral';

const POSITIVE_AI_PATTERNS = /(no problem using ai|don't mind.*ai|dont mind.*ai|who cares\?? ai|i (?:do not|don't|dont) care|more of that|glad|agreed|great art)/i;

const DIRECT_SIGNAL_RULES: Array<{ pattern: RegExp; theme: string; severity: Severity; sentiment?: SignalSentiment }> = [
  { pattern: /(artificial intelligence|ai image|ai art|gen ai|artists?\b)/i, theme: 'AI-art perception', severity: 'major' },
  { pattern: /(steam deck|cursor disappears|cursor.*invisible|docked keyboard|steamdeck)/i, theme: 'Steam Deck cursor/input', severity: 'major' },
  { pattern: /(save file|lost progress|progress.*removed|carry over|carryover|recover.*save|save.*gone|save.*lost|loading my existing cafe)/i, theme: 'Save loss', severity: 'critical' },
  { pattern: /(co-op|coop|multiplayer|host|lobby|disconnect|rejoin|sync|launched .* outside of the map|fell down threw the map)/i, theme: 'Co-op stability', severity: 'critical' },
  { pattern: /(task remains unresolved|checklist|shared purchases|furniture.*did not check it off|co-op objective)/i, theme: 'Co-op task sync', severity: 'major' },
  { pattern: /(fps|stutter|freeze|lag|gpu|vram|ram|cpu usage|poor performance|optimi[sz](?:ation|e))/i, theme: 'Performance', severity: 'major' },
  { pattern: /(hot bar|hotbar|inventory|drag items|different slots|trash can|throw out certain ingredients|batch-cut|store them in the fridge|prepared dishes later)/i, theme: 'Inventory friction', severity: 'major' },
  { pattern: /(translate the game|help translate|translation|italian language|language improvements)/i, theme: 'Localization', severity: 'minor', sentiment: NEUTRAL_SENTIMENT },
  { pattern: /(pizza dough|alfredo|unauthentic|authentic italian|no milk and eggs|recipe is too different from reality)/i, theme: 'Recipe authenticity', severity: 'minor' },
  { pattern: /(set hours|24\/7|go to bed|daily ledger|patience bar|timer|restaurant.*hours|night cafe|after midnight|close!?$)/i, theme: 'Day-cycle challenge', severity: 'minor' },
  { pattern: /(guest are about to take this table|aren.?t coming any guests|no guests|customers? stopped|flow stall)/i, theme: 'Customer flow stall', severity: 'major' },
  { pattern: /(remove sign text|can.?t remove sign|pick up a table to replace|can.?t put.*back down|place.*counter|soft-lock|stuck in small areas|hung up on something invisible|weird arm|invisible oysters)/i, theme: 'Object placement lock', severity: 'major' },
  { pattern: /(delivery driver|little car could actually drive|deliveries|scooter|outside the village|world outside)/i, theme: 'Delivery loop fantasy', severity: 'minor', sentiment: NEUTRAL_SENTIMENT },
  { pattern: /(highest level is 26|more recipes|release.*fast|home base|fully rounded feel|progress any further)/i, theme: 'Progression anchor', severity: 'minor', sentiment: NEUTRAL_SENTIMENT },
  { pattern: /(beautiful village|love this game|immersive|therapeutic|attention to detail|well-thought-out game|can.?t wait|fun at a demo|relaxing things to do)/i, theme: 'Atmosphere/Cozy', severity: 'minor', sentiment: POSITIVE_SENTIMENT },
  { pattern: /(customize the cat|streetlights|tourism|ships of tourists|cycling race|fish tank)/i, theme: 'Simulation realism', severity: 'minor', sentiment: NEUTRAL_SENTIMENT },
];

export interface NormalizedDateRange {
  from: string | null;
  to: string | null;
}

export interface SignalDateRange {
  min: string;
  max: string;
}

export interface InferredFeedbackDescriptor {
  theme: string;
  severity: Severity;
  sentiment: SignalSentiment;
}

export function cleanSignalText(raw: string): string {
  return String(raw || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

export function isLikelyNoiseText(value: string): boolean {
  const text = cleanSignalText(value);
  if (!text || text.length < 16) return true;

  const longEncodedToken = /[A-Za-z0-9+/=]{30,}/.test(text);
  const encodedChunks = (text.match(/[A-Za-z0-9+/=]{24,}/g) || []).length;
  const looksLikeMarkupResidue =
    /(aria-hidden|class=|style=|viewbox|fill=|stroke=|rspack=|discord\.com\/assets|<path|<svg|data-rh|theme-darker|mask id=|transform=|<meta|charset=)/i.test(text);
  const symbolDensity = (text.match(/[<>{}=_"`]/g) || []).length / text.length;

  return longEncodedToken || encodedChunks >= 2 || looksLikeMarkupResidue || symbolDensity > 0.08;
}

export function inferFeedbackDescriptor(text: string): InferredFeedbackDescriptor | null {
  const cleaned = cleanSignalText(text);
  if (!cleaned || isLikelyNoiseText(cleaned)) return null;

  const lower = cleaned.toLowerCase();
  for (const rule of DIRECT_SIGNAL_RULES) {
    if (!rule.pattern.test(lower)) continue;

    if (rule.theme === 'AI-art perception') {
      return {
        theme: rule.theme,
        severity: rule.severity,
        sentiment: POSITIVE_AI_PATTERNS.test(cleaned) ? POSITIVE_SENTIMENT : NEGATIVE_SENTIMENT,
      };
    }

    return {
      theme: rule.theme,
      severity: rule.severity,
      sentiment: rule.sentiment ?? NEGATIVE_SENTIMENT,
    };
  }

  return null;
}

export function normalizeDateValue(value: string | null | undefined): string | null {
  if (!value) return null;
  const trimmed = String(value).trim();
  return /^\d{4}-\d{2}-\d{2}$/.test(trimmed) ? trimmed : null;
}

export function normalizeDateRange(dateFrom: string | null | undefined, dateTo: string | null | undefined): NormalizedDateRange {
  const from = normalizeDateValue(dateFrom);
  const to = normalizeDateValue(dateTo);
  if (from && to && from > to) {
    return { from: to, to: from };
  }
  return { from, to };
}

export function getSignalDateRange(signals: FeedbackSignal[]): SignalDateRange {
  const dates = signals
    .map((signal) => normalizeDateValue(signal.observed_date))
    .filter((value): value is string => Boolean(value))
    .sort((left, right) => left.localeCompare(right));

  if (!dates.length) {
    return { min: '', max: '' };
  }

  return {
    min: dates[0],
    max: dates[dates.length - 1],
  };
}

export function isSignalWithinDateRange(signal: FeedbackSignal, dateFrom: string | null | undefined, dateTo: string | null | undefined): boolean {
  const observedDate = normalizeDateValue(signal.observed_date);
  if (!observedDate) return false;

  const range = normalizeDateRange(dateFrom, dateTo);
  if (range.from && observedDate < range.from) return false;
  if (range.to && observedDate > range.to) return false;
  return true;
}

export function buildTopRisksFromSignals(signals: FeedbackSignal[], sort: SortOrder): TopRisk[] {
  return buildRiskRows(signals, sort).slice(0, 3);
}

export function buildBugClustersFromSignals(signals: FeedbackSignal[], sort: SortOrder): BugCluster[] {
  const riskRows = buildRiskRows(signals, sort);
  if (!riskRows.length) return [];

  const negativeSignals = signals.filter((signal) => signal.sentiment !== POSITIVE_SENTIMENT);
  const byTheme = groupSignalsByTheme(negativeSignals);

  const rows = riskRows.map((riskRow) => {
    const themeSignals = byTheme.get(riskRow.theme) ?? [];
    const latestSignal = getLatestSignal(themeSignals);
    const sourceBreakdown = themeSignals.reduce<Record<string, number>>((acc, signal) => {
      acc[signal.source] = (acc[signal.source] || 0) + 1;
      return acc;
    }, {});

    return {
      name: riskRow.theme,
      severity: riskRow.severity,
      frequency: riskRow.frequency,
      priority: getPriorityFromScore(riskRow.priority_score),
      score: riskRow.priority_score,
      priority_score: riskRow.priority_score,
      repro_notes: latestSignal.quote,
      source_count: Object.values(sourceBreakdown).filter((count) => count > 0).length,
      source_breakdown: sourceBreakdown,
    } satisfies BugCluster;
  });

  return sortByPriorityScore(rows, sort);
}

function buildRiskRows(signals: FeedbackSignal[], sort: SortOrder): TopRisk[] {
  const negativeSignals = signals.filter((signal) => signal.sentiment !== POSITIVE_SENTIMENT);
  if (!negativeSignals.length) return [];

  const grouped = groupSignalsByTheme(negativeSignals);
  const maxCount = Math.max(...Array.from(grouped.values(), (rows) => rows.length), 1);
  const globalRange = getSignalDateRange(negativeSignals);

  const rows = Array.from(grouped.entries()).map(([theme, themeSignals]) => {
    const latestSignal = getLatestSignal(themeSignals);
    const severity = getDominantSeverity(themeSignals, theme);
    const frequency = themeSignals.length;
    const frequencyScore = roundScore(1 + (frequency / maxCount) * 4);
    const severityScore = getSeverityScore(severity);
    const recencyScore = getRecencyScore(globalRange, latestSignal.observed_date);
    const priorityScore = roundScore(0.5 * frequencyScore + 0.3 * severityScore + 0.2 * recencyScore);

    return {
      theme,
      sentiment: NEGATIVE_SENTIMENT,
      frequency,
      frequency_score: frequencyScore,
      severity_score: severityScore,
      recency_score: recencyScore,
      priority_score: priorityScore,
      severity,
      evidencePreview: latestSignal.quote,
      sourceUrl: themeSignals.find((signal) => signal.url)?.url,
      totalSignals: frequency,
    } satisfies TopRisk;
  });

  return sortByPriorityScore(rows, sort);
}

export function sortSignalsByObservedDate(signals: FeedbackSignal[]): FeedbackSignal[] {
  return [...signals].sort((left, right) => {
    const leftDate = left.observed_date || '';
    const rightDate = right.observed_date || '';
    if (leftDate !== rightDate) return rightDate.localeCompare(leftDate);

    const leftTimestamp = left.observed_at || '';
    const rightTimestamp = right.observed_at || '';
    if (leftTimestamp !== rightTimestamp) return rightTimestamp.localeCompare(leftTimestamp);

    return left.id.localeCompare(right.id);
  });
}

function groupSignalsByTheme(signals: FeedbackSignal[]): Map<string, FeedbackSignal[]> {
  return signals.reduce((acc, signal) => {
    const bucket = acc.get(signal.theme) ?? [];
    bucket.push(signal);
    acc.set(signal.theme, bucket);
    return acc;
  }, new Map<string, FeedbackSignal[]>());
}

function getLatestSignal(signals: FeedbackSignal[]): FeedbackSignal {
  return sortSignalsByObservedDate(signals)[0];
}

function getDominantSeverity(signals: FeedbackSignal[], fallbackTheme: string): Severity {
  return signals.reduce<Severity>((current, signal) => {
    const next = signal.severity || SEVERITY_BY_THEME[signal.theme] || SEVERITY_BY_THEME[fallbackTheme] || 'minor';
    return severityRank(next) > severityRank(current) ? next : current;
  }, SEVERITY_BY_THEME[fallbackTheme] || 'minor');
}

function getRecencyScore(range: SignalDateRange, observedDate: string): number {
  const minDate = normalizeDateValue(range.min);
  const maxDate = normalizeDateValue(range.max);
  const currentDate = normalizeDateValue(observedDate);

  if (!minDate || !maxDate || !currentDate) return 3;
  if (minDate === maxDate) return 5;

  const minEpoch = Date.parse(`${minDate}T00:00:00Z`);
  const maxEpoch = Date.parse(`${maxDate}T00:00:00Z`);
  const currentEpoch = Date.parse(`${currentDate}T00:00:00Z`);
  if (!Number.isFinite(minEpoch) || !Number.isFinite(maxEpoch) || !Number.isFinite(currentEpoch) || maxEpoch === minEpoch) {
    return 3;
  }

  return roundScore(1 + ((currentEpoch - minEpoch) / (maxEpoch - minEpoch)) * 4);
}

function getSeverityScore(severity: Severity): number {
  if (severity === 'critical') return 5;
  if (severity === 'major') return 4;
  return 3;
}

function getPriorityFromScore(score: number): Priority {
  if (score >= 4.2) return 'P0';
  if (score >= 3.2) return 'P1';
  return 'P2';
}

function sortByPriorityScore<T extends { priority_score?: number; score?: number }>(rows: T[], sort: SortOrder): T[] {
  return [...rows].sort((left, right) => {
    const leftScore = Number(left.priority_score ?? left.score ?? 0);
    const rightScore = Number(right.priority_score ?? right.score ?? 0);
    return sort === 'asc' ? leftScore - rightScore : rightScore - leftScore;
  });
}

function severityRank(severity: Severity): number {
  if (severity === 'critical') return 3;
  if (severity === 'major') return 2;
  return 1;
}

function roundScore(value: number): number {
  return Math.round(value * 100) / 100;
}

export function buildThemeScoresFromSignals(signals: FeedbackSignal[]): ThemeScore[] {
  if (!signals.length) return [];

  const byTheme = groupSignalsByTheme(signals);
  const maxCount = Math.max(...Array.from(byTheme.values(), (rows) => rows.length), 1);
  const range = getSignalDateRange(signals);

  return Array.from(byTheme.entries())
    .map(([theme, themeSignals]) => {
      const latestSignal = getLatestSignal(themeSignals);
      const negativeCount = themeSignals.filter((signal) => signal.sentiment === NEGATIVE_SENTIMENT).length;
      const positiveCount = themeSignals.filter((signal) => signal.sentiment === POSITIVE_SENTIMENT).length;
      const sentiment: SignalSentiment =
        negativeCount > positiveCount ? NEGATIVE_SENTIMENT : positiveCount > negativeCount ? POSITIVE_SENTIMENT : NEUTRAL_SENTIMENT;
      const severity = getDominantSeverity(themeSignals, theme);
      const frequencyScore = roundScore(1 + (themeSignals.length / maxCount) * 4);
      const severityScore = getSeverityScore(severity);
      const recencyScore = getRecencyScore(range, latestSignal.observed_date);

      return {
        theme,
        sentiment,
        frequency: themeSignals.length,
        frequency_score: frequencyScore,
        severity_score: severityScore,
        recency_score: recencyScore,
        priority_score: roundScore(0.5 * frequencyScore + 0.3 * severityScore + 0.2 * recencyScore),
      } satisfies ThemeScore;
    })
    .sort((left, right) => right.priority_score - left.priority_score);
}
