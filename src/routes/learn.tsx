import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { title: "Learn — Black Swan Lab" },
      { name: "description", content: "What makes an event Black Swan-like, the difference between prediction and fragility reduction, and a glossary of key terms." },
      { property: "og:title", content: "Learn Black Swan thinking" },
      { property: "og:description", content: "Prediction vs fragility reduction, in plain language." },
    ],
  }),
  component: LearnPage,
});

const GLOSSARY = [
  { term: "System", body: "The thing you're analysing — a business, a portfolio, a household, a supply chain." },
  { term: "Shock", body: "An event that hits the system from outside or inside, often fast and hard to predict." },
  { term: "Fragility", body: "The property of taking outsized damage from a small or unexpected shock." },
  { term: "Impact", body: "How big the consequences are when a shock arrives — measured in money, time, or survival." },
  { term: "Downside", body: "The worst plausible outcome. The thing you most want to cap." },
  { term: "Redesign", body: "Changes that reduce fragility — usually redundancy, decoupling and buffers." },
];

function LearnPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Concepts</p>
        <h1 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">Black Swan thinking, in plain language</h1>

        <section className="mt-10 space-y-3">
          <h2 className="text-lg font-semibold">What makes an event Black Swan-like?</h2>
          <p className="text-muted-foreground leading-relaxed">
            A Black Swan event has three properties: it's <strong className="text-foreground">rare</strong>,
            it has <strong className="text-foreground">outsized impact</strong>, and after the fact it
            looks <strong className="text-foreground">predictable</strong> even though almost nobody saw it coming.
            The lesson isn't to predict better — it's to build systems that survive surprises.
          </p>
        </section>

        <section className="mt-10 space-y-3">
          <h2 className="text-lg font-semibold">Prediction vs fragility reduction</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-lg border border-border/70 p-4">
              <div className="text-sm font-medium">Prediction</div>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                Tries to forecast what will happen. Fails on rare events — by definition you can't predict them well.
              </p>
            </div>
            <div className="rounded-lg border border-border/70 p-4">
              <div className="text-sm font-medium">Fragility reduction</div>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                Asks "what would hurt us most?" and removes single points of failure, leverage and tight coupling.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10 space-y-3">
          <h2 className="text-lg font-semibold">Barbell strategy</h2>
          <p className="text-muted-foreground leading-relaxed">
            Combine a very safe foundation with small, capped exposures to outsized upside. Avoid the
            dangerous middle — moderately risky bets that ruin you if a tail event lands.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-semibold">Glossary</h2>
          <dl className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {GLOSSARY.map((g) => (
              <div key={g.term} className="rounded-lg border border-border/70 p-4">
                <dt className="text-sm font-medium">{g.term}</dt>
                <dd className="mt-1 text-sm text-muted-foreground leading-relaxed">{g.body}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="mt-12 flex flex-wrap gap-3">
          <Button asChild><Link to="/lab">Open the Lab</Link></Button>
          <Button asChild variant="outline"><Link to="/">Back to home</Link></Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
