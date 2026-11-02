import { useCallback, useEffect, useState } from 'react';
import { securityService } from '../services/securityService';
import type { SecurityAssessment, SecurityFinding } from '../types/security';

export function useSecurity() {
  const [assessment, setAssessment] = useState<SecurityAssessment | null>(null);
  const [findings, setFindings] = useState<SecurityFinding[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [assess, fnds] = await Promise.all([
        securityService.getSecurityAssessment(),
        securityService.getSecurityFindings(),
      ]);
      setAssessment(assess);
      setFindings(fnds);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load security posture');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    assessment,
    findings,
    loading,
    error,
    refresh: fetchData,
  };
}
