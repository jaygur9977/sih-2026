import React, { useState } from 'react';
import { ChevronDown, ChevronRight, ShieldCheck } from 'lucide-react';
import type { Packet } from '../../types/packet';

interface PacketDetailViewerProps {
  packet: Packet | null;
}

export const PacketDetailViewer: React.FC<PacketDetailViewerProps> = ({ packet }) => {
  // Store expanded state per layer index
  const [expandedLayers, setExpandedLayers] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: true,
    3: true,
  });

  if (!packet) {
    return (
      <div className="flex h-48 items-center justify-center rounded-md border border-slate-800 bg-[#0a0d14] p-4 text-xs font-mono text-slate-500">
        Select a packet above to inspect TShark parsed protocol dissection
      </div>
    );
  }

  const toggleLayer = (index: number) => {
    setExpandedLayers((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="overflow-y-auto max-h-72 rounded-md border border-slate-800 bg-[#0a0d14] p-2 text-xs font-mono">
      <div className="space-y-1">
        {packet.layers.map((layer, idx) => {
          const isExpanded = expandedLayers[idx] ?? false;
          return (
            <div key={idx} className="rounded border border-slate-800/80 bg-[#0f1422]">
              {/* Layer Header */}
              <button
                onClick={() => toggleLayer(idx)}
                className="flex w-full items-center gap-1.5 px-2.5 py-1.5 text-left font-medium text-slate-200 hover:bg-slate-800/50 transition-colors"
              >
                {isExpanded ? (
                  <ChevronDown className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                ) : (
                  <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                )}
                <span className="truncate">{layer.layerName}</span>
                {layer.layerName.includes('Encapsulating Security Payload') && (
                  <span className="ml-auto inline-flex items-center gap-1 text-[10px] text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/60">
                    <ShieldCheck className="h-3 w-3" /> Encrypted Transform
                  </span>
                )}
              </button>

              {/* Layer Fields */}
              {isExpanded && (
                <div className="px-5 py-2 space-y-1 border-t border-slate-800/60 bg-[#0a0d14]/40">
                  {layer.summary && (
                    <div className="text-[11px] text-slate-400 italic mb-1.5">
                      {layer.summary}
                    </div>
                  )}
                  {layer.fields.map((f, fIdx) => (
                    <div key={fIdx} className="flex items-baseline justify-between text-[11px] py-0.5">
                      <span className="text-slate-400 font-normal">{f.name}:</span>
                      <span className="text-cyan-300 font-semibold text-right max-w-sm truncate" title={String(f.value)}>
                        {String(f.value)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
