import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { PresetGrid } from "@/components/home/PresetGrid";
import { HowItWorks } from "@/components/home/HowItWorks";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Black Swan Lab — Stress-test fragility, not predictions" },
      { name: "description", content: "A calm sandbox to map systems, run extreme shocks, and redesign with barbell-style choices. Inspired by Nassim Taleb." },
      { property: "og:title", content: "Black Swan Lab" },
      { property: "og:description", content: "Map a system, stress-test shocks, redesign for resilience." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <Hero />
        <PresetGrid />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}
