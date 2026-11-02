export type PacketProtocol = 'ESP' | 'IKEv2' | 'UDP' | 'TCP' | 'ICMP' | 'OTHER';

export interface PacketField {
  name: string;
  value: string | number;
  description?: string;
  hexOffset?: number;
  hexLength?: number;
}

export interface PacketLayer {
  layerName: string; // e.g. "Frame", "Ethernet II", "Internet Protocol Version 4", "Encapsulating Security Payload"
  summary: string;
  fields: PacketField[];
}

export interface Packet {
  id: string;
  frameNumber: number;
  timestamp: string;
  relativeTime: number; // e.g., 0.00412 seconds
  sourceIp: string;
  destinationIp: string;
  protocol: PacketProtocol;
  length: number; // bytes
  info: string;
  spi?: string; // ESP Security Parameter Index (e.g. 0xc8a12f9b)
  sequenceNumber?: number;
  ikeExchangeType?: string; // e.g., 'IKE_SA_INIT', 'IKE_AUTH'
  ikeMessageId?: number;
  rawHexDump: string; // Formatted 16-byte row representation with ASCII column
  isEncryptedPayload: boolean;
  layers: PacketLayer[]; // Parsed dissection tree supplied by backend TShark
}

export interface PCAPFile {
  id: string;
  filename: string;
  sizeBytes: number;
  packetCount: number;
  capturedAt: string;
  durationSeconds: number;
  interfaceName: string;
  filterUsed: string;
  status: 'READY' | 'CAPTURING' | 'PROCESSING';
}

export interface CaptureStatus {
  isCapturing: boolean;
  activeInterface: string;
  activeFilter: string;
  capturedPacketsCount: number;
  capturedBytes: number;
  bufferUsagePercent: number;
  startedAt?: string;
}
