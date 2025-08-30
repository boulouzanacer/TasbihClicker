import { useTheme } from './use-theme';
import { translations, TranslationKey, Language } from '@/lib/translations';

export function useTranslation() {
  const { language } = useTheme();

  const t = (key: TranslationKey | string, params?: Record<string, string | number>): string => {
    // Navigate nested keys using dot notation
    const keys = key.split('.');
    let value: any = translations[language as Language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English if key not found
        value = translations.en;
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return key; // Return key if not found in fallback either
          }
        }
        break;
      }
    }

    if (typeof value !== 'string') {
      return key; // Return key if final value is not a string
    }

    // Replace parameters if provided
    if (params) {
      return Object.entries(params).reduce((str, [param, val]) => {
        return str.replace(new RegExp(`{${param}}`, 'g'), String(val));
      }, value);
    }

    return value;
  };

  return { t, language };
}