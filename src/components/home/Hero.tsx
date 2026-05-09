import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLabStore } from "@/lib/store";

export function Hero() {
  const reset = useLabStore((s) => s.reset);
  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 pt-16 sm:pt-24 pb-10 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-5">
        Inspired by Nassim Taleb
      </p>
      <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-balance">
        Stop predicting. Start removing fragility.
      </h1>
      <p className="mt-5 text-base sm:text-lg text-muted-foreground text-pretty">
        A calm sandbox to map a system, stress-test it against extreme shocks,
        and redesign it with barbell-style choices — so rare events don't ruin you.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button asChild size="lg">
          <Link to="/lab">Try a preset <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
        </Button>
        <Button asChild variant="outline" size="lg" onClick={() => reset()}>
          <Link to="/lab">Open blank lab</Link>
        </Button>
      </div>
    </section>
  );
}
