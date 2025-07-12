import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface FloatingTweetButtonProps {
  onClick: () => void;
}

export const FloatingTweetButton = ({ onClick }: FloatingTweetButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-20 right-4 w-14 h-14 rounded-full bg-primary hover:bg-twitter-blue-hover text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 z-50"
      size="sm"
    >
      <Plus className="w-6 h-6" strokeWidth={3} />
    </Button>
  );
};