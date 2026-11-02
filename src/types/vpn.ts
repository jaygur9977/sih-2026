export type TunnelState = 'ESTABLISHED' | 'CONNECTING' | 'REKEYING' | 'DOWN' | 'DEGRADED';

export type LabContainerState = 'running' | 'stopped' | 'restarting' | 'error';

export interface LabNode {
  id: string;
  name: string;
  role: 'client' | 'server' | 'generator' | 'tap';
  ipv4: string;
  ipv6: string;
  containerState: LabContainerState;
  uptimeSeconds: number;
  cpuPercent: number;
  memoryUsageMb: number;
  isOptionalMonitor?: boolean;
}

export interface VPNConnection {
  id: string;
  name: string;
  localGateway: string;
  remoteGateway: string;
  localSubnet: string;
  remoteSubnet: string;
  status: TunnelState;
  ikeVersion: 'IKEv2';
  ikeProposal: string; // e.g., 'AES256-SHA256-MODP2048'
  espProposal: string; // e.g., 'AES256-GCM16'
  authMethod: 'PSK' | 'PUBKEY' | 'CERT';
  spiIn: string;       // e.g., '0xc8a12f9b'
  spiOut: string;      // e.g., '0x43d08e1a'
  bytesIn: number;
  bytesOut: number;
  packetsIn: number;
  packetsOut: number;
  establishedAt: string;
  rekeyInSeconds: number;
  dpdActive: boolean;
}

export interface VPNStatus {
  daemonStatus: 'active' | 'inactive' | 'reloading';
  daemonVersion: string; // strongSwan U5.9.14/K6.6.x
  uptimeSeconds: number;
  activeTunnels: number;
  totalTunnels: number;
  ikeSaCount: number;
  childSaCount: number;
  totalIngressBytes: number;
  totalEgressBytes: number;
  totalPackets: number;
  lastStateChange: string;
  labContainersOnline: number;
  totalLabContainers: number;
}

export interface VPNConfiguration {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  version: 'IKEv2';
  authType: 'PSK' | 'EAP' | 'CERT';
  preSharedKey?: string;
  
  // Proposals
  ikeProposal: string;  // Default: 'AES256-SHA256-MODP2048'
  espProposal: string;  // Default: 'AES256-GCM16'
  
  // Available selectable options (for config dropdowns)
  availableIkeProposals: string[];
  availableEspProposals: string[];
  
  // Selectors
  localTrafficSelector: string;   // '10.10.0.10/32'
  remoteTrafficSelector: string;  // '10.10.0.20/32'
  
  // strongSwan formatted raw configuration preview (swanctl.conf style)
  rawConfig: string;
  lastUpdated: string;
}
