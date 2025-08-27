import { cn } from "@/lib/utils";

interface DhikrTabProps {
  id: string;
  name: string;
  isActive: boolean;
  onClick: () => void;
}

export function DhikrTab({ id, name, isActive, onClick }: DhikrTabProps) {
  return (
    <button
      data-testid={`tab-${id}`}
      onClick={onClick}
      className={cn(
        "flex-shrink-0 px-4 py-3 text-sm font-medium rounded-t-lg border-b-2 whitespace-nowrap transition-colors",
        isActive
          ? "border-primary text-primary"
          : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
      )}
    >
      {name}
    </button>
  );
}
