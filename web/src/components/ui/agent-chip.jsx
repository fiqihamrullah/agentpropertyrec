import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { avatarUrl } from "@/lib/avatar";

const chipVariants = cva(
  "inline-flex items-center gap-2 rounded-full border py-1 pl-1 pr-3 text-xs font-mono",
  {
    variants: {
      variant: {
        brass: "border-brass/40 bg-brass/10 text-brass",
        teal: "border-teal/40 bg-teal/10 text-teal",
      },
    },
    defaultVariants: { variant: "brass" },
  }
);

export function AgentChip({ name, variant = "brass" }) {
  return (
    <span className={cn(chipVariants({ variant }))}>
      <img
        src={avatarUrl(name, {
          bg: variant === "teal" ? "4FA69C" : "C89B5C",
          color: "12161F",
        })}
        alt={name}
        className="h-5 w-5 rounded-full"
      />
      {name}
    </span>
  );
}
