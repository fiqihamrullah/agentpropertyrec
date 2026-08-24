import { Users2 } from "lucide-react";
import { avatarUrl } from "@/lib/avatar";

export default function CollaboratorResults({ agent, collaborators }) {
  if (!collaborators || collaborators.length === 0) {
    return (
      <p className="rounded-sm border border-dashed border-ink-border bg-ink/60 px-4 py-6 text-center font-mono text-xs text-slate-dim">
        NNot found collaborators for "{agent}".
      </p>
    );
  }

  return (
    <div>
      <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-dim">
        Primary agents collaborated with{" "}
        <span className="text-brass">{agent}</span>
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {collaborators.map((name) => (
          <div
            key={name}
            className="flex items-center gap-3 rounded-sm border border-ink-border bg-ink px-3 py-2.5 transition-colors hover:border-brass/50"
          >
            <img
              src={avatarUrl(name)}
              alt={name}
              className="h-10 w-10 rounded-full border border-brass/30"
            />
            <div className="flex flex-col">
              <span className="font-display text-sm text-parchment">
                {name}
              </span>
              <span className="flex items-center gap-1 font-mono text-[10px] text-teal">
                <Users2 className="h-3 w-3" />
                CO_LIST_WITH
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
