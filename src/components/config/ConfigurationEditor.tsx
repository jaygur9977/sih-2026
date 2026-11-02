import React, { useState } from 'react';
import { Save, RefreshCw, FileText, CheckCircle2 } from 'lucide-react';
import type { VPNConfiguration } from '../../types/vpn';

interface ConfigurationEditorProps {
  configuration: VPNConfiguration;
  onSave: (updated: Partial<VPNConfiguration>) => Promise<VPNConfiguration>;
  onReset: () => void;
}

export const ConfigurationEditor: React.FC<ConfigurationEditorProps> = ({
  configuration,
  onSave,
  onReset,
}) => {
  const [ikeProposal, setIkeProposal] = useState(configuration.ikeProposal);
  const [espProposal, setEspProposal] = useState(configuration.espProposal);
  const [localSelector, setLocalSelector] = useState(configuration.localTrafficSelector);
  const [remoteSelector, setRemoteSelector] = useState(configuration.remoteTrafficSelector);
  const [preSharedKey, setPreSharedKey] = useState(configuration.preSharedKey || '');
  const [rawConfig, setRawConfig] = useState(configuration.rawConfig);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await onSave({
        ikeProposal,
        espProposal,
        localTrafficSelector: localSelector,
        remoteTrafficSelector: remoteSelector,
        preSharedKey,
        rawConfig,
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Parameters Panel */}
      <div className="rounded-lg border border-slate-800 bg-[#0f1422] p-5 shadow-lg">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
          <div>
            <h3 className="text-sm font-mono font-bold text-slate-100 uppercase tracking-wide">
              IPsec Security Association Policy Settings
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              strongSwan IKEv2 daemon cryptographic parameters and traffic selectors
            </p>
          </div>
          {configuration.isActive && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-800">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Active Lab Profile
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          {/* IKE Proposal */}
          <div>
            <label className="block text-slate-400 mb-1 font-semibold">
              IKE Proposal (Phase 1 SA)
            </label>
            <select
              value={ikeProposal}
              onChange={(e) => setIkeProposal(e.target.value)}
              className="w-full rounded bg-[#0a0d14] border border-slate-700 px-3 py-2 text-slate-200 focus:border-cyan-500 focus:outline-none"
            >
              {configuration.availableIkeProposals.map((prop) => (
                <option key={prop} value={prop}>
                  {prop} {prop === 'AES256-SHA256-MODP2048' ? '(Default Working)' : ''}
                </option>
              ))}
            </select>
            <span className="text-[11px] text-slate-500 mt-1 block">
              Default working: AES256-SHA256-MODP2048 (Diffie-Hellman Group 14)
            </span>
          </div>

          {/* ESP Proposal */}
          <div>
            <label className="block text-slate-400 mb-1 font-semibold">
              ESP Proposal (Phase 2 CHILD_SA)
            </label>
            <select
              value={espProposal}
              onChange={(e) => setEspProposal(e.target.value)}
              className="w-full rounded bg-[#0a0d14] border border-slate-700 px-3 py-2 text-slate-200 focus:border-cyan-500 focus:outline-none"
            >
              {configuration.availableEspProposals.map((prop) => (
                <option key={prop} value={prop}>
                  {prop} {prop === 'AES256-GCM16' ? '(Default Working AEAD)' : ''}
                </option>
              ))}
            </select>
            <span className="text-[11px] text-slate-500 mt-1 block">
              Default working: AES256-GCM16 (Authenticated Encryption AEAD)
            </span>
          </div>

          {/* Local Traffic Selector */}
          <div>
            <label className="block text-slate-400 mb-1 font-semibold">
              Client Traffic Selector (local_ts)
            </label>
            <input
              type="text"
              value={localSelector}
              onChange={(e) => setLocalSelector(e.target.value)}
              className="w-full rounded bg-[#0a0d14] border border-slate-700 px-3 py-2 text-slate-200 focus:border-cyan-500 focus:outline-none"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">
              Target client endpoint subnet: 10.10.0.10/32
            </span>
          </div>

          {/* Remote Traffic Selector */}
          <div>
            <label className="block text-slate-400 mb-1 font-semibold">
              Server Traffic Selector (remote_ts)
            </label>
            <input
              type="text"
              value={remoteSelector}
              onChange={(e) => setRemoteSelector(e.target.value)}
              className="w-full rounded bg-[#0a0d14] border border-slate-700 px-3 py-2 text-slate-200 focus:border-cyan-500 focus:outline-none"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">
              Target server endpoint subnet: 10.10.0.20/32
            </span>
          </div>

          {/* PSK Secret */}
          <div className="md:col-span-2">
            <label className="block text-slate-400 mb-1 font-semibold">
              Authentication: Pre-Shared Key (PSK)
            </label>
            <input
              type="password"
              value={preSharedKey}
              onChange={(e) => setPreSharedKey(e.target.value)}
              className="w-full rounded bg-[#0a0d14] border border-slate-700 px-3 py-2 text-slate-200 focus:border-cyan-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Raw swanctl.conf Editor Preview */}
      <div className="rounded-lg border border-slate-800 bg-[#0f1422] p-5 shadow-lg">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-cyan-400" />
            <span className="text-xs font-mono font-bold text-slate-200">
              /etc/swanctl/conf.d/ipsec-lab.conf (Raw Daemon Syntax)
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            Last Synced: {configuration.lastUpdated}
          </span>
        </div>

        <textarea
          value={rawConfig}
          onChange={(e) => setRawConfig(e.target.value)}
          rows={14}
          className="w-full rounded-md bg-[#06080e] border border-slate-800 p-3 font-mono text-xs text-cyan-300 leading-relaxed focus:border-cyan-500 focus:outline-none selection:bg-cyan-500/20"
        />

        {/* Action Controls */}
        <div className="mt-4 flex items-center justify-between pt-2 border-t border-slate-800">
          <div className="flex items-center gap-2">
            {saveSuccess && (
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                <CheckCircle2 className="h-4 w-4" /> Config saved successfully
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 rounded-md border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-mono text-slate-300 hover:bg-slate-700 transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Revert Defaults
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 rounded-md bg-cyan-600 hover:bg-cyan-500 px-4 py-1.5 text-xs font-mono font-medium text-white shadow transition-colors disabled:opacity-50"
            >
              <Save className="h-3.5 w-3.5" /> {isSaving ? 'Applying...' : 'Save Configuration'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
