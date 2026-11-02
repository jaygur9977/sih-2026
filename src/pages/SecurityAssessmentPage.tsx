import React from 'react';
import { ShieldCheck, Lock, CheckCircle, Award } from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';
import { MetricCard } from '../components/common/MetricCard';
import { useSecurity } from '../hooks/useSecurity';

export const SecurityAssessmentPage: React.FC = () => {
  const { assessment } = useSecurity();

  if (!assessment) {
    return (
      <div className="flex h-64 items-center justify-center font-mono text-xs text-slate-500">
        Conducting cryptographic compliance audit...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-lg border border-slate-800 bg-[#0f1422] p-5 shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold font-mono text-white">
              IPsec Cryptographic Posture & Security Assessment
            </h2>
            <StatusBadge status="SECURE" label={`Overall Grade: ${assessment.cryptoGrade}`} size="sm" />
          </div>
          <p className="mt-1 text-xs font-mono text-slate-400">
            NIST SP 800-52r2 & BSI compliance evaluation of strongSwan IKEv2 / ESP cryptographic primitives.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-md bg-emerald-950/60 border border-emerald-800/80 px-3 py-1.5 font-mono">
            <Award className="h-5 w-5 text-emerald-400" />
            <div>
              <span className="text-[10px] text-emerald-400 block font-bold">COMPLIANCE SCORE</span>
              <span className="text-emerald-300 font-bold text-base">{assessment.overallScore} / 100</span>
            </div>
          </div>
        </div>
      </div>

      {/* Posture Summary Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="ESP AEAD Transform"
          value="AES256-GCM16"
          subtitle="Authenticated Encryption"
          icon={Lock}
          accentColor="emerald"
          badgeText="Wire-speed"
        />
        <MetricCard
          title="IKE Key Exchange"
          value="MODP 2048"
          subtitle="Diffie-Hellman Group 14"
          icon={ShieldCheck}
          accentColor="cyan"
          badgeText="112-bit margin"
        />
        <MetricCard
          title="Forward Secrecy (PFS)"
          value="ENABLED"
          subtitle="Unique session keys per SA"
          icon={CheckCircle}
          accentColor="blue"
          badgeText="Active"
        />
        <MetricCard
          title="XFRM Anti-Replay"
          value={`${assessment.replayWindowSize} Packets`}
          subtitle="Kernel sequence drop engine"
          icon={Award}
          accentColor="purple"
          badgeText="Protected"
        />
      </div>

      {/* Detailed Cryptographic Findings */}
      <div className="rounded-lg border border-slate-800 bg-[#0f1422] p-5 shadow-lg space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-cyan-400" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              Audit Findings & Hardening Recommendations ({assessment.findings.length})
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-500">
            Evaluated {assessment.evaluatedAt}
          </span>
        </div>

        <div className="space-y-3">
          {assessment.findings.map((f) => (
            <div
              key={f.id}
              className="rounded-md border border-slate-800 bg-[#0a0d14] p-4 text-xs font-mono space-y-2"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2">
                  <StatusBadge status={f.severity} size="sm" />
                  <h4 className="font-bold text-slate-200">{f.title}</h4>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                  {f.affectedComponent}
                </span>
              </div>

              <p className="text-slate-300 text-[11px] leading-relaxed pl-1">{f.description}</p>

              <div className="mt-2 rounded bg-[#06080e] p-2.5 border border-slate-800 text-[11px] text-slate-400">
                <span className="text-cyan-400 font-semibold block mb-0.5">RECOMMENDATION:</span>
                {f.recommendation}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
