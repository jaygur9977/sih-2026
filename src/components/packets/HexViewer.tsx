import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import type { Packet } from '../../types/packet';

interface HexViewerProps {
  packet: Packet | null;
}

export const HexViewer: React.FC<HexViewerProps> = ({ packet }) => {
  const [copied, setCopied] = useState(false);

  if (!packet) {
    return (
      <div className="flex h-48 items-center justify-center rounded-md border border-slate-800 bg-[#0a0d14] p-4 text-xs font-mono text-slate-500">
        Raw byte hex payload preview
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(packet.rawHexDump);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-md border border-slate-800 bg-[#0a0d14] p-3 text-xs font-mono">
      <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Packet Hex Stream
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
            Frame #{packet.frameNumber} ({packet.length} bytes)
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1 rounded bg-slate-800/80 hover:bg-slate-700 px-2 py-1 text-[11px] text-slate-300 transition-colors"
        >
          {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
          <span>{copied ? 'Copied' : 'Copy Hex'}</span>
        </button>
      </div>

      <pre className="overflow-x-auto text-[11px] leading-relaxed text-cyan-200/90 select-all font-mono">
        {packet.rawHexDump}
      </pre>
    </div>
  );
};
