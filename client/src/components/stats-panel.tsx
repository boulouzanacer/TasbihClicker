import { useTranslation } from "@/hooks/use-translation";

interface StatsPanelProps {
  streakDays: number;
  weekTotal: number;
  allTimeTotal: number;
}

export function StatsPanel({ streakDays, weekTotal, allTimeTotal }: StatsPanelProps) {
  const { t } = useTranslation();
  return (
    <div className="bg-card border-t border-border p-4">
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-lg font-semibold text-foreground" data-testid="streak-days">
            {streakDays}
          </div>
          <div className="text-xs text-muted-foreground">{t('dayStreak')}</div>
        </div>
        <div>
          <div className="text-lg font-semibold text-foreground" data-testid="week-total">
            {weekTotal.toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground">{t('thisWeek')}</div>
        </div>
        <div>
          <div className="text-lg font-semibold text-foreground" data-testid="all-time-total">
            {allTimeTotal.toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground">{t('allTime')}</div>
        </div>
      </div>
    </div>
  );
}
