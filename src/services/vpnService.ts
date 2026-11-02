import { apiClient } from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';
import { mockCharonStatusAllRaw, mockVPNConnections, mockVPNStatus } from '../mocks/vpnData';
import type { LabNode, VPNConfiguration, VPNConnection, VPNStatus } from '../types/vpn';
import { DEFAULT_LAB_NODES, WORKING_VPN_CONFIGURATION } from '../utils/constants';

// In-memory state for mock sessions
let currentConfig = { ...WORKING_VPN_CONFIGURATION };
let currentConnections = [...mockVPNConnections];
let currentStatus = { ...mockVPNStatus };

export const vpnService = {
  async getVPNStatus(): Promise<VPNStatus> {
    return apiClient.get<VPNStatus>(API_ENDPOINTS.VPN.STATUS, async () => {
      return { ...currentStatus };
    });
  },

  async getVPNConnections(): Promise<VPNConnection[]> {
    return apiClient.get<VPNConnection[]>(API_ENDPOINTS.VPN.CONNECTIONS, async () => {
      return [...currentConnections];
    });
  },

  async getVPNConfiguration(): Promise<VPNConfiguration> {
    return apiClient.get<VPNConfiguration>(API_ENDPOINTS.VPN.CONFIG, async () => {
      return { ...currentConfig };
    });
  },

  async updateVPNConfiguration(updated: Partial<VPNConfiguration>): Promise<VPNConfiguration> {
    return apiClient.post<VPNConfiguration, Partial<VPNConfiguration>>(
      API_ENDPOINTS.VPN.CONFIG,
      updated,
      async () => {
        currentConfig = {
          ...currentConfig,
          ...updated,
          lastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
        };
        return { ...currentConfig };
      }
    );
  },

  async restartVPNTunnel(connectionId: string): Promise<{ success: boolean; message: string }> {
    return apiClient.post<{ success: boolean; message: string }>(
      API_ENDPOINTS.VPN.RESTART,
      { connectionId },
      async () => {
        // Simulate strongSwan swanctl --terminate && swanctl --initiate cycle
        const connIndex = currentConnections.findIndex((c) => c.id === connectionId);
        if (connIndex !== -1) {
          currentConnections[connIndex] = {
            ...currentConnections[connIndex],
            status: 'ESTABLISHED',
            establishedAt: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
            rekeyInSeconds: 3600,
          };
        }
        return {
          success: true,
          message: `Tunnel ${connectionId} renegotiation completed. IKE_SA and CHILD_SA established.`,
        };
      }
    );
  },

  async getLabNodes(): Promise<LabNode[]> {
    return apiClient.get<LabNode[]>(API_ENDPOINTS.VPN.LAB_NODES, async () => {
      return [...DEFAULT_LAB_NODES];
    });
  },

  async getRawCharonStatus(): Promise<string> {
    return mockCharonStatusAllRaw;
  },
};
