import { Link, useLocation } from "@tanstack/react-router";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

export function Header() {
  const { pathname } = useLocation();
  const link = (to: string, label: string) => (
    <Link
      to={to}
      className={cn(
        "rounded-md px-3 py-1.5 text-sm transition-colors hover:text-foreground",
        pathname === to ? "text-foreground font-medium" : "text-muted-foreground"
      )}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-2 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span aria-hidden className="inline-block h-2.5 w-2.5 rounded-full bg-foreground" />
          <span className="text-sm font-semibold tracking-tight">Black Swan Lab</span>
        </Link>
        <nav className="flex items-center gap-1">
          {link("/", "Home")}
          {link("/lab", "Lab")}
          {link("/learn", "Learn")}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
