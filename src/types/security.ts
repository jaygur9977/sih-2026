export type SeverityLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'SECURE';

export interface SecurityFinding {
  id: string;
  title: string;
  severity: SeverityLevel;
  category: 'CIPHER_SUITE' | 'PERFECT_FORWARD_SECRECY' | 'AUTHENTICATION' | 'REPLAY_PROTECTION' | 'POLICY';
  description: string;
  recommendation: string;
  cveReference?: string;
  affectedComponent: string; // e.g., 'IKEv2 SA', 'ESP Policy', 'PSK Management'
  timestamp: string;
}

export interface SecurityAssessment {
  overallScore: number; // 0 - 100
  postureStatus: 'OPTIMAL' | 'ACCEPTABLE' | 'DEGRADED' | 'CRITICAL';
  cryptoGrade: 'A+' | 'A' | 'B' | 'C' | 'F';
  ikeSuiteSecure: boolean;
  espSuiteSecure: boolean;
  pfsEnabled: boolean;
  replayWindowSize: number;
  findings: SecurityFinding[];
  evaluatedAt: string;
}
