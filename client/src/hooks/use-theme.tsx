import { createContext, useContext, useEffect } from "react";
import { useCounterStorage } from "./use-counter-storage";

interface ThemeContextType {
  theme: 'light' | 'dark';
  language: 'en' | 'ar';
  setTheme: (theme: 'light' | 'dark') => void;
  setLanguage: (language: 'en' | 'ar') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { data, updateSettings } = useCounterStorage();
  const { theme, language } = data.settings;

  const setTheme = (newTheme: 'light' | 'dark') => {
    updateSettings({ theme: newTheme });
  };

  const setLanguage = (newLanguage: 'en' | 'ar') => {
    updateSettings({ language: newLanguage });
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    if (language === 'ar') {
      root.setAttribute('dir', 'rtl');
      root.setAttribute('lang', 'ar');
    } else {
      root.setAttribute('dir', 'ltr');
      root.setAttribute('lang', 'en');
    }
  }, [language]);

  return (
    <ThemeContext.Provider value={{ theme, language, setTheme, setLanguage }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}