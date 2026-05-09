import type { Preset, PresetId } from "@/lib/types";

export const PRESETS: Record<Exclude<PresetId, "blank">, Preset> = {
  "startup-platform-risk": {
    id: "startup-platform-risk",
    title: "Startup under platform risk",
    tagline: "A SaaS built entirely on one app store or API.",
    system:
      "An early-stage SaaS that gets 80% of users from a single platform's app store and depends on one third-party API for core functionality.",
    fragilities: [
      { id: "f1", label: "Single distribution channel", description: "Most users come from one app store. A policy change can cut growth overnight.", severity: "high" },
      { id: "f2", label: "Vendor API lock-in", description: "Core feature relies on one external API with no fallback.", severity: "high" },
      { id: "f3", label: "Founder concentration", description: "Critical knowledge sits with one engineer.", severity: "medium" },
      { id: "f4", label: "Cash runway under 6 months", description: "Limited buffer to absorb shocks.", severity: "medium" },
    ],
    shocks: [
      { id: "s1", title: "App store delists the app", description: "A policy update flags the category and the app is removed for review.", probability: "possible", impact: "high", horizon: "months" },
      { id: "s2", title: "API pricing 10x overnight", description: "The vendor changes its commercial terms.", probability: "unlikely", impact: "high", horizon: "months" },
      { id: "s3", title: "Key engineer leaves", description: "Sole owner of the core system departs.", probability: "possible", impact: "medium", horizon: "weeks" },
      { id: "s4", title: "Funding round falls through", description: "Lead investor pulls out at the last minute.", probability: "possible", impact: "high", horizon: "months" },
    ],
    impact: {
      exposureScore: 82,
      downside: "Revenue can drop to near-zero within weeks if the platform or API moves against you.",
      upside: "Fast distribution while the channel works.",
      notes: ["Concentrated channel risk", "Single point of technical failure", "Thin runway amplifies any shock"],
    },
    resilientImpact: {
      exposureScore: 38,
      downside: "Slower growth, but no single shock is fatal.",
      upside: "Optionality across channels and vendors creates compounding distribution.",
      notes: ["Multiple acquisition channels", "API abstraction layer", "12+ months runway"],
    },
    barbell: [
      { id: "b1", safe: "Move 70% of effort to owned channels (web, email, SEO).", asymmetric: "Keep 30% experimenting with new platforms for outsized wins.", rationale: "Reduces distribution fragility while preserving upside bets." },
      { id: "b2", safe: "Build a thin abstraction over the vendor API and cache critical data.", asymmetric: "Pilot a second provider for 10% of traffic.", rationale: "A small bet today buys cheap insurance against a fatal vendor move." },
      { id: "b3", safe: "Extend runway to 18 months via cost cuts.", asymmetric: "Allocate a small budget to one ambitious growth experiment per quarter.", rationale: "Survive long enough to benefit from rare upside." },
    ],
    quickActions: [
      "What if the app store changes its policy tomorrow?",
      "Stress test a 10x API price hike",
      "Compare fragile vs barbell setup",
      "Explain why this is Black Swan-like",
      "Suggest cheap insurance moves",
    ],
  },
  "personal-finance-job-loss": {
    id: "personal-finance-job-loss",
    title: "Personal finances under job loss",
    tagline: "One income, fixed costs, and little buffer.",
    system:
      "A household with one salary, a mortgage, two car payments, and roughly one month of expenses saved.",
    fragilities: [
      { id: "f1", label: "Single income source", description: "All cash flow depends on one employer.", severity: "high" },
      { id: "f2", label: "High fixed costs", description: "Mortgage and car payments lock in monthly outflow.", severity: "high" },
      { id: "f3", label: "Thin emergency buffer", description: "Less than 1 month of runway.", severity: "high" },
      { id: "f4", label: "Skills tied to one industry", description: "Hard to pivot quickly if sector contracts.", severity: "medium" },
    ],
    shocks: [
      { id: "s1", title: "Sudden layoff", description: "Role is eliminated with two weeks notice.", probability: "possible", impact: "high", horizon: "weeks" },
      { id: "s2", title: "Industry-wide hiring freeze", description: "Job search stretches to 6+ months.", probability: "possible", impact: "high", horizon: "months" },
      { id: "s3", title: "Unexpected medical bill", description: "Large out-of-pocket expense at the worst time.", probability: "unlikely", impact: "medium", horizon: "weeks" },
      { id: "s4", title: "Major appliance or car repair", description: "Forces credit card debt at high interest.", probability: "possible", impact: "medium", horizon: "months" },
    ],
    impact: {
      exposureScore: 78,
      downside: "Missing payments within ~6 weeks; risk of compounding debt.",
      upside: "Comfortable lifestyle while income holds.",
      notes: ["No income redundancy", "Fixed costs cannot flex quickly", "Buffer too thin to absorb a shock"],
    },
    resilientImpact: {
      exposureScore: 32,
      downside: "Tighter month-to-month, but solvent through a long shock.",
      upside: "Freedom to take career risks without fear.",
      notes: ["6+ months of runway", "Side income stream", "Lower fixed costs"],
    },
    barbell: [
      { id: "b1", safe: "Build 6 months of expenses in a high-yield savings account.", asymmetric: "Invest a small fixed amount monthly in long-horizon assets.", rationale: "Survive shocks; participate in upside." },
      { id: "b2", safe: "Refinance or downsize one fixed cost.", asymmetric: "Start a low-cost side project that could grow into a second income.", rationale: "Cut floor; create optionality." },
      { id: "b3", safe: "Maintain disability and basic insurance.", asymmetric: "Invest in a high-leverage skill (e.g., a certification).", rationale: "Cheap insurance plus an asymmetric career bet." },
    ],
    quickActions: [
      "What happens if I lose my job next month?",
      "Compare 1 month vs 6 months runway",
      "Show me cheap insurance moves",
      "Explain barbell strategy in plain language",
      "Stress test a medical emergency",
    ],
  },
  "portfolio-crash": {
    id: "portfolio-crash",
    title: "Investment portfolio under market crash",
    tagline: "Concentrated equities, no hedges, full exposure.",
    system:
      "A retail investor with 100% in tech equities, on margin, no cash buffer, and no hedges.",
    fragilities: [
      { id: "f1", label: "Sector concentration", description: "Single sector dominates the portfolio.", severity: "high" },
      { id: "f2", label: "Leverage", description: "Margin amplifies drawdowns.", severity: "high" },
      { id: "f3", label: "No cash reserve", description: "No dry powder to deploy in a crash.", severity: "medium" },
      { id: "f4", label: "Behavioural risk", description: "Likely to sell at the bottom under stress.", severity: "medium" },
    ],
    shocks: [
      { id: "s1", title: "40% sector drawdown", description: "Tech sector enters a sustained bear market.", probability: "possible", impact: "high", horizon: "months" },
      { id: "s2", title: "Margin call", description: "Forced liquidation at the worst possible time.", probability: "possible", impact: "high", horizon: "weeks" },
      { id: "s3", title: "Black swan event", description: "Unexpected geopolitical or systemic shock.", probability: "rare", impact: "high", horizon: "weeks" },
      { id: "s4", title: "Rate shock", description: "Sudden hike crushes growth multiples.", probability: "possible", impact: "medium", horizon: "months" },
    ],
    impact: {
      exposureScore: 88,
      downside: "Permanent capital loss via forced selling at the bottom.",
      upside: "Outsized gains in a bull continuation.",
      notes: ["Leverage turns drawdowns into ruin", "Concentrated bets ignore tail risk", "No buffer to act on opportunities"],
    },
    resilientImpact: {
      exposureScore: 35,
      downside: "Smaller drawdowns; capital preserved.",
      upside: "Asymmetric exposure when valuations reset.",
      notes: ["Diversified core", "No leverage", "Cash reserve to deploy in dislocations"],
    },
    barbell: [
      { id: "b1", safe: "Hold 80% in low-cost diversified, low-volatility assets.", asymmetric: "Allocate 20% to high-conviction asymmetric bets.", rationale: "Classic Talebian barbell: protect the floor, keep the upside." },
      { id: "b2", safe: "Eliminate margin.", asymmetric: "Use small, defined-risk options for tail upside.", rationale: "Remove ruin risk, keep convex exposure." },
      { id: "b3", safe: "Build a cash reserve equal to 6–12 months of spending.", asymmetric: "Pre-commit a deployment plan for crash levels.", rationale: "Turn volatility from threat into opportunity." },
    ],
    quickActions: [
      "Stress test a 40% market drop",
      "Show what a margin call would do",
      "Compare fragile vs barbell portfolio",
      "Explain why prediction is the wrong goal",
      "Suggest tail-risk hedges",
    ],
  },
  "supply-chain": {
    id: "supply-chain",
    title: "Supply chain disruption for a small business",
    tagline: "One supplier, one port, one product line.",
    system:
      "A small e-commerce business sourcing 90% of inventory from one overseas supplier, shipping through one port, with 30 days of stock on hand.",
    fragilities: [
      { id: "f1", label: "Single-supplier dependence", description: "No qualified alternative manufacturer.", severity: "high" },
      { id: "f2", label: "Single shipping route", description: "All goods route through one port.", severity: "high" },
      { id: "f3", label: "Thin inventory buffer", description: "30 days does not cover typical disruption windows.", severity: "medium" },
      { id: "f4", label: "Narrow product line", description: "One SKU drives the majority of revenue.", severity: "medium" },
    ],
    shocks: [
      { id: "s1", title: "Supplier shutdown", description: "Factory closes for several weeks.", probability: "possible", impact: "high", horizon: "months" },
      { id: "s2", title: "Port strike or closure", description: "Shipping route is blocked.", probability: "possible", impact: "high", horizon: "weeks" },
      { id: "s3", title: "Tariff shock", description: "Costs rise sharply on the main category.", probability: "possible", impact: "medium", horizon: "months" },
      { id: "s4", title: "Quality recall", description: "A defective batch forces a stop-sell.", probability: "unlikely", impact: "high", horizon: "weeks" },
    ],
    impact: {
      exposureScore: 80,
      downside: "Stockouts within 30 days; lost customers and ranking.",
      upside: "Lower unit cost while the chain works.",
      notes: ["No supplier redundancy", "Single logistical chokepoint", "SKU concentration"],
    },
    resilientImpact: {
      exposureScore: 36,
      downside: "Higher unit cost but continuous supply.",
      upside: "Resilience becomes a brand and operating advantage.",
      notes: ["2+ qualified suppliers", "Multiple routes / nearshoring option", "60–90 days inventory on key SKUs"],
    },
    barbell: [
      { id: "b1", safe: "Qualify a second supplier in a different region.", asymmetric: "Pilot a small local manufacturer for premium variants.", rationale: "Redundancy plus a chance at a higher-margin line." },
      { id: "b2", safe: "Hold 60–90 days of inventory on top SKUs.", asymmetric: "Test pre-orders for new SKUs to learn demand cheaply.", rationale: "Buffer plus discovery." },
      { id: "b3", safe: "Diversify shipping (air for critical, sea for bulk).", asymmetric: "Negotiate a long-term contract option with a backup carrier.", rationale: "Cap downside; keep flexibility." },
    ],
    quickActions: [
      "What if my main supplier shuts down?",
      "Stress test a 6-week port closure",
      "Compare fragile vs resilient supply chain",
      "Explain hidden fragility in my setup",
      "Suggest cheap redundancy moves",
    ],
  },
};

export const PRESET_LIST = Object.values(PRESETS);
