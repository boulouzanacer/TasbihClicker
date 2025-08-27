import { useState, useEffect } from 'react';
import { CounterData, counterDataSchema, defaultDhikrs } from '@shared/schema';

const STORAGE_KEY = 'tasbih-counter-data';

export function useCounterStorage() {
  const [data, setData] = useState<CounterData>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const validated = counterDataSchema.parse(parsed);
        return validated;
      } catch {
        // If validation fails, return default data
      }
    }
    
    return {
      counters: defaultDhikrs,
      currentDhikr: 'subhanallah',
      todayTotal: 0,
      streakDays: 0,
      weekTotal: 0,
      allTimeTotal: 0,
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const incrementCounter = (dhikrId: string) => {
    setData(prev => ({
      ...prev,
      counters: {
        ...prev.counters,
        [dhikrId]: {
          ...prev.counters[dhikrId],
          count: prev.counters[dhikrId].count + 1,
        },
      },
      todayTotal: prev.todayTotal + 1,
      allTimeTotal: prev.allTimeTotal + 1,
    }));
  };

  const resetCounter = (dhikrId: string) => {
    setData(prev => ({
      ...prev,
      counters: {
        ...prev.counters,
        [dhikrId]: {
          ...prev.counters[dhikrId],
          count: 0,
        },
      },
    }));
  };

  const setCurrentDhikr = (dhikrId: string) => {
    setData(prev => ({
      ...prev,
      currentDhikr: dhikrId,
    }));
  };

  const nextSet = (dhikrId: string) => {
    const current = data.counters[dhikrId];
    const nextTarget = Math.ceil((current.count + 1) / current.targetCount) * current.targetCount;
    
    setData(prev => ({
      ...prev,
      counters: {
        ...prev.counters,
        [dhikrId]: {
          ...prev.counters[dhikrId],
          count: nextTarget,
        },
      },
      todayTotal: prev.todayTotal + (nextTarget - current.count),
      allTimeTotal: prev.allTimeTotal + (nextTarget - current.count),
    }));
  };

  return {
    data,
    incrementCounter,
    resetCounter,
    setCurrentDhikr,
    nextSet,
  };
}
