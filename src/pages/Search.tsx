import { useState } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TweetCard } from "@/components/TweetCard";

const searchResults = [
  {
    id: "1",
    user: {
      name: "React",
      handle: "@reactjs",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      verified: true,
    },
    content: "React 19 is now available! 🎉 Check out all the new features and improvements.",
    timestamp: "2h",
    replies: 1200,
    retweets: 5600,
    likes: 15600,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&h=300&fit=crop",
  },
  {
    id: "2",
    user: {
      name: "Tech News",
      handle: "@technews",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      verified: false,
    },
    content: "Breaking: New JavaScript framework announced at conference today. Developers are excited about the performance improvements.",
    timestamp: "4h",
    replies: 89,
    retweets: 234,
    likes: 567,
  },
];

const trendingTopics = [
  { topic: "#React19", tweets: "50.2K Tweets" },
  { topic: "#JavaScript", tweets: "125K Tweets" },
  { topic: "#WebDev", tweets: "89.1K Tweets" },
  { topic: "#TypeScript", tweets: "67.3K Tweets" },
  { topic: "#TechNews", tweets: "201K Tweets" },
];

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border p-4">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            placeholder="Search Twitter"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-10 bg-muted border-0 focus-visible:ring-1 focus-visible:ring-primary"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {searchQuery ? (
          <div className="divide-y divide-border">
            {searchResults
              .filter(tweet => 
                tweet.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tweet.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tweet.user.handle.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((tweet) => (
                <TweetCard 
                  key={tweet.id} 
                  user={{
                    name: tweet.user.name,
                    username: tweet.user.handle.replace('@', ''),
                    avatar: tweet.user.avatar,
                    verified: tweet.user.verified
                  }}
                  content={tweet.content}
                  timestamp={tweet.timestamp}
                  stats={{
                    replies: tweet.replies,
                    retweets: tweet.retweets,
                    likes: tweet.likes
                  }}
                  image={tweet.image}
                />
              ))}
            {searchResults.filter(tweet => 
              tweet.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
              tweet.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              tweet.user.handle.toLowerCase().includes(searchQuery.toLowerCase())
            ).length === 0 && (
              <div className="p-8 text-center text-muted-foreground">
                <SearchIcon className="mx-auto h-8 w-8 mb-4" />
                <p>No results for "{searchQuery}"</p>
              </div>
            )}
          </div>
        ) : (
          <div className="p-4">
            <div className="bg-muted/50 rounded-2xl p-4 mb-6">
              <h2 className="text-xl font-bold mb-4">Trending for you</h2>
              <div className="space-y-3">
                {trendingTopics.map((trend, index) => (
                  <div key={index} className="cursor-pointer hover:bg-background/50 p-2 rounded-lg transition-colors">
                    <p className="font-medium">{trend.topic}</p>
                    <p className="text-sm text-muted-foreground">{trend.tweets}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-0 divide-y divide-border">
              {searchResults.map((tweet) => (
                <TweetCard 
                  key={tweet.id} 
                  user={{
                    name: tweet.user.name,
                    username: tweet.user.handle.replace('@', ''),
                    avatar: tweet.user.avatar,
                    verified: tweet.user.verified
                  }}
                  content={tweet.content}
                  timestamp={tweet.timestamp}
                  stats={{
                    replies: tweet.replies,
                    retweets: tweet.retweets,
                    likes: tweet.likes
                  }}
                  image={tweet.image}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}