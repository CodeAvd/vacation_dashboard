import assert from 'node:assert/strict';
import test from 'node:test';
import { parseDiscordHtmlExport, parseDiscordTranscriptText, parseSteamDiscussionText } from './generate-dashboard-data';

test('Discord transcript parser extracts dated Discord feedback signals', () => {
  const sample = `I LOVE IT!
Matix
TC
 — 07.03.2026, 13:10
I love this game! Maybe optimize it a little better for smaller PCs.`;

  const signals = parseDiscordTranscriptText(sample, 'discord-sample');
  assert.equal(signals.length, 1);
  assert.equal(signals[0].source, 'Discord');
  assert.equal(signals[0].observed_date, '2026-03-07');
  assert.equal(signals[0].date_precision, 'minute');
  assert.equal(signals[0].theme, 'Performance');
});

test('Steam discussion parser understands localized date strings', () => {
  const sample = `Fabana 14 мар в 19:43
A truly lively and well-thought-out game with lots of attention to detail.

eliboy202 17 мар в 23:33
tables bug: guests are about to take this table but there arent coming any guests`;

  const signals = parseSteamDiscussionText(sample, 'steam-sample');
  assert.equal(signals.length, 2);
  assert.equal(signals[0].observed_date, '2026-03-14');
  assert.equal(signals[1].observed_date, '2026-03-17');
  assert.equal(signals[1].theme, 'Customer flow stall');
});

test('Discord HTML export parser keeps signal-like messages and ignores chatter', () => {
  const sample = `<!doctype html><script>const messages = [
    {"id":"1","content":"I like the concept of the game but I am really sad about AI images everywhere.","timestamp":"2026-03-03T10:25:35.985000+00:00","author":{"username":"clown"}},
    {"id":"2","content":"bahaha si","timestamp":"2026-03-03T11:00:52.961000+00:00","author":{"username":"noise"}}
  ];</script>`;

  const signals = parseDiscordHtmlExport(sample, 'html-sample');
  assert.equal(signals.length, 1);
  assert.equal(signals[0].id, '1');
  assert.equal(signals[0].theme, 'AI-art perception');
  assert.equal(signals[0].observed_date, '2026-03-03');
});
