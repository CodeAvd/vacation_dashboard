#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(__dirname, 'dialog_signals_cache.json');
const CHATLOG_GLOB = /^chatlogs-.*\.html$/i;
const MHTML_GLOB = /^107-Discord-bug-report-.*\.mhtml$/i;

const THEME_RULES = [
  { theme: 'Save loss', severity: 'critical', re: /\b(save|saved|saving|progress|load|slot|recover|deleted my|gone)\b/i },
  { theme: 'Co-op stability', severity: 'critical', re: /\b(co-op|coop|multiplayer|host|lobby|join|rejoin|disconnect|sync|desync)\b/i },
  { theme: 'Performance', severity: 'major', re: /\b(fps|stutter|freeze|lag|gpu|vram|optimization|performance|drops)\b/i },
  { theme: 'Controls/UI friction', severity: 'major', re: /\b(click|hold|input|controls?|inventory|ui|interface|sign text|camera)\b/i },
  { theme: 'AI-art perception', severity: 'major', re: /\b(ai\s*art|authenticity|generated image)\b/i },
  { theme: 'Localization', severity: 'minor', re: /\b(localization|translation|language|ukrainian)\b/i },
];

function decodeQuotedPrintable(input) {
  return input
    .replace(/=\r?\n/g, '')
    .replace(/=([A-Fa-f0-9]{2})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
}

function cleanText(value) {
  return String(value || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

function inferThemeAndSeverity(text) {
  for (const rule of THEME_RULES) {
    if (rule.re.test(text)) return { theme: rule.theme, severity: rule.severity };
  }
  return { theme: 'Controls/UI friction', severity: 'minor' };
}

function pushSignal(signals, seen, raw) {
  const quote = cleanText(raw.quote);
  if (!quote || quote.length < 18) return;
  const key = `${raw.source}|${quote.toLowerCase()}`;
  if (seen.has(key)) return;
  seen.add(key);

  const inferred = inferThemeAndSeverity(quote);
  signals.push({
    source: raw.source,
    id: raw.id || '',
    url: raw.url || '',
    quote,
    theme: raw.theme || inferred.theme,
    severity: raw.severity || inferred.severity,
    sentiment: raw.sentiment || 'negative',
  });
}

function parseChatlog(filePath, signals, seen) {
  const txt = fs.readFileSync(filePath, 'utf8');
  const startToken = 'const messages = ';
  const endToken = '];';
  const startIdx = txt.indexOf(startToken);
  if (startIdx < 0) return;

  const from = startIdx + startToken.length;
  const endIdx = txt.indexOf(endToken, from);
  if (endIdx < 0) return;

  const jsonPart = txt.slice(from, endIdx + 1);
  let messages = [];
  try {
    messages = JSON.parse(jsonPart);
  } catch {
    return;
  }

  for (const msg of messages) {
    const content = cleanText(msg.content || '');
    if (!content) continue;
    const maybeIssue = /(bug|issue|problem|save|progress|crash|freeze|lag|fps|multiplayer|co-op|coop|sync|host|join|can't|cannot|deleted|lost|stuck|error)/i;
    if (!maybeIssue.test(content)) continue;
    pushSignal(signals, seen, {
      source: 'Discord',
      id: String(msg.id || ''),
      quote: content,
      sentiment: 'negative',
      url: '',
    });
  }
}

function parseMhtml(filePath, signals, seen) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const dec = decodeQuotedPrintable(raw);

  // 1) Thread/publication titles from aria-label
  const pubRe = /aria-label="[^"]*(?:Публикация|publication)[^\"«]*[«\"]([^\"»]{8,160})[»\"][^\"]*"/gi;
  let m;
  while ((m = pubRe.exec(dec)) !== null) {
    pushSignal(signals, seen, {
      source: 'Forum',
      id: path.basename(filePath),
      quote: m[1],
      sentiment: 'negative',
      url: '',
    });
  }

  // 2) Heuristic snippets around issue keywords
  const keywordRe = /(save|progress|co-op|coop|multiplayer|disconnect|rejoin|crash|freeze|fps|lag|gpu|vram|inventory|input|controls|ui|stuck|deleted|lost)/gi;
  const maxSnippets = 28;
  let count = 0;
  while ((m = keywordRe.exec(dec)) !== null && count < maxSnippets) {
    const idx = m.index;
    const win = dec.slice(Math.max(0, idx - 140), idx + 240);
    const stripped = cleanText(win)
      .replace(/^[^a-zA-Z0-9а-яА-Я]+/, '')
      .replace(/[|]{2,}/g, ' ');
    const alpha = (stripped.match(/[A-Za-zА-Яа-я]/g) || []).length;
    if (alpha < 20 || stripped.length < 28) continue;

    pushSignal(signals, seen, {
      source: 'Forum',
      id: `${path.basename(filePath)}#${idx}`,
      quote: stripped,
      sentiment: 'negative',
      url: '',
    });
    count += 1;
  }
}

function main() {
  const entries = fs.readdirSync(ROOT);
  const chatlogs = entries.filter((f) => CHATLOG_GLOB.test(f)).map((f) => path.join(ROOT, f));
  const mhtmls = entries.filter((f) => MHTML_GLOB.test(f)).map((f) => path.join(ROOT, f)).sort();

  const signals = [];
  const seen = new Set();

  for (const file of chatlogs) parseChatlog(file, signals, seen);
  for (const file of mhtmls) parseMhtml(file, signals, seen);

  // Keep the freshest and most actionable slice for UI performance.
  const prio = { 'Save loss': 4, 'Co-op stability': 3, 'Performance': 2, 'Controls/UI friction': 1, 'AI-art perception': 0, 'Localization': 0 };
  const sorted = signals
    .slice()
    .sort((a, b) => (prio[b.theme] || 0) - (prio[a.theme] || 0) || b.quote.length - a.quote.length)
    .slice(0, 420);

  const out = {
    generated_at: new Date().toISOString(),
    source_files: {
      chatlogs_count: chatlogs.length,
      mhtml_count: mhtmls.length,
    },
    totals: {
      extracted_raw: signals.length,
      kept: sorted.length,
    },
    signals: sorted,
  };

  fs.writeFileSync(OUT, JSON.stringify(out, null, 2), 'utf8');
  console.log(`Wrote ${OUT}`);
  console.log(`Signals: raw=${signals.length}, kept=${sorted.length}`);
}

main();
