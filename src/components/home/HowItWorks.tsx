const STEPS = [
  { n: "01", title: "Map the system", body: "Describe the decision, business or portfolio you want to examine." },
  { n: "02", title: "Stress-test shocks", body: "Run extreme scenarios — the kind models usually miss." },
  { n: "03", title: "Inspect fragility", body: "See where small shocks cause outsized damage." },
  { n: "04", title: "Redesign choices", body: "Try barbell-style alternatives that protect downside and keep upside." },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <h2 className="text-xl font-semibold tracking-tight">How it works</h2>
      <p className="text-sm text-muted-foreground mt-1">A short loop you can repeat on any system.</p>
      <ol className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STEPS.map((s) => (
          <li key={s.n} className="rounded-xl border border-border/70 p-5">
            <div className="text-xs text-muted-foreground tabular-nums">{s.n}</div>
            <div className="mt-2 text-sm font-medium">{s.title}</div>
            <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
