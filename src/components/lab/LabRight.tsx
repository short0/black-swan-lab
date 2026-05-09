import { useState } from "react";
import { useLabStore } from "@/lib/store";
import { Shield, Scale, Info, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function LabRight() {
  const result = useLabStore((s) => s.present.result);
  const preset = useLabStore((s) => s.present.preset);
  const [compare, setCompare] = useState(false);
  const [explainOpen, setExplainOpen] = useState(false);

  if (!result) {
    return (
      <div className="rounded-xl border border-dashed border-border/70 p-6 text-sm text-muted-foreground">
        Run a stress test to see impact and barbell ideas here.
      </div>
    );
  }

  const fragile = result.impact;
  const resilient = result.resilientImpact;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border/70 p-4">
        <div className="flex items-center justify-between gap-2">
          <div className="text-sm font-semibold flex items-center gap-2"><Shield className="h-4 w-4" /> Impact summary</div>
          <button
            onClick={() => setCompare((c) => !c)}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            {compare ? "Hide compare" : "Compare resilient"}
          </button>
        </div>

        <div className={cn("mt-4 grid gap-4", compare ? "grid-cols-2" : "grid-cols-1")}>
          <ImpactCard title="Current setup" tone="fragile" impact={fragile} />
          {compare && <ImpactCard title="Resilient setup" tone="resilient" impact={resilient} />}
        </div>
      </div>

      <div className="rounded-xl border border-border/70 p-4">
        <div className="text-sm font-semibold flex items-center gap-2"><Scale className="h-4 w-4" /> Barbell redesign</div>
        <p className="text-xs text-muted-foreground mt-1">Protect the floor, keep the upside.</p>
        <ul className="mt-3 space-y-3">
          {result.barbell.map((b) => (
            <li key={b.id} className="rounded-lg border border-border/70 p-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Safe core</div>
                  <p className="mt-0.5">{b.safe}</p>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Asymmetric bet</div>
                  <p className="mt-0.5">{b.asymmetric}</p>
                </div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{b.rationale}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-border/70">
        <button
          onClick={() => setExplainOpen((o) => !o)}
          className="w-full flex items-center justify-between p-4 text-sm font-medium"
          aria-expanded={explainOpen}
        >
          <span className="flex items-center gap-2"><Info className="h-4 w-4" /> Explain this result</span>
          <ChevronDown className={cn("h-4 w-4 transition-transform", explainOpen && "rotate-180")} />
        </button>
        {explainOpen && (
          <div className="px-4 pb-4 text-sm text-muted-foreground space-y-2 leading-relaxed">
            <p>
              A <strong className="text-foreground">Black Swan</strong> is a rare event with outsized impact that
              wasn't predicted. The goal isn't to forecast it — it's to make the system survive it.
            </p>
            <p>
              <strong className="text-foreground">Fragility</strong> is hidden cost from concentration, leverage
              and tight coupling. The exposure score is higher when small shocks can cause large damage.
            </p>
            <p>
              <strong className="text-foreground">Barbell strategy</strong>: combine a very safe core with a small
              allocation to high-upside, capped-downside bets. Avoid the dangerous middle.
            </p>
            {preset !== "blank" && (
              <p className="pt-1 border-t border-border/60">
                For this preset, the most dangerous combination is the listed high-severity fragilities meeting any one of
                the high-impact shocks above.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ImpactCard({
  title,
  tone,
  impact,
}: {
  title: string;
  tone: "fragile" | "resilient";
  impact: { exposureScore: number; downside: string; upside: string; notes: string[] };
}) {
  return (
    <div className="rounded-lg border border-border/70 p-3">
      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{title}</div>
        <div className="text-xs text-muted-foreground">Exposure</div>
      </div>
      <div className="mt-1 flex items-baseline gap-1">
        <span className="text-2xl font-semibold tabular-nums">{impact.exposureScore}</span>
        <span className="text-xs text-muted-foreground">/100</span>
      </div>
      <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
        <div
          className={cn("h-full rounded-full", tone === "fragile" ? "bg-foreground" : "bg-foreground/40")}
          style={{ width: `${impact.exposureScore}%` }}
        />
      </div>
      <div className="mt-3 space-y-2 text-xs">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Downside</div>
          <p className="mt-0.5 text-foreground/90">{impact.downside}</p>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Upside</div>
          <p className="mt-0.5 text-muted-foreground">{impact.upside}</p>
        </div>
      </div>
    </div>
  );
}
