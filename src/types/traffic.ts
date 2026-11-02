export type TrafficProtocol = 'TCP' | 'UDP' | 'ICMP' | 'HTTPS' | 'DNS' | 'VoIP_RTP';

export type TrafficSessionStatus = 'RUNNING' | 'COMPLETED' | 'STOPPED' | 'FAILED';

export interface TrafficSession {
  id: string;
  name: string;
  protocol: TrafficProtocol;
  sourceIp: string;
  destinationIp: string;
  sourcePort?: number;
  destinationPort?: number;
  rateLimitMbps: number;
  durationSeconds: number;
  elapsedSeconds: number;
  packetsSent: number;
  bytesSent: number;
  throughputMbps: number;
  status: TrafficSessionStatus;
  startedAt: string;
  commandSimulated: string; // e.g. "iperf3 -c 10.10.0.20 -b 50M -t 60"
}

export interface TrafficMetrics {
  currentThroughputMbps: number;
  totalPacketsPerSec: number;
  totalBytesSent: number;
  activeSessionsCount: number;
  history: Array<{
    timestamp: string;
    throughputMbps: number;
    packetRate: number;
    encryptedEspBytes: number;
  }>;
}
