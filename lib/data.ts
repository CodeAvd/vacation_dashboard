// Dashboard data types and static data for Vacation Cafe Simulator

export interface ThemeScore {
  theme: string;
  sentiment: "positive" | "negative" | "neutral";
  frequency: number;
  frequency_score: number;
  severity_score: number;
  recency_score: number;
  priority_score: number;
}

export interface Evidence {
  id: string;
  source: "steam" | "discord" | "youtube" | "forum";
  theme: string;
  severity: "critical" | "high" | "medium" | "low";
  quote: string;
  date: string;
  url?: string;
}

export interface BugCluster {
  id: string;
  cluster: string;
  severity: "critical" | "high" | "medium" | "low";
  priority: number;
  frequency: number;
  score: number;
  reproHints: string;
  sources: string[];
  status: "open" | "investigating" | "fixing" | "resolved";
}

export interface TopRisk {
  id: string;
  title: string;
  score: number;
  metrics: {
    frequency: number;
    severity: number;
    recency: number;
  };
  evidencePreview: string;
  context: string;
  whyItMatters: string;
  businessImpact: string;
  recommendedAction: string;
  theme: string;
}

export interface Competitor {
  name: string;
  marketRole: string;
  strengths: string[];
  weaknesses: string[];
  opportunity: string;
}

export interface RoadmapItem {
  id: string;
  title: string;
  phase: "0-1m" | "1-2m" | "2-3m";
  urgency: "critical" | "high" | "medium";
  dependencies: string[];
  status: "planned" | "in-progress" | "blocked";
}

export interface ActionItem {
  id: string;
  title: string;
  category: "bug" | "feature" | "ux" | "content";
  priority: number;
  effort: "low" | "medium" | "high";
  impact: "low" | "medium" | "high";
}

// Static dashboard data
export const dashboardMeta = {
  generatedAt: "2026-03-10T11:03:39.718Z",
  dataActuality: "March 10, 2026",
  rawSignals: 676,
  uniqueSignals: 633,
  scoringMethod: "Weighted Priority (Frequency × Severity × Recency)",
};

export const themeScores: ThemeScore[] = [
  {
    theme: "Save loss",
    sentiment: "negative",
    frequency: 37,
    frequency_score: 5,
    severity_score: 5,
    recency_score: 4.8,
    priority_score: 4.96,
  },
  {
    theme: "Co-op stability",
    sentiment: "negative",
    frequency: 36,
    frequency_score: 4.89,
    severity_score: 4,
    recency_score: 4.46,
    priority_score: 4.54,
  },
  {
    theme: "Performance",
    sentiment: "negative",
    frequency: 33,
    frequency_score: 4.57,
    severity_score: 4.5,
    recency_score: 4.03,
    priority_score: 4.44,
  },
  {
    theme: "Atmosphere/Cozy",
    sentiment: "positive",
    frequency: 23,
    frequency_score: 3.49,
    severity_score: 2,
    recency_score: 3.63,
    priority_score: 3.07,
  },
  {
    theme: "Controls/UI friction",
    sentiment: "negative",
    frequency: 9,
    frequency_score: 1.97,
    severity_score: 3.5,
    recency_score: 3.5,
    priority_score: 2.74,
  },
  {
    theme: "AI-art perception",
    sentiment: "negative",
    frequency: 7,
    frequency_score: 1.76,
    severity_score: 3.5,
    recency_score: 3.71,
    priority_score: 2.67,
  },
  {
    theme: "No-pressure flow",
    sentiment: "positive",
    frequency: 4,
    frequency_score: 1.43,
    severity_score: 2.5,
    recency_score: 3.88,
    priority_score: 2.24,
  },
  {
    theme: "Localization",
    sentiment: "negative",
    frequency: 2,
    frequency_score: 1.22,
    severity_score: 2.5,
    recency_score: 3.5,
    priority_score: 2.06,
  },
  {
    theme: "Audio/ASMR",
    sentiment: "positive",
    frequency: 1,
    frequency_score: 1.11,
    severity_score: 2,
    recency_score: 3.5,
    priority_score: 1.85,
  },
];

