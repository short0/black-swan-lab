export type PresetId =
  | "startup-platform-risk"
  | "personal-finance-job-loss"
  | "portfolio-crash"
  | "supply-chain"
  | "blank";

export type Severity = "low" | "medium" | "high";

export type Fragility = {
  id: string;
  label: string;
  description: string;
  severity: Severity;
};

export type Shock = {
  id: string;
  title: string;
  description: string;
  probability: "rare" | "unlikely" | "possible";
  impact: Severity;
  horizon: "weeks" | "months" | "years";
};

export type Impact = {
  exposureScore: number; // 0-100
  downside: string;
  upside: string;
  notes: string[];
};

export type BarbellIdea = {
  id: string;
  safe: string;
  asymmetric: string;
  rationale: string;
};

export type LabResult = {
  fragilities: Fragility[];
  shocks: Shock[];
  impact: Impact;
  barbell: BarbellIdea[];
  resilientImpact: Impact; // for compare
};

export type Settings = {
  severity: 1 | 2 | 3;
  horizon: "1y" | "5y" | "10y";
  shockCount: number;
};

export type Mode = "simulated" | "live";

export type LabState = {
  preset: PresetId;
  system: string;
  mode: Mode;
  settings: Settings;
  result: LabResult | null;
  notes: string;
};

export type Preset = {
  id: PresetId;
  title: string;
  tagline: string;
  system: string;
  fragilities: Fragility[];
  shocks: Shock[];
  impact: Impact;
  resilientImpact: Impact;
  barbell: BarbellIdea[];
  quickActions: string[];
};
