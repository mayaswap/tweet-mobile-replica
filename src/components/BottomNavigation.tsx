import { Home, Search, Bell, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { icon: Home, label: "Home", active: true },
  { icon: Search, label: "Search", active: false },
  { icon: Bell, label: "Notifications", active: false },
  { icon: Mail, label: "Messages", active: false },
  { icon: User, label: "Profile", active: false },
];

export const BottomNavigation = () => {
  return (
    <nav className="border-t border-border bg-background">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <Button
              key={item.label}
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center justify-center h-12 w-12 p-0 ${
                item.active 
                  ? "text-primary" 
                  : "text-twitter-gray hover:text-foreground"
              }`}
            >
              <IconComponent 
                className={`w-6 h-6 ${item.active ? "fill-current" : ""}`} 
                strokeWidth={item.active ? 0 : 1.5}
              />
            </Button>
          );
        })}
      </div>
    </nav>
  );
};