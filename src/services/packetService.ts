import { apiClient } from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';
import { mockCaptureStatus, mockPackets, mockPCAPFiles } from '../mocks/packetData';
import type { CaptureStatus, Packet, PCAPFile } from '../types/packet';

let currentCapture = { ...mockCaptureStatus };
let currentPackets = [...mockPackets];
let currentFiles = [...mockPCAPFiles];

export const packetService = {
  async getPCAPFiles(): Promise<PCAPFile[]> {
    return apiClient.get<PCAPFile[]>(API_ENDPOINTS.PACKET.PCAP_FILES, async () => {
      return [...currentFiles];
    });
  },

  async getPackets(pcapId?: string): Promise<Packet[]> {
    return apiClient.get<Packet[]>(
      `${API_ENDPOINTS.PACKET.PACKETS}${pcapId ? `?pcapId=${pcapId}` : ''}`,
      async () => {
        return [...currentPackets];
      }
    );
  },

  async getCaptureStatus(): Promise<CaptureStatus> {
    return apiClient.get<CaptureStatus>(API_ENDPOINTS.PACKET.CAPTURE_STATUS, async () => {
      return { ...currentCapture };
    });
  },

  async startCapture(interfaceName: string, filter: string): Promise<CaptureStatus> {
    return apiClient.post<CaptureStatus, { interfaceName: string; filter: string }>(
      API_ENDPOINTS.PACKET.START_CAPTURE,
      { interfaceName, filter },
      async () => {
        currentCapture = {
          isCapturing: true,
          activeInterface: interfaceName,
          activeFilter: filter,
          capturedPacketsCount: 0,
          capturedBytes: 0,
          bufferUsagePercent: 2,
          startedAt: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
        };
        return { ...currentCapture };
      }
    );
  },

  async stopCapture(): Promise<CaptureStatus> {
    return apiClient.post<CaptureStatus, {}>(
      API_ENDPOINTS.PACKET.STOP_CAPTURE,
      {},
      async () => {
        currentCapture = {
          ...currentCapture,
          isCapturing: false,
        };

        // Create new PCAP file record
        const newFile: PCAPFile = {
          id: `pcap-${Date.now().toString(36)}`,
          filename: `capture_${Date.now()}.pcap`,
          sizeBytes: currentCapture.capturedBytes || 419200,
          packetCount: currentCapture.capturedPacketsCount || 312,
          capturedAt: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
          durationSeconds: 45,
          interfaceName: currentCapture.activeInterface,
          filterUsed: currentCapture.activeFilter,
          status: 'READY',
        };
        currentFiles.unshift(newFile);

        return { ...currentCapture };
      }
    );
  },
};
