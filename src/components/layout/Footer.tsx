import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border/60 mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 text-sm text-muted-foreground flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p>Black Swan Lab — a sandbox for thinking about fragility, not predicting the future.</p>
        <div className="flex items-center gap-4">
          <Link to="/learn" className="hover:text-foreground">Learn the concepts</Link>
        </div>
      </div>
    </footer>
  );
}
