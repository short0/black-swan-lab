import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/layout/Header";
import { LabControls } from "@/components/lab/LabControls";
import { LabActions } from "@/components/lab/LabActions";
import { LabCenter } from "@/components/lab/LabCenter";
import { LabRight } from "@/components/lab/LabRight";
import { useLabStore } from "@/lib/store";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, BarChart3 } from "lucide-react";

export const Route = createFileRoute("/lab")({
  head: () => ({
    meta: [
      { title: "Lab — Black Swan Lab" },
      { name: "description", content: "Run stress tests, inspect fragility, and explore barbell redesigns." },
      { property: "og:title", content: "Black Swan Lab — Lab" },
      { property: "og:description", content: "Map a system, stress-test shocks, redesign for resilience." },
    ],
  }),
  component: LabPage,
});

function LabPage() {
  const hydrate = useLabStore((s) => s.hydrate);
  const hydrated = useLabStore((s) => s.hydrated);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    hydrate();
    setMounted(true);
  }, [hydrate]);

  if (!mounted || !hydrated) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      {/* Mobile sticky actions */}
      <div className="lg:hidden sticky top-14 z-20 border-b border-border/60 bg-background/90 backdrop-blur">
        <div className="px-4 py-2 flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="h-4 w-4 mr-1.5" /> Controls
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[88vw] sm:w-[420px] overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Lab controls</SheetTitle>
              </SheetHeader>
              <div className="mt-4">
                <LabControls />
              </div>
            </SheetContent>
          </Sheet>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <BarChart3 className="h-4 w-4 mr-1.5" /> Impact
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[88vw] sm:w-[420px] overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Impact &amp; redesign</SheetTitle>
              </SheetHeader>
              <div className="mt-4">
                <LabRight />
              </div>
            </SheetContent>
          </Sheet>
          <div className="ml-auto"><LabActions /></div>
        </div>
      </div>

      <main className="flex-1 mx-auto max-w-[1400px] w-full px-4 sm:px-6 py-6">
        <div className="hidden lg:flex items-center justify-between gap-2 mb-4">
          <h1 className="text-lg font-semibold tracking-tight">Lab</h1>
          <LabActions />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)_340px] gap-6">
          <aside className="hidden lg:block">
            <div className="sticky top-20">
              <LabControls />
            </div>
          </aside>
          <section className="min-w-0">
            <LabCenter />
          </section>
          <aside className="hidden lg:block">
            <div className="sticky top-20">
              <LabRight />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
