import { useState } from "react";
import { TwitterLayout } from "@/components/TwitterLayout";
import { HomeFeed } from "@/components/HomeFeed";
import { TweetComposer } from "@/components/TweetComposer";
import { FloatingTweetButton } from "@/components/FloatingTweetButton";

const Index = () => {
  const [isComposerOpen, setIsComposerOpen] = useState(false);

  return (
    <TwitterLayout>
      <HomeFeed />
      <FloatingTweetButton onClick={() => setIsComposerOpen(true)} />
      <TweetComposer 
        open={isComposerOpen} 
        onOpenChange={setIsComposerOpen} 
      />
    </TwitterLayout>
  );
};

export default Index;
