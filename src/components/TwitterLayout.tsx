import { ReactNode } from "react";
import { BottomNavigation } from "./BottomNavigation";
import { TopHeader } from "./TopHeader";

interface TwitterLayoutProps {
  children: ReactNode;
}

export const TwitterLayout = ({ children }: TwitterLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto border-l border-r border-border">
      <TopHeader />
      <main className="flex-1 overflow-auto pb-16">
        {children}
      </main>
      <BottomNavigation />
    </div>
  );
};