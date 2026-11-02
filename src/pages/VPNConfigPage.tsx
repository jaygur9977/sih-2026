import React from 'react';
import { Sliders, Shield } from 'lucide-react';
import { ConfigurationEditor } from '../components/config/ConfigurationEditor';
import { useVPN } from '../hooks/useVPN';
import { WORKING_VPN_CONFIGURATION } from '../utils/constants';

export const VPNConfigPage: React.FC = () => {
  const { configuration, updateConfig } = useVPN();

  if (!configuration) {
    return (
      <div className="flex h-64 items-center justify-center font-mono text-xs text-slate-500">
        Loading strongSwan daemon configuration...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-slate-800 bg-[#0f1422] p-5 shadow-lg">
        <div className="flex items-center gap-2.5">
          <div className="rounded-md bg-cyan-500/10 p-2 text-cyan-400 border border-cyan-500/30">
            <Sliders className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold font-mono text-white">
              VPN Cryptographic & Proposal Configuration
            </h2>
            <p className="text-xs font-mono text-slate-400">
              Manage strongSwan <code className="text-cyan-300">swanctl.conf</code> IKEv2 proposals, ESP ciphers, and traffic selectors.
            </p>
          </div>
        </div>

        {/* Working config notice */}
        <div className="mt-4 flex items-start gap-2.5 rounded-md border border-cyan-800/60 bg-cyan-950/20 p-3 text-xs font-mono text-cyan-300">
          <Shield className="h-4 w-4 shrink-0 text-cyan-400 mt-0.5" />
          <div>
            <span className="font-bold">Active Working Configuration Preserved:</span>
            <div className="text-slate-300 mt-0.5">
              IKEv2 Proposal: <strong className="text-white">AES256-SHA256-MODP2048</strong> &bull;
              ESP Proposal: <strong className="text-white">AES256-GCM16</strong> &bull;
              Auth: <strong className="text-white">PSK</strong> &bull;
              Traffic Selectors: <strong className="text-white">10.10.0.10/32 &harr; 10.10.0.20/32</strong>
            </div>
          </div>
        </div>
      </div>

      <ConfigurationEditor
        configuration={configuration}
        onSave={updateConfig}
        onReset={() => updateConfig(WORKING_VPN_CONFIGURATION)}
      />
    </div>
  );
};
