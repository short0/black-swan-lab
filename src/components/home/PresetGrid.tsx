import { Link, useNavigate } from "@tanstack/react-router";
import { PRESET_LIST } from "@/data/presets";
import { useLabStore } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

export function PresetGrid() {
  const apply = useLabStore((s) => s.applyPreset);
  const navigate = useNavigate();

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <div className="mb-6 flex items-end justify-between gap-2">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Start with a preset</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Each preset loads a real-feeling system, fragility map, shocks, and barbell ideas.
          </p>
        </div>
        <Link to="/lab" className="text-sm text-muted-foreground hover:text-foreground hidden sm:inline">
          Or open a blank lab →
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PRESET_LIST.map((p) => (
          <button
            key={p.id}
            onClick={() => {
              apply(p.id);
              navigate({ to: "/lab" });
            }}
            className="text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
          >
            <Card className="h-full p-5 transition-all hover:border-foreground/20 hover:shadow-[var(--shadow-soft)]">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-semibold leading-snug">{p.title}</h3>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.tagline}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.fragilities.slice(0, 2).map((f) => (
                  <span key={f.id} className="text-[11px] px-2 py-0.5 rounded-full border border-border/70 text-muted-foreground">
                    {f.label}
                  </span>
                ))}
              </div>
            </Card>
          </button>
        ))}
      </div>
    </section>
  );
}
