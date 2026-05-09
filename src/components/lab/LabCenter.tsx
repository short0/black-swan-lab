import { useLabStore } from "@/lib/store";
import { AlertTriangle, Zap, Activity } from "lucide-react";

const sevColor: Record<string, string> = {
  high: "text-foreground border-foreground/30",
  medium: "text-muted-foreground border-border",
  low: "text-muted-foreground border-border/60",
};

const probLabel: Record<string, string> = {
  rare: "Rare",
  unlikely: "Unlikely",
  possible: "Possible",
};

export function LabCenter() {
  const result = useLabStore((s) => s.present.result);

  if (!result) {
    return (
      <div className="rounded-xl border border-dashed border-border/70 p-10 text-center">
        <Activity className="h-6 w-6 mx-auto text-muted-foreground" />
        <p className="mt-3 text-sm text-muted-foreground">
          Pick a preset on the left, or click <span className="text-foreground font-medium">Run stress test</span> to see results.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section>
        <SectionHeader icon={<AlertTriangle className="h-4 w-4" />} title="Fragility map" hint="Where small shocks cause outsized damage." />
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {result.fragilities.map((f) => (
            <li key={f.id} className="rounded-lg border border-border/70 p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="text-sm font-medium">{f.label}</div>
                <span className={`text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded border ${sevColor[f.severity]}`}>{f.severity}</span>
              </div>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{f.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <SectionHeader icon={<Zap className="h-4 w-4" />} title="Scenario stress tests" hint="Extreme but plausible shocks." />
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {result.shocks.map((s) => (
            <li key={s.id} className="rounded-lg border border-border/70 p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="text-sm font-medium">{s.title}</div>
                <span className={`text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded border ${sevColor[s.impact]}`}>{s.impact} impact</span>
              </div>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{s.description}</p>
              <div className="mt-3 flex items-center gap-2 text-[11px] text-muted-foreground">
                <span className="px-1.5 py-0.5 rounded bg-muted">{probLabel[s.probability]}</span>
                <span className="px-1.5 py-0.5 rounded bg-muted">{s.horizon}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <SectionHeader icon={<Activity className="h-4 w-4" />} title="Shock timeline" hint="When shocks tend to land." />
        <Timeline result={result} />
      </section>
    </div>
  );
}

function SectionHeader({ icon, title, hint }: { icon: React.ReactNode; title: string; hint: string }) {
  return (
    <div className="mb-3 flex items-end justify-between gap-2">
      <div>
        <div className="flex items-center gap-2 text-sm font-semibold">{icon}{title}</div>
        <p className="text-xs text-muted-foreground mt-0.5">{hint}</p>
      </div>
    </div>
  );
}

function Timeline({ result }: { result: NonNullable<ReturnType<typeof useLabStore.getState>["present"]["result"]> }) {
  const buckets: Record<"weeks" | "months" | "years", typeof result.shocks> = { weeks: [], months: [], years: [] };
  result.shocks.forEach((s) => buckets[s.horizon].push(s));
  const lanes: ("weeks" | "months" | "years")[] = ["weeks", "months", "years"];
  return (
    <div className="rounded-lg border border-border/70 p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {lanes.map((l) => (
          <div key={l}>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">{l}</div>
            <div className="space-y-1.5">
              {buckets[l].length === 0 ? (
                <div className="text-xs text-muted-foreground/60 italic">No shocks</div>
              ) : (
                buckets[l].map((s) => (
                  <div key={s.id} className="text-sm rounded border border-border/70 px-2.5 py-1.5">{s.title}</div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
