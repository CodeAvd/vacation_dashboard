"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Filter,
  RotateCcw,
  ChevronDown,
  Check,
  X,
} from "lucide-react";

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

const themeOptions: FilterOption[] = [
  { value: "all", label: "All Themes" },
  { value: "save-loss", label: "Save Loss", count: 37 },
  { value: "co-op", label: "Co-op Stability", count: 36 },
  { value: "performance", label: "Performance", count: 33 },
  { value: "atmosphere", label: "Atmosphere", count: 23 },
  { value: "controls", label: "Controls/UI", count: 9 },
];

const sourceOptions: FilterOption[] = [
  { value: "all", label: "All Sources" },
  { value: "steam", label: "Steam", count: 312 },
  { value: "discord", label: "Discord", count: 198 },
  { value: "youtube", label: "YouTube", count: 112 },
  { value: "forum", label: "Forum", count: 54 },
];

const severityOptions: FilterOption[] = [
  { value: "all", label: "All Severity" },
  { value: "critical", label: "Critical" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

const statusOptions: FilterOption[] = [
  { value: "all", label: "All Status" },
  { value: "open", label: "Open" },
  { value: "investigating", label: "Investigating" },
  { value: "fixing", label: "Fixing" },
  { value: "resolved", label: "Resolved" },
];

const sortOptions: FilterOption[] = [
  { value: "priority", label: "Priority Score" },
  { value: "frequency", label: "Frequency" },
  { value: "recency", label: "Recency" },
  { value: "severity", label: "Severity" },
];

export interface Filters {
  theme: string;
  source: string;
  severity: string;
  status: string;
  sort: string;
}

interface GlobalFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export function GlobalFilters({ filters, onFiltersChange }: GlobalFiltersProps) {
  const hasActiveFilters =
    filters.theme !== "all" ||
    filters.source !== "all" ||
    filters.severity !== "all" ||
    filters.status !== "all";

  const resetFilters = () => {
    onFiltersChange({
      theme: "all",
      source: "all",
      severity: "all",
      status: "all",
      sort: "priority",
    });
  };

  const activeFilterCount = [
    filters.theme !== "all",
    filters.source !== "all",
    filters.severity !== "all",
    filters.status !== "all",
  ].filter(Boolean).length;

  return (
    <div className="sticky top-0 z-40 border-b border-border-subtle bg-surface/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2">
          {/* Filter icon */}
          <div className="mr-1 flex items-center gap-2 text-foreground-muted">
            <Filter className="h-4 w-4" />
            <span className="hidden font-mono text-xs uppercase tracking-wider sm:inline">
              Filters
            </span>
            {activeFilterCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary font-mono text-[10px] font-medium text-primary-foreground">
                {activeFilterCount}
              </span>
            )}
          </div>

          {/* Filter dropdowns */}
          <FilterDropdown
            label="Theme"
            options={themeOptions}
            value={filters.theme}
            onChange={(value) => onFiltersChange({ ...filters, theme: value })}
          />

          <FilterDropdown
            label="Source"
            options={sourceOptions}
            value={filters.source}
            onChange={(value) => onFiltersChange({ ...filters, source: value })}
          />

          <FilterDropdown
            label="Severity"
            options={severityOptions}
            value={filters.severity}
            onChange={(value) => onFiltersChange({ ...filters, severity: value })}
          />

          <FilterDropdown
            label="Status"
            options={statusOptions}
            value={filters.status}
            onChange={(value) => onFiltersChange({ ...filters, status: value })}
          />

          <div className="mx-1 hidden h-4 w-px bg-border-subtle sm:block" />

          <FilterDropdown
            label="Sort"
            options={sortOptions}
            value={filters.sort}
            onChange={(value) => onFiltersChange({ ...filters, sort: value })}
            showCheck
          />

          {/* Reset button */}
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="ml-auto flex items-center gap-1.5 rounded-lg border border-border-subtle bg-surface px-3 py-1.5 text-sm font-medium text-foreground-muted transition-all hover:border-accent hover:text-accent"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterDropdown({
  label,
  options,
  value,
  onChange,
  showCheck,
}: {
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
  showCheck?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((o) => o.value === value) || options[0];
  const isActive = value !== "all" && value !== "priority";

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 150)}
        className={cn(
          "flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition-all",
          isActive
            ? "border-primary bg-primary/5 text-primary"
            : "border-border-subtle bg-surface text-foreground hover:border-stone"
        )}
      >
        <span className="max-w-[120px] truncate">{selectedOption.label}</span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-1 min-w-[180px] rounded-xl border border-border-subtle bg-surface-elevated p-1 shadow-lg">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors",
                option.value === value
                  ? "bg-primary/10 text-primary"
                  : "text-foreground hover:bg-cream"
              )}
            >
              <span className="flex items-center gap-2">
                {showCheck && option.value === value && (
                  <Check className="h-3.5 w-3.5" />
                )}
                {option.label}
              </span>
              {option.count !== undefined && (
                <span className="font-mono text-xs text-foreground-muted">
                  {option.count}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Active filter chips display
export function ActiveFilterChips({
  filters,
  onFiltersChange,
}: GlobalFiltersProps) {
  const activeFilters: { key: keyof Filters; value: string; label: string }[] = [];

  if (filters.theme !== "all") {
    const opt = themeOptions.find((o) => o.value === filters.theme);
    if (opt) activeFilters.push({ key: "theme", value: "all", label: opt.label });
  }
  if (filters.source !== "all") {
    const opt = sourceOptions.find((o) => o.value === filters.source);
    if (opt) activeFilters.push({ key: "source", value: "all", label: opt.label });
  }
  if (filters.severity !== "all") {
    const opt = severityOptions.find((o) => o.value === filters.severity);
    if (opt) activeFilters.push({ key: "severity", value: "all", label: opt.label });
  }
  if (filters.status !== "all") {
    const opt = statusOptions.find((o) => o.value === filters.status);
    if (opt) activeFilters.push({ key: "status", value: "all", label: opt.label });
  }

  if (activeFilters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 px-4 py-2 sm:px-6 lg:px-8">
      <span className="font-mono text-xs text-foreground-muted">Active:</span>
      {activeFilters.map((filter) => (
        <button
          key={filter.key}
          onClick={() =>
            onFiltersChange({ ...filters, [filter.key]: filter.value })
          }
          className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
        >
          {filter.label}
          <X className="h-3 w-3" />
        </button>
      ))}
    </div>
  );
}
