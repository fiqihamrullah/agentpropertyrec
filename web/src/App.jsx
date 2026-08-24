import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Network, Search, Users2, Home } from "lucide-react";

const CO_LIST_AGENTS = ["Jill", "Leon", "Billy"];
const OWNER_NAMES = ["David", "Eve"];

function RelTag({ children }) {
  return (
    <span className="inline-flex items-center rounded-sm border border-ink-border bg-ink px-2 py-0.5 font-mono text-[11px] tracking-wide text-teal">
      {children}
    </span>
  );
}

function ResultPlaceholder({ hint }) {
  return (
    <div className="flex min-h-[132px] flex-col items-center justify-center gap-2 rounded-sm border border-dashed border-ink-border bg-ink/60 px-4 py-8 text-center">
      <Network className="h-5 w-5 text-slate-dim" />
      <p className="font-mono text-xs text-slate-dim">{hint}</p>
    </div>
  );
}

function SearchPanel({ eyebrow, label, options, placeholder, relTag, hint, icon: Icon }) {
  const [value, setValue] = useState("");

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <div className="mb-1 flex items-center gap-2">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brass">
            {eyebrow}
          </span>
          <RelTag>{relTag}</RelTag>
        </div>
        <CardTitle>{label}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-6">
        {/* Row 1: select + find */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Select value={value} onValueChange={setValue}>
            <SelectTrigger className="sm:flex-1">
              <span className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-brass/80" />
                <SelectValue placeholder={placeholder} />
              </span>
            </SelectTrigger>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button className="gap-2 sm:w-32">
            <Search className="h-4 w-4" />
            Find
          </Button>
        </div>

        {/* Row 2: results placeholder */}
        <ResultPlaceholder hint={hint} />
      </CardContent>
    </Card>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-ink text-parchment">
      {/* Header / Hero */}
      <header className="graph-texture relative overflow-hidden border-b border-ink-border">
        <div className="mx-auto max-w-5xl px-6 py-14 sm:py-16">
          <div className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-brass">
            <Network className="h-3.5 w-3.5" />
            Agent Graph Console
          </div>
          <h1 className="max-w-2xl font-display text-3xl font-medium leading-tight text-parchment sm:text-4xl">
            Property Agent Collaboration &amp; Recommendation System
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate sm:text-base">
            Looking for a suitable agent to sell or list a property based on
            collaborative relationships (
            <span className="font-mono text-teal">CO_LIST_WITH</span>) and
            the properties they have previously handled.
          </p>
        </div>
      </header>

      {/* Main: two columns */}
      <main className="mx-auto max-w-5xl px-6 py-10 sm:py-14">
        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-0">
          {/* vertical node-line divider, desktop only */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-ink-border md:block"
          >
            <span className="absolute left-1/2 top-6 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-brass" />
            <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-teal" />
            <span className="absolute bottom-6 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-brass" />
          </div>

          <div className="md:pr-8">
            <SearchPanel
              eyebrow="Collaboration lookup"
              relTag="CO_LIST_WITH"
              label="Find primary agents which an agent has previously collaborated with"
              options={CO_LIST_AGENTS}
              placeholder="Select an agent"
              hint="// awaiting query — select an agent and press Find"
              icon={Users2}
            />
          </div>

          <div className="md:pl-8">
            <SearchPanel
              eyebrow="Recommendation lookup"
              relTag="OWN → SALES"
              label="Find recommended agents and their network based on a search for owner names whose properties have been sold"
              options={OWNER_NAMES}
              placeholder="Select an owner"
              hint="// awaiting query — select an owner and press Find"
              icon={Home}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-ink-border">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-8 text-xs text-slate-dim sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono">
            Agent · Property · PropertyOwner — graph-backed recommendations
          </p>
          <p className="font-mono">Property Agent Graph Console</p>
        </div>
      </footer>
    </div>
  );
}
