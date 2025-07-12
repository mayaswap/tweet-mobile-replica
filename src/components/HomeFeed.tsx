import { TweetCard } from "./TweetCard";

const mockTweets = [
  {
    user: {
      name: "Sarah Chen",
      username: "sarahchen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b187?w=400&h=400&fit=crop&crop=face",
      verified: true
    },
    content: "Just finished reading an amazing book on design thinking. The way we approach problems can completely change the solutions we create. 🧠✨",
    timestamp: "2h",
    stats: {
      replies: 12,
      retweets: 34,
      likes: 127
    }
  },
  {
    user: {
      name: "Tech Updates",
      username: "techupdates",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      verified: true
    },
    content: "BREAKING: New framework announced at the developer conference. This could change how we build web applications forever! What are your thoughts?",
    timestamp: "4h",
    stats: {
      replies: 89,
      retweets: 156,
      likes: 423
    },
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&h=400&fit=crop"
  },
  {
    user: {
      name: "Alex Rodriguez",
      username: "alexrod",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
    },
    content: "Working on a new project and loving every minute of it. There's something magical about turning ideas into reality through code. 💻",
    timestamp: "6h",
    stats: {
      replies: 5,
      retweets: 8,
      likes: 42
    }
  },
  {
    user: {
      name: "Design Inspiration",
      username: "designinspo",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      verified: true
    },
    content: "Color psychology in UI design is fascinating. The right palette doesn't just look good—it guides user behavior and emotions. Here's a beautiful example:",
    timestamp: "8h",
    stats: {
      replies: 23,
      retweets: 67,
      likes: 189
    },
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop"
  },
  {
    user: {
      name: "Maria Santos",
      username: "mariasantos",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face"
    },
    content: "Just had the most productive day! Sometimes all you need is good music, coffee, and a clear mind to tackle any challenge. ☕🎵",
    timestamp: "12h",
    stats: {
      replies: 3,
      retweets: 12,
      likes: 28
    }
  },
  {
    user: {
      name: "Code Weekly",
      username: "codeweekly",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      verified: true
    },
    content: "Thread: 10 JavaScript tips that will make you a better developer 🧵👇\n\n1. Use optional chaining (?.) to safely access nested properties\n2. Destructuring can make your code cleaner and more readable",
    timestamp: "1d",
    stats: {
      replies: 45,
      retweets: 234,
      likes: 567
    }
  }
];

export const HomeFeed = () => {
  return (
    <div className="bg-background">
      {mockTweets.map((tweet, index) => (
        <TweetCard
          key={index}
          user={tweet.user}
          content={tweet.content}
          timestamp={tweet.timestamp}
          stats={tweet.stats}
          image={tweet.image}
        />
      ))}
    </div>
  );
};