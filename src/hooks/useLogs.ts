import { useCallback, useEffect, useState } from 'react';
import { logService } from '../services/logService';
import type { LogFilter, SystemLog } from '../types/logs';

export function useLogs(initialFilter?: LogFilter) {
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [filter, setFilter] = useState<LogFilter>(initialFilter || {});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await logService.getLogs(filter);
      setLogs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load logs');
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const clearLogs = async () => {
    await logService.clearLogs();
    setLogs([]);
  };

  return {
    logs,
    filter,
    setFilter,
    loading,
    error,
    refresh: fetchLogs,
    clearLogs,
  };
}
