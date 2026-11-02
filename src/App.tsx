import { useState } from 'react';
import { MainLayout } from './layouts/MainLayout';
import type { NavItemKey } from './layouts/Sidebar';
import { DashboardPage } from './pages/DashboardPage';
import { VPNLabPage } from './pages/VPNLabPage';
import { VPNConfigPage } from './pages/VPNConfigPage';
import { TrafficGeneratorPage } from './pages/TrafficGeneratorPage';
import { PacketCapturePage } from './pages/PacketCapturePage';
import { PacketAnalysisPage } from './pages/PacketAnalysisPage';
import { FeatureExtractionPage } from './pages/FeatureExtractionPage';
import { AIPredictionPage } from './pages/AIPredictionPage';
import { SecurityAssessmentPage } from './pages/SecurityAssessmentPage';
import { LogsPage } from './pages/LogsPage';
import { SettingsPage } from './pages/SettingsPage';
import { useVPN } from './hooks/useVPN';
import { usePackets } from './hooks/usePackets';

export function App() {
  const [currentTab, setCurrentTab] = useState<NavItemKey>('dashboard');
  const { status } = useVPN();
  const { captureStatus } = usePackets();

  const renderActivePage = () => {
    switch (currentTab) {
      case 'dashboard':
        return <DashboardPage onNavigate={(tab) => setCurrentTab(tab)} />;
      case 'vpn-lab':
        return <VPNLabPage />;
      case 'vpn-config':
        return <VPNConfigPage />;
      case 'traffic-gen':
        return <TrafficGeneratorPage />;
      case 'packet-capture':
        return (
          <PacketCapturePage
            onNavigateToAnalysis={() => setCurrentTab('packet-analysis')}
          />
        );
      case 'packet-analysis':
        return <PacketAnalysisPage />;
      case 'feature-extraction':
        return <FeatureExtractionPage />;
      case 'ai-prediction':
        return <AIPredictionPage />;
      case 'security-assessment':
        return <SecurityAssessmentPage />;
      case 'logs':
        return <LogsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage onNavigate={(tab) => setCurrentTab(tab)} />;
    }
  };

  return (
    <MainLayout
      currentTab={currentTab}
      onSelectTab={setCurrentTab}
      vpnStatusText={status?.activeTunnels ? 'IKE_SA + CHILD_SA Active' : 'Disconnected'}
      isVpnConnected={Boolean(status?.activeTunnels)}
      isCapturing={Boolean(captureStatus?.isCapturing)}
      captureInterface={captureStatus?.activeInterface || 'eth0'}
      labStatusText="Containers Online (4/4)"
    >
      {renderActivePage()}
    </MainLayout>
  );
}

export default App;
