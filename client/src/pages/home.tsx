import { useState } from "react";
import { TasbihCounter } from "@/components/tasbih-counter";
import { BottomNavigation } from "@/components/bottom-navigation";
import Adkar from "./adkar";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"tasbih" | "adkar">("tasbih");

  return (
    <div className="pb-16"> {/* Add padding bottom for bottom navigation */}
      {activeTab === "tasbih" && <TasbihCounter />}
      {activeTab === "adkar" && <Adkar />}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
