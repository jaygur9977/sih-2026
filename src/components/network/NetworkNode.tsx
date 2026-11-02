import React from 'react';
import { Cpu, HardDrive, Server, ShieldCheck, Activity, Radio } from 'lucide-react';
import type { LabNode } from '../../types/vpn';
import { StatusBadge } from '../common/StatusBadge';

interface NetworkNodeProps {
  node: LabNode;
  isSelected?: boolean;
  onClick?: () => void;
}

export const NetworkNode: React.FC<NetworkNodeProps> = ({ node, isSelected, onClick }) => {
  const getRoleIcon = () => {
    switch (node.role) {
      case 'client':
        return <ShieldCheck className="h-5 w-5 text-blue-600" />;
      case 'server':
        return <Server className="h-5 w-5 text-emerald-600" />;
      case 'generator':
        return <Activity className="h-5 w-5 text-amber-600" />;
      case 'tap':
        return <Radio className="h-5 w-5 text-slate-600" />;
      default:
        return <Server className="h-5 w-5 text-slate-600" />;
    }
  };

  const getBorderColor = () => {
    if (isSelected) return 'border-blue-500 ring-2 ring-blue-100 bg-blue-50/20';
    return 'border-slate-200 hover:border-slate-300 bg-white';
  };

  return (
    <div
      onClick={onClick}
      className={`relative w-72 cursor-pointer rounded-lg border p-4 shadow-sm transition-all ${getBorderColor()}`}
    >
      {/* Top Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="rounded-lg bg-slate-50 p-2 border border-slate-200">
            {getRoleIcon()}
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">{node.name}</h4>
            <span className="text-[11px] text-slate-500 capitalize">
              {node.role} {node.isOptionalMonitor && '(Passive Sensor)'}
            </span>
          </div>
        </div>
        <StatusBadge
          status={node.containerState === 'running' ? 'ONLINE' : 'OFFLINE'}
          size="sm"
          showPulse={false}
        />
      </div>

      {/* IP addresses */}
      <div className="mt-3 space-y-1 rounded bg-slate-50 p-2 font-mono text-xs border border-slate-200">
        <div className="flex items-center justify-between text-slate-700">
          <span className="text-slate-500 text-[10px] uppercase font-sans">IPv4:</span>
          <span className="font-semibold text-blue-700">{node.ipv4}</span>
        </div>
        <div className="flex items-center justify-between text-slate-600 text-[11px]">
          <span className="text-slate-500 text-[10px] uppercase font-sans">IPv6:</span>
          <span className="truncate max-w-[170px]" title={node.ipv6}>{node.ipv6}</span>
        </div>
      </div>

      {/* Telemetry Footer */}
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-500 pt-2 border-t border-slate-100 font-sans">
        <div className="flex items-center gap-1.5">
          <Cpu className="h-3.5 w-3.5 text-slate-400" />
          <span>CPU {node.cpuPercent}%</span>
        </div>
        <div className="flex items-center gap-1.5 justify-end">
          <HardDrive className="h-3.5 w-3.5 text-slate-400" />
          <span>{node.memoryUsageMb} MB</span>
        </div>
      </div>
    </div>
  );
};
