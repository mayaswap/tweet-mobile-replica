import { useWallet } from '@solana/wallet-adapter-react';
import { Button } from '@/components/ui/button';

export const PhantomConnectButton = ({ className }: { className?: string }) => {
  const { select, wallets, connected } = useWallet();

  const handleConnect = () => {
    const phantom = wallets.find(wallet => wallet.adapter.name === 'Phantom');
    if (phantom) {
      select(phantom.adapter.name);
    }
  };

  if (connected) return null;

  return (
    <Button 
      onClick={handleConnect}
      variant="ghost"
      size="sm"
      className={`flex items-center gap-2 ${className}`}
    >
      <svg 
        width="20" 
        height="20" 
        viewBox="0 0 128 128" 
        fill="none" 
        className="w-5 h-5"
      >
        <rect width="128" height="128" rx="128" fill="url(#paint0_linear_0_1)"/>
        <path d="M75.3 58.7c8.6-15.3 22.2-25.1 36.6-25.1 6.3 0 10.8 5.1 8.8 12.3-2.9 10.8-7.7 25.8-7.7 25.8s-4.3.5-10.3.5c-33.2 0-60.1 26.9-60.1 60.1 0 1.1 0 2.2.1 3.3-8.7-10.5-13.9-24-13.9-38.7 0-33.1 26.8-59.9 59.9-59.9 11.7 0 22.6 3.4 31.8 9.2-4.3-9.2-13.6-15.6-24.5-15.6-14.9 0-27 12.1-27 27 0 5.5 1.6 10.5 4.4 14.8z" fill="#AB9FF2"/>
        <defs>
          <linearGradient id="paint0_linear_0_1" x1="0" y1="0" x2="128" y2="128" gradientUnits="userSpaceOnUse">
            <stop stopColor="#534BB1"/>
            <stop offset="1" stopColor="#551BF9"/>
          </linearGradient>
        </defs>
      </svg>
      <span className="hidden sm:inline">Connect</span>
    </Button>
  );
};