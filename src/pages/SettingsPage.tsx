import React, { useState } from 'react';
import { Settings as SettingsIcon, Server, Database, CheckCircle2 } from 'lucide-react';
import { apiClient } from '../api/client';

export const SettingsPage: React.FC = () => {
  const currentCfg = apiClient.getConfig();
  const [baseUrl, setBaseUrl] = useState(currentCfg.baseUrl);
  const [useMock, setUseMock] = useState(currentCfg.useMock);
  const [timeoutMs, setTimeoutMs] = useState(currentCfg.timeoutMs);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    apiClient.setConfig({
      baseUrl,
      useMock,
      timeoutMs,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-lg border border-slate-800 bg-[#0f1422] p-5 shadow-lg">
        <div className="flex items-center gap-2.5">
          <div className="rounded-md bg-cyan-500/10 p-2 text-cyan-400 border border-cyan-500/30">
            <SettingsIcon className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold font-mono text-white">
              Platform & Backend Integration Settings
            </h2>
            <p className="text-xs font-mono text-slate-400">
              Configure backend REST endpoint parameters and switch between realistic mock data and real Docker daemons.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Backend API Connection Config */}
        <div className="rounded-lg border border-slate-800 bg-[#0f1422] p-5 shadow-lg space-y-4 text-xs font-mono">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Server className="h-4 w-4 text-cyan-400" />
            <h3 className="font-bold uppercase tracking-wider text-slate-200">
              Future REST API Backend Configuration
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1 font-semibold">
                Backend API Base URL
              </label>
              <input
                type="text"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                placeholder="http://localhost:8000"
                className="w-full rounded bg-[#0a0d14] border border-slate-700 px-3 py-2 text-slate-200 focus:border-cyan-500 focus:outline-none"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Docker/Linux bridging service endpoint in WSL
              </span>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-semibold">
                HTTP Request Timeout (ms)
              </label>
              <input
                type="number"
                value={timeoutMs}
                onChange={(e) => setTimeoutMs(Number(e.target.value))}
                className="w-full rounded bg-[#0a0d14] border border-slate-700 px-3 py-2 text-slate-200 focus:border-cyan-500 focus:outline-none"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Default: 8000ms before falling back to simulation
              </span>
            </div>
          </div>

          {/* Mode Switch Toggle */}
          <div className="flex items-center justify-between rounded-md border border-slate-800 bg-[#0a0d14] p-4">
            <div>
              <h4 className="font-bold text-slate-200">Data Source Mode</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {useMock
                  ? 'Currently operating in Realistic Mock Mode (zero external backend required).'
                  : 'Targeting live Docker container REST API endpoints.'}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={useMock}
                onChange={(e) => setUseMock(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
              <span className="ml-3 text-xs font-mono font-medium text-slate-300">
                {useMock ? 'Mock Active' : 'Live API'}
              </span>
            </label>
          </div>
        </div>

        {/* Docker Lab Reference Parameters */}
        <div className="rounded-lg border border-slate-800 bg-[#0f1422] p-5 shadow-lg space-y-4 text-xs font-mono">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Database className="h-4 w-4 text-blue-400" />
            <h3 className="font-bold uppercase tracking-wider text-slate-200">
              Docker Network Presets (Read-Only)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded bg-[#0a0d14] p-3 border border-slate-800">
              <span className="text-slate-500 block text-[10px]">VPN CLIENT CONTAINER</span>
              <span className="text-cyan-400 font-bold">vpn-client</span>
              <span className="text-slate-400 block text-[11px] mt-0.5">10.10.0.10 // fd00:10:10::10</span>
            </div>

            <div className="rounded bg-[#0a0d14] p-3 border border-slate-800">
              <span className="text-slate-500 block text-[10px]">VPN SERVER CONTAINER</span>
              <span className="text-blue-400 font-bold">vpn-server</span>
              <span className="text-slate-400 block text-[11px] mt-0.5">10.10.0.20 // fd00:10:10::20</span>
            </div>

            <div className="rounded bg-[#0a0d14] p-3 border border-slate-800">
              <span className="text-slate-500 block text-[10px]">TRAFFIC GENERATOR CONTAINER</span>
              <span className="text-amber-400 font-bold">traffic-generator</span>
              <span className="text-slate-400 block text-[11px] mt-0.5">10.10.0.30 // fd00:10:10::30</span>
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="flex items-center justify-between">
          <div>
            {savedSuccess && (
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                <CheckCircle2 className="h-4 w-4" /> Settings applied successfully
              </span>
            )}
          </div>
          <button
            type="submit"
            className="rounded-md bg-cyan-600 hover:bg-cyan-500 px-4 py-2 text-xs font-mono font-bold text-white shadow transition-colors"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};
