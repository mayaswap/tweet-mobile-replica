import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageCircle, Repeat2, Heart, Share, MoreHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TweetCardProps {
  user: {
    name: string;
    username: string;
    avatar: string;
    verified?: boolean;
  };
  content: string;
  timestamp: string;
  stats: {
    replies: number;
    retweets: number;
    likes: number;
  };
  image?: string;
}

export const TweetCard = ({ user, content, timestamp, stats, image }: TweetCardProps) => {
  const [tweetStats, setTweetStats] = useState(stats);
  const [isLiked, setIsLiked] = useState(false);
  const [isRetweeted, setIsRetweeted] = useState(false);
  const { toast } = useToast();

  const handleReply = () => {
    setTweetStats(prev => ({ ...prev, replies: prev.replies + 1 }));
    toast({
      title: "Reply posted!",
      description: "Your reply has been posted successfully.",
    });
  };

  const handleRetweet = () => {
    const newRetweetState = !isRetweeted;
    setIsRetweeted(newRetweetState);
    setTweetStats(prev => ({ 
      ...prev, 
      retweets: newRetweetState ? prev.retweets + 1 : prev.retweets - 1 
    }));
    toast({
      title: newRetweetState ? "Retweeted!" : "Retweet removed",
      description: newRetweetState ? "Tweet has been retweeted." : "Retweet has been removed.",
    });
  };

  const handleLike = () => {
    const newLikeState = !isLiked;
    setIsLiked(newLikeState);
    setTweetStats(prev => ({ 
      ...prev, 
      likes: newLikeState ? prev.likes + 1 : prev.likes - 1 
    }));
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Tweet link has been copied to clipboard.",
    });
  };
  return (
    <Link to={`/tweet/1`}>
      <article className="border-b border-border px-4 py-3 hover:bg-accent/50 transition-colors cursor-pointer">
      <div className="flex space-x-3">
        <Link to={`/profile/${user.username}`} className="flex-shrink-0">
          <Avatar className="w-10 h-10">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </Link>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <Link to={`/profile/${user.username}`} className="hover:underline">
              <span className="font-bold text-foreground text-sm truncate">
                {user.name}
              </span>
            </Link>
            {user.verified && (
              <svg className="w-4 h-4 fill-primary" viewBox="0 0 24 24">
                <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-2.214-1.588c-.326-.234-.398-.691-.164-1.018.234-.326.691-.398 1.018-.164l1.41 1.01 3.247-4.87c.235-.352.704-.444 1.056-.207.35.235.44.703.206 1.055z"/>
              </svg>
            )}
            <Link to={`/profile/${user.username}`} className="hover:underline">
              <span className="text-twitter-gray text-sm">@{user.username}</span>
            </Link>
            <span className="text-twitter-gray text-sm">·</span>
            <span className="text-twitter-gray text-sm">{timestamp}</span>
            
            <div className="ml-auto">
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0 text-twitter-gray hover:text-foreground">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="text-foreground text-sm leading-normal mb-3">
            {content}
          </div>
          
          {image && (
            <div className="mb-3 rounded-2xl overflow-hidden border border-border">
              <img 
                src={image} 
                alt="Tweet image" 
                className="w-full h-auto object-cover"
              />
            </div>
          )}
          
          <div className="flex items-center justify-between max-w-md mt-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleReply}
              className="flex items-center space-x-2 text-twitter-gray hover:text-primary hover:bg-primary/10 rounded-full px-2 py-1 h-8"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-xs">{tweetStats.replies}</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleRetweet}
              className={`flex items-center space-x-2 rounded-full px-2 py-1 h-8 hover:bg-twitter-green/10 ${
                isRetweeted 
                  ? "text-twitter-green" 
                  : "text-twitter-gray hover:text-twitter-green"
              }`}
            >
              <Repeat2 className="w-4 h-4" />
              <span className="text-xs">{tweetStats.retweets}</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLike}
              className={`flex items-center space-x-2 rounded-full px-2 py-1 h-8 hover:bg-twitter-red/10 ${
                isLiked 
                  ? "text-twitter-red" 
                  : "text-twitter-gray hover:text-twitter-red"
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
              <span className="text-xs">{tweetStats.likes}</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleShare}
              className="flex items-center space-x-2 text-twitter-gray hover:text-primary hover:bg-primary/10 rounded-full px-2 py-1 h-8"
            >
              <Share className="w-4 h-4" />
            </Button>
          </div>
          </div>
        </div>
      </article>
    </Link>
  );
};