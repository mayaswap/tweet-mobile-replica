import { useState } from "react";
import { Calendar, MapPin, Link as LinkIcon, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TweetCard } from "@/components/TweetCard";

const profileData = {
  name: "John Doe",
  handle: "@johndoe",
  bio: "Full-stack developer passionate about React, TypeScript, and modern web technologies. Building the future, one component at a time.",
  location: "San Francisco, CA",
  website: "johndoe.dev",
  joinDate: "March 2020",
  following: 892,
  followers: 1247,
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  banner: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=200&fit=crop",
};

const userTweets = [
  {
    id: "1",
    user: {
      name: profileData.name,
      handle: profileData.handle,
      avatar: profileData.avatar,
      verified: false,
    },
    content: "Just shipped a new feature using React Server Components! The performance improvements are incredible. The future of React is looking bright 🚀",
    timestamp: "3h",
    replies: 24,
    retweets: 89,
    likes: 234,
  },
  {
    id: "2",
    user: {
      name: profileData.name,
      handle: profileData.handle,
      avatar: profileData.avatar,
      verified: false,
    },
    content: "Hot take: TypeScript has made JavaScript development so much better. The developer experience improvements are worth the initial learning curve.",
    timestamp: "1d",
    replies: 67,
    retweets: 156,
    likes: 445,
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=500&h=300&fit=crop",
  },
  {
    id: "3",
    user: {
      name: profileData.name,
      handle: profileData.handle,
      avatar: profileData.avatar,
      verified: false,
    },
    content: "Working on a new open source project. Stay tuned for the announcement! 👀",
    timestamp: "2d",
    replies: 12,
    retweets: 34,
    likes: 78,
  },
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState("tweets");

  const tabs = [
    { id: "tweets", label: "Tweets", count: userTweets.length },
    { id: "replies", label: "Replies", count: 0 },
    { id: "media", label: "Media", count: 1 },
    { id: "likes", label: "Likes", count: 0 },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Profile Header */}
      <div className="relative">
        <div className="h-32 bg-gradient-to-r from-primary/20 to-primary/10 overflow-hidden">
          <img
            src={profileData.banner}
            alt="Profile banner"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="px-4 pb-4">
          <div className="flex justify-between items-start -mt-12 mb-4">
            <img
              src={profileData.avatar}
              alt={profileData.name}
              className="w-24 h-24 rounded-full border-4 border-background"
            />
            
            <div className="flex space-x-2 mt-12">
              <Button variant="ghost" size="sm">Edit profile</Button>
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <h1 className="text-xl font-bold">{profileData.name}</h1>
              <p className="text-muted-foreground">{profileData.handle}</p>
            </div>
            
            <p className="text-sm">{profileData.bio}</p>
            
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{profileData.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <LinkIcon className="h-4 w-4" />
                <span className="text-primary">{profileData.website}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>Joined {profileData.joinDate}</span>
              </div>
            </div>
            
            <div className="flex space-x-4 text-sm">
              <div>
                <span className="font-bold">{profileData.following}</span>
                <span className="text-muted-foreground ml-1">Following</span>
              </div>
              <div>
                <span className="font-bold">{profileData.followers}</span>
                <span className="text-muted-foreground ml-1">Followers</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors relative ${
                activeTab === tab.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className="flex items-center justify-center space-x-1">
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                    {tab.count}
                  </span>
                )}
              </div>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {activeTab === "tweets" && (
          <div className="divide-y divide-border">
            {userTweets.map((tweet) => (
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
        )}
        
        {activeTab !== "tweets" && (
          <div className="p-8 text-center text-muted-foreground">
            <p>Nothing to see here yet</p>
          </div>
        )}
      </div>
    </div>
  );
}