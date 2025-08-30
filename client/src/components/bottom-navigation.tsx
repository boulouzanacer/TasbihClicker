import { cn } from "@/lib/utils";
import { BookOpen, Calculator, Compass } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

interface BottomNavigationProps {
  activeTab: "tasbih" | "adkar" | "qiblah";
  onTabChange: (tab: "tasbih" | "adkar" | "qiblah") => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const { t } = useTranslation();
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
      <div className="max-w-md mx-auto px-4">
        <div className="flex">
          <button
            data-testid="tab-tasbih"
            onClick={() => onTabChange("tasbih")}
            className={cn(
              "flex-1 flex flex-col items-center py-3 px-1 text-xs font-medium transition-colors",
              activeTab === "tasbih"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Calculator className="w-5 h-5 mb-1" />
            <span>{t('tasbih')}</span>
          </button>
          
          <button
            data-testid="tab-adkar"
            onClick={() => onTabChange("adkar")}
            className={cn(
              "flex-1 flex flex-col items-center py-3 px-1 text-xs font-medium transition-colors",
              activeTab === "adkar"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <BookOpen className="w-5 h-5 mb-1" />
            <span>{t('adkar')}</span>
          </button>

          <button
            data-testid="tab-qiblah"
            onClick={() => onTabChange("qiblah")}
            className={cn(
              "flex-1 flex flex-col items-center py-3 px-1 text-xs font-medium transition-colors",
              activeTab === "qiblah"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Compass className="w-5 h-5 mb-1" />
            <span>{t('qiblah')}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}