import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useWallet } from '@solana/wallet-adapter-react';
import { PhantomConnectButton } from './PhantomConnectButton';

export const TopHeader = () => {
  const location = useLocation();
  const { connected, disconnect, publicKey } = useWallet();

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Home";
      case "/search":
        return "Search";
      case "/notifications":
        return "Notifications";
      case "/profile":
        return "Profile";
      default:
        return "Twitter";
    }
  };

  // For home page, show the Twitter logo
  if (location.pathname === "/") {
    return (
      <header className="sticky top-0 bg-background/80 backdrop-blur-lg border-b border-border z-50">
        <div className="flex items-center justify-between px-4 h-14">
          {connected ? (
            <Avatar className="w-8 h-8">
              <AvatarFallback>
                {publicKey?.toString().slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          ) : (
            <PhantomConnectButton />
          )}
          
          <div className="flex-1 flex justify-center">
            <svg
              viewBox="0 0 24 24"
              className="w-7 h-7 fill-primary"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </div>
          
          {connected ? (
            <Button variant="ghost" size="icon" onClick={disconnect} className="w-8 h-8">
              <LogOut className="h-4 w-4" />
            </Button>
          ) : (
            <div className="w-8" />
          )}
        </div>
      </header>
    );
  }

  // For other pages, show page title
  return (
    <header className="sticky top-0 bg-background/80 backdrop-blur-lg border-b border-border z-50">
      <div className="flex items-center px-4 h-14">
        <h1 className="text-xl font-bold">{getPageTitle()}</h1>
      </div>
    </header>
  );
};