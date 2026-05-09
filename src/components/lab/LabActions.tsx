import { useLabStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Undo2, Redo2, RotateCcw, Sparkles, FlaskConical } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

export function LabActions() {
  const undo = useLabStore((s) => s.undo);
  const redo = useLabStore((s) => s.redo);
  const reset = useLabStore((s) => s.reset);
  const past = useLabStore((s) => s.past);
  const future = useLabStore((s) => s.future);
  const mode = useLabStore((s) => s.present.mode);
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      <span
        className={[
          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs border",
          mode === "live"
            ? "border-foreground/30 bg-foreground text-background"
            : "border-border/70 text-muted-foreground",
        ].join(" ")}
      >
        {mode === "live" ? <Sparkles className="h-3 w-3" /> : <FlaskConical className="h-3 w-3" />}
        {mode === "live" ? "Live" : "Simulated"}
      </span>
      <div className="ml-auto flex items-center gap-1.5">
        <Button variant="ghost" size="sm" onClick={undo} disabled={past.length === 0} aria-label="Undo">
          <Undo2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={redo} disabled={future.length === 0} aria-label="Redo">
          <Redo2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            reset();
            navigate({ to: "/" });
          }}
          aria-label="Reset to home"
        >
          <RotateCcw className="h-4 w-4 mr-1" /> Reset
        </Button>
      </div>
    </div>
  );
}
