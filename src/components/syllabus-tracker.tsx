"use client";

import { useState } from "react";
import { CheckCircle2, Circle, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Module } from "@/lib/courses";

interface SyllabusTrackerProps {
  modules: Module[];
  totalHours?: number;
}

export function SyllabusTracker({ modules }: SyllabusTrackerProps) {
  const [activeModule, setActiveModule] = useState(0);

  // Progress based on module position
  const moduleProgress = modules.map((m, idx) => ({
    ...m,
    percentage: ((idx + 1) / modules.length) * 100,
  }));

  return (
    <div className="mt-10">
      <h3 className="text-lg font-semibold mb-6">Learning Journey</h3>

      {/* Progress bar */}
      <div className="relative mb-8">
        <div className="h-2 rounded-full bg-secondary">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-primary to-cyber transition-all duration-500"
            style={{ width: `${moduleProgress[activeModule].percentage}%` }}
          />
        </div>
        {/* Module dots on the progress bar */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-0">
          {moduleProgress.map((m, idx) => (
            <button
              key={m.name}
              onClick={() => setActiveModule(idx)}
              className={cn(
                "h-4 w-4 rounded-full border-2 transition-all duration-300 -ml-2 first:ml-0",
                idx <= activeModule
                  ? "bg-primary border-primary scale-125"
                  : "bg-background border-muted-foreground/30 hover:border-primary/50"
              )}
              style={{ position: "absolute", left: `${m.percentage}%`, transform: "translate(-50%, -50%)" }}
              title={m.name}
            />
          ))}
        </div>
      </div>

      {/* Module progress indicator */}
      <div className="flex justify-between text-xs text-muted-foreground mb-6">
        <span>Module 1</span>
        <span className="text-primary font-medium">
          Module {activeModule + 1} of {modules.length}
        </span>
        <span>Module {modules.length}</span>
      </div>

      {/* Timeline with module cards */}
      <div className="space-y-3">
        {modules.map((module, idx) => (
          <button
            key={module.name}
            onClick={() => setActiveModule(idx)}
            className={cn(
              "w-full text-left rounded-xl border p-4 transition-all duration-300",
              idx === activeModule
                ? "border-primary/40 bg-primary/5 shadow-lg shadow-primary/5"
                : idx < activeModule
                  ? "border-border/30 bg-card/30 opacity-70"
                  : "border-border/30 bg-card/30"
            )}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors",
                idx < activeModule ? "bg-primary text-primary-foreground" : idx === activeModule ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
              )}>
                {idx < activeModule ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <span className="text-xs font-bold">{idx + 1}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className={cn("font-medium text-sm", idx === activeModule && "text-primary")}>
                    {module.name}
                  </span>
                </div>
              </div>
              {idx === activeModule && <ChevronRight className="h-4 w-4 text-primary shrink-0" />}
            </div>

            {/* Expanded topics for active module */}
            {idx === activeModule && (
              <div className="mt-3 ml-11 space-y-1.5">
                {module.topics.map((topic) => (
                  <div key={topic} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Circle className="h-1.5 w-1.5 fill-primary/50 text-primary/50 shrink-0" />
                    {topic}
                  </div>
                ))}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
