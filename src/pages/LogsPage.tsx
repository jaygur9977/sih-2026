import React from 'react';
import { Download } from 'lucide-react';
import { LogViewer } from '../components/logs/LogViewer';
import { useLogs } from '../hooks/useLogs';

export const LogsPage: React.FC = () => {
  const { logs, clearLogs } = useLogs();

  const handleExport = () => {
    const jsonStr = JSON.stringify(logs, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ipsec_soc_logs_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-lg border border-slate-800 bg-[#0f1422] p-5 shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold font-mono text-white">
              System Audit & Daemon Logging Console
            </h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
              strongSwan 5.9 // charon
            </span>
          </div>
          <p className="mt-1 text-xs font-mono text-slate-400">
            Unified telemetry stream for strongSwan IKE exchanges, kernel XFRM states, and tcpdump packet events.
          </p>
        </div>

        <button
          onClick={handleExport}
          className="inline-flex items-center gap-1.5 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3.5 py-1.5 text-xs font-mono font-medium text-slate-200 transition-colors"
        >
          <Download className="h-3.5 w-3.5" /> Export Log JSON
        </button>
      </div>

      <LogViewer logs={logs} onClear={clearLogs} maxHeight="max-h-[620px]" />
    </div>
  );
};
