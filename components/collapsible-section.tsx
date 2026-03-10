"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface CollapsibleSectionProps {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  count?: number | string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function CollapsibleSection({
  id,
  icon,
  title,
  description,
  count,
  children,
  defaultOpen = false,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <section id={id} className="border-b border-border-subtle last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex w-full items-center justify-between px-4 py-5 text-left transition-colors hover:bg-cream/30 sm:px-6 lg:px-8"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cream text-foreground-muted transition-colors group-hover:bg-stone/20 group-hover:text-primary">
            {icon}
          </span>
          <div>
            <h2
              className="text-lg font-semibold text-foreground"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {title}
            </h2>
            <p className="text-sm text-foreground-muted">{description}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {count !== undefined && (
            <span className="rounded-full bg-cream px-2.5 py-0.5 font-mono text-xs font-medium text-foreground-muted">
              {count}
            </span>
          )}
          <ChevronDown
            className={cn(
              "h-5 w-5 text-foreground-muted transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </div>
      </button>

      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-6 sm:px-6 lg:px-8">{children}</div>
        </div>
      </div>
    </section>
  );
}
