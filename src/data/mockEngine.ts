import { PRESETS } from "./presets";
import type { LabResult, LabState, Preset } from "@/lib/types";

const GENERIC: Pick<Preset, "fragilities" | "shocks" | "impact" | "resilientImpact" | "barbell"> = {
  fragilities: [
    { id: "g1", label: "Single point of failure", description: "One node, person, or vendor whose loss breaks the system.", severity: "high" },
    { id: "g2", label: "Hidden correlation", description: "Things that look independent are actually linked under stress.", severity: "medium" },
    { id: "g3", label: "Thin buffers", description: "No slack to absorb a surprise.", severity: "medium" },
    { id: "g4", label: "Optimised for the average case", description: "Performance is great until the tail arrives.", severity: "high" },
  ],
  shocks: [
    { id: "g1", title: "Demand collapse", description: "A sudden drop in primary demand.", probability: "possible", impact: "high", horizon: "months" },
    { id: "g2", title: "Key dependency fails", description: "A core vendor, partner or input becomes unavailable.", probability: "possible", impact: "high", horizon: "weeks" },
    { id: "g3", title: "Regulatory surprise", description: "A rule change reshapes the playing field overnight.", probability: "unlikely", impact: "medium", horizon: "months" },
    { id: "g4", title: "Reputational event", description: "A public incident erodes trust quickly.", probability: "unlikely", impact: "medium", horizon: "weeks" },
  ],
  impact: {
    exposureScore: 70,
    downside: "Shocks compound; the system can fail before you have time to react.",
    upside: "Smooth performance in calm conditions.",
    notes: ["Concentration", "Hidden coupling", "Insufficient slack"],
  },
  resilientImpact: {
    exposureScore: 35,
    downside: "Slightly higher steady-state cost.",
    upside: "Survives surprises; can act when others can't.",
    notes: ["Redundancy", "Decoupling", "Healthy buffers"],
  },
  barbell: [
    { id: "b1", safe: "Protect the downside with redundancy and reserves.", asymmetric: "Take small, capped bets on outsized upside.", rationale: "Avoid ruin; keep convex exposure." },
    { id: "b2", safe: "Decouple critical dependencies.", asymmetric: "Experiment with one bold alternative.", rationale: "Reduce hidden coupling; learn cheaply." },
    { id: "b3", safe: "Increase buffers (cash, time, inventory).", asymmetric: "Pre-commit a plan to act when others panic.", rationale: "Turn volatility into opportunity." },
  ],
};

function modulate(score: number, settings: LabState["settings"]): number {
  const sevAdj = (settings.severity - 2) * 6;
  const horAdj = settings.horizon === "10y" ? 6 : settings.horizon === "5y" ? 3 : 0;
  return Math.max(5, Math.min(99, score + sevAdj + horAdj));
}

export function runMockEngine(state: LabState): LabResult {
  const base =
    state.preset !== "blank" && PRESETS[state.preset]
      ? PRESETS[state.preset]
      : { ...GENERIC };

  const shocks = base.shocks.slice(0, Math.max(2, Math.min(state.settings.shockCount, base.shocks.length)));

  return {
    fragilities: base.fragilities,
    shocks,
    impact: { ...base.impact, exposureScore: modulate(base.impact.exposureScore, state.settings) },
    resilientImpact: { ...base.resilientImpact, exposureScore: modulate(base.resilientImpact.exposureScore, state.settings) },
    barbell: base.barbell,
  };
}
