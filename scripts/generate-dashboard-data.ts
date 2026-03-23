import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import type { DashboardData, DatePrecision, FeedbackSignal, Severity, Source, SourceType } from '../lib/data';
import { SOURCE_KEY_MAP } from '../lib/data';
import {
  buildBugClustersFromSignals,
  buildThemeScoresFromSignals,
  cleanSignalText,
  getSignalDateRange,
  inferFeedbackDescriptor,
  isLikelyNoiseText,
  normalizeDateValue,
  sortSignalsByObservedDate,
} from '../lib/signal-analytics';

const SCRIPT_PATH = fileURLToPath(import.meta.url);
const PROJECT_ROOT = path.resolve(path.dirname(SCRIPT_PATH), '..');
const DATASET_PATH = path.join(PROJECT_ROOT, 'dashboard-data.generated.json');
const OUTPUT_PATHS = [
  path.join(PROJECT_ROOT, 'dashboard-data.generated.json'),
  path.join(PROJECT_ROOT, 'public/dashboard-data.generated.json'),
  path.join(PROJECT_ROOT, 'GDD/dashboard-data.generated.json'),
];

const IINFO_ARTIFACTS = [
  'iinfo/file.txt',
  'iinfo/file 2.txt',
  'iinfo/32b0f6c4-1d04-4b48-b22b-7b732098ff0e.html',
];

const RUSSIAN_MONTHS: Record<string, string> = {
  янв: '01',
  'янв.': '01',
  фев: '02',
  'фев.': '02',
  мар: '03',
  'мар.': '03',
  апр: '04',
  'апр.': '04',
  май: '05',
  мая: '05',
  июн: '06',
  'июн.': '06',
  июл: '07',
  'июл.': '07',
  авг: '08',
  'авг.': '08',
  сен: '09',
  'сен.': '09',
  окт: '10',
  'окт.': '10',
  ноя: '11',
  'ноя.': '11',
  дек: '12',
  'дек.': '12',
};

const DISCORD_ROOT_URL = 'https://discord.com/channels';
const STEAM_DISCUSSIONS_URL = 'https://steamcommunity.com/app/3196440/discussions/';

export function parseDiscordTranscriptText(text: string, fileId = 'discord-transcript'): FeedbackSignal[] {
  const lines = text.split(/\r?\n/);
  const signals: FeedbackSignal[] = [];
  let lineIndex = 0;

  while (lineIndex < lines.length) {
    const dateMatch = lines[lineIndex].match(/—\s*(\d{2})\.(\d{2})\.(\d{4}),\s*(\d{2}:\d{2})/);
    if (!dateMatch) {
      lineIndex += 1;
      continue;
    }

    const observedDate = `${dateMatch[3]}-${dateMatch[2]}-${dateMatch[1]}`;
    const observedAt = `${observedDate}T${dateMatch[4]}:00`;
    const author = extractDiscordAuthor(lines, lineIndex - 1);
    const contentLines: string[] = [];
    lineIndex += 1;

    while (lineIndex < lines.length && !/—\s*\d{2}\.\d{2}\.\d{4},\s*\d{2}:\d{2}/.test(lines[lineIndex])) {
      contentLines.push(lines[lineIndex]);
      lineIndex += 1;
    }

    const signal = createSignal({
      source: 'Discord',
      sourceType: 'discord_message',
      author,
      fileId,
      url: DISCORD_ROOT_URL,
      quote: contentLines.join(' '),
      observedDate,
      observedAt,
      datePrecision: 'minute',
    });

    if (signal) signals.push(signal);
  }

  return signals;
}

