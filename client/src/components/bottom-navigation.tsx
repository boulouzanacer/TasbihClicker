import { cn } from "@/lib/utils";
import { BookOpen, Calculator } from "lucide-react";

interface BottomNavigationProps {
  activeTab: "tasbih" | "adkar";
  onTabChange: (tab: "tasbih" | "adkar") => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
      <div className="max-w-md mx-auto px-4">
        <div className="flex">
          <button
            data-testid="tab-tasbih"
            onClick={() => onTabChange("tasbih")}
            className={cn(
              "flex-1 flex flex-col items-center py-3 px-2 text-xs font-medium transition-colors",
              activeTab === "tasbih"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Calculator className="w-6 h-6 mb-1" />
            <span>Tasbih</span>
          </button>
          
          <button
            data-testid="tab-adkar"
            onClick={() => onTabChange("adkar")}
            className={cn(
              "flex-1 flex flex-col items-center py-3 px-2 text-xs font-medium transition-colors",
              activeTab === "adkar"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <BookOpen className="w-6 h-6 mb-1" />
            <span>Adkar</span>
          </button>
        </div>
      </div>
    </nav>
  );
}