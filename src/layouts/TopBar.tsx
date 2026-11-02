import React from 'react';
import {
  Shield,
  Radio,
  Server,
  Bell,
  User,
  Activity,
  Menu,
} from 'lucide-react';
import { APP_NAME } from '../utils/constants';

interface TopBarProps {
  vpnStatusText: string;
  isVpnConnected: boolean;
  isCapturing: boolean;
  captureInterface?: string;
  labStatusText: string;
  onToggleSidebar?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  vpnStatusText,
  isVpnConnected,
  isCapturing,
  captureInterface = 'eth0',
  labStatusText,
  onToggleSidebar,
}) => {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-800 bg-[#0a0d14]/95 px-4 backdrop-blur-md">
      {/* Left: Mobile Toggle & Brand */}
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-1.5 text-slate-400 hover:text-slate-200"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}
        <div className="flex items-center gap-2.5">
          <div className="rounded-md bg-gradient-to-br from-cyan-500 to-blue-600 p-2 text-slate-950 shadow-md shadow-cyan-500/20">
            <Shield className="h-5 w-5 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-sm font-bold font-mono tracking-tight text-white flex items-center gap-2">
              <span>{APP_NAME}</span>
            </h1>
            <p className="text-[10px] font-mono text-slate-400 hidden sm:block">
              Docker VPN Lab // strongSwan 5.9 // TShark Dissector & ML Engine
            </p>
          </div>
        </div>
      </div>

      {/* Right: SOC Status Telemetry Indicators & Profile */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* VPN Connection State */}
        <div className="hidden lg:flex items-center gap-2 rounded-md border border-slate-800 bg-[#0f1422] px-3 py-1 text-xs font-mono">
          <Activity className="h-3.5 w-3.5 text-slate-400" />
          <span className="text-slate-400">VPN:</span>
          <span
            className={`flex items-center gap-1 font-bold ${
              isVpnConnected ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                isVpnConnected ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'
              }`}
            />
            {vpnStatusText}
          </span>
        </div>

        {/* Capture Engine Status */}
        <div className="hidden md:flex items-center gap-2 rounded-md border border-slate-800 bg-[#0f1422] px-3 py-1 text-xs font-mono">
          <Radio className={`h-3.5 w-3.5 ${isCapturing ? 'text-cyan-400 animate-pulse' : 'text-slate-500'}`} />
          <span className="text-slate-400">Capture:</span>
          <span className={isCapturing ? 'text-cyan-300 font-bold' : 'text-slate-500'}>
            {isCapturing ? `Active (${captureInterface})` : 'Idle'}
          </span>
        </div>

        {/* Docker Lab Status */}
        <div className="hidden xl:flex items-center gap-2 rounded-md border border-slate-800 bg-[#0f1422] px-3 py-1 text-xs font-mono">
          <Server className="h-3.5 w-3.5 text-blue-400" />
          <span className="text-slate-400">Lab:</span>
          <span className="text-blue-300 font-semibold">{labStatusText}</span>
        </div>

        {/* Notifications */}
        <button
          title="Notifications"
          className="relative rounded-md border border-slate-800 bg-[#0f1422] p-2 text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-colors"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-cyan-400 ring-2 ring-[#0a0d14]" />
        </button>

        {/* User / SOC Analyst profile */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
          <div className="rounded-full bg-slate-800 border border-slate-700 p-1.5 text-cyan-400">
            <User className="h-4 w-4" />
          </div>
          <div className="hidden sm:block text-left font-mono">
            <div className="text-xs font-bold text-slate-200 leading-tight">SOC Analyst</div>
            <div className="text-[10px] text-cyan-400 leading-tight">SecOps Tier-3</div>
          </div>
        </div>
      </div>
    </header>
  );
};
