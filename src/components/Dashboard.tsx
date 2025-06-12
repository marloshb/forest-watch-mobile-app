
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface DashboardProps {
  userEmail: string;
  onNavigate: (page: string) => void;
  userStats: {
    tokens: number;
    reports: number;
    validated: number;
  };
}

const Dashboard = ({ userEmail, onNavigate, userStats }: DashboardProps) => {
  const reportTypes = [
    {
      id: 'deforestation',
      title: 'Reportar Desmatamento',
      description: 'Denuncie queimadas, cortes e degradação florestal',
      icon: '🌲',
      color: 'bg-red-500 hover:bg-red-600',
      urgency: 'Alta prioridade'
    },
    {
      id: 'wildlife-sighting',
      title: 'Avistamento de Animais',
      description: 'Registre observações da fauna silvestre',
      icon: '🦜',
      color: 'bg-forest-500 hover:bg-forest-600',
      urgency: 'Biodiversidade'
    },
    {
      id: 'wildlife-crime',
      title: 'Crime contra Fauna',
      description: 'Denuncie caça, armadilhas e tráfico de animais',
      icon: '🚨',
      color: 'bg-orange-500 hover:bg-orange-600',
      urgency: 'Urgente'
    }
  ];

  const quickActions = [
    {
      id: 'my-reports',
      title: 'Meus Relatórios',
      description: 'Ver histórico e status',
      icon: '📋',
      count: userStats.reports
    },
    {
      id: 'tokens',
      title: 'Meus Tokens',
      description: 'Saldo e conversões',
      icon: '🪙',
      count: userStats.tokens
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card className="bg-gradient-to-r from-forest-500 to-forest-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Olá, Fiscal!</h2>
              <p className="text-forest-100">Pronto para proteger nossa natureza hoje?</p>
              <p className="text-sm text-forest-200 mt-1">{userEmail}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{userStats.tokens}</div>
              <div className="text-sm text-forest-200">Tokens</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-forest-600">{userStats.reports}</div>
            <div className="text-sm text-muted-foreground">Relatórios</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-forest-600">{userStats.validated}</div>
            <div className="text-sm text-muted-foreground">Validados</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-forest-600">
              {userStats.reports > 0 ? Math.round((userStats.validated / userStats.reports) * 100) : 0}%
            </div>
            <div className="text-sm text-muted-foreground">Taxa sucesso</div>
          </CardContent>
        </Card>
      </div>

      {/* Report Types */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-forest-800">Novo Relatório</h3>
        <div className="space-y-3">
          {reportTypes.map((type) => (
            <Card key={type.id} className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-forest-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{type.icon}</div>
                    <div>
                      <h4 className="font-semibold text-forest-800">{type.title}</h4>
                      <p className="text-sm text-muted-foreground">{type.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="text-xs mb-2">
                      {type.urgency}
                    </Badge>
                    <Button 
                      onClick={() => onNavigate(type.id)}
                      className={`${type.color} text-white`}
                      size="sm"
                    >
                      Reportar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-forest-800">Ações Rápidas</h3>
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action) => (
            <Card key={action.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <div className="text-2xl mb-2">{action.icon}</div>
                <h4 className="font-semibold text-forest-800">{action.title}</h4>
                <p className="text-sm text-muted-foreground mb-2">{action.description}</p>
                <div className="text-lg font-bold text-forest-600">{action.count}</div>
                <Button 
                  onClick={() => onNavigate(action.id)}
                  variant="outline" 
                  size="sm" 
                  className="mt-2 w-full"
                >
                  Ver
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
