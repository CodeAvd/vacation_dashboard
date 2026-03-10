'use client';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl items-center px-4 py-10 sm:px-6 lg:px-8">
      <section className="surface-card w-full p-8 text-center">
        <p className="eyebrow">dashboard error</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-foreground">Dashboard failed to render</h1>
        <p className="mt-3 text-sm text-foreground-muted">
          The page hit a rendering error. Use retry to re-run the client state and selectors.
        </p>
        {error.message ? <p className="mt-3 text-xs text-foreground-soft">{error.message}</p> : null}
        <button type="button" onClick={reset} className="mt-6 inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary-strong">
          Retry render
        </button>
      </section>
    </main>
  );
}
