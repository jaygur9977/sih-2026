import React, { useState } from 'react';
import { TopBar } from './TopBar';
import { Sidebar, type NavItemKey } from './Sidebar';

interface MainLayoutProps {
  currentTab: NavItemKey;
  onSelectTab: (tab: NavItemKey) => void;
  vpnStatusText: string;
  isVpnConnected: boolean;
  isCapturing: boolean;
  captureInterface?: string;
  labStatusText: string;
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  currentTab,
  onSelectTab,
  vpnStatusText,
  isVpnConnected,
  isCapturing,
  captureInterface,
  labStatusText,
  children,
}) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0d14] text-slate-100 flex flex-col font-sans">
      <TopBar
        vpnStatusText={vpnStatusText}
        isVpnConnected={isVpnConnected}
        isCapturing={isCapturing}
        captureInterface={captureInterface}
        labStatusText={labStatusText}
        onToggleSidebar={() => setIsMobileNavOpen(!isMobileNavOpen)}
      />

      <div className="flex flex-1">
        <Sidebar
          currentTab={currentTab}
          onSelectTab={onSelectTab}
          isOpenMobile={isMobileNavOpen}
          onCloseMobile={() => setIsMobileNavOpen(false)}
        />

        <main className="flex-1 overflow-x-hidden p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
};
