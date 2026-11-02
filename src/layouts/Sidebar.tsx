import React from 'react';
import {
  LayoutDashboard,
  Network,
  Sliders,
  Zap,
  Radio,
  FileSearch,
  Binary,
  BrainCircuit,
  ShieldAlert,
  ScrollText,
  Settings as SettingsIcon,
} from 'lucide-react';

export type NavItemKey =
  | 'dashboard'
  | 'vpn-lab'
  | 'vpn-config'
  | 'traffic-gen'
  | 'packet-capture'
  | 'packet-analysis'
  | 'feature-extraction'
  | 'ai-prediction'
  | 'security-assessment'
  | 'logs'
  | 'settings';

interface SidebarProps {
  currentTab: NavItemKey;
  onSelectTab: (tab: NavItemKey) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

interface NavItemConfig {
  key: NavItemKey;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeColor?: string;
}

const NAV_ITEMS: NavItemConfig[] = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'vpn-lab', label: 'VPN Lab', icon: Network, badge: '4 Nodes', badgeColor: 'bg-blue-950 text-blue-300 border-blue-800' },
  { key: 'vpn-config', label: 'VPN Configuration', icon: Sliders },
  { key: 'traffic-gen', label: 'Traffic Generator', icon: Zap },
  { key: 'packet-capture', label: 'Packet Capture', icon: Radio, badge: 'LIVE', badgeColor: 'bg-cyan-950 text-cyan-300 border-cyan-800' },
  { key: 'packet-analysis', label: 'Packet Analysis', icon: FileSearch },
  { key: 'feature-extraction', label: 'Feature Extraction', icon: Binary },
  { key: 'ai-prediction', label: 'AI Prediction', icon: BrainCircuit, badge: '97%', badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800' },
  { key: 'security-assessment', label: 'Security Assessment', icon: ShieldAlert, badge: 'A', badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800' },
  { key: 'logs', label: 'Logs', icon: ScrollText },
  { key: 'settings', label: 'Settings', icon: SettingsIcon },
];

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
        />
      )}

      <aside
        className={`fixed md:sticky top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto border-r border-slate-800 bg-[#0a0d14] p-3 transition-transform duration-200 md:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-2 px-3 py-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
          Navigation Control
        </div>

        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.key;
            return (
              <button
                key={item.key}
                onClick={() => {
                  onSelectTab(item.key);
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`group flex w-full items-center justify-between rounded-md px-3 py-2 text-xs font-mono font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-950/40 text-cyan-300 border border-cyan-800/80 shadow-sm shadow-cyan-500/10'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`h-4 w-4 transition-colors ${
                      isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-mono border ${
                      item.badgeColor || 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Lab Quick Status */}
        <div className="mt-8 rounded-lg border border-slate-800/80 bg-[#0f1422] p-3 font-mono text-[11px]">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="font-bold text-slate-300">DOCKER VPN LAB</span>
            <span className="text-emerald-400 font-bold">ONLINE</span>
          </div>
          <div className="space-y-1 text-slate-400 text-[10px]">
            <div>• vpn-client (10.10.0.10)</div>
            <div>• vpn-server (10.10.0.20)</div>
            <div>• traffic-gen (10.10.0.30)</div>
            <div>• passive-tap (Sensor)</div>
          </div>
          <div className="mt-2.5 pt-2 border-t border-slate-800 text-[10px] text-slate-500 flex items-center justify-between">
            <span>Protocol: IKEv2</span>
            <span className="text-cyan-400 font-semibold">AES256-GCM16</span>
          </div>
        </div>
      </aside>
    </>
  );
};
