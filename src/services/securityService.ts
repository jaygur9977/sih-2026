import { apiClient } from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';
import { mockSecurityAssessment } from '../mocks/securityData';
import type { SecurityAssessment, SecurityFinding } from '../types/security';

export const securityService = {
  async getSecurityAssessment(): Promise<SecurityAssessment> {
    return apiClient.get<SecurityAssessment>(API_ENDPOINTS.SECURITY.ASSESSMENT, async () => {
      return { ...mockSecurityAssessment };
    });
  },

  async getSecurityFindings(): Promise<SecurityFinding[]> {
    return apiClient.get<SecurityFinding[]>(API_ENDPOINTS.SECURITY.FINDINGS, async () => {
      return [...mockSecurityAssessment.findings];
    });
  },
};
