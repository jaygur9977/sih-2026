import React, { useState } from 'react';
import {
  RotateCcw,
  Terminal,
  Layers,
  ArrowRight,
  Server,
} from 'lucide-react';
import { NetworkNode } from '../components/network/NetworkNode';
import { NetworkConnection } from '../components/network/NetworkConnection';
import { StatusBadge } from '../components/common/StatusBadge';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { useVPN } from '../hooks/useVPN';
import type { LabNode } from '../types/vpn';
import { formatBytes } from '../utils/formatters';

export const VPNLabPage: React.FC = () => {
  const { connections, labNodes, restartTunnel } = useVPN();
  const [selectedNode, setSelectedNode] = useState<LabNode | null>(null);
  const [showRawStatus, setShowRawStatus] = useState<boolean>(false);
  const [rawOutput, setRawOutput] = useState<string>('');
  const [confirmRestartOpen, setConfirmRestartOpen] = useState<boolean>(false);
  const [isRestarting, setIsRestarting] = useState<boolean>(false);

  const primaryConn = connections[0];

  // Specific lab nodes per environment
  const clientNode = labNodes.find((n) => n.role === 'client') || labNodes[0];
  const serverNode = labNodes.find((n) => n.role === 'server') || labNodes[1];
  const generatorNode = labNodes.find((n) => n.role === 'generator') || labNodes[2];
  const tapNode = labNodes.find((n) => n.role === 'tap') || labNodes[3];

  const handleRestart = async () => {
    if (!primaryConn) return;
    try {
      setIsRestarting(true);
      await restartTunnel(primaryConn.id);
    } finally {
      setIsRestarting(false);
      setConfirmRestartOpen(false);
    }
  };

  const loadRawCharon = async () => {
    const raw = `Status of IKE charon daemon (strongSwan 5.9.14, Linux 6.6.x86_64, x86_64):
  uptime: 3 hours, since Sep 08 19:00:22 2026
  worker threads: 11 of 16 idle, 5/0/0/0 working

Listening IP addresses:
  10.10.0.10
  fd00:10:10::10

Connections:
  lab-tunnel:  10.10.0.10...10.10.0.20  IKEv2, dpddelay=30s
  lab-tunnel:   local:  [10.10.0.10] uses pre-shared key authentication
  lab-tunnel:   remote: [10.10.0.20] uses pre-shared key authentication
  lab-tunnel:   child:  10.10.0.10/32 === 10.10.0.20/32 TUNNEL, dpdaction=restart

Security Associations (1 up, 0 connecting):
  lab-tunnel[1]: ESTABLISHED 3 hours ago, 10.10.0.10[10.10.0.10]...10.10.0.20[10.10.0.20]
  lab-tunnel[1]: IKE proposal: AES_CBC_256/HMAC_SHA2_256_128/PRF_HMAC_SHA2_256/MODP_2048
  lab-tunnel{1}:  INSTALLED, TUNNEL, reqid 1, ESP in UDP SPIs: c8a12f9b_i 43d08e1a_o
  lab-tunnel{1}:  AES_GCM_16_256, 428912400 bytes_i (341200 pkts), 812492100 bytes_o (640040 pkts)`;
    setRawOutput(raw);
    setShowRawStatus(true);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-lg border border-slate-800 bg-[#0f1422] p-5 shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold font-mono text-white">
              Docker VPN Lab Topology & Orchestration
            </h2>
            <StatusBadge status="ONLINE" label="Lab Ready (4/4 Containers)" size="sm" />
          </div>
          <p className="mt-1 text-xs font-mono text-slate-400">
            WSL/Linux containerized strongSwan environment with vpn-client, vpn-server, and synthetic traffic generator.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadRawCharon}
            className="inline-flex items-center gap-1.5 rounded-md border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-mono text-slate-200 hover:bg-slate-700 transition-colors"
          >
            <Terminal className="h-3.5 w-3.5" /> strongSwan statusall
          </button>
          <button
            onClick={() => setConfirmRestartOpen(true)}
            disabled={isRestarting}
            className="inline-flex items-center gap-1.5 rounded-md bg-cyan-600 hover:bg-cyan-500 px-3 py-1.5 text-xs font-mono font-medium text-white transition-colors disabled:opacity-50"
          >
            <RotateCcw className="h-3.5 w-3.5" /> {isRestarting ? 'Renegotiating...' : 'Restart Tunnel SA'}
          </button>
        </div>
      </div>

      {/* Interactive Topology Graph Visualizer */}
      <div className="rounded-lg border border-slate-800 bg-[#06080e] p-6 shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-cyan-400" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
              Network Architecture Canvas
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            Isolated Docker Network: 10.10.0.0/24 // Bridge: vpn-net
          </span>
        </div>

        {/* Node Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center justify-items-center relative z-10 py-4">
          {/* Traffic Generator (Source) */}
          <div className="flex flex-col items-center gap-2 w-full max-w-xs">
            <div className="text-[10px] font-mono uppercase text-amber-400 font-bold tracking-wider">
              [Traffic Ingress]
            </div>
            {generatorNode && (
              <NetworkNode
                node={generatorNode}
                isSelected={selectedNode?.id === generatorNode.id}
                onClick={() => setSelectedNode(generatorNode)}
              />
            )}
          </div>

          {/* Center Connector Link with Traffic Flow Arrow */}
          <div className="w-full flex flex-col items-center gap-3">
            <div className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
              <span>Synthetic iPerf3 / HTTP</span>
              <ArrowRight className="h-3 w-3 text-amber-400 animate-pulse" />
            </div>
            <div className="w-full h-0.5 bg-dashed border-t border-dashed border-amber-500/40" />
            <span className="text-[10px] font-mono text-amber-300/80 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/60">
              Plaintext Ingress (10.10.0.30 &rarr; 10.10.0.10)
            </span>
          </div>

          {/* VPN Client Gateway */}
          <div className="flex flex-col items-center gap-2 w-full max-w-xs">
            <div className="text-[10px] font-mono uppercase text-cyan-400 font-bold tracking-wider">
              [IPsec Initiator]
            </div>
            {clientNode && (
              <NetworkNode
                node={clientNode}
                isSelected={selectedNode?.id === clientNode.id}
                onClick={() => setSelectedNode(clientNode)}
              />
            )}
          </div>
        </div>

        {/* IPsec ESP Encrypted Tunnel Link Between Client and Server */}
        <div className="my-6 max-w-2xl mx-auto">
          <NetworkConnection
            connection={primaryConn}
            isEncrypted={true}
            sourceName="vpn-client (10.10.0.10)"
            targetName="vpn-server (10.10.0.20)"
            bytesTransferred={
              primaryConn ? formatBytes(primaryConn.bytesIn + primaryConn.bytesOut) : undefined
            }
          />
        </div>

        {/* Server & Passive Tap Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-items-center relative z-10 py-4 max-w-4xl mx-auto">
          {/* VPN Server Responder */}
          <div className="flex flex-col items-center gap-2 w-full max-w-xs">
            <div className="text-[10px] font-mono uppercase text-blue-400 font-bold tracking-wider">
              [IPsec Responder & Termination]
            </div>
            {serverNode && (
              <NetworkNode
                node={serverNode}
                isSelected={selectedNode?.id === serverNode.id}
                onClick={() => setSelectedNode(serverNode)}
              />
            )}
          </div>

          {/* Optional Conceptual Passive Tap / Monitor Sensor */}
          <div className="flex flex-col items-center gap-2 w-full max-w-xs">
            <div className="text-[10px] font-mono uppercase text-purple-400 font-bold tracking-wider flex items-center gap-1">
              <span>[Demo Passive Sensor Tap]</span>
            </div>
            {tapNode && (
              <NetworkNode
                node={tapNode}
                isSelected={selectedNode?.id === tapNode.id}
                onClick={() => setSelectedNode(tapNode)}
              />
            )}
            <span className="text-[10px] font-mono text-purple-400/70 text-center">
              Passive PCAP / TShark sniffer (Defensive monitoring only)
            </span>
          </div>
        </div>
      </div>

      {/* Selected Node Details Drawer */}
      {selectedNode && (
        <div className="rounded-lg border border-slate-800 bg-[#0f1422] p-5 shadow-lg animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <div className="flex items-center gap-2">
              <Server className="h-4 w-4 text-cyan-400" />
              <h3 className="text-xs font-mono font-bold text-slate-200 uppercase">
                Container Telemetry: {selectedNode.name}
              </h3>
            </div>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-xs font-mono text-slate-400 hover:text-slate-200"
            >
              Close &times;
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div>
              <span className="text-slate-500 block text-[10px]">IPV4 ENDPOINT</span>
              <span className="text-cyan-400 font-bold">{selectedNode.ipv4}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">IPV6 ENDPOINT</span>
              <span className="text-slate-300 font-semibold truncate block">{selectedNode.ipv6}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">CPU ALLOCATION</span>
              <span className="text-slate-300">{selectedNode.cpuPercent}%</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">MEMORY RSS</span>
              <span className="text-slate-300">{selectedNode.memoryUsageMb} MB</span>
            </div>
          </div>
        </div>
      )}

      {/* strongSwan statusall Terminal Output Modal/Viewer */}
      {showRawStatus && (
        <div className="rounded-lg border border-slate-800 bg-[#06080e] p-4 shadow-xl font-mono text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-3">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-emerald-400" />
              <span className="text-emerald-400 font-bold">
                strongSwan charon daemon statusall output
              </span>
            </div>
            <button
              onClick={() => setShowRawStatus(false)}
              className="text-slate-400 hover:text-slate-200 text-xs"
            >
              Hide Terminal
            </button>
          </div>
          <pre className="text-[11px] leading-relaxed text-slate-300 overflow-x-auto select-all">
            {rawOutput}
          </pre>
        </div>
      )}

      {/* Confirm Renegotiation Dialog */}
      <ConfirmDialog
        isOpen={confirmRestartOpen}
        title="Renegotiate IPsec SA"
        message="This will signal the strongSwan daemon to flush and renegotiate the IKE_SA and CHILD_SA between vpn-client (10.10.0.10) and vpn-server (10.10.0.20) using PSK authentication."
        confirmLabel="Initiate Rekey"
        onConfirm={handleRestart}
        onCancel={() => setConfirmRestartOpen(false)}
      />
    </div>
  );
};
