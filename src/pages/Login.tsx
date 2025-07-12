import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Shield, Users, Zap } from 'lucide-react';

const Login = () => {
  const { connected } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    if (connected) {
      navigate('/');
    }
  }, [connected, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex flex-col items-center justify-center p-4">
      {/* Welcome Header */}
      <div className="text-center mb-8 space-y-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Welcome to DeTwitter
          </h1>
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl">
          The future of social media is here. Join the decentralized revolution where you own your data, your content, and your voice.
        </p>
        <Badge variant="secondary" className="text-sm">
          Powered by Solana Blockchain
        </Badge>
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-lg shadow-2xl border-2">
        <CardHeader className="text-center space-y-4">
          <CardTitle className="text-2xl font-bold">
            Connect Your Wallet
          </CardTitle>
          <CardDescription className="text-base">
            Choose your preferred Solana wallet to get started
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Wallet Connect Button */}
          <div className="text-center">
            <WalletMultiButton className="!bg-primary !text-primary-foreground hover:!bg-primary/90 !rounded-lg !font-medium !transition-all !duration-200 !px-8 !py-3 !text-base !shadow-lg hover:!shadow-xl !border-0" />
          </div>
          
          {/* Benefits Grid */}
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="text-center space-y-2 p-3 rounded-lg bg-muted/50">
              <Shield className="w-6 h-6 text-primary mx-auto" />
              <h4 className="font-semibold text-sm">Secure & Private</h4>
              <p className="text-xs text-muted-foreground">Your keys, your data</p>
            </div>
            <div className="text-center space-y-2 p-3 rounded-lg bg-muted/50">
              <Users className="w-6 h-6 text-primary mx-auto" />
              <h4 className="font-semibold text-sm">Community Owned</h4>
              <p className="text-xs text-muted-foreground">No corporate control</p>
            </div>
            <div className="text-center space-y-2 p-3 rounded-lg bg-muted/50">
              <Zap className="w-6 h-6 text-primary mx-auto" />
              <h4 className="font-semibold text-sm">Lightning Fast</h4>
              <p className="text-xs text-muted-foreground">Powered by Solana</p>
            </div>
            <div className="text-center space-y-2 p-3 rounded-lg bg-muted/50">
              <Sparkles className="w-6 h-6 text-primary mx-auto" />
              <h4 className="font-semibold text-sm">Tip Creators</h4>
              <p className="text-xs text-muted-foreground">Support with SOL</p>
            </div>
          </div>

          {/* Browse Option */}
          <div className="text-center pt-4 border-t">
            <p className="text-sm text-muted-foreground mb-3">
              Not ready to connect? No problem!
            </p>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="text-muted-foreground hover:text-foreground"
            >
              Browse as Guest
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Footer */}
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>Experience the future of social media • Decentralized • Censorship-resistant</p>
      </div>
    </div>
  );
};

export default Login;