import { useCallback, useEffect, useState } from 'react';
import { vpnService } from '../services/vpnService';
import type { LabNode, VPNConfiguration, VPNConnection, VPNStatus } from '../types/vpn';

export function useVPN() {
  const [status, setStatus] = useState<VPNStatus | null>(null);
  const [connections, setConnections] = useState<VPNConnection[]>([]);
  const [configuration, setConfiguration] = useState<VPNConfiguration | null>(null);
  const [labNodes, setLabNodes] = useState<LabNode[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [st, conns, cfg, nodes] = await Promise.all([
        vpnService.getVPNStatus(),
        vpnService.getVPNConnections(),
        vpnService.getVPNConfiguration(),
        vpnService.getLabNodes(),
      ]);
      setStatus(st);
      setConnections(conns);
      setConfiguration(cfg);
      setLabNodes(nodes);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch VPN state');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const restartTunnel = async (id: string) => {
    try {
      const res = await vpnService.restartVPNTunnel(id);
      await fetchData();
      return res;
    } catch (err) {
      throw err;
    }
  };

  const updateConfig = async (updated: Partial<VPNConfiguration>) => {
    try {
      const res = await vpnService.updateVPNConfiguration(updated);
      setConfiguration(res);
      return res;
    } catch (err) {
      throw err;
    }
  };

  return {
    status,
    connections,
    configuration,
    labNodes,
    loading,
    error,
    refresh: fetchData,
    restartTunnel,
    updateConfig,
  };
}
