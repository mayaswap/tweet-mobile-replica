import { Heart, MessageCircle, Repeat2, UserPlus, Bell } from "lucide-react";

interface Notification {
  id: string;
  type: "like" | "retweet" | "reply" | "follow";
  user: {
    name: string;
    handle: string;
    avatar: string;
  };
  content?: string;
  timestamp: string;
  read: boolean;
}

const notifications: Notification[] = [
  {
    id: "1",
    type: "like",
    user: {
      name: "Sarah Chen",
      handle: "@sarahchen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=40&h=40&fit=crop&crop=face",
    },
    content: "Your post about React 19 features",
    timestamp: "2m",
    read: false,
  },
  {
    id: "2",
    type: "follow",
    user: {
      name: "Alex Rodriguez",
      handle: "@alexrod",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    },
    timestamp: "15m",
    read: false,
  },
  {
    id: "3",
    type: "retweet",
    user: {
      name: "Dev Community",
      handle: "@devcommunity",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    },
    content: "Your tutorial on TypeScript best practices",
    timestamp: "1h",
    read: true,
  },
  {
    id: "4",
    type: "reply",
    user: {
      name: "Emma Wilson",
      handle: "@emmawilson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    },
    content: "Great explanation! Could you elaborate on the performance benefits?",
    timestamp: "2h",
    read: true,
  },
  {
    id: "5",
    type: "like",
    user: {
      name: "Tech Insights",
      handle: "@techinsights",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
    },
    content: "Your thread about modern web development",
    timestamp: "4h",
    read: true,
  },
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "like":
      return <Heart className="h-5 w-5 text-red-500 fill-current" />;
    case "retweet":
      return <Repeat2 className="h-5 w-5 text-green-500" />;
    case "reply":
      return <MessageCircle className="h-5 w-5 text-blue-500" />;
    case "follow":
      return <UserPlus className="h-5 w-5 text-primary" />;
    default:
      return <Bell className="h-5 w-5 text-muted-foreground" />;
  }
};

const getNotificationText = (notification: Notification) => {
  switch (notification.type) {
    case "like":
      return `${notification.user.name} liked ${notification.content}`;
    case "retweet":
      return `${notification.user.name} retweeted ${notification.content}`;
    case "reply":
      return `${notification.user.name} replied to your post`;
    case "follow":
      return `${notification.user.name} started following you`;
    default:
      return "";
  }
};

export default function Notifications() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border p-4">
        <h1 className="text-xl font-bold">Notifications</h1>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="divide-y divide-border">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 hover:bg-muted/50 transition-colors cursor-pointer ${
                !notification.read ? "bg-primary/5" : ""
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <img
                      src={notification.user.avatar}
                      alt={notification.user.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex items-center space-x-1">
                      {!notification.read && (
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm">
                    <span className="font-medium">{notification.user.name}</span>
                    <span className="text-muted-foreground ml-1">
                      {getNotificationText(notification).slice(notification.user.name.length)}
                    </span>
                  </p>
                  
                  {notification.type === "reply" && notification.content && (
                    <div className="mt-2 p-3 bg-muted/30 rounded-lg text-sm">
                      {notification.content}
                    </div>
                  )}
                  
                  <p className="text-xs text-muted-foreground mt-1">
                    {notification.timestamp}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {notifications.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            <Bell className="mx-auto h-8 w-8 mb-4" />
            <p>No notifications yet</p>
          </div>
        )}
      </div>
    </div>
  );
}