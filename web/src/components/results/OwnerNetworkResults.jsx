import { ArrowRight } from "lucide-react";
import { AgentChip } from "@/components/ui/agent-chip";
import { avatarUrl } from "@/lib/avatar";

export default function OwnerNetworkResults({ owner, network }) {
  if (!network || network.length === 0) {
    return (
      <p className="rounded-sm border border-dashed border-ink-border bg-ink/60 px-4 py-6 text-center font-mono text-xs text-slate-dim">
        No network found for owner "{owner}".
      </p>
    );
  }

  const sellingAgents = [...new Set(network.map((n) => n.sellingAgent))];
  const recommendedAgents = [
    ...new Set(network.map((n) => n.recommendedAgent)),
  ];

  return (
    <div className="flex flex-col gap-5">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-dim">
        Network for properties owned by{" "}
        <span className="text-brass">{owner}</span>
      </p>

      {/* Chip groups — deduplicated */}
      <div className="flex flex-col gap-3">
        <div>
          <p className="mb-1.5 font-mono text-[10px] uppercase tracking-wide text-teal/80">
            Selling agents
          </p>
          <div className="flex flex-wrap gap-2">
            {sellingAgents.map((name) => (
              <AgentChip key={name} name={name} variant="teal" />
            ))}
          </div>
        </div>
        <div>
          <p className="mb-1.5 font-mono text-[10px] uppercase tracking-wide text-brass/80">
            Recommended agents
          </p>
          <div className="flex flex-wrap gap-2">
            {recommendedAgents.map((name) => (
              <AgentChip key={name} name={name} variant="brass" />
            ))}
          </div>
        </div>
      </div>

      {/* Pairing / edge cards */}
      <div className="flex flex-col gap-2 border-t border-ink-border pt-4">
        {network.map((edge, i) => (
          <div
            key={`${edge.sellingAgent}-${edge.recommendedAgent}-${i}`}
            className="flex items-center justify-between gap-3 rounded-sm border border-ink-border bg-ink px-3 py-2.5"
          >
            <div className="flex items-center gap-2">
              <img
                src={avatarUrl(edge.sellingAgent, { bg: "4FA69C" })}
                alt={edge.sellingAgent}
                className="h-8 w-8 rounded-full border border-teal/30"
              />
              <span className="font-display text-sm text-parchment">
                {edge.sellingAgent}
              </span>
            </div>

            <ArrowRight className="h-4 w-4 shrink-0 text-slate-dim" />

            <div className="flex items-center gap-2">
              <span className="font-display text-sm text-parchment">
                {edge.recommendedAgent}
              </span>
              <img
                src={avatarUrl(edge.recommendedAgent, { bg: "C89B5C" })}
                alt={edge.recommendedAgent}
                className="h-8 w-8 rounded-full border border-brass/30"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
