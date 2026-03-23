# Vacation Cafe Dashboard — Design System

> Artisan data dashboard for indie game product operations.
> "Warm clarity under pressure."

---

## Direction

**Philosophy:** An indie studio's product cockpit should feel as carefully crafted as the cozy game it serves.

**Approach:** "Warmth & Approachability" + "Data & Analysis" hybrid

| Principle | Implementation |
|-----------|----------------|
| Warmth before data | Mediterranean palette, paper textures, warm shadows |
| Density without coldness | Monospace labels, tight tables, severity badges wrapped in warm materials |
| Hierarchy through elevation | Cards stack with subtle shadow/gradient shifts |
| Domain-native colors | Terracotta accent, cypress primary, parchment surface |
| Generous but purposeful spacing | Large section cards, comfortable padding, no wasted space |
| Motion with restraint | Subtle fade-up animations, hover lifts — alive but not distracting |

---

## Color Tokens

### Foundation (Warm Mediterranean)
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-background` | `#f6f1e8` | Page background |
| `--color-surface` | `#fffdf8` | Card backgrounds |
| `--color-surface-raised` | `#fffaf3` | Elevated inner surfaces |
| `--color-surface-strong` | `#f0e7da` | Muted surface areas |
| `--color-border-subtle` | `#e1d7c7` | Default borders |
| `--color-border-strong` | `#ccbea9` | Hover/active borders |
| `--color-foreground` | `#241b15` | Primary text (espresso) |
| `--color-foreground-muted` | `#6f6254` | Secondary text |
| `--color-foreground-soft` | `#8d8173` | Tertiary/labels |

### Primary (Coastal Cypress)
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary` | `#285f59` | Primary actions, links |
| `--color-primary-strong` | `#1f4c47` | Hover state |
| `--color-primary-foreground` | `#ffffff` | Text on primary |

### Accent (Terracotta)
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-accent` | `#c4785a` | Accent elements, focal borders |
| `--color-accent-soft` | `#edd7cb` | Accent backgrounds |

### Semantic (Warm-Shifted Severity)
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-critical` | `#b54444` | P0 bugs, critical alerts |
| `--color-critical-bg` | `#fbefef` | Critical badge background |
| `--color-major` | `#b66c2f` | P1 bugs, warnings |
| `--color-major-bg` | `#fcf3ea` | Major badge background |
| `--color-minor` | `#967d3f` | P2 items, low priority |
| `--color-minor-bg` | `#f9f3df` | Minor badge background |
| `--color-positive` | `#3d6f43` | Success, completed |
| `--color-positive-bg` | `#edf7ee` | Positive badge background |

---

## Typography

### Font Stack
| Role | Font | Weights | Variable |
|------|------|---------|----------|
| Display | Sora | 600 | `--font-display` |
| Body | IBM Plex Sans | 400, 500, 600 | `--font-body` |
| Mono | IBM Plex Mono | 400, 500 | `--font-mono` |

### Type Scale
| Class | Size | Line Height | Weight | Usage |
|-------|------|-------------|--------|-------|
| Hero title | `3.5rem` / `56px` | 1.02 | 600 | Page title (xl screens) |
| Section title | `1.75rem` / `28px` | 1.2 | 600 | Section headings |
| Card title | `1.5rem` / `24px` | 1.2 | 600 | Card headings |
| Subhead | `1.0625rem` / `17px` | 1.5 | 500 | Subsection titles |
| Body | `0.9375rem` / `15px` | 1.6 | 400 | Primary content |
| Body small | `0.875rem` / `14px` | 1.5 | 400 | Secondary content |
| Eyebrow | `0.6875rem` / `11px` | 1 | 500 | Labels, captions |

### Eyebrow Pattern
```css
.eyebrow {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  line-height: 1;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-foreground-soft);
  font-weight: 500;
}
```

---

## Spacing Scale

Based on 4px base unit with modular progression.

| Token | Value | Tailwind | Usage |
|-------|-------|----------|-------|
| `1` | `4px` | `p-1` | Icon gaps |
| `2` | `8px` | `p-2` | Tight padding |
| `3` | `12px` | `p-3` | Badge padding |
| `4` | `16px` | `p-4` | Card padding (mobile) |
| `5` | `20px` | `p-5` | Card padding (default) |
| `6` | `24px` | `p-6` | Card padding (desktop) |
| `8` | `32px` | `p-8` | Section padding |
| `10` | `40px` | `pt-10` | Section top margin |
| `12` | `48px` | `pt-12` | Major section breaks |
| `16` | `64px` | `mt-16` | Page section breaks |

### Rhythm
- Between related elements: `gap-3` (12px)
- Between groups: `gap-4` to `gap-6` (16-24px)
- Between sections: `pt-10` to `pt-12` (40-48px)
- Between major page areas: `mt-12` to `mt-16` (48-64px)

---

## Radius Scale

| Token | Value | Usage |
|-------|-------|-------|
| `full` | `999px` | Badges, pills, buttons |
| `2xl` | `2rem` / `32px` | Container sections |
| `xl` | `1.5rem` / `24px` | Cards |
| `lg` | `1.25rem` / `20px` | Inset surfaces, inner cards |
| `md` | `0.95rem` / `15px` | Inputs, selects |
| `sm` | `0.75rem` / `12px` | Small elements |

---

## Elevation System (3-Tier)

### Container (Tier 1 — Lightest)
```css
.surface-container {
  border: 1px solid var(--color-border-subtle);
  background: linear-gradient(180deg, rgba(255, 253, 248, 0.96), rgba(255, 250, 243, 0.92));
  box-shadow: 0 1px 3px -1px rgb(36 27 21 / 0.08), 0 2px 8px -4px rgb(36 27 21 / 0.06);
  border-radius: 2rem;
}
```

