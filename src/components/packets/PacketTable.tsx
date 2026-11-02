import React from 'react';
import type { Packet } from '../../types/packet';

interface PacketTableProps {
  packets: Packet[];
  selectedPacket: Packet | null;
  onSelectPacket: (packet: Packet) => void;
}

export const PacketTable: React.FC<PacketTableProps> = ({
  packets,
  selectedPacket,
  onSelectPacket,
}) => {
  const getProtocolColor = (proto: Packet['protocol']) => {
    switch (proto) {
      case 'ESP':
        return 'text-cyan-400 bg-cyan-950/40 border-cyan-800/60';
      case 'IKEv2':
        return 'text-blue-400 bg-blue-950/40 border-blue-800/60';
      case 'TCP':
        return 'text-emerald-400 bg-emerald-950/40 border-emerald-800/60';
      case 'UDP':
        return 'text-amber-400 bg-amber-950/40 border-amber-800/60';
      default:
        return 'text-slate-400 bg-slate-800 border-slate-700';
    }
  };

  return (
    <div className="overflow-x-auto rounded-md border border-slate-800 bg-[#0a0d14] max-h-72 select-none">
      <table className="w-full text-left text-xs font-mono">
        <thead className="sticky top-0 z-10 bg-[#0f1422] border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[11px]">
          <tr>
            <th className="px-2.5 py-2 w-14">No.</th>
            <th className="px-2.5 py-2 w-24">Time</th>
            <th className="px-2.5 py-2 w-32">Source</th>
            <th className="px-2.5 py-2 w-32">Destination</th>
            <th className="px-2.5 py-2 w-20">Protocol</th>
            <th className="px-2.5 py-2 w-16 text-right">Length</th>
            <th className="px-2.5 py-2 w-28">ESP SPI</th>
            <th className="px-2.5 py-2">Info</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/50">
          {packets.map((pkt) => {
            const isSelected = selectedPacket?.id === pkt.id;
            return (
              <tr
                key={pkt.id}
                onClick={() => onSelectPacket(pkt)}
                className={`cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-cyan-950/50 border-l-4 border-l-cyan-400 text-white font-medium'
                    : 'hover:bg-slate-800/40 text-slate-300'
                }`}
              >
                <td className="px-2.5 py-1.5 text-slate-400">{pkt.frameNumber}</td>
                <td className="px-2.5 py-1.5 text-slate-400">{pkt.relativeTime.toFixed(5)}</td>
                <td className="px-2.5 py-1.5 text-cyan-300/90">{pkt.sourceIp}</td>
                <td className="px-2.5 py-1.5 text-blue-300/90">{pkt.destinationIp}</td>
                <td className="px-2.5 py-1.5">
                  <span
                    className={`inline-block px-1.5 py-0.5 text-[10px] font-bold rounded border ${getProtocolColor(
                      pkt.protocol
                    )}`}
                  >
                    {pkt.protocol}
                  </span>
                </td>
                <td className="px-2.5 py-1.5 text-right text-slate-400">{pkt.length}</td>
                <td className="px-2.5 py-1.5 text-cyan-400 font-mono text-[11px]">
                  {pkt.spi || '-'}
                </td>
                <td className="px-2.5 py-1.5 truncate max-w-xs text-slate-300 text-[11px]" title={pkt.info}>
                  {pkt.info}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
