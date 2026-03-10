export default function Loading() {
  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
      <div className="surface-card h-28 animate-pulse" />
      <div className="surface-card h-24 animate-pulse" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="surface-card h-[22rem] animate-pulse" />
        <div className="surface-card h-[22rem] animate-pulse" />
        <div className="surface-card h-[22rem] animate-pulse" />
      </div>
      <div className="surface-card h-[20rem] animate-pulse" />
    </main>
  );
}
