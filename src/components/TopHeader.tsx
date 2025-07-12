import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const TopHeader = () => {
  return (
    <header className="sticky top-0 bg-background/80 backdrop-blur-lg border-b border-border z-50">
      <div className="flex items-center justify-between px-4 h-14">
        <Avatar className="w-8 h-8">
          <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        
        <div className="flex-1 flex justify-center">
          <svg
            viewBox="0 0 24 24"
            className="w-7 h-7 fill-primary"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </div>
        
        <div className="w-8" />
      </div>
    </header>
  );
};