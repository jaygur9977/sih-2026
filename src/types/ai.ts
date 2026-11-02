export type TrafficClass =
  | 'Web_Browsing'
  | 'Video_Streaming'
  | 'VoIP_Audio'
  | 'File_Transfer'
  | 'DNS_Tunnel'
  | 'Data_Exfiltration'
  | 'Command_and_Control';

export interface FeatureVector {
  flowId: string;
  sourceIp: string;
  destinationIp: string;
  protocol: string;
  espSpi: string;
  totalPackets: number;
  totalBytes: number;
  flowDurationMs: number;
  
  // Statistical flow features (extracted from packet lengths & timing)
  meanPacketLength: number;
  stdPacketLength: number;
  minPacketLength: number;
  maxPacketLength: number;
  packetLengthEntropy: number; // Shannon entropy
  
  meanIatMs: number;           // Inter-arrival time mean
  stdIatMs: number;            // Inter-arrival time std
  minIatMs: number;
  maxIatMs: number;
  
  bytesRateBytesPerSec: number;
  packetRatePacketsPerSec: number;
  forwardBackwardPacketRatio: number;
  burstinessFactor: number;
  
  extractedAt: string;
}

export interface Prediction {
  id: string;
  flowId: string;
  timestamp: string;
  predictedClass: TrafficClass;
  confidence: number; // 0.0 - 1.0
  isVpnEncrypted: boolean;
  modelName: string; // e.g., 'XGBoost-FlowClassifier-v2' or 'ResNet1D-EncryptedTraffic-v1'
  inferenceLatencyMs: number;
  probabilities: Record<TrafficClass, number>;
  keyContributingFeatures: Array<{
    feature: string;
    importance: number;
    value: number;
  }>;
  groundTruth?: TrafficClass;
  isAnomaly: boolean;
  anomalyScore?: number;
}

export interface ModelMetrics {
  activeModel: string;
  accuracy: number;
  f1Score: number;
  precision: number;
  recall: number;
  totalInferences: number;
  averageInferenceTimeMs: number;
}
