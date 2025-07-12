import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Login = () => {
  const { connected } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    if (connected) {
      navigate('/');
    }
  }, [connected, navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">
            DeTwitter
          </CardTitle>
          <CardDescription className="text-lg">
            Connect your Solana wallet to access decentralized Twitter
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              Choose your preferred Solana wallet to connect
            </p>
            <div className="flex justify-center">
              <WalletMultiButton className="!bg-primary !text-primary-foreground hover:!bg-primary/90 !rounded-md !font-medium !transition-colors" />
            </div>
          </div>
          
          <div className="text-center space-y-2">
            <h3 className="font-semibold">Why connect your wallet?</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Decentralized identity verification</li>
              <li>• Own your social data</li>
              <li>• Censorship-resistant posting</li>
              <li>• Tip creators with SOL</li>
            </ul>
          </div>

          <div className="text-center">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="text-muted-foreground"
            >
              Browse without connecting
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;