export function parseSteamDiscussionText(text: string, fileId = 'steam-discussions'): FeedbackSignal[] {
  const lines = text.split(/\r?\n/);
  const signals: FeedbackSignal[] = [];
  let lineIndex = 0;

  while (lineIndex < lines.length) {
    const match = cleanSignalText(lines[lineIndex]).match(/^(.+?)\s+(\d{1,2})\s+([A-Za-zА-Яа-яё.]+)(?:\s+(\d{4})\s*г\.)?\s+в\s+(\d{1,2}:\d{2})$/);
    if (!match) {
      lineIndex += 1;
      continue;
    }

    const author = match[1].trim();
    const observedDate = parseLocalizedDate(match[2], match[3], match[4] || '2026');
    const observedAt = observedDate ? `${observedDate}T${match[5]}:00` : undefined;
    const contentLines: string[] = [];
    lineIndex += 1;

    while (lineIndex < lines.length) {
      const cleaned = cleanSignalText(lines[lineIndex]);
      if (!cleaned) {
        contentLines.push('');
        lineIndex += 1;
        continue;
      }
      if (/^(.+?)\s+\d{1,2}\s+[A-Za-zА-Яа-яё.]+(?:\s+\d{4}\s*г\.)?\s+в\s+\d{1,2}:\d{2}$/.test(cleaned)) break;
      if (/^(сообщения|<\s*\d+|\#\d+|отредактировано)/i.test(cleaned)) {
        lineIndex += 1;
        continue;
      }

      contentLines.push(lines[lineIndex]);
      lineIndex += 1;
    }

    const signal = createSignal({
      source: 'Steam',
      sourceType: 'steam_post',
      author,
      fileId,
      url: STEAM_DISCUSSIONS_URL,
      quote: contentLines.join(' '),
      observedDate,
      observedAt,
      datePrecision: observedAt ? 'minute' : 'day',
    });

    if (signal) signals.push(signal);
  }

  return signals;
}

export function parseDiscordHtmlExport(html: string, fileId = 'discord-export'): FeedbackSignal[] {
  const startToken = 'const messages = ';
  const endToken = '];';
  const startIndex = html.indexOf(startToken);
  if (startIndex < 0) return [];

  const payloadStart = startIndex + startToken.length;
  const endIndex = html.indexOf(endToken, payloadStart);
  if (endIndex < 0) return [];

  const rawJson = html.slice(payloadStart, endIndex + 1);
  const messages = JSON.parse(rawJson) as Array<{
    id?: string;
    content?: string;
    timestamp?: string;
    author?: { global_name?: string | null; username?: string | null };
  }>;

  return messages
    .map((message) => {
      const timestamp = String(message.timestamp || '');
      const observedDate = normalizeDateValue(timestamp.slice(0, 10));
      const author = message.author?.global_name || message.author?.username || '';

      return createSignal({
        source: 'Discord',
        sourceType: 'discord_message',
        author,
        fileId,
        messageId: message.id,
        url: DISCORD_ROOT_URL,
        quote: message.content || '',
        observedDate,
        observedAt: timestamp || undefined,
        datePrecision: timestamp ? 'minute' : 'inferred',
      });
    })
    .filter((signal): signal is FeedbackSignal => Boolean(signal));
}

export function rebuildDashboardData(baseData: DashboardData, importedSignals: FeedbackSignal[]): DashboardData {
  const normalizedBaseSignals = baseData.feedback_signals.map((signal) => normalizeExistingSignal(signal, baseData.meta.actuality_date));
  const mergedSignals = dedupeSignals([...normalizedBaseSignals, ...importedSignals]);
  const sortedSignals = sortSignalsByObservedDate(mergedSignals);
  const signalRange = getSignalDateRange(sortedSignals);
  const actualityDate = signalRange.max || baseData.meta.actuality_date;

  return {
    ...baseData,
    meta: {
      ...baseData.meta,
      actuality_date: actualityDate,
      signals_raw: sortedSignals.length,
      signals_unique: sortedSignals.length,
    },
    theme_scores: buildThemeScoresFromSignals(sortedSignals),
    bug_clusters: buildBugClustersFromSignals(sortedSignals, 'desc'),
    feedback_signals: sortedSignals,
    source_snapshot: {
      ...baseData.source_snapshot,
      verified_at: actualityDate,
      compiled_artifacts: uniqueStrings([...(baseData.source_snapshot.compiled_artifacts || []), ...IINFO_ARTIFACTS]),
      update_notes: uniqueStrings([
        ...(baseData.source_snapshot.update_notes || []),
        `iinfo sources were normalized into the dashboard dataset on ${actualityDate}.`,
      ]),
    },
  };
}

export function writeDashboardDataCopies(projectRoot: string, dashboardData: DashboardData): void {
  const payload = `${JSON.stringify(dashboardData, null, 2)}\n`;
  for (const filePath of OUTPUT_PATHS.map((candidate) => (path.isAbsolute(candidate) ? candidate : path.join(projectRoot, candidate)))) {
    writeFileSync(filePath, payload, 'utf8');
  }
}

export function loadImportedSignals(projectRoot: string): FeedbackSignal[] {
  const discordTxtPath = path.join(projectRoot, 'iinfo/file.txt');
  const steamTxtPath = path.join(projectRoot, 'iinfo/file 2.txt');
  const discordHtmlPath = path.join(projectRoot, 'iinfo/32b0f6c4-1d04-4b48-b22b-7b732098ff0e.html');

  if (!existsSync(discordTxtPath) || !existsSync(steamTxtPath) || !existsSync(discordHtmlPath)) {
    return [];
  }

  const discordTxt = readFileSync(discordTxtPath, 'utf8');
  const steamTxt = readFileSync(steamTxtPath, 'utf8');
  const discordHtml = readFileSync(discordHtmlPath, 'utf8');

  return dedupeSignals([
    ...parseDiscordTranscriptText(discordTxt, 'iinfo-file-txt'),
    ...parseSteamDiscussionText(steamTxt, 'iinfo-file-2-txt'),
    ...parseDiscordHtmlExport(discordHtml, 'iinfo-discord-html'),
  ]);
}

function createSignal({
  source,
  sourceType,
  author,
  fileId,
  url,
  quote,
  observedDate,
  observedAt,
  datePrecision,
  messageId,
}: {
  source: Source;
  sourceType: SourceType;
  author: string;
  fileId: string;
  url: string;
  quote: string;
  observedDate: string | null;
  observedAt?: string;
  datePrecision: DatePrecision;
  messageId?: string;
}): FeedbackSignal | null {
  const cleanedQuote = cleanSignalText(quote);
  if (!cleanedQuote || cleanedQuote.length < 20 || isLikelyNoiseText(cleanedQuote)) return null;

  const descriptor = inferFeedbackDescriptor(cleanedQuote);
  if (!descriptor || !observedDate) return null;

  return {
    source,
    source_type: sourceType,
    id: messageId || `${fileId}-${slugify(author || descriptor.theme)}-${observedDate}-${slugify(cleanedQuote.slice(0, 64))}`,
    url,
    quote: cleanedQuote,
    theme: descriptor.theme,
    severity: descriptor.severity,
    sentiment: descriptor.sentiment,
    observed_date: observedDate,
    observed_at: observedAt,
    date_precision: datePrecision,
  };
}

function normalizeExistingSignal(signal: FeedbackSignal, fallbackDate: string): FeedbackSignal {
  const normalizedSource = normalizeSourceLabel(signal.source);
  const observedDate =
    normalizeDateValue(signal.observed_date) ||
    extractIsoDate(signal.id) ||
    extractIsoDate(signal.url || '') ||
    normalizeDateValue(fallbackDate) ||
    '1970-01-01';

  const inferredPrecision: DatePrecision =
    signal.date_precision ||
    (signal.observed_at ? 'minute' : extractIsoDate(signal.id) || extractIsoDate(signal.url || '') ? 'day' : 'inferred');

  return {
    ...signal,
    source: normalizedSource,
    observed_date: observedDate,
    observed_at: signal.observed_at,
    date_precision: inferredPrecision,
    source_type: signal.source_type || inferSourceType(normalizedSource, signal.url),
  };
}

function dedupeSignals(signals: FeedbackSignal[]): FeedbackSignal[] {
  const byKey = new Map<string, FeedbackSignal>();

  for (const signal of signals) {
    const normalizedQuote = cleanSignalText(signal.quote).toLowerCase();
    if (!normalizedQuote) continue;
    const key = `${signal.source}|${signal.observed_date}|${normalizedQuote}`;
    const current = byKey.get(key);

    if (!current) {
      byKey.set(key, signal);
      continue;
    }

    byKey.set(key, mergeSignals(current, signal));
  }

  return Array.from(byKey.values());
}

function mergeSignals(left: FeedbackSignal, right: FeedbackSignal): FeedbackSignal {
  return {
    ...left,
    ...right,
    url: left.url || right.url,
    observed_at: left.observed_at || right.observed_at,
    severity: higherSeverity(left.severity, right.severity),
    sentiment: pickSentiment(left.sentiment, right.sentiment),
    date_precision: morePreciseDate(left.date_precision, right.date_precision),
  };
}

function pickSentiment(left?: FeedbackSignal['sentiment'], right?: FeedbackSignal['sentiment']): FeedbackSignal['sentiment'] {
  if (left === 'negative' || right === 'negative') return 'negative';
  if (left === 'positive' || right === 'positive') return 'positive';
  return left || right || 'neutral';
}

function higherSeverity(left?: Severity, right?: Severity): Severity | undefined {
  const severityRank: Record<Severity, number> = {
    critical: 3,
    major: 2,
    minor: 1,
  };

  if (!left) return right;
  if (!right) return left;
  return severityRank[right] > severityRank[left] ? right : left;
}

function morePreciseDate(left: DatePrecision, right: DatePrecision): DatePrecision {
  const precisionRank: Record<DatePrecision, number> = {
    minute: 3,
    day: 2,
    inferred: 1,
  };

  return precisionRank[right] > precisionRank[left] ? right : left;
}

function parseLocalizedDate(dayRaw: string, monthRaw: string, yearRaw: string): string | null {
  const monthKey = monthRaw.toLowerCase();
  const month = RUSSIAN_MONTHS[monthKey];
  if (!month) return null;

  const day = String(dayRaw).padStart(2, '0');
  return `${yearRaw}-${month}-${day}`;
}

function extractDiscordAuthor(lines: string[], startIndex: number): string {
  for (let index = startIndex; index >= Math.max(0, startIndex - 3); index -= 1) {
    const candidate = cleanSignalText(lines[index]);
    if (!candidate) continue;
    if (/^(TC|DEV|MOD|STAFF)$/i.test(candidate)) continue;
    if (looksLikeTitle(candidate)) continue;
    return candidate.replace(/,+$/, '');
  }

  return '';
}

function looksLikeTitle(value: string): boolean {
  const letters = value.replace(/[^A-Za-zА-Яа-яЁё]/g, '');
  if (letters.length < 4) return false;
  const upperCase = letters.replace(/[^A-ZА-ЯЁ]/g, '').length;
  return upperCase / letters.length > 0.7;
}

function extractIsoDate(value: string): string | null {
  const match = String(value || '').match(/\b(\d{4}-\d{2}-\d{2})\b/);
  return match ? match[1] : null;
}

function normalizeSourceLabel(value: string): Source {
  return SOURCE_KEY_MAP[String(value || '')] || (['Steam', 'Discord', 'YouTube', 'Forum'].includes(value) ? (value as Source) : 'Unknown');
}

function inferSourceType(source: Source, url?: string): SourceType {
  if (source === 'Discord') return 'discord_message';
  if (source === 'Forum') return 'forum_post';
  if (url && url.includes('/discussions/')) return 'steam_post';
  return 'steam_post';
}

function slugify(value: string): string {
  return cleanSignalText(value)
    .toLowerCase()
    .replace(/[^a-z0-9а-яё]+/gi, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);
}

function uniqueStrings(values: string[]): string[] {
  return [...new Set(values.filter(Boolean))];
}

export function runDashboardDataGeneration(projectRoot = PROJECT_ROOT): DashboardData {
  const baseData = JSON.parse(readFileSync(DATASET_PATH, 'utf8')) as DashboardData;
  const importedSignals = loadImportedSignals(projectRoot);
  const nextData = rebuildDashboardData(baseData, importedSignals);
  writeDashboardDataCopies(projectRoot, nextData);
  return nextData;
}

  if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  const nextData = runDashboardDataGeneration();
  const dateRange = getSignalDateRange(nextData.feedback_signals);
  process.stdout.write(
    `Updated dashboard data: ${nextData.feedback_signals.length} signals, actuality ${dateRange.max || nextData.meta.actuality_date}\n`,
  );
}
