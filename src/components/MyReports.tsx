
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Report {
  id: string;
  type: string;
  eventType?: string;
  species?: string;
  crimeType?: string;
  timestamp: string;
  status: 'pending' | 'validated' | 'rejected';
  photos: string[];
  tokens?: number;
}

interface MyReportsProps {
  onBack: () => void;
  reports: Report[];
}

const MyReports = ({ onBack, reports }: MyReportsProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700">Em análise</Badge>;
      case 'validated':
        return <Badge className="bg-green-100 text-green-700">Validado ✓</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejeitado</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  const getReportIcon = (type: string) => {
    switch (type) {
      case 'deforestation':
        return '🌲';
      case 'wildlife-sighting':
        return '🦜';
      case 'wildlife-crime':
        return '🚨';
      default:
        return '📋';
    }
  };

  const getReportTitle = (report: Report) => {
    switch (report.type) {
      case 'deforestation':
        return `Desmatamento: ${report.eventType?.replace('-', ' ') || 'Não especificado'}`;
      case 'wildlife-sighting':
        return `Avistamento: ${report.species || 'Espécie não especificada'}`;
      case 'wildlife-crime':
        return `Crime: ${report.crimeType || 'Tipo não especificado'}`;
      default:
        return 'Relatório';
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const totalTokens = reports
    .filter(r => r.status === 'validated')
    .reduce((sum, r) => sum + (r.tokens || 1), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <Button onClick={onBack} variant="outline" size="sm">
          ← Voltar
        </Button>
        <div>
          <h2 className="text-xl font-bold text-forest-800">Meus Relatórios</h2>
          <p className="text-sm text-muted-foreground">Histórico e status dos seus relatórios</p>
        </div>
      </div>

      {/* Summary */}
      <Card className="bg-gradient-to-r from-forest-50 to-forest-100">
        <CardContent className="p-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-forest-700">{reports.length}</div>
              <div className="text-sm text-forest-600">Total de relatórios</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-700">
                {reports.filter(r => r.status === 'validated').length}
              </div>
              <div className="text-sm text-forest-600">Validados</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-forest-700">{totalTokens}</div>
              <div className="text-sm text-forest-600">Tokens ganhos</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <div className="space-y-4">
        {reports.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-lg font-semibold text-forest-800 mb-2">Nenhum relatório ainda</h3>
              <p className="text-muted-foreground">Comece enviando seu primeiro relatório!</p>
            </CardContent>
          </Card>
        ) : (
          reports
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
            .map((report) => (
              <Card key={report.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">{getReportIcon(report.type)}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-forest-800">{getReportTitle(report)}</h4>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(report.timestamp)}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className="text-xs text-muted-foreground">
                            📷 {report.photos.length} foto(s)
                          </span>
                          {report.status === 'validated' && report.tokens && (
                            <span className="text-xs text-forest-600">
                              🪙 +{report.tokens} token(s)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(report.status)}
                      <div className="text-xs text-muted-foreground mt-1">
                        ID: {report.id.slice(-6)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
        )}
      </div>

      {/* Tips */}
      <Card className="border-forest-200">
        <CardHeader>
          <CardTitle className="text-lg text-forest-800">💡 Dicas para aprovação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>• Tire fotos claras e bem iluminadas</p>
          <p>• Certifique-se de que o GPS esteja ativado</p>
          <p>• Preencha todos os campos obrigatórios</p>
          <p>• Adicione descrições detalhadas quando possível</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyReports;
