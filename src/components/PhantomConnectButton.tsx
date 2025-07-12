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
      <img 
        src="https://phantom.app/img/phantom-logo.png" 
        alt="Phantom" 
        className="w-5 h-5"
      />
      <span className="hidden sm:inline">Connect</span>
    </Button>
  );
};