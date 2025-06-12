
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import LoginScreen from '@/components/LoginScreen';
import Dashboard from '@/components/Dashboard';
import DeforestationReport from '@/components/DeforestationReport';
import WildlifeReport from '@/components/WildlifeReport';
import MyReports from '@/components/MyReports';
import TokensPage from '@/components/TokensPage';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [reports, setReports] = useState<any[]>([]);
  const [userTokens, setUserTokens] = useState(27);
  const { toast } = useToast();

  const userStats = {
    tokens: userTokens,
    reports: reports.length,
    validated: reports.filter(r => r.status === 'validated').length
  };

  const handleLogin = (email: string) => {
    setUserEmail(email);
    setIsLoggedIn(true);
    toast({
      title: "Login realizado com sucesso!",
      description: "Bem-vindo ao Verde Vigilante",
    });
  };

  const handleReportSubmit = (report: any) => {
    setReports(prev => [...prev, report]);
    
    // Simula validação após 3 segundos
    setTimeout(() => {
      setReports(prev => 
        prev.map(r => 
          r.id === report.id 
            ? { ...r, status: 'validated', tokens: getTokensForReport(r.type) }
            : r
        )
      );
      
      const tokens = getTokensForReport(report.type);
      setUserTokens(prev => prev + tokens);
      
      toast({
        title: "Relatório validado! ✓",
        description: `Você ganhou ${tokens} tokens pela sua contribuição.`,
      });
    }, 3000);

    toast({
      title: "Relatório enviado!",
      description: "Seu relatório está sendo analisado. Você será notificado em breve.",
    });
    
    setCurrentPage('dashboard');
  };

  const getTokensForReport = (type: string) => {
    switch (type) {
      case 'deforestation': return 3;
      case 'wildlife-sighting': return 2;
      case 'wildlife-crime': return 5;
      default: return 1;
    }
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <Dashboard 
            userEmail={userEmail}
            onNavigate={setCurrentPage}
            userStats={userStats}
          />
        );
      case 'deforestation':
        return (
          <DeforestationReport 
            onBack={() => setCurrentPage('dashboard')}
            onSubmit={handleReportSubmit}
          />
        );
      case 'wildlife-sighting':
        return (
          <WildlifeReport 
            reportType="wildlife-sighting"
            onBack={() => setCurrentPage('dashboard')}
            onSubmit={handleReportSubmit}
          />
        );
      case 'wildlife-crime':
        return (
          <WildlifeReport 
            reportType="wildlife-crime"
            onBack={() => setCurrentPage('dashboard')}
            onSubmit={handleReportSubmit}
          />
        );
      case 'my-reports':
        return (
          <MyReports 
            onBack={() => setCurrentPage('dashboard')}
            reports={reports}
          />
        );
      case 'tokens':
        return (
          <TokensPage 
            onBack={() => setCurrentPage('dashboard')}
            tokens={userTokens}
          />
        );
      default:
        return (
          <Dashboard 
            userEmail={userEmail}
            onNavigate={setCurrentPage}
            userStats={userStats}
          />
        );
    }
  };

  return (
    <Layout showHeader={currentPage === 'dashboard'}>
      {renderCurrentPage()}
    </Layout>
  );
};

export default Index;
