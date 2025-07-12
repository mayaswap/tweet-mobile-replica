import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Image, MapPin, Smile, Calendar, X } from "lucide-react";

interface TweetComposerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TweetComposer = ({ open, onOpenChange }: TweetComposerProps) => {
  const [content, setContent] = useState("");
  const maxLength = 280;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 gap-0">
        <DialogHeader className="flex flex-row items-center justify-between p-4 pb-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="text-twitter-gray hover:text-foreground w-8 h-8 p-0"
          >
            <X className="w-5 h-5" />
          </Button>
          <DialogTitle className="sr-only">Compose Tweet</DialogTitle>
          <Button
            disabled={!content.trim() || content.length > maxLength}
            className="bg-primary hover:bg-twitter-blue-hover text-primary-foreground rounded-full px-4 py-1 h-8 text-sm font-bold disabled:opacity-50"
          >
            Tweet
          </Button>
        </DialogHeader>
        
        <div className="px-4 py-2">
          <div className="flex space-x-3">
            <Avatar className="w-10 h-10 flex-shrink-0">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's happening?"
                className="border-0 resize-none text-xl placeholder:text-twitter-gray focus-visible:ring-0 p-0 min-h-[120px]"
                maxLength={maxLength}
              />
              
              <div className="flex items-center justify-between mt-4 pt-4">
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm" className="text-primary hover:text-twitter-blue-hover w-8 h-8 p-0">
                    <Image className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-twitter-blue-hover w-8 h-8 p-0">
                    <MapPin className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-twitter-blue-hover w-8 h-8 p-0">
                    <Smile className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-twitter-blue-hover w-8 h-8 p-0">
                    <Calendar className="w-5 h-5" />
                  </Button>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className={`text-sm ${content.length > maxLength ? 'text-twitter-red' : 'text-twitter-gray'}`}>
                    {content.length > 0 && `${content.length}/${maxLength}`}
                  </div>
                  {content.length > 0 && (
                    <div className="relative w-5 h-5">
                      <svg className="w-5 h-5 transform -rotate-90" viewBox="0 0 20 20">
                        <circle
                          cx="10"
                          cy="10"
                          r="8"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          className="text-twitter-gray-light"
                        />
                        <circle
                          cx="10"
                          cy="10"
                          r="8"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeDasharray={`${(content.length / maxLength) * 50.24} 50.24`}
                          className={content.length > maxLength ? "text-twitter-red" : "text-primary"}
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};