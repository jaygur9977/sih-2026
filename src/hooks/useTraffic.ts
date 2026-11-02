import { useCallback, useEffect, useState } from 'react';
import { trafficService } from '../services/trafficService';
import type { TrafficMetrics, TrafficSession } from '../types/traffic';

export function useTraffic() {
  const [sessions, setSessions] = useState<TrafficSession[]>([]);
  const [metrics, setMetrics] = useState<TrafficMetrics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [sess, met] = await Promise.all([
        trafficService.getTrafficSessions(),
        trafficService.getTrafficMetrics(),
      ]);
      setSessions(sess);
      setMetrics(met);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load traffic state');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const startSession = async (params: {
    name: string;
    protocol: TrafficSession['protocol'];
    sourceIp: string;
    destinationIp: string;
    rateLimitMbps: number;
    durationSeconds: number;
  }) => {
    const res = await trafficService.startTrafficSession(params);
    await fetchData();
    return res;
  };

  const stopSession = async (id: string) => {
    const res = await trafficService.stopTrafficSession(id);
    await fetchData();
    return res;
  };

  return {
    sessions,
    metrics,
    loading,
    error,
    refresh: fetchData,
    startSession,
    stopSession,
  };
}