export const topRisks: TopRisk[] = [
  {
    id: "risk-1",
    title: "Save Data Loss on Crash",
    score: 4.96,
    metrics: { frequency: 37, severity: 5, recency: 4.8 },
    evidencePreview:
      '"Lost 4 hours of progress after the game crashed. No autosave kicked in..."',
    context:
      "Players are losing significant progress when the game crashes or closes unexpectedly. Autosave appears to not trigger in certain scenarios.",
    whyItMatters:
      "Save loss is the #1 trust destroyer in simulation games. Players invest emotional and time capital building their cafe.",
    businessImpact:
      "Directly causes negative reviews and refunds. Steam algorithm penalizes early negative review velocity.",
    recommendedAction:
      "Implement aggressive autosave (every 60s) + cloud backup sync. Add save integrity verification on load.",
    theme: "Save loss",
  },
  {
    id: "risk-2",
    title: "Co-op Connection Instability",
    score: 4.54,
    metrics: { frequency: 36, severity: 4, recency: 4.46 },
    evidencePreview:
      '"Every time we try to play together, one of us gets disconnected within 20 minutes..."',
    context:
      "Multiplayer sessions frequently drop connections. Host migration fails silently, leaving non-host players stranded.",
    whyItMatters:
      "Co-op is a key differentiator and purchase driver. Broken co-op means broken word-of-mouth marketing.",
    businessImpact:
      "Co-op games live or die by session reliability. Friends who can't play together won't recommend the game.",
    recommendedAction:
      "Audit netcode for timeout handling. Add reconnection grace period. Implement host migration fallback.",
    theme: "Co-op stability",
  },
  {
    id: "risk-3",
    title: "Performance Degradation Over Time",
    score: 4.44,
    metrics: { frequency: 33, severity: 4.5, recency: 4.03 },
    evidencePreview:
      '"Game runs smooth at first but after 2-3 hours the FPS drops to unplayable levels..."',
    context:
      "Memory leaks or object pooling issues cause progressive performance degradation during extended play sessions.",
    whyItMatters:
      "Simulation games are meant for long sessions. Performance decay directly contradicts the core experience promise.",
    businessImpact:
      "Players who experience slowdown assume their hardware is insufficient, leading to negative reviews blaming 'poor optimization'.",
    recommendedAction:
      "Profile memory allocation over 4+ hour sessions. Check for unreleased object references and texture streaming issues.",
    theme: "Performance",
  },
];

export const bugClusters: BugCluster[] = [
  {
    id: "bug-1",
    cluster: "Autosave not triggering",
    severity: "critical",
    priority: 1,
    frequency: 24,
    score: 4.8,
    reproHints:
      "Occurs when transitioning between cafe interior and exterior zones during active customer service",
    sources: ["steam", "discord"],
    status: "investigating",
  },
  {
    id: "bug-2",
    cluster: "Co-op desync on order completion",
    severity: "critical",
    priority: 2,
    frequency: 19,
    score: 4.5,
    reproHints:
      "Host and client see different order states. Completing order on client doesn't register on host",
    sources: ["steam", "discord", "forum"],
    status: "open",
  },
  {
    id: "bug-3",
    cluster: "Memory leak in particle systems",
    severity: "high",
    priority: 3,
    frequency: 15,
    score: 4.2,
    reproHints:
      "Steam/smoke particles don't despawn properly. VRAM usage climbs steadily after 90 minutes",
    sources: ["steam", "discord"],
    status: "investigating",
  },
  {
    id: "bug-4",
    cluster: "UI scaling broken on ultrawide",
    severity: "medium",
    priority: 4,
    frequency: 12,
    score: 3.4,
    reproHints:
      "Elements stretch or clip at 21:9 and 32:9 aspect ratios. Menus particularly affected",
    sources: ["steam", "forum"],
    status: "open",
  },
  {
    id: "bug-5",
    cluster: "Ingredient duplication exploit",
    severity: "medium",
    priority: 5,
    frequency: 8,
    score: 3.1,
    reproHints:
      "Quick-switching between storage containers during transfer duplicates items",
    sources: ["discord"],
    status: "open",
  },
  {
    id: "bug-6",
    cluster: "Customer pathfinding stuck",
    severity: "low",
    priority: 6,
    frequency: 6,
    score: 2.4,
    reproHints:
      "Customers occasionally get stuck on chair corners or between tables",
    sources: ["steam", "discord"],
    status: "fixing",
  },
];

