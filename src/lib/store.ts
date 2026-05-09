import { create } from "zustand";
import type { LabState, PresetId } from "./types";
import { runMockEngine } from "@/data/mockEngine";
import { PRESETS } from "@/data/presets";

const STORAGE_KEY = "bsl:v1";
const MAX_HISTORY = 50;

const DEFAULT_STATE: LabState = {
  preset: "blank",
  system: "",
  mode: "simulated",
  settings: { severity: 2, horizon: "5y", shockCount: 4 },
  result: null,
  notes: "",
};

type Persisted = {
  past: LabState[];
  present: LabState;
  future: LabState[];
};

function load(): Persisted {
  if (typeof window === "undefined") return { past: [], present: DEFAULT_STATE, future: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { past: [], present: DEFAULT_STATE, future: [] };
    const parsed = JSON.parse(raw);
    return {
      past: parsed.past ?? [],
      present: parsed.present ?? DEFAULT_STATE,
      future: parsed.future ?? [],
    };
  } catch {
    return { past: [], present: DEFAULT_STATE, future: [] };
  }
}

function save(state: Persisted) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

type Store = Persisted & {
  hydrated: boolean;
  hydrate: () => void;
  applyPreset: (id: PresetId) => void;
  setSystem: (s: string) => void;
  setMode: (m: LabState["mode"]) => void;
  setSettings: (s: Partial<LabState["settings"]>) => void;
  setNotes: (n: string) => void;
  run: () => void;
  reset: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
};

function pushHistory(state: Store, next: LabState): Partial<Store> {
  const past = [...state.past, state.present].slice(-MAX_HISTORY);
  const updated = { past, present: next, future: [] };
  save(updated);
  return updated;
}

export const useLabStore = create<Store>((set, get) => ({
  past: [],
  present: DEFAULT_STATE,
  future: [],
  hydrated: false,
  hydrate: () => {
    const loaded = load();
    set({ ...loaded, hydrated: true });
  },
  applyPreset: (id) => {
    const preset = id !== "blank" ? PRESETS[id] : null;
    const next: LabState = {
      ...get().present,
      preset: id,
      system: preset?.system ?? "",
      result: null,
    };
    const withResult: LabState = { ...next, result: runMockEngine(next) };
    set(pushHistory(get(), withResult));
  },
  setSystem: (s) => {
    const next = { ...get().present, system: s };
    set(pushHistory(get(), next));
  },
  setMode: (m) => {
    const next = { ...get().present, mode: m };
    set(pushHistory(get(), next));
  },
  setSettings: (s) => {
    const next = { ...get().present, settings: { ...get().present.settings, ...s } };
    const withResult = { ...next, result: next.result ? runMockEngine(next) : null };
    set(pushHistory(get(), withResult));
  },
  setNotes: (n) => {
    // notes don't go into history (avoid spam)
    const next = { ...get().present, notes: n };
    const updated = { ...get(), present: next };
    save({ past: get().past, present: next, future: get().future });
    set({ present: next });
    void updated;
  },
  run: () => {
    const next = { ...get().present, result: runMockEngine(get().present) };
    set(pushHistory(get(), next));
  },
  reset: () => {
    set(pushHistory(get(), DEFAULT_STATE));
  },
  undo: () => {
    const { past, present, future } = get();
    if (past.length === 0) return;
    const previous = past[past.length - 1];
    const newPast = past.slice(0, -1);
    const updated = { past: newPast, present: previous, future: [present, ...future] };
    save(updated);
    set(updated);
  },
  redo: () => {
    const { past, present, future } = get();
    if (future.length === 0) return;
    const next = future[0];
    const newFuture = future.slice(1);
    const updated = { past: [...past, present], present: next, future: newFuture };
    save(updated);
    set(updated);
  },
  canUndo: () => get().past.length > 0,
  canRedo: () => get().future.length > 0,
}));
