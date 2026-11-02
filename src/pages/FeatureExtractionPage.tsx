import React, { useState } from 'react';
import { Binary, Eye, Info } from 'lucide-react';
import { ChartCard } from '../charts/ChartCard';
import { PacketSizeDistributionChart } from '../charts/PacketSizeDistributionChart';
import { useAI } from '../hooks/useAI';
import type { FeatureVector } from '../types/ai';

export const FeatureExtractionPage: React.FC = () => {
  const { features } = useAI();
  const [selectedFlow, setSelectedFlow] = useState<FeatureVector | null>(features[0] || null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-lg border border-slate-800 bg-[#0f1422] p-5 shadow-lg">
        <div className="flex items-center gap-2.5">
          <div className="rounded-md bg-cyan-500/10 p-2 text-cyan-400 border border-cyan-500/30">
            <Binary className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold font-mono text-white">
              Encrypted Flow Statistical Feature Extraction
            </h2>
            <p className="text-xs font-mono text-slate-400">
              Deriving 32-dimensional behavioral features from encrypted IPsec ESP flows without payload decryption.
            </p>
          </div>
        </div>

        {/* Informational banner */}
        <div className="mt-4 flex items-start gap-2.5 rounded-md border border-cyan-800/60 bg-cyan-950/20 p-3 text-xs font-mono text-cyan-300">
          <Info className="h-4 w-4 shrink-0 text-cyan-400 mt-0.5" />
          <div>
            <span className="font-bold">Cryptographic Preserving Analysis:</span>
            <div className="text-slate-300 mt-0.5">
              Because AES-256-GCM ciphertext exhibits near-maximal Shannon entropy (~7.9+ bits/byte), the AI engine leverages packet length sequences, inter-arrival timing (IAT), burstiness, and bidirectional flow ratios to fingerprint services.
            </div>
          </div>
        </div>
      </div>

      {/* Feature Table + Histogram */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Features Table */}
        <div className="lg:col-span-2 rounded-lg border border-slate-800 bg-[#0f1422] p-4 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs font-mono">
            <span className="font-bold uppercase tracking-wider text-slate-200">
              Extracted Flow Feature Vectors ({features.length})
            </span>
            <span className="text-[11px] text-slate-500">
              Click flow to view feature breakdown
            </span>
          </div>

          <div className="overflow-x-auto rounded border border-slate-800 bg-[#0a0d14]">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#0f1422] border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="p-2">Flow ID</th>
                  <th className="p-2">ESP SPI</th>
                  <th className="p-2 text-right">Packets</th>
                  <th className="p-2 text-right">Mean Size</th>
                  <th className="p-2 text-right">Entropy</th>
                  <th className="p-2 text-right">Mean IAT</th>
                  <th className="p-2 text-right">Burstiness</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {features.map((feat) => {
                  const isSelected = selectedFlow?.flowId === feat.flowId;
                  return (
                    <tr
                      key={feat.flowId}
                      onClick={() => setSelectedFlow(feat)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-cyan-950/40 text-white font-medium border-l-2 border-l-cyan-400'
                          : 'hover:bg-slate-800/40 text-slate-300'
                      }`}
                    >
                      <td className="p-2 text-cyan-300 font-semibold">{feat.flowId}</td>
                      <td className="p-2 text-slate-400">{feat.espSpi}</td>
                      <td className="p-2 text-right text-slate-300">{feat.totalPackets.toLocaleString()}</td>
                      <td className="p-2 text-right text-slate-300">{feat.meanPacketLength.toFixed(1)} B</td>
                      <td className="p-2 text-right">
                        <span className="text-emerald-400 font-bold">
                          {feat.packetLengthEntropy.toFixed(2)}
                        </span>
                      </td>
                      <td className="p-2 text-right text-slate-300">{feat.meanIatMs.toFixed(2)} ms</td>
                      <td className="p-2 text-right text-cyan-400">{feat.burstinessFactor.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Packet Size Histogram */}
        <div>
          <ChartCard
            title="Wire Packet Length Distribution"
            subtitle="MTU clustering vs ACK profiles"
            badge="Binned"
          >
            <PacketSizeDistributionChart />
          </ChartCard>
        </div>
      </div>

      {/* Selected Flow Deep Dive */}
      {selectedFlow && (
        <div className="rounded-lg border border-slate-800 bg-[#0f1422] p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-cyan-400" />
              <h3 className="text-xs font-mono font-bold text-slate-200 uppercase">
                Detailed Feature Breakdown: {selectedFlow.flowId}
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Calculated at {selectedFlow.extractedAt}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div className="rounded bg-[#0a0d14] p-3 border border-slate-800">
              <span className="text-slate-500 block text-[10px]">SHANNON ENTROPY</span>
              <span className="text-emerald-400 font-bold text-base">
                {selectedFlow.packetLengthEntropy.toFixed(3)} / 8.0
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">High Cipher Randomness</span>
            </div>

            <div className="rounded bg-[#0a0d14] p-3 border border-slate-800">
              <span className="text-slate-500 block text-[10px]">INTER-ARRIVAL TIME (MEAN)</span>
              <span className="text-cyan-400 font-bold text-base">
                {selectedFlow.meanIatMs.toFixed(2)} ms
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Std: {selectedFlow.stdIatMs.toFixed(2)}ms</span>
            </div>

            <div className="rounded bg-[#0a0d14] p-3 border border-slate-800">
              <span className="text-slate-500 block text-[10px]">PACKET SIZE VARIATION</span>
              <span className="text-blue-400 font-bold text-base">
                &sigma; = {selectedFlow.stdPacketLength.toFixed(1)} B
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                Range: {selectedFlow.minPacketLength}B - {selectedFlow.maxPacketLength}B
              </span>
            </div>

            <div className="rounded bg-[#0a0d14] p-3 border border-slate-800">
              <span className="text-slate-500 block text-[10px]">DIRECTIONAL RATIO</span>
              <span className="text-amber-400 font-bold text-base">
                {selectedFlow.forwardBackwardPacketRatio.toFixed(2)}:1
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Forward / Backward Pkts</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