### Card (Tier 2 — Default)
```css
.surface-card {
  border: 1px solid var(--color-border-subtle);
  background: linear-gradient(180deg, rgba(255, 253, 248, 0.98), rgba(255, 250, 243, 0.96));
  box-shadow: 0 8px 24px -12px rgb(36 27 21 / 0.2), 0 4px 12px -8px rgb(36 27 21 / 0.1);
  border-radius: 1.5rem;
}
```

### Focal (Tier 2+ — Emphasis)
```css
.surface-card-focal {
  border: 1px solid color-mix(in srgb, var(--color-accent) 20%, var(--color-border-subtle) 80%);
  background: linear-gradient(180deg, rgba(255, 253, 248, 0.99), rgba(255, 250, 243, 0.97));
  box-shadow: 0 12px 32px -8px rgb(36 27 21 / 0.3), 0 6px 16px -6px rgb(36 27 21 / 0.15), 0 0 0 1px rgb(196 120 90 / 0.12);
  border-radius: 1.5rem;
}
```

### Inset (Tier 3 — Nested)
```css
.surface-inset {
  border: 1px solid rgba(204, 190, 169, 0.4);
  background: rgba(255, 250, 243, 0.6);
  border-radius: 1.25rem;
}
```

---

## Component Patterns

### Badge
```css
.badge-base {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  border-radius: 999px;
  padding: 0.375rem 0.75rem;
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  line-height: 1;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-weight: 500;
}
```

**Variants:**
- `.badge-critical` — `bg: critical-bg`, `color: critical`
- `.badge-major` — `bg: major-bg`, `color: major`
- `.badge-minor` — `bg: minor-bg`, `color: minor`
- `.badge-positive` — `bg: positive-bg`, `color: positive`
- `.badge-muted` — `bg: rgba(36,27,21,0.06)`, `color: foreground-muted`

### Section Header Chip
```tsx
<div className="inline-flex items-center gap-2 rounded-full border border-{semantic}/20 bg-{semantic}-bg px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-{semantic}">
  <Icon className="h-3.5 w-3.5" />
  {label}
</div>
```

### Button (Pill)
```tsx
// Primary
<button className="rounded-full bg-foreground px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-foreground/90">
  {label}
</button>

// Ghost
<button className="rounded-full px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-foreground-soft transition hover:text-foreground">
  {label}
</button>
```

### Navigation Pill
```tsx
<a className="inline-flex shrink-0 items-center rounded-full bg-surface/80 px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-foreground-muted transition hover:bg-surface hover:text-foreground">
  {label}
</a>
```

### Input / Select
```css
.filter-select {
  min-width: 0;
  width: 100%;
  border-radius: 0.95rem;
  border: 1px solid var(--color-border-subtle);
  background: rgba(255, 253, 248, 0.94);
  padding: 0.72rem 0.9rem;
  color: var(--color-foreground);
  font-size: 0.95rem;
}
.filter-select:focus {
  outline: none;
  border-color: color-mix(in srgb, var(--color-primary) 50%, white 50%);
}
```

### Data Table
```css
.data-table th {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-foreground-soft);
  background: rgba(246, 241, 232, 0.96);
  backdrop-filter: blur(10px);
}
.data-table td {
  font-size: 0.94rem;
  color: var(--color-foreground);
  border-bottom: 1px solid rgba(204, 190, 169, 0.34);
  padding: 1rem 1.05rem;
}
.data-table tbody tr:hover {
  background: rgba(255, 251, 245, 0.7);
}
```

### Collapsible Section Icon Variants
```tsx
const iconVariantStyles = {
  default: 'bg-accent-soft/60 text-foreground-muted',
  evidence: 'bg-surface-strong text-foreground-muted',
  actions: 'bg-positive-bg text-positive',
  psychology: 'bg-accent-soft text-accent',
  improvements: 'bg-primary/10 text-primary',
  insights: 'bg-minor-bg text-minor',
  competitors: 'bg-surface-strong text-foreground-muted',
  roadmap: 'bg-primary/10 text-primary',
  sources: 'bg-surface-strong text-foreground-soft',
};
```

---

## Motion

### Fade Up (Default)
```css
.motion-fade-up {
  opacity: 0;
  transform: translateY(12px);
  animation: fade-up 520ms cubic-bezier(0.2, 0.85, 0.2, 1) forwards;
}
```

### Hover Lift
```css
.surface-card-hover:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-card-hover);
  border-color: var(--color-border-strong);
  transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
}
```

---

## Defaults to Reject

| Default Pattern | Alternative |
|-----------------|-------------|
| Cold gray dashboards | Warm parchment foundation |
| Generic blue accent | Terracotta/cypress from game's world |
| Neutral shadows | Espresso-tinted shadows (`rgb(36 27 21)`) |
| System fonts only | Display + body + mono pairing |
| Sharp corners | Generous radius (1.25-2rem) |
| Flat surfaces | 3-tier elevation with gradients |
| Generic badges | Semantic color-coded badges |

---

## Extension Guidelines

When adding new components:

1. **Use existing tokens** — Never introduce new colors without updating this system
2. **Follow elevation tiers** — Container > Card > Inset, use appropriate surface class
3. **Match typography scale** — Use defined sizes, don't invent new intermediate values
4. **Apply semantic colors** — Critical/Major/Minor/Positive for status, Primary for actions, Accent for emphasis
5. **Maintain spacing rhythm** — Use the modular scale (4px base), prefer gap over margin
6. **Extend icon variants** — Add to `iconVariantStyles` if new semantic categories emerge
7. **Keep warmth** — All shadows use espresso tint, all surfaces use cream gradients
