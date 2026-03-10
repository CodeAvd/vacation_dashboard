import type { FeedbackSignal, Locale, SourceSnapshot } from '@/lib/data';
import { sourceLabel, t } from '@/lib/i18n';
import { selectSourceBreakdown } from '@/lib/selectors';
import { ExternalLink } from 'lucide-react';

interface SourceBreakdownProps {
  locale: Locale;
  snapshot: SourceSnapshot;
  signals: FeedbackSignal[];
}

export function SourceBreakdown({ locale, snapshot, signals }: SourceBreakdownProps) {
  const breakdown = selectSourceBreakdown(signals);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 xl:grid-cols-[1.3fr_1fr]">
        <section className="surface-card p-5">
          <div className="eyebrow">{t(locale, 'source_status')}</div>
          <h3 className="mt-2 font-display text-2xl font-semibold tracking-[-0.03em] text-foreground">{snapshot.steam_store_status.name}</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <MetaBox label={t(locale, 'source_release')} value={snapshot.steam_store_status.release_date} />
            <MetaBox label={t(locale, 'source_reviews')} value={localizeReviewState(locale, snapshot.steam_store_status.review_state)} />
            <MetaBox label={t(locale, 'source_verified')} value={snapshot.verified_at} />
          </div>
          <div className="mt-4 rounded-[1.2rem] border border-border-subtle bg-surface-raised p-4">
            <div className="eyebrow">{t(locale, 'source_platforms')}</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {Object.entries(snapshot.steam_store_status.platforms).map(([platform, enabled]) => (
                <span key={platform} className={enabled ? 'badge-base badge-positive' : 'badge-base badge-muted'}>
                  {platform}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="surface-card p-5">
          <div className="eyebrow">{locale === 'ru' ? 'Сводка источников' : 'Source coverage'}</div>
          <div className="mt-4 space-y-4">
            <div className="flex h-4 overflow-hidden rounded-full bg-surface-strong">
              {breakdown.map((item) => (
                <div key={item.source} style={{ width: `${item.percentage}%` }} className={item.source === 'Steam' ? 'bg-[#1b2838]' : item.source === 'Discord' ? 'bg-[#5865f2]' : item.source === 'YouTube' ? 'bg-[#ff0000]' : 'bg-[#8f7c68]'} />
              ))}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {breakdown.map((item) => (
                <div key={item.source} className="rounded-[1.1rem] border border-border-subtle bg-surface-raised p-3">
                  <div className="eyebrow">{sourceLabel(locale, item.source)}</div>
                  <div className="mt-2 flex items-end justify-between gap-3">
                    <span className="font-display text-2xl font-semibold tracking-[-0.03em] text-foreground">{item.count}</span>
                    <span className="font-mono text-sm text-foreground-soft">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <section className="surface-card p-5">
          <div className="eyebrow">{locale === 'ru' ? 'Человеческая сводка' : 'Human summary'}</div>
          <div className="mt-4 space-y-3 text-sm leading-6 text-foreground-muted">
            <p>{locale === 'ru' ? 'Учтены обсуждения Steam, парсинг Discord-чатов и bug/feedback каналов, обзорные сигналы с YouTube и конкурентные снимки по market role.' : 'Included Steam discussions, parsed Discord chat plus bug/feedback channels, YouTube review signals, and competitor market-role snapshots.'}</p>
            {snapshot.compiled_artifacts.map((artifact) => (
              <p key={artifact}>• {localizeArtifact(locale, artifact)}</p>
            ))}
            {snapshot.update_notes.map((note) => (
              <p key={note}>• {localizeNote(locale, note)}</p>
            ))}
          </div>
        </section>

        <section className="surface-card p-5">
          <div className="eyebrow">{t(locale, 'source_http')}</div>
          <div id="sourceLinks" className="mt-4 space-y-3">
            {snapshot.url_checks.map((check) => (
              <a key={check.url} href={check.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3 rounded-[1.1rem] border border-border-subtle bg-surface-raised px-4 py-3 text-sm text-foreground transition hover:border-border-strong">
                <span className="min-w-0 truncate">{shortUrl(check.url)}</span>
                <span className={check.status >= 400 ? 'badge-base badge-critical' : 'badge-base badge-positive'}>
                  {check.status}
                  <ExternalLink className="h-3.5 w-3.5" />
                </span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function MetaBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.1rem] border border-border-subtle bg-surface-raised p-3">
      <div className="eyebrow">{label}</div>
      <div className="mt-2 text-sm leading-6 text-foreground">{value}</div>
    </div>
  );
}

function shortUrl(url: string): string {
  try {
    const parsed = new URL(url);
    return `${parsed.hostname}${parsed.pathname}`;
  } catch {
    return url;
  }
}

function localizeArtifact(locale: Locale, artifact: string): string {
  if (locale !== 'ru') return artifact;
  if (artifact === 'polyKalshi/README.md (offline compiled source)') return 'polyKalshi/README.md (офлайн-артефакт, скомпилированный в датасет)';
  return artifact;
}

function localizeNote(locale: Locale, note: string): string {
  if (locale !== 'ru') return note;
  if (note === 'README-derived signals were normalized into the dashboard dataset on 2026-03-09.') return 'Сигналы из README были нормализованы и включены в датасет 2026-03-09.';
  if (note === 'GitHub Pages runtime does not read local absolute files; this README was used only as an offline compilation source.') return 'GitHub Pages не читает локальные абсолютные файлы в рантайме; README использовался только как офлайн-источник при компиляции.';
  return note;
}

function localizeReviewState(locale: Locale, value: string): string {
  if (locale !== 'ru') return value;
  if (value === 'No user reviews') return 'Пользовательских отзывов пока нет';
  return value;
}
