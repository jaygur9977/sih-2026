export type LogLevel = 'DEBUG' | 'INFO' | 'NOTICE' | 'WARNING' | 'ERROR' | 'CRITICAL';

export type LogSource = 'charon' | 'xfrm' | 'tcpdump' | 'tshark' | 'ai_engine' | 'traffic_gen';

export interface SystemLog {
  id: string;
  timestamp: string;
  source: LogSource;
  level: LogLevel;
  message: string;
  subsystem?: string; // e.g. "ike", "esp", "enc", "netlink"
  rawText?: string;
}

export interface LogFilter {
  level?: LogLevel;
  source?: LogSource;
  searchQuery?: string;
  limit?: number;
}
