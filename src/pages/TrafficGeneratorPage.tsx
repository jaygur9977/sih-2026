import React, { useState } from 'react';
import { Zap, Play, Square, Activity } from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';
import { useTraffic } from '../hooks/useTraffic';
import type { TrafficSession } from '../types/traffic';
import { formatBytes } from '../utils/formatters';

export const TrafficGeneratorPage: React.FC = () => {
  const { sessions, metrics, startSession, stopSession } = useTraffic();

  const [sessionName, setSessionName] = useState('iPerf3 Benchmark Test');
  const [protocol, setProtocol] = useState<TrafficSession['protocol']>('TCP');
  const [sourceIp] = useState('10.10.0.30 (traffic-generator)');
  const [destinationIp] = useState('10.10.0.20 (vpn-server)');
  const [rateLimitMbps, setRateLimitMbps] = useState(50);
  const [durationSeconds, setDurationSeconds] = useState(120);
  const [isStarting, setIsStarting] = useState(false);

  const handleStart = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsStarting(true);
      await startSession({
        name: sessionName,
        protocol,
        sourceIp,
        destinationIp,
        rateLimitMbps,
        durationSeconds,
      });
    } finally {
      setIsStarting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-lg border border-slate-800 bg-[#0f1422] p-5 shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold font-mono text-white">
              Synthetic Traffic Generator
            </h2>
            <StatusBadge status="ONLINE" label="Generator Daemon Active" size="sm" />
          </div>
          <p className="mt-1 text-xs font-mono text-slate-400">
            Generate synthetic encrypted payloads across the strongSwan IPsec tunnel from container <code>10.10.0.30</code>.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-slate-300">
          <div>
            <span className="text-slate-500 block text-[10px]">TOTAL THROUGHPUT</span>
            <span className="text-cyan-400 font-bold text-base">
              {metrics ? `${metrics.currentThroughputMbps} Mbps` : '0 Mbps'}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">PACKET RATE</span>
            <span className="text-blue-400 font-bold text-base">
              {metrics ? `${metrics.totalPacketsPerSec} pps` : '0 pps'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Launch New Traffic Session Form */}
        <div className="rounded-lg border border-slate-800 bg-[#0f1422] p-5 shadow-lg">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800 mb-4">
            <Zap className="h-4 w-4 text-amber-400" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              Launch Traffic Stream
            </h3>
          </div>

          <form onSubmit={handleStart} className="space-y-4 text-xs font-mono">
            <div>
              <label className="block text-slate-400 mb-1">Session Description</label>
              <input
                type="text"
                value={sessionName}
                onChange={(e) => setSessionName(e.target.value)}
                className="w-full rounded bg-[#0a0d14] border border-slate-700 px-3 py-1.5 text-slate-200 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Payload Protocol Profile</label>
              <select
                value={protocol}
                onChange={(e) => setProtocol(e.target.value as any)}
                className="w-full rounded bg-[#0a0d14] border border-slate-700 px-3 py-1.5 text-slate-200 focus:border-cyan-500 focus:outline-none"
              >
                <option value="TCP">TCP (iPerf3 Bulk Stream)</option>
                <option value="UDP">UDP (Constant Bitrate Burst)</option>
                <option value="VoIP_RTP">VoIP / RTP (G.711 Audio Emulation)</option>
                <option value="HTTPS">HTTPS Synthetic Web Browsing</option>
                <option value="ICMP">ICMP Echo Request Sweep</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1">Source Node</label>
                <input
                  type="text"
                  disabled
                  value="10.10.0.30"
                  className="w-full rounded bg-[#0a0d14]/70 border border-slate-800 px-3 py-1.5 text-slate-400"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Destination Node</label>
                <input
                  type="text"
                  disabled
                  value="10.10.0.20"
                  className="w-full rounded bg-[#0a0d14]/70 border border-slate-800 px-3 py-1.5 text-slate-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1">Target Rate (Mbps)</label>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={rateLimitMbps}
                  onChange={(e) => setRateLimitMbps(Number(e.target.value))}
                  className="w-full rounded bg-[#0a0d14] border border-slate-700 px-3 py-1.5 text-slate-200 focus:border-cyan-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Duration (Seconds)</label>
                <input
                  type="number"
                  min="10"
                  max="3600"
                  value={durationSeconds}
                  onChange={(e) => setDurationSeconds(Number(e.target.value))}
                  className="w-full rounded bg-[#0a0d14] border border-slate-700 px-3 py-1.5 text-slate-200 focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Simulated Command Preview */}
            <div className="rounded bg-[#0a0d14] p-2.5 border border-slate-800 text-[11px]">
              <span className="text-slate-500 block text-[10px] mb-1">SIMULATED CLI INVOCATION:</span>
              <code className="text-cyan-300 break-all">
                iperf3 -c 10.10.0.20 -b {rateLimitMbps}M -t {durationSeconds}
              </code>
            </div>

            <button
              type="submit"
              disabled={isStarting}
              className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-cyan-600 hover:bg-cyan-500 py-2 font-mono font-medium text-white shadow transition-colors disabled:opacity-50"
            >
              <Play className="h-4 w-4" />
              {isStarting ? 'Initiating Flow...' : 'Start Traffic Generator'}
            </button>
          </form>
        </div>

        {/* Active & Completed Sessions List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-lg border border-slate-800 bg-[#0f1422] p-5 shadow-lg">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-cyan-400" />
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                  Traffic Generator Sessions ({sessions.length})
                </h3>
              </div>
            </div>

            <div className="space-y-3">
              {sessions.map((sess) => (
                <div
                  key={sess.id}
                  className="rounded-md border border-slate-800 bg-[#0a0d14] p-4 text-xs font-mono space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-200">{sess.name}</h4>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                          {sess.protocol}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {sess.sourceIp} &rarr; {sess.destinationIp} (Port {sess.destinationPort})
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <StatusBadge status={sess.status} size="sm" />
                      {sess.status === 'RUNNING' && (
                        <button
                          onClick={() => stopSession(sess.id)}
                          className="rounded bg-rose-950/80 hover:bg-rose-900 border border-rose-800 p-1 text-rose-300 transition-colors"
                          title="Stop Stream"
                        >
                          <Square className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800/80 text-[11px]">
                    <div>
                      <span className="text-slate-500 block text-[10px]">CURRENT RATE</span>
                      <span className="text-cyan-400 font-bold">{sess.throughputMbps} Mbps</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">PACKETS TRANSMITTED</span>
                      <span className="text-slate-300 font-semibold">{sess.packetsSent.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">BYTES SENT</span>
                      <span className="text-slate-300 font-semibold">{formatBytes(sess.bytesSent)}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">TIME REMAINING</span>
                      <span className="text-slate-300">
                        {Math.max(0, sess.durationSeconds - sess.elapsedSeconds)}s
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
