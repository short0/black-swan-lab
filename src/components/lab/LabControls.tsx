import { useLabStore } from "@/lib/store";
import { PRESET_LIST, PRESETS } from "@/data/presets";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Sparkles, Play } from "lucide-react";
import type { PresetId } from "@/lib/types";

export function LabControls() {
  const present = useLabStore((s) => s.present);
  const applyPreset = useLabStore((s) => s.applyPreset);
  const setSystem = useLabStore((s) => s.setSystem);
  const setMode = useLabStore((s) => s.setMode);
  const setSettings = useLabStore((s) => s.setSettings);
  const run = useLabStore((s) => s.run);

  const preset = present.preset;
  const quickActions =
    preset !== "blank" ? PRESETS[preset].quickActions : [
      "Map a single point of failure",
      "Stress test a demand collapse",
      "Compare fragile vs resilient",
      "Explain Black Swan in plain language",
    ];

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-xs uppercase tracking-wider text-muted-foreground">Preset</Label>
        <Select value={preset} onValueChange={(v) => applyPreset(v as PresetId)}>
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Choose a preset" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="blank">Blank lab</SelectItem>
            {PRESET_LIST.map((p) => (
              <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="system" className="text-xs uppercase tracking-wider text-muted-foreground">
          System or decision
        </Label>
        <Textarea
          id="system"
          value={present.system}
          onChange={(e) => setSystem(e.target.value)}
          placeholder="Describe the system, business, or decision to analyse…"
          className="mt-2 min-h-[110px] text-sm"
        />
      </div>

      <div>
        <Label className="text-xs uppercase tracking-wider text-muted-foreground">Quick actions</Label>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {quickActions.map((q) => (
            <button
              key={q}
              onClick={() => {
                setSystem(present.system ? `${present.system}\n\n${q}` : q);
                run();
              }}
              className="text-xs px-2.5 py-1.5 rounded-full border border-border/70 hover:border-foreground/30 hover:bg-accent transition-colors text-left"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 rounded-lg border border-border/70 p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium flex items-center gap-1.5">
              {present.mode === "live" ? <Sparkles className="h-3.5 w-3.5" /> : null}
              {present.mode === "live" ? "Live mode" : "Simulated mode"}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              {present.mode === "live" ? "Uses an LLM (advanced)." : "Deterministic, instant results."}
            </p>
          </div>
          <Switch
            checked={present.mode === "live"}
            onCheckedChange={(v) => setMode(v ? "live" : "simulated")}
            aria-label="Toggle live mode"
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <Label className="text-xs">Severity</Label>
            <span className="text-xs text-muted-foreground tabular-nums">{present.settings.severity}</span>
          </div>
          <Slider
            value={[present.settings.severity]}
            min={1} max={3} step={1}
            onValueChange={([v]) => setSettings({ severity: v as 1 | 2 | 3 })}
            className="mt-2"
          />
        </div>

        <div>
          <Label className="text-xs">Time horizon</Label>
          <Select value={present.settings.horizon} onValueChange={(v) => setSettings({ horizon: v as "1y" | "5y" | "10y" })}>
            <SelectTrigger className="mt-2 h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1y">1 year</SelectItem>
              <SelectItem value="5y">5 years</SelectItem>
              <SelectItem value="10y">10 years</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <Label className="text-xs">Number of shocks</Label>
            <span className="text-xs text-muted-foreground tabular-nums">{present.settings.shockCount}</span>
          </div>
          <Slider
            value={[present.settings.shockCount]}
            min={2} max={6} step={1}
            onValueChange={([v]) => setSettings({ shockCount: v })}
            className="mt-2"
          />
        </div>
      </div>

      <Button onClick={run} className="w-full" size="lg">
        <Play className="h-4 w-4 mr-1.5" /> Run stress test
      </Button>
    </div>
  );
}
