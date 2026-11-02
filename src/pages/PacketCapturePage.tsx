import React, { useState } from 'react';
import { Radio, Play, Square, Filter, HardDrive, Archive } from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';
import { FileCard } from '../components/common/FileCard';
import { usePackets } from '../hooks/usePackets';
import type { PCAPFile } from '../types/packet';
import { formatBytes } from '../utils/formatters';

interface PacketCapturePageProps {
  onNavigateToAnalysis: (file?: PCAPFile) => void;
}

export const PacketCapturePage: React.FC<PacketCapturePageProps> = ({
  onNavigateToAnalysis,
}) => {
  const { captureStatus, pcapFiles, startCapture, stopCapture } = usePackets();

  const [selectedInterface, setSelectedInterface] = useState('eth0');
  const [bpfFilter, setBpfFilter] = useState('esp or udp port 500 or udp port 4500');
  const [isToggling, setIsToggling] = useState(false);

  const handleToggleCapture = async () => {
    try {
      setIsToggling(true);
      if (captureStatus?.isCapturing) {
        await stopCapture();
      } else {
        await startCapture(selectedInterface, bpfFilter);
      }
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-lg border border-slate-800 bg-[#0f1422] p-5 shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold font-mono text-white">
              Packet Capture Engine (tcpdump / Linux XFRM)
            </h2>
            <StatusBadge
              status={captureStatus?.isCapturing ? 'CAPTURING' : 'STOPPED'}
              size="sm"
            />
          </div>
          <p className="mt-1 text-xs font-mono text-slate-400">
            Real-time interface packet sniffing on bridge network <code>vpn-net</code>.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div>
            <span className="text-slate-500 block text-[10px]">CAPTURED PACKETS</span>
            <span className="text-cyan-400 font-bold text-base">
              {captureStatus?.capturedPacketsCount.toLocaleString() || 0}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">BUFFER VOLUME</span>
            <span className="text-blue-400 font-bold text-base">
              {formatBytes(captureStatus?.capturedBytes || 0)}
            </span>
          </div>
        </div>
      </div>

      {/* Capture Controls Card */}
      <div className="rounded-lg border border-slate-800 bg-[#0f1422] p-5 shadow-lg">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800 mb-4">
          <Radio className="h-4 w-4 text-cyan-400" />
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
            Capture Parameters & Ring Buffer
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          <div>
            <label className="block text-slate-400 mb-1">Target Network Interface</label>
            <select
              value={selectedInterface}
              onChange={(e) => setSelectedInterface(e.target.value)}
              disabled={captureStatus?.isCapturing}
              className="w-full rounded bg-[#0a0d14] border border-slate-700 px-3 py-1.5 text-slate-200 focus:border-cyan-500 focus:outline-none disabled:opacity-50"
            >
              <option value="eth0">eth0 (Docker Default Bridge)</option>
              <option value="xfrm0">xfrm0 (Kernel Virtual IPsec Interface)</option>
              <option value="docker0">docker0 (Host Daemon Bridge)</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-slate-400 mb-1">BPF Capture Filter Expression</label>
            <div className="relative">
              <Filter className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
              <input
                type="text"
                value={bpfFilter}
                onChange={(e) => setBpfFilter(e.target.value)}
                disabled={captureStatus?.isCapturing}
                placeholder="e.g., esp or udp port 500 or udp port 4500"
                className="w-full rounded bg-[#0a0d14] border border-slate-700 pl-8 pr-3 py-1.5 text-slate-200 focus:border-cyan-500 focus:outline-none disabled:opacity-50"
              />
            </div>
          </div>
        </div>

        {/* Ring Buffer Status Bar */}
        <div className="mt-4 pt-3 border-t border-slate-800/80">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
            <span className="flex items-center gap-1.5">
              <HardDrive className="h-3.5 w-3.5 text-slate-500" /> Kernel Ring Buffer Usage
            </span>
            <span className="text-cyan-400 font-bold">{captureStatus?.bufferUsagePercent || 0}%</span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
              style={{ width: `${captureStatus?.bufferUsagePercent || 0}%` }}
            />
          </div>
        </div>

        {/* Action Trigger Button */}
        <div className="mt-5 flex justify-end">
          <button
            onClick={handleToggleCapture}
            disabled={isToggling}
            className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-xs font-mono font-bold shadow transition-colors ${
              captureStatus?.isCapturing
                ? 'bg-rose-700 hover:bg-rose-600 text-white'
                : 'bg-cyan-600 hover:bg-cyan-500 text-white'
            }`}
          >
            {captureStatus?.isCapturing ? (
              <>
                <Square className="h-4 w-4" /> Stop Capture & Generate PCAP
              </>
            ) : (
              <>
                <Play className="h-4 w-4" /> Start tcpdump Sniffer
              </>
            )}
          </button>
        </div>
      </div>

      {/* PCAP Archive Files List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Archive className="h-4 w-4 text-cyan-400" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              Recorded PCAP Archives ({pcapFiles.length})
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-500">
            Stored for offline dissection & ML training
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pcapFiles.map((file) => (
            <FileCard
              key={file.id}
              file={file}
              onAnalyze={() => onNavigateToAnalysis(file)}
              onDownload={(f) => alert(`Download started for ${f.filename}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
