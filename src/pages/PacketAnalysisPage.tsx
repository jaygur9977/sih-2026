import React, { useState } from 'react';
import { FileSearch, Filter, ShieldCheck } from 'lucide-react';
import { PacketTable } from '../components/packets/PacketTable';
import { PacketDetailViewer } from '../components/packets/PacketDetailViewer';
import { HexViewer } from '../components/packets/HexViewer';
import { usePackets } from '../hooks/usePackets';

export const PacketAnalysisPage: React.FC = () => {
  const { packets, selectedPacket, setSelectedPacket } = usePackets();
  const [protocolFilter, setProtocolFilter] = useState<string>('ALL');

  const filteredPackets = packets.filter((pkt) => {
    if (protocolFilter === 'ALL') return true;
    return pkt.protocol === protocolFilter;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-lg border border-slate-800 bg-[#0f1422] p-5 shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold font-mono text-white">
              TShark Packet Dissector & Protocol Inspector
            </h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              Wireshark Dissection Tree
            </span>
          </div>
          <p className="mt-1 text-xs font-mono text-slate-400">
            Visualizing backend TShark-parsed frame layers, ESP Security Parameter Indexes, and hex bytes.
          </p>
        </div>

        {/* Quick Protocol Filter Tabs */}
        <div className="flex items-center gap-1 rounded-md bg-[#0a0d14] p-1 border border-slate-800 text-xs font-mono">
          <Filter className="h-3.5 w-3.5 text-slate-500 ml-1 mr-0.5" />
          {['ALL', 'ESP', 'IKEv2', 'TCP', 'UDP'].map((proto) => (
            <button
              key={proto}
              onClick={() => setProtocolFilter(proto)}
              className={`rounded px-2.5 py-1 transition-colors ${
                protocolFilter === proto
                  ? 'bg-cyan-600 text-white font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {proto}
            </button>
          ))}
        </div>
      </div>

      {/* Top Pane: Packet List Table */}
      <div className="rounded-lg border border-slate-800 bg-[#0f1422] p-4 shadow-lg">
        <div className="flex items-center justify-between pb-2 mb-2 text-xs font-mono text-slate-400">
          <span className="font-bold uppercase tracking-wider text-slate-300">
            Packet Stream ({filteredPackets.length} captured frames)
          </span>
          <span className="text-[11px] text-slate-500">
            Click frame row to dissect header layers
          </span>
        </div>

        <PacketTable
          packets={filteredPackets}
          selectedPacket={selectedPacket}
          onSelectPacket={setSelectedPacket}
        />
      </div>

      {/* Bottom Panes: Dissection Layer Tree + Raw Hex Dump */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: TShark Parsed Layer Dissection Tree */}
        <div className="rounded-lg border border-slate-800 bg-[#0f1422] p-4 shadow-lg space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs font-mono">
            <div className="flex items-center gap-2">
              <FileSearch className="h-4 w-4 text-cyan-400" />
              <span className="font-bold text-slate-200">
                Dissected Protocol Fields (TShark JSON)
              </span>
            </div>
            {selectedPacket?.isEncryptedPayload && (
              <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" /> Encapsulated ESP
              </span>
            )}
          </div>

          <PacketDetailViewer packet={selectedPacket} />
        </div>

        {/* Right: Raw 16-Byte Hex Dump & ASCII */}
        <div className="rounded-lg border border-slate-800 bg-[#0f1422] p-4 shadow-lg space-y-2">
          <HexViewer packet={selectedPacket} />
        </div>
      </div>
    </div>
  );
};
