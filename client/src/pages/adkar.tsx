import { useState } from "react";
import { ChevronDown, ChevronUp, BookOpen } from "lucide-react";
import { defaultDuas, Dua } from "@shared/schema";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/use-translation";

interface DuaCardProps {
  dua: Dua;
  isExpanded: boolean;
  onToggle: () => void;
}

function DuaCard({ dua, isExpanded, onToggle }: DuaCardProps) {
  const { t } = useTranslation();
  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-3">
      <button
        data-testid={`dua-card-${dua.id}`}
        onClick={onToggle}
        className="w-full text-left"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">{dua.title}</h3>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          )}
        </div>
        {dua.reference && (
          <p className="text-sm text-muted-foreground mt-1">{dua.reference}</p>
        )}
      </button>
      
      {isExpanded && (
        <div className="mt-4 space-y-4 fade-in">
          <div className="text-right">
            <p 
              className="text-xl text-foreground leading-relaxed font-arabic" 
              data-testid={`dua-arabic-${dua.id}`}
              dir="rtl"
            >
              {dua.arabic}
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">{t('transliteration')}</h4>
            <p 
              className="text-sm text-foreground italic" 
              data-testid={`dua-transliteration-${dua.id}`}
            >
              {dua.transliteration}
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">{t('translation')}</h4>
            <p 
              className="text-sm text-foreground" 
              data-testid={`dua-translation-${dua.id}`}
            >
              {dua.translation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

interface CategorySectionProps {
  title: string;
  duas: Dua[];
  isExpanded: boolean;
  onToggle: () => void;
  expandedDuas: Set<string>;
  onDuaToggle: (duaId: string) => void;
}

function CategorySection({ title, duas, isExpanded, onToggle, expandedDuas, onDuaToggle }: CategorySectionProps) {
  const { t } = useTranslation();
  const getCategoryIcon = (categoryKey: string) => {
    const icons: Record<string, JSX.Element> = {
      travel: <span className="text-lg">✈️</span>,
      hardship: <span className="text-lg">🤲</span>,
      sleep: <span className="text-lg">🌙</span>,
      morning: <span className="text-lg">🌅</span>,
    };
    return icons[categoryKey] || <BookOpen className="w-5 h-5" />;
  };

  const formatCategoryTitle = (key: string) => {
    const titleKeys: Record<string, string> = {
      travel: 'travel',
      hardship: 'hardshipRelief',
      sleep: 'beforeSleep',
      morning: 'morningDhikr',
    };
    return t(titleKeys[key] as any) || key.charAt(0).toUpperCase() + key.slice(1);
  };

  return (
    <div className="mb-6">
      <button
        data-testid={`category-${title.toLowerCase()}`}
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
      >
        <div className="flex items-center space-x-3">
          {getCategoryIcon(title)}
          <h2 className="text-lg font-semibold">{formatCategoryTitle(title)}</h2>
          <span className="text-sm text-muted-foreground">({duas.length})</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5" />
        ) : (
          <ChevronDown className="w-5 h-5" />
        )}
      </button>
      
      {isExpanded && (
        <div className="mt-4 space-y-3">
          {duas.map((dua) => (
            <DuaCard
              key={dua.id}
              dua={dua}
              isExpanded={expandedDuas.has(dua.id)}
              onToggle={() => onDuaToggle(dua.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Adkar() {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [expandedDuas, setExpandedDuas] = useState<Set<string>>(new Set());
  const { t } = useTranslation();

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const toggleDua = (duaId: string) => {
    setExpandedDuas(prev => {
      const newSet = new Set(prev);
      if (newSet.has(duaId)) {
        newSet.delete(duaId);
      } else {
        newSet.add(duaId);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border px-4 py-4">
        <div className="flex items-center justify-center">
          <h1 className="text-xl font-semibold text-foreground">{t('adkarTitle')}</h1>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 py-6 max-w-md mx-auto">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">
            {t('adkarSubtitle')}
          </p>
        </div>

        {Object.entries(defaultDuas).map(([categoryKey, duas]) => (
          <CategorySection
            key={categoryKey}
            title={categoryKey}
            duas={duas}
            isExpanded={expandedCategories.has(categoryKey)}
            onToggle={() => toggleCategory(categoryKey)}
            expandedDuas={expandedDuas}
            onDuaToggle={toggleDua}
          />
        ))}
      </main>
    </div>
  );
}