export const evidenceItems: Evidence[] = [
  {
    id: "ev-1",
    source: "steam",
    theme: "Save loss",
    severity: "critical",
    quote:
      "Just lost my entire 6-hour cafe because the game crashed during a save. This is unacceptable for a full release game. Please add cloud saves and more frequent autosaves!",
    date: "2026-03-08",
    url: "#",
  },
  {
    id: "ev-2",
    source: "discord",
    theme: "Co-op stability",
    severity: "critical",
    quote:
      "My wife and I can't play for more than 15 minutes without one of us getting kicked. We both have good internet. This is really frustrating because we bought this specifically to play together.",
    date: "2026-03-09",
    url: "#",
  },
  {
    id: "ev-3",
    source: "youtube",
    theme: "Performance",
    severity: "high",
    quote:
      "Great game but I had to end my stream early because the FPS dropped to single digits after about 3 hours. Something is definitely leaking memory here.",
    date: "2026-03-07",
    url: "#",
  },
  {
    id: "ev-4",
    source: "steam",
    theme: "Atmosphere/Cozy",
    severity: "low",
    quote:
      "This is exactly what I needed. The Mediterranean vibes, the gentle music, the sound of the espresso machine... pure relaxation therapy. More games should be like this.",
    date: "2026-03-06",
  },
  {
    id: "ev-5",
    source: "forum",
    theme: "Controls/UI friction",
    severity: "medium",
    quote:
      "The drag-and-drop for ingredients feels imprecise. I keep accidentally putting things in the wrong place. A snap-to-grid or confirmation would help a lot.",
    date: "2026-03-05",
    url: "#",
  },
  {
    id: "ev-6",
    source: "discord",
    theme: "AI-art perception",
    severity: "medium",
    quote:
      "Some of the character portraits look AI-generated. The inconsistent art style is a bit jarring compared to the beautiful environment art.",
    date: "2026-03-04",
  },
  {
    id: "ev-7",
    source: "steam",
    theme: "No-pressure flow",
    severity: "low",
    quote:
      "I love that there's no fail state. I can just vibe and make coffee at my own pace. Perfect for unwinding after work.",
    date: "2026-03-03",
  },
  {
    id: "ev-8",
    source: "steam",
    theme: "Save loss",
    severity: "critical",
    quote:
      "Second time losing my save. I really want to love this game but I can't keep rebuilding from scratch. Waiting for a patch before I continue.",
    date: "2026-03-09",
  },
];

export const competitors: Competitor[] = [
  {
    name: "PlateUp!",
    marketRole: "Co-op kitchen chaos leader",
    strengths: [
      "Rock-solid multiplayer",
      "Roguelike replayability",
      "Active mod community",
    ],
    weaknesses: ["High stress gameplay", "Less cozy aesthetic", "Steep difficulty curve"],
    opportunity:
      "Position VCS as the relaxed alternative for players who want cafe vibes without the chaos",
  },
  {
    name: "Coffee Talk",
    marketRole: "Narrative coffee game benchmark",
    strengths: [
      "Strong story and characters",
      "Beautiful pixel art",
      "Emotional resonance",
    ],
    weaknesses: ["Limited gameplay depth", "No multiplayer", "Linear progression"],
    opportunity:
      "Offer similar atmosphere with deeper simulation mechanics and co-op play",
  },
  {
    name: "Lemon Cake",
    marketRole: "Cozy bakery sim",
    strengths: [
      "Cute aesthetic",
      "Simple mechanics",
      "Runs on low-end hardware",
    ],
    weaknesses: ["Lacks depth", "No co-op", "Dated graphics"],
    opportunity:
      "Deliver similar cozy vibes with modern visuals and meaningful progression",
  },
];

