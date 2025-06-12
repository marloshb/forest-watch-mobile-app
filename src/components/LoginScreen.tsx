
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface LoginScreenProps {
  onLogin: (email: string) => void;
}

const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showOnboarding, setShowOnboarding] = useState(false);

  const handleLogin = () => {
    if (email && password) {
      onLogin(email);
    }
  };

  if (showOnboarding) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-forest-500 via-forest-600 to-forest-700 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-forest-400 to-forest-600 flex items-center justify-center mb-4">
              <span className="text-2xl">🌳</span>
            </div>
            <CardTitle className="text-2xl font-bold text-forest-800">Bem-vindo ao Verde Vigilante!</CardTitle>
            <CardDescription>Transforme-se em um fiscal ambiental e ajude a proteger nossa natureza</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-forest-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-forest-600">📸</span>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Capture evidências</h3>
                  <p className="text-xs text-muted-foreground">Tire fotos de desmatamento ou animais com localização automática</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-forest-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-forest-600">🪙</span>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Ganhe tokens</h3>
                  <p className="text-xs text-muted-foreground">Receba recompensas por relatórios validados</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-forest-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-forest-600">🌍</span>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Proteja a natureza</h3>
                  <p className="text-xs text-muted-foreground">Contribua para combater crimes ambientais</p>
                </div>
              </div>
            </div>
            
            <Button onClick={() => setShowOnboarding(false)} className="w-full bg-forest-600 hover:bg-forest-700">
              Começar agora
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-500 via-forest-600 to-forest-700 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-forest-400 to-forest-600 flex items-center justify-center mb-4">
            <span className="text-2xl">🌿</span>
          </div>
          <CardTitle className="text-2xl font-bold text-forest-800">Verde Vigilante</CardTitle>
          <CardDescription>Entre em sua conta para começar a fiscalizar</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu.email@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-forest-200 focus:border-forest-500"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-forest-200 focus:border-forest-500"
            />
          </div>
          
          <Button onClick={handleLogin} className="w-full bg-forest-600 hover:bg-forest-700">
            Entrar
          </Button>
          
          <div className="text-center">
            <Button 
              variant="link" 
              onClick={() => setShowOnboarding(true)}
              className="text-forest-600 hover:text-forest-700"
            >
              Primeira vez aqui? Veja como funciona
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginScreen;
