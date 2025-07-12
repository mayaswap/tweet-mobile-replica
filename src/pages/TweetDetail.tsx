import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, MessageCircle, Repeat2, Heart, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const mockTweet = {
  id: "1",
  user: {
    name: "John Doe",
    username: "johndoe",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    verified: false,
  },
  content: "Just shipped a new feature using React Server Components! The performance improvements are incredible. The future of React is looking bright 🚀",
  timestamp: "3h",
  stats: {
    replies: 24,
    retweets: 89,
    likes: 234,
  },
  image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=500&h=300&fit=crop",
};

const mockReplies = [
  {
    id: "r1",
    user: {
      name: "Sarah Wilson",
      username: "sarahw",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=100&h=100&fit=crop&crop=face",
      verified: true,
    },
    content: "This is amazing! Can't wait to try this out in my next project. How's the learning curve?",
    timestamp: "2h",
    stats: { replies: 5, retweets: 12, likes: 45 },
    replies: [
      {
        id: "r1-1",
        user: {
          name: "John Doe",
          username: "johndoe",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
          verified: false,
        },
        content: "The learning curve is pretty smooth if you're already familiar with React! The documentation is excellent too.",
        timestamp: "1h",
        stats: { replies: 2, retweets: 3, likes: 18 },
        replies: [],
      },
      {
        id: "r1-2",
        user: {
          name: "Mike Chen",
          username: "mikechen",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
          verified: false,
        },
        content: "I agree! Just migrated our app and saw 40% performance improvement.",
        timestamp: "45m",
        stats: { replies: 0, retweets: 8, likes: 22 },
        replies: [],
      }
    ]
  },
  {
    id: "r2",
    user: {
      name: "Alex Thompson",
      username: "alexthompson",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      verified: false,
    },
    content: "React Server Components are a game changer! The hydration performance alone makes it worth the switch.",
    timestamp: "1h",
    stats: { replies: 3, retweets: 15, likes: 67 },
    replies: [
      {
        id: "r2-1",
        user: {
          name: "Emma Davis",
          username: "emmadavis",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
          verified: false,
        },
        content: "Totally! The SEO benefits are incredible too.",
        timestamp: "30m",
        stats: { replies: 1, retweets: 2, likes: 9 },
        replies: [],
      }
    ]
  }
];

interface Reply {
  id: string;
  user: {
    name: string;
    username: string;
    avatar: string;
    verified: boolean;
  };
  content: string;
  timestamp: string;
  stats: {
    replies: number;
    retweets: number;
    likes: number;
  };
  replies: Reply[];
}

