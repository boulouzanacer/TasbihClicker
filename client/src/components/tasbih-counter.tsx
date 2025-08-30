import { useState } from "react";
import { Settings } from "lucide-react";
import { Dhikr } from "@shared/schema";
import { DhikrTab } from "./dhikr-tab";
import { StatsPanel } from "./stats-panel";
import { useCounterStorage } from "@/hooks/use-counter-storage";

export function TasbihCounter() {
  const { data, incrementCounter, resetCounter, setCurrentDhikr, nextSet } = useCounterStorage();
  const [isCounterPressed, setIsCounterPressed] = useState(false);

  const currentDhikrData = data.counters[data.currentDhikr];
  const dhikrEntries = Object.entries(data.counters);

  const handleCounterClick = () => {
    setIsCounterPressed(true);
    incrementCounter(data.currentDhikr);
    
    // Add haptic feedback if available
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
    
    setTimeout(() => setIsCounterPressed(false), 150);
  };

  const handleResetClick = () => {
    if (window.confirm('Reset counter to 0?')) {
      resetCounter(data.currentDhikr);
    }
  };

  const handleNextSet = () => {
    nextSet(data.currentDhikr);
  };

  // Calculate progress indicators
  const progress = Math.min(currentDhikrData.count, currentDhikrData.targetCount);
  const progressPercentage = (progress / currentDhikrData.targetCount) * 100;
  const completedIndicators = Math.floor((progressPercentage / 100) * 4);

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-background pb-16">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-foreground">Digital Tasbih</h1>
          <button 
            data-testid="settings-button"
            className="p-2 rounded-lg bg-muted hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="bg-card border-b border-border px-4">
        <div className="flex space-x-1 overflow-x-auto">
          {dhikrEntries.map(([id, dhikr]) => (
            <DhikrTab
              key={id}
              id={id}
              name={dhikr.name}
              isActive={data.currentDhikr === id}
              onClick={() => setCurrentDhikr(id)}
            />
          ))}
        </div>
      </nav>

      {/* Main Counter Content */}
      <main className="flex-1 flex flex-col justify-center px-4 py-8">
        {/* Current Dhikr Display */}
        <div className="text-center mb-8 fade-in">
          <h2 className="text-2xl font-semibold text-foreground mb-2" data-testid="dhikr-arabic">
            {currentDhikrData.arabic}
          </h2>
          <p className="text-lg text-muted-foreground mb-1" data-testid="dhikr-translation">
            {currentDhikrData.translation}
          </p>
          <p className="text-sm text-muted-foreground" data-testid="dhikr-meaning">
            "{currentDhikrData.meaning}"
          </p>
        </div>

        {/* Counter Display */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-muted mb-6">
            <span 
              className="text-6xl font-bold text-primary count-display" 
              data-testid="current-count"
            >
              {currentDhikrData.count}
            </span>
          </div>
          
          {/* Progress Indicators */}
          <div className="flex justify-center space-x-2 mb-4">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index < completedIndicators ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
          
          <p className="text-sm text-muted-foreground">
            <span data-testid="progress-text">
              {currentDhikrData.count} of {currentDhikrData.targetCount} complete
            </span>
          </p>
        </div>

        {/* Main Counter Button */}
        <div className="text-center mb-8">
          <button 
            data-testid="counter-button"
            onClick={handleCounterClick}
            className={`counter-button ripple w-40 h-40 rounded-full bg-primary text-primary-foreground shadow-xl hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-ring/20 active:shadow-lg transition-all duration-150 ${
              isCounterPressed ? 'scale-95' : 'scale-100'
            }`}
            aria-label="Increment counter"
          >
            <div className="flex flex-col items-center">
              <svg className="w-12 h-12 mb-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
              </svg>
              <span className="text-sm font-medium">TAP</span>
            </div>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          <button 
            data-testid="reset-button"
            onClick={handleResetClick}
            className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            Reset
          </button>
          <button 
            data-testid="next-set-button"
            onClick={handleNextSet}
            className="px-6 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            Next Set
          </button>
        </div>

        {/* Total Count Display */}
        <div className="text-center bg-card rounded-lg p-4 border border-border">
          <div className="text-sm text-muted-foreground mb-1">Today's Total</div>
          <div className="text-2xl font-semibold text-foreground" data-testid="today-total">
            {data.todayTotal.toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground mt-1">All Dhikr Combined</div>
        </div>
      </main>

      {/* Bottom Stats Panel */}
      <StatsPanel
        streakDays={data.streakDays}
        weekTotal={data.weekTotal}
        allTimeTotal={data.allTimeTotal}
      />
    </div>
  );
}
