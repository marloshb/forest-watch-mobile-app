
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

interface TokensPageProps {
  onBack: () => void;
  tokens: number;
}

const TokensPage = ({ onBack, tokens }: TokensPageProps) => {
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [pixKey, setPixKey] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const conversionRate = 5.0; // R$ 5.00 por token
  const withdrawValue = parseFloat(withdrawAmount) * conversionRate;

  const handleWithdraw = () => {
    if (!withdrawAmount || !pixKey || parseFloat(withdrawAmount) > tokens) return;
    
    setIsProcessing(true);
    
    // Simula processamento
    setTimeout(() => {
      console.log(`Saque solicitado: ${withdrawAmount} tokens para ${pixKey}`);
      setIsProcessing(false);
      setWithdrawAmount('');
      setPixKey('');
    }, 2000);
  };

  const benefits = [
    {
      id: 'course-gis',
      title: 'Curso de GIS Ambiental',
      description: 'Aprenda a usar sistemas de informação geográfica',
      cost: 20,
      icon: '🗺️'
    },
    {
      id: 'course-fauna',
      title: 'Identificação de Fauna',
      description: 'Curso sobre identificação de animais silvestres',
      cost: 15,
      icon: '🦜'
    },
    {
      id: 'equipment',
      title: 'Kit de Campo',
      description: 'GPS portátil + binóculos + caderno de campo',
      cost: 50,
      icon: '🎒'
    },
    {
      id: 'certificate',
      title: 'Certificação IBAMA',
      description: 'Processo de certificação como fiscal voluntário',
      cost: 100,
      icon: '📜'
    }
  ];

  const recentTransactions = [
    { date: '2024-06-10', type: 'earned', amount: 3, description: 'Relatório de desmatamento validado' },
    { date: '2024-06-09', type: 'earned', amount: 2, description: 'Avistamento de fauna validado' },
    { date: '2024-06-08', type: 'spent', amount: -15, description: 'Curso de Identificação de Fauna' },
    { date: '2024-06-07', type: 'earned', amount: 1, description: 'Crime contra fauna validado' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <Button onClick={onBack} variant="outline" size="sm">
          ← Voltar
        </Button>
        <div>
          <h2 className="text-xl font-bold text-forest-800">Meus Tokens</h2>
          <p className="text-sm text-muted-foreground">Gerencie suas recompensas e benefícios</p>
        </div>
      </div>

      {/* Balance Card */}
      <Card className="bg-gradient-to-r from-forest-500 to-forest-600 text-white">
        <CardContent className="p-6">
          <div className="text-center">
            <div className="text-4xl mb-2">🪙</div>
            <div className="text-3xl font-bold mb-2">{tokens}</div>
            <div className="text-forest-100">Tokens disponíveis</div>
            <div className="text-lg font-semibold mt-2">
              ≈ R$ {(tokens * conversionRate).toFixed(2)}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="withdraw" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="withdraw">Sacar</TabsTrigger>
          <TabsTrigger value="benefits">Benefícios</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
        </TabsList>

        {/* Withdraw Tab */}
        <TabsContent value="withdraw" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>💰</span>
                <span>Converter em Dinheiro</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Quantidade de tokens</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Ex: 10"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  max={tokens}
                  min="1"
                />
                {withdrawAmount && (
                  <p className="text-sm text-forest-600">
                    Valor: R$ {withdrawValue.toFixed(2)} (taxa de conversão: R$ {conversionRate}/token)
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="pix">Chave PIX</Label>
                <Input
                  id="pix"
                  placeholder="Email, CPF, telefone ou chave aleatória"
                  value={pixKey}
                  onChange={(e) => setPixKey(e.target.value)}
                />
              </div>

              <Button 
                onClick={handleWithdraw}
                disabled={!withdrawAmount || !pixKey || parseFloat(withdrawAmount) > tokens || isProcessing}
                className="w-full bg-forest-600 hover:bg-forest-700"
              >
                {isProcessing ? 'Processando...' : 'Solicitar Saque'}
              </Button>

              <div className="text-xs text-muted-foreground">
                • Processamento em até 24h úteis<br/>
                • Saque mínimo: 1 token (R$ {conversionRate.toFixed(2)})<br/>
                • Sem taxas de transferência
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Benefits Tab */}
        <TabsContent value="benefits" className="space-y-4">
          <div className="grid gap-4">
            {benefits.map((benefit) => (
              <Card key={benefit.id} className="border-forest-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{benefit.icon}</div>
                      <div>
                        <h4 className="font-semibold text-forest-800">{benefit.title}</h4>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                        <div className="text-sm font-medium text-forest-600 mt-1">
                          🪙 {benefit.cost} tokens
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="outline"
                      disabled={tokens < benefit.cost}
                      className="border-forest-200 hover:bg-forest-50"
                    >
                      {tokens >= benefit.cost ? 'Resgatar' : 'Insuficiente'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Transações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTransactions.map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-forest-100 last:border-0">
                    <div>
                      <p className="text-sm font-medium">{transaction.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(transaction.date).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={transaction.type === 'earned' ? 'default' : 'outline'}
                        className={transaction.type === 'earned' ? 'bg-green-100 text-green-700' : ''}
                      >
                        {transaction.amount > 0 ? '+' : ''}{transaction.amount} 🪙
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Info Card */}
      <Card className="border-forest-200">
        <CardHeader>
          <CardTitle className="text-lg text-forest-800">ℹ️ Como ganhar mais tokens</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>• <strong>Desmatamento:</strong> 3 tokens por relatório validado</p>
          <p>• <strong>Avistamento de fauna:</strong> 2 tokens por relatório validado</p>
          <p>• <strong>Crime contra fauna:</strong> 5 tokens por relatório validado</p>
          <p>• <strong>Bonus qualidade:</strong> +1 token para fotos excepcionais</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TokensPage;
