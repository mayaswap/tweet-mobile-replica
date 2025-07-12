import { useState } from "react";
import { HomeFeed } from "@/components/HomeFeed";
import { TweetComposer } from "@/components/TweetComposer";
import { FloatingTweetButton } from "@/components/FloatingTweetButton";

const Index = () => {
  const [isComposerOpen, setIsComposerOpen] = useState(false);

  return (
    <>
      <HomeFeed />
      <FloatingTweetButton onClick={() => setIsComposerOpen(true)} />
      <TweetComposer 
        open={isComposerOpen} 
        onOpenChange={setIsComposerOpen} 
      />
    </>
  );
};

export default Index;