export const roadmapItems: RoadmapItem[] = [
  {
    id: "rm-1",
    title: "Critical save system overhaul",
    phase: "0-1m",
    urgency: "critical",
    dependencies: [],
    status: "in-progress",
  },
  {
    id: "rm-2",
    title: "Co-op netcode stabilization",
    phase: "0-1m",
    urgency: "critical",
    dependencies: [],
    status: "in-progress",
  },
  {
    id: "rm-3",
    title: "Memory profiling & leak fixes",
    phase: "0-1m",
    urgency: "high",
    dependencies: [],
    status: "planned",
  },
  {
    id: "rm-4",
    title: "Ultrawide UI support",
    phase: "1-2m",
    urgency: "medium",
    dependencies: [],
    status: "planned",
  },
  {
    id: "rm-5",
    title: "Improved ingredient handling UX",
    phase: "1-2m",
    urgency: "medium",
    dependencies: [],
    status: "planned",
  },
  {
    id: "rm-6",
    title: "Cloud save integration",
    phase: "1-2m",
    urgency: "high",
    dependencies: ["rm-1"],
    status: "planned",
  },
  {
    id: "rm-7",
    title: "Art style consistency pass",
    phase: "2-3m",
    urgency: "medium",
    dependencies: [],
    status: "planned",
  },
  {
    id: "rm-8",
    title: "Additional localization",
    phase: "2-3m",
    urgency: "medium",
    dependencies: [],
    status: "planned",
  },
];

export const actionItems: ActionItem[] = [
  {
    id: "act-1",
    title: "Implement 60-second autosave interval",
    category: "bug",
    priority: 1,
    effort: "low",
    impact: "high",
  },
  {
    id: "act-2",
    title: "Add save file backup rotation",
    category: "bug",
    priority: 2,
    effort: "medium",
    impact: "high",
  },
  {
    id: "act-3",
    title: "Audit co-op timeout thresholds",
    category: "bug",
    priority: 3,
    effort: "medium",
    impact: "high",
  },
  {
    id: "act-4",
    title: "Profile particle system cleanup",
    category: "bug",
    priority: 4,
    effort: "high",
    impact: "high",
  },
  {
    id: "act-5",
    title: "Add ingredient snap-to-slot",
    category: "ux",
    priority: 5,
    effort: "low",
    impact: "medium",
  },
];

export const psychologyInsights = [
  {
    title: "Trust Erosion Pattern",
    description:
      "Save loss creates a disproportionate negative emotional response. Players who lose progress once are 4x more likely to leave negative reviews.",
    recommendation: "Over-communicate save status. Add visual save indicator.",
  },
  {
    title: "Social Friction Amplification",
    description:
      "Co-op bugs are shared complaints. Each broken session affects 2-4 players who then each share their frustration separately.",
    recommendation:
      "Prioritize multiplayer stability over solo features during EA.",
  },
  {
    title: "Cozy Game Trust Paradox",
    description:
      "Players expect relaxation but bugs create stress that's jarring against the promised experience.",
    recommendation:
      "Frame stability as part of the cozy promise. Bugs hurt cozy games more than action games.",
  },
];

export const sourceBreakdown = {
  steam: { count: 312, percentage: 46 },
  discord: { count: 198, percentage: 29 },
  youtube: { count: 112, percentage: 17 },
  forum: { count: 54, percentage: 8 },
};
