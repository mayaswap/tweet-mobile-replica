import { Home, Search, Bell, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Search, label: "Search", path: "/search" },
  { icon: Bell, label: "Notifications", path: "/notifications" },
  { icon: Mail, label: "Messages", path: "/messages" },
  { icon: User, label: "Profile", path: "/profile" },
];

export const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="border-t border-border bg-background">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Button
              key={item.label}
              variant="ghost"
              size="sm"
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center h-12 w-12 p-0 ${
                isActive 
                  ? "text-primary" 
                  : "text-twitter-gray hover:text-foreground"
              }`}
            >
              <IconComponent 
                className={`w-6 h-6 ${isActive ? "fill-current" : ""}`} 
                strokeWidth={isActive ? 0 : 1.5}
              />
            </Button>
          );
        })}
      </div>
    </nav>
  );
};