export const API_ENDPOINTS = {
  VPN: {
    STATUS: '/api/vpn/status',
    CONNECTIONS: '/api/vpn/connections',
    CONFIG: '/api/vpn/config',
    RESTART: '/api/vpn/restart',
    LAB_NODES: '/api/vpn/lab-nodes',
  },
  TRAFFIC: {
    SESSIONS: '/api/traffic/sessions',
    METRICS: '/api/traffic/metrics',
    START: '/api/traffic/start',
    STOP: '/api/traffic/stop',
  },
  PACKET: {
    CAPTURE_STATUS: '/api/packets/capture-status',
    START_CAPTURE: '/api/packets/start-capture',
    STOP_CAPTURE: '/api/packets/stop-capture',
    PCAP_FILES: '/api/packets/pcap-files',
    PACKETS: '/api/packets',
  },
  AI: {
    FEATURES: '/api/ai/features',
    PREDICTIONS: '/api/ai/predictions',
    METRICS: '/api/ai/metrics',
  },
  SECURITY: {
    ASSESSMENT: '/api/security/assessment',
    FINDINGS: '/api/security/findings',
  },
  LOGS: {
    LIST: '/api/logs',
  },
} as const;
