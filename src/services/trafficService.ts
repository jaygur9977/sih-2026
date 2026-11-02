import { apiClient } from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';
import { mockTrafficMetrics, mockTrafficSessions } from '../mocks/trafficData';
import type { TrafficMetrics, TrafficSession } from '../types/traffic';

let currentSessions: TrafficSession[] = [...mockTrafficSessions];

export const trafficService = {
  async getTrafficSessions(): Promise<TrafficSession[]> {
    return apiClient.get<TrafficSession[]>(API_ENDPOINTS.TRAFFIC.SESSIONS, async () => {
      return [...currentSessions];
    });
  },

  async getTrafficMetrics(): Promise<TrafficMetrics> {
    return apiClient.get<TrafficMetrics>(API_ENDPOINTS.TRAFFIC.METRICS, async () => {
      return { ...mockTrafficMetrics };
    });
  },

  async startTrafficSession(params: {
    name: string;
    protocol: TrafficSession['protocol'];
    sourceIp: string;
    destinationIp: string;
    destinationPort?: number;
    rateLimitMbps: number;
    durationSeconds: number;
  }): Promise<TrafficSession> {
    return apiClient.post<TrafficSession, typeof params>(
      API_ENDPOINTS.TRAFFIC.START,
      params,
      async () => {
        const newSession: TrafficSession = {
          id: `sess-${Date.now().toString(36)}`,
          name: params.name || `${params.protocol} Flow Benchmark`,
          protocol: params.protocol,
          sourceIp: params.sourceIp,
          destinationIp: params.destinationIp,
          sourcePort: 40000 + Math.floor(Math.random() * 20000),
          destinationPort: params.destinationPort || 5201,
          rateLimitMbps: params.rateLimitMbps,
          durationSeconds: params.durationSeconds,
          elapsedSeconds: 0,
          packetsSent: 0,
          bytesSent: 0,
          throughputMbps: params.rateLimitMbps,
          status: 'RUNNING',
          startedAt: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
          commandSimulated: `iperf3 -c ${params.destinationIp.split(' ')[0]} -b ${params.rateLimitMbps}M -t ${params.durationSeconds}`,
        };
        currentSessions.unshift(newSession);
        return newSession;
      }
    );
  },

  async stopTrafficSession(sessionId: string): Promise<boolean> {
    return apiClient.post<boolean, { sessionId: string }>(
      API_ENDPOINTS.TRAFFIC.STOP,
      { sessionId },
      async () => {
        const session = currentSessions.find((s) => s.id === sessionId);
        if (session) {
          session.status = 'STOPPED';
          session.throughputMbps = 0;
        }
        return true;
      }
    );
  },
};
