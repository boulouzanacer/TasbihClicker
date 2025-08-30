import { useState } from "react";
import { TasbihCounter } from "@/components/tasbih-counter";
import { BottomNavigation } from "@/components/bottom-navigation";
import { ThemeProvider } from "@/hooks/use-theme";
import Adkar from "./adkar";
import Qiblah from "./qiblah";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"tasbih" | "adkar" | "qiblah">("tasbih");

  return (
    <ThemeProvider>
      <div className="pb-16"> {/* Add padding bottom for bottom navigation */}
        {activeTab === "tasbih" && <TasbihCounter />}
        {activeTab === "adkar" && <Adkar />}
        {activeTab === "qiblah" && <Qiblah />}
        <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </ThemeProvider>
  );
}
