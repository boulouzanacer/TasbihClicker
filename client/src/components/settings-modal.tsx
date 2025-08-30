import { Settings, Moon, Sun, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { useTheme } from "@/hooks/use-theme";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";

interface SettingsModalProps {
  trigger?: React.ReactNode;
}

export function SettingsModal({ trigger }: SettingsModalProps) {
  const { theme, language, setTheme, setLanguage } = useTheme();
  const { t } = useTranslation();

  const defaultTrigger = (
    <Button
      variant="ghost" 
      size="icon"
      data-testid="settings-button"
      className="p-2 rounded-lg bg-muted hover:bg-accent hover:text-accent-foreground transition-colors"
    >
      <Settings className="w-5 h-5" />
    </Button>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>{t('settings')}</span>
          </DialogTitle>
          <DialogDescription>
            Customize your app appearance and language preferences
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Theme Section */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3 flex items-center">
              <Sun className="w-4 h-4 mr-2" />
              {t('theme')}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                data-testid="theme-light"
                onClick={() => setTheme('light')}
                className={cn(
                  "flex items-center space-x-2 p-3 rounded-lg border transition-colors",
                  theme === 'light'
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background hover:bg-muted"
                )}
              >
                <Sun className="w-4 h-4" />
                <span className="text-sm">{t('light')}</span>
              </button>
              
              <button
                data-testid="theme-dark"
                onClick={() => setTheme('dark')}
                className={cn(
                  "flex items-center space-x-2 p-3 rounded-lg border transition-colors",
                  theme === 'dark'
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background hover:bg-muted"
                )}
              >
                <Moon className="w-4 h-4" />
                <span className="text-sm">{t('dark')}</span>
              </button>
            </div>
          </div>

          {/* Language Section */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3 flex items-center">
              <Globe className="w-4 h-4 mr-2" />
              {t('language')}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                data-testid="language-english"
                onClick={() => setLanguage('en')}
                className={cn(
                  "flex items-center space-x-2 p-3 rounded-lg border transition-colors",
                  language === 'en'
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background hover:bg-muted"
                )}
              >
                <span className="text-lg">🇺🇸</span>
                <span className="text-sm">{t('english')}</span>
              </button>
              
              <button
                data-testid="language-arabic"
                onClick={() => setLanguage('ar')}
                className={cn(
                  "flex items-center space-x-2 p-3 rounded-lg border transition-colors",
                  language === 'ar'
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background hover:bg-muted"
                )}
              >
                <span className="text-lg">🇸🇦</span>
                <span className="text-sm">{t('arabic')}</span>
              </button>
            </div>
          </div>

          {/* App Info */}
          <div className="pt-4 border-t border-border">
            <div className="text-center">
              <h4 className="text-sm font-medium text-foreground">{t('appInfo')}</h4>
              <p className="text-xs text-muted-foreground mt-1">{t('appDescription')}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}