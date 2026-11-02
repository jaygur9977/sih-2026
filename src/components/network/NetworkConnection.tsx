import React from 'react';
import { Lock, Shield, ArrowRightLeft } from 'lucide-react';
import type { VPNConnection } from '../../types/vpn';

interface NetworkConnectionProps {
  connection?: VPNConnection;
  isEncrypted?: boolean;
  label?: string;
  sourceName: string;
  targetName: string;
  bytesTransferred?: string;
}

export const NetworkConnection: React.FC<NetworkConnectionProps> = ({
  connection,
  isEncrypted = true,
  label,
  sourceName,
  targetName,
  bytesTransferred,
}) => {
  return (
    <div className="relative flex flex-col items-center justify-center p-3 rounded-lg border border-slate-200 bg-slate-50/70">
      {/* Endpoints label */}
      <div className="w-full flex items-center justify-between text-xs text-slate-600 mb-2 font-medium">
        <span className="text-blue-700">{sourceName}</span>
        <div className="flex items-center gap-1 text-slate-400">
          <ArrowRightLeft className="h-3.5 w-3.5" />
          <span>Bi-directional SA</span>
        </div>
        <span className="text-emerald-700">{targetName}</span>
      </div>

      <div className="relative w-full h-8 flex items-center justify-center">
        {/* Simple clean connector line */}
        <div className="absolute inset-x-0 h-0.5 bg-blue-300" />

        {/* Center security pill */}
        <div className="relative z-10 flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-200 bg-white shadow-xs text-xs">
          {isEncrypted ? (
            <>
              <Lock className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-slate-800 font-semibold">IPsec ESP Tunnel</span>
              <span className="text-slate-300">|</span>
              <span className="text-blue-600 font-mono text-[11px]">
                {connection ? connection.espProposal : 'AES256-GCM16'}
              </span>
            </>
          ) : (
            <>
              <Shield className="h-3.5 w-3.5 text-amber-600" />
              <span className="text-amber-800 font-medium">{label || 'Unencrypted Link'}</span>
            </>
          )}
        </div>
      </div>

      {connection && (
        <div className="mt-2 flex items-center justify-center gap-4 text-xs font-mono text-slate-600">
          <span>
            SPI In: <strong className="text-slate-800">{connection.spiIn}</strong>
          </span>
          <span>
            SPI Out: <strong className="text-slate-800">{connection.spiOut}</strong>
          </span>
          {bytesTransferred && (
            <span>
              Total: <strong className="text-blue-700">{bytesTransferred}</strong>
            </span>
          )}
        </div>
      )}
    </div>
  );
};
