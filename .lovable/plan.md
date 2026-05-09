
## Black Swan Lab — Build Plan

A minimalist, fully responsive single-page web app for exploring Black Swan thinking. Mocked outputs by default; optional live LLM mode kept clearly secondary.

### Routes (TanStack Start)

- `/` — Home (hero, presets, "How it works", CTAs)
- `/lab` — Lab workspace (3-panel desktop, stacked mobile)
- `/learn` — Concepts page (Black Swan, fragility vs prediction, glossary)

Each route gets its own `head()` metadata.

### Information Architecture

**Home**
- Hero: 1-sentence definition + sub-line, two CTAs ("Try a preset" / "Open blank lab").
- Preset grid (4 cards): Startup platform risk, Personal finances/job loss, Portfolio crash, Supply chain disruption.
- "How it works" 4-step row: Map system → Stress-test shocks → Inspect fragility → Redesign.
- Footer: link to /learn, theme toggle.

**Lab (`/lab`)**
- Left panel: preset selector, system/decision textarea, mode toggle (Simulated / Live), settings (severity, horizon, count of shocks), Reset/Undo/Redo.
- Center panel:
  - Fragility Map (list of fragility points with severity chips).
  - Scenario Stress Tests (cards per shock with probability/impact badges).
  - Shock Timeline (horizontal lane on desktop, vertical on mobile).
- Right panel:
  - Impact Summary (downside/upside, exposure score).
  - Barbell Redesign ideas (safe core + asymmetric bets).
  - "What changed" diff vs original.
  - "Explain this result" inline expandable.
- Compare toggle: Fragile vs Resilient side-by-side.
- Mode banner: clear "Simulated output" vs "Live" pill.

**Learn (`/learn`)**
- Plain-language explainers, inline labels glossary (System, Shock, Fragility, Impact, Downside, Redesign).

### Component Structure

```
src/
  routes/
    __root.tsx        (theme provider, head, shell)
    index.tsx         (Home)
    lab.tsx           (Lab)
    learn.tsx         (Learn)
  components/
    layout/Header.tsx, Footer.tsx, ThemeToggle.tsx
    home/Hero.tsx, PresetGrid.tsx, HowItWorks.tsx
    lab/
      LeftPanel.tsx, CenterPanel.tsx, RightPanel.tsx
      FragilityMap.tsx, ScenarioCard.tsx, ShockTimeline.tsx
      ImpactSummary.tsx, BarbellIdeas.tsx, CompareView.tsx
      ModeBadge.tsx, ExplainPopover.tsx, UndoRedoBar.tsx
    ui/* (existing shadcn)
  data/
    presets.ts        (4 preloaded presets w/ fragility, shocks, impact, barbell, quick actions)
    mockEngine.ts     (deterministic mock generator using preset seed + settings)
  lib/
    store.ts          (Zustand store w/ undo/redo history stack)
    persistence.ts    (localStorage hydrate/save)
    llm.ts            (optional live mode adapter; no-op unless enabled)
    types.ts
  hooks/
    useTheme.ts, useUndoRedo.ts, useLabState.ts
```

### State Model

```ts
type LabState = {
  preset: PresetId | "blank";
  system: string;
  mode: "simulated" | "live";
  settings: { severity: 1|2|3; horizon: "1y"|"5y"|"10y"; shockCount: number };
  result: { fragilities: Fragility[]; shocks: Shock[]; impact: Impact; barbell: Idea[] };
  notes: string;
};
```

- History: array of snapshots + `cursor`. Undo/redo move cursor; new action truncates forward history. Persisted to localStorage under `bsl:v1`.
- Theme: `bsl:theme` (`light` default).
- Recent scenarios: last 10 results stored under `bsl:recent`.

### Mocked Engine

`mockEngine.run(state)` returns deterministic output:
- If preset selected → returns preset's curated payload (slightly modulated by severity/horizon).
- If blank → uses keyword heuristics on `system` text to pick from a library of generic fragilities/shocks/barbell ideas, so any input produces a sensible result without an LLM.

### Live Mode (optional, isolated)

- Toggle reveals a small disclaimer + endpoint field (no key storage in code; if user enables, store in localStorage with warning).
- Implemented via `lib/llm.ts` — single `generate(state)` function; default export is the mock. Live calls go through a server function `src/lib/blackswan.functions.ts` so a key (when added later via Lovable Cloud secrets) never reaches the client.
- Visible "LIVE" badge in header when active; otherwise "SIMULATED" pill.

### Design System

- Light default, dark via `.dark` class on `<html>` (toggle persisted).
- Neutral palette already in `src/styles.css`; refine: warmer off-white background `oklch(0.985 0.002 90)`, ink `oklch(0.18 0.02 260)`, single restrained accent `oklch(0.55 0.08 250)`.
- Typography: system stack, generous line-height, large headings, tracking-tight.
- Soft shadow token `--shadow-soft`, subtle border, rounded-xl cards.
- No gradients, no decorative noise.

### Responsiveness

- Desktop ≥1024px: 3-column lab grid (`grid-cols-[280px_1fr_320px]`).
- Tablet 640–1023px: 2 columns (left collapses into top sheet; right docks under center).
- Mobile <640px: stacked sections; sticky top bar with Preset / Run / Undo / Redo / Reset.

### Accessibility

- All controls reachable via keyboard; visible `focus-visible` rings using `--ring`.
- Min 44px tap targets on mobile.
- Color contrast checked in both themes.
- ARIA labels on icon-only buttons; live region for result updates.

### Dependencies

- `zustand` for state + history (small, fits well).
- Existing shadcn/Radix components (Button, Card, Tabs, Sheet, Tooltip, Popover, Switch, Select, Textarea, Badge, Separator).
- `lucide-react` icons (already present).

### Acceptance Checklist

- Light mode default; toggle persists.
- 4 presets render instantly with full mocked payloads + 3–5 quick actions each.
- Undo/Redo across preset change, system edit, settings, replay, clear.
- Reset returns to Home without wiping presets.
- Compare Fragile vs Resilient view works.
- "Explain this result" expands plain-language explanation.
- Layout verified at 1440 / 768 / 375.
- No live-LLM dependency required for any core flow.
