import { apiClient } from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';
import { mockSystemLogs } from '../mocks/logData';
import type { LogFilter, SystemLog } from '../types/logs';

let currentLogs = [...mockSystemLogs];

export const logService = {
  async getLogs(filter?: LogFilter): Promise<SystemLog[]> {
    return apiClient.get<SystemLog[]>(API_ENDPOINTS.LOGS.LIST, async () => {
      let filtered = [...currentLogs];

      if (filter?.level) {
        filtered = filtered.filter((l) => l.level === filter.level);
      }
      if (filter?.source) {
        filtered = filtered.filter((l) => l.source === filter.source);
      }
      if (filter?.searchQuery) {
        const q = filter.searchQuery.toLowerCase();
        filtered = filtered.filter(
          (l) => l.message.toLowerCase().includes(q) || (l.subsystem && l.subsystem.toLowerCase().includes(q))
        );
      }

      return filtered;
    });
  },

  async clearLogs(): Promise<boolean> {
    currentLogs = [];
    return true;
  },
};