const ReplyCard = ({ reply, level = 0 }: { reply: Reply; level?: number }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isRetweeted, setIsRetweeted] = useState(false);
  const [stats, setStats] = useState(reply.stats);
  const { toast } = useToast();

  const handleLike = () => {
    const newLikeState = !isLiked;
    setIsLiked(newLikeState);
    setStats(prev => ({ 
      ...prev, 
      likes: newLikeState ? prev.likes + 1 : prev.likes - 1 
    }));
  };

  const handleRetweet = () => {
    const newRetweetState = !isRetweeted;
    setIsRetweeted(newRetweetState);
    setStats(prev => ({ 
      ...prev, 
      retweets: newRetweetState ? prev.retweets + 1 : prev.retweets - 1 
    }));
    toast({
      title: newRetweetState ? "Retweeted!" : "Retweet removed",
      description: newRetweetState ? "Reply has been retweeted." : "Retweet has been removed.",
    });
  };

  const handleReply = () => {
    setStats(prev => ({ ...prev, replies: prev.replies + 1 }));
    toast({
      title: "Reply posted!",
      description: "Your reply has been posted successfully.",
    });
  };

  return (
    <div className={`border-b border-border ${level > 0 ? 'ml-12' : ''}`}>
      <div className="px-4 py-3">
        <div className="flex space-x-3">
          <Link to={`/profile/${reply.user.username}`} className="flex-shrink-0">
            <Avatar className="w-10 h-10 flex-shrink-0">
              <AvatarImage src={reply.user.avatar} />
              <AvatarFallback>{reply.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </Link>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <Link to={`/profile/${reply.user.username}`} className="hover:underline">
                <span className="font-bold text-foreground text-sm">
                  {reply.user.name}
                </span>
              </Link>
              {reply.user.verified && (
                <svg className="w-4 h-4 fill-primary" viewBox="0 0 24 24">
                  <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-2.214-1.588c-.326-.234-.398-.691-.164-1.018.234-.326.691-.398 1.018-.164l1.41 1.01 3.247-4.87c.235-.352.704-.444 1.056-.207.35.235.44.703.206 1.055z"/>
                </svg>
              )}
              <Link to={`/profile/${reply.user.username}`} className="hover:underline">
                <span className="text-muted-foreground text-sm">@{reply.user.username}</span>
              </Link>
              <span className="text-muted-foreground text-sm">·</span>
              <span className="text-muted-foreground text-sm">{reply.timestamp}</span>
            </div>
            
            <div className="text-foreground text-sm leading-normal mb-3">
              {reply.content}
            </div>
            
            <div className="flex items-center justify-between max-w-md">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleReply}
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full px-2 py-1 h-8"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-xs">{stats.replies}</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleRetweet}
                className={`flex items-center space-x-2 rounded-full px-2 py-1 h-8 ${
                  isRetweeted 
                    ? "text-green-500 bg-green-500/10" 
                    : "text-muted-foreground hover:text-green-500 hover:bg-green-500/10"
                }`}
              >
                <Repeat2 className="w-4 h-4" />
                <span className="text-xs">{stats.retweets}</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLike}
                className={`flex items-center space-x-2 rounded-full px-2 py-1 h-8 ${
                  isLiked 
                    ? "text-red-500 bg-red-500/10" 
                    : "text-muted-foreground hover:text-red-500 hover:bg-red-500/10"
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
                <span className="text-xs">{stats.likes}</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full px-2 py-1 h-8"
              >
                <Share className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {reply.replies.length > 0 && (
        <div className="px-4 pb-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowReplies(!showReplies)}
            className="text-primary text-sm"
          >
            {showReplies ? 'Hide' : 'Show'} {reply.replies.length} {reply.replies.length === 1 ? 'reply' : 'replies'}
          </Button>
        </div>
      )}
      
      {showReplies && reply.replies.map((nestedReply) => (
        <ReplyCard key={nestedReply.id} reply={nestedReply} level={level + 1} />
      ))}
    </div>
  );
};

export default function TweetDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [replyText, setReplyText] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isRetweeted, setIsRetweeted] = useState(false);
  const [stats, setStats] = useState(mockTweet.stats);
  const { toast } = useToast();

  const handleLike = () => {
    const newLikeState = !isLiked;
    setIsLiked(newLikeState);
    setStats(prev => ({ 
      ...prev, 
      likes: newLikeState ? prev.likes + 1 : prev.likes - 1 
    }));
  };

  const handleRetweet = () => {
    const newRetweetState = !isRetweeted;
    setIsRetweeted(newRetweetState);
    setStats(prev => ({ 
      ...prev, 
      retweets: newRetweetState ? prev.retweets + 1 : prev.retweets - 1 
    }));
    toast({
      title: newRetweetState ? "Retweeted!" : "Retweet removed",
      description: newRetweetState ? "Tweet has been retweeted." : "Retweet has been removed.",
    });
  };

  const handleReply = () => {
    if (replyText.trim()) {
      setStats(prev => ({ ...prev, replies: prev.replies + 1 }));
      setReplyText("");
      toast({
        title: "Reply posted!",
        description: "Your reply has been posted successfully.",
      });
    }
  };

  return (
    <div>
      {/* Main Tweet */}
      <div className="border-b border-border px-4 py-4">
        <div className="flex space-x-3 mb-4">
          <Link to={`/profile/${mockTweet.user.username}`} className="flex-shrink-0">
            <Avatar className="w-12 h-12">
              <AvatarImage src={mockTweet.user.avatar} />
              <AvatarFallback>{mockTweet.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </Link>
          
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Link to={`/profile/${mockTweet.user.username}`} className="hover:underline">
                <span className="font-bold text-foreground">
                  {mockTweet.user.name}
                </span>
              </Link>
              <Link to={`/profile/${mockTweet.user.username}`} className="hover:underline">
                <span className="text-muted-foreground">@{mockTweet.user.username}</span>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="text-foreground text-lg leading-normal mb-4">
          {mockTweet.content}
        </div>
        
        {mockTweet.image && (
          <div className="mb-4 rounded-2xl overflow-hidden border border-border">
            <img 
              src={mockTweet.image} 
              alt="Tweet image" 
              className="w-full h-auto object-cover"
            />
          </div>
        )}
        
        <div className="text-muted-foreground text-sm mb-4">
          {mockTweet.timestamp} ago
        </div>
        
        <div className="flex items-center space-x-6 py-3 border-t border-b border-border">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center space-x-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full px-3 py-2"
          >
            <MessageCircle className="w-5 h-5" />
            <span>{stats.replies}</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleRetweet}
            className={`flex items-center space-x-2 rounded-full px-3 py-2 ${
              isRetweeted 
                ? "text-green-500 bg-green-500/10" 
                : "text-muted-foreground hover:text-green-500 hover:bg-green-500/10"
            }`}
          >
            <Repeat2 className="w-5 h-5" />
            <span>{stats.retweets}</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLike}
            className={`flex items-center space-x-2 rounded-full px-3 py-2 ${
              isLiked 
                ? "text-red-500 bg-red-500/10" 
                : "text-muted-foreground hover:text-red-500 hover:bg-red-500/10"
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
            <span>{stats.likes}</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center space-x-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full px-3 py-2"
          >
            <Share className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Reply Composer */}
      <div className="border-b border-border px-4 py-4">
        <div className="flex space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
            <AvatarFallback>YU</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <Textarea
              placeholder="Tweet your reply"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="min-h-[80px] border-none resize-none text-lg placeholder:text-muted-foreground focus-visible:ring-0"
            />
            
            <div className="flex justify-end mt-3">
              <Button 
                onClick={handleReply}
                disabled={!replyText.trim()}
                size="sm"
              >
                Reply
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Replies */}
      <div>
        {mockReplies.map((reply) => (
          <ReplyCard key={reply.id} reply={reply} />
        ))}
      </div>
    </div>
  );
}