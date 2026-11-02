import React, { useState } from 'react';
import { BrainCircuit, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { ChartCard } from '../charts/ChartCard';
import { FeatureImportanceChart } from '../charts/FeatureImportanceChart';
import { MetricCard } from '../components/common/MetricCard';
import { useAI } from '../hooks/useAI';
import type { Prediction } from '../types/ai';

export const AIPredictionPage: React.FC = () => {
  const { predictions, metrics } = useAI();
  const [selectedPrediction, setSelectedPrediction] = useState<Prediction | null>(
    predictions[0] || null
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-lg border border-slate-800 bg-[#0f1422] p-5 shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold font-mono text-white">
              AI Encrypted Traffic Classification & Prediction Engine
            </h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
              Active Model: v2.1
            </span>
          </div>
          <p className="mt-1 text-xs font-mono text-slate-400">
            Real-time inference identifying application profiles (File Transfer, VoIP, Web, Streaming) inside IPsec ESP ciphertext.
          </p>
        </div>

        <div className="text-right font-mono text-xs text-slate-400">
          <span className="text-slate-500 block text-[10px]">INFERENCE LATENCY</span>
          <span className="text-emerald-400 font-bold text-base">
            {metrics ? `${metrics.averageInferenceTimeMs} ms` : '3.2 ms'}
          </span>
        </div>
      </div>

      {/* Model Performance KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Overall Model Accuracy"
          value={metrics ? `${(metrics.accuracy * 100).toFixed(1)}%` : '97.4%'}
          subtitle="Trained on IPsec ESP flows"
          icon={CheckCircle2}
          accentColor="emerald"
        />
        <MetricCard
          title="F1 Weighted Score"
          value={metrics ? metrics.f1Score.toFixed(3) : '0.968'}
          subtitle="Harmonic precision/recall"
          icon={BrainCircuit}
          accentColor="cyan"
        />
        <MetricCard
          title="Precision Rate"
          value={metrics ? `${(metrics.precision * 100).toFixed(1)}%` : '97.1%'}
          subtitle="Low false positive rate"
          icon={ShieldCheck}
          accentColor="blue"
        />
        <MetricCard
          title="Inferences Executed"
          value={metrics ? metrics.totalInferences.toLocaleString() : '24,890'}
          subtitle="Online streaming evaluation"
          icon={Zap}
          accentColor="purple"
        />
      </div>

      {/* Predictions Table + SHAP Importance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Real-time Classification Stream */}
        <div className="lg:col-span-2 rounded-lg border border-slate-800 bg-[#0f1422] p-4 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs font-mono">
            <span className="font-bold uppercase tracking-wider text-slate-200">
              Live Inferences ({predictions.length})
            </span>
            <span className="text-[11px] text-slate-500">
              Click prediction to inspect probability distribution
            </span>
          </div>

          <div className="overflow-x-auto rounded border border-slate-800 bg-[#0a0d14]">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#0f1422] border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="p-2.5">Flow ID</th>
                  <th className="p-2.5">Predicted Class</th>
                  <th className="p-2.5 text-right">Confidence</th>
                  <th className="p-2.5 text-right">Latency</th>
                  <th className="p-2.5 text-center">Encrypted</th>
                  <th className="p-2.5 text-center">Anomaly</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {predictions.map((pred) => {
                  const isSelected = selectedPrediction?.id === pred.id;
                  return (
                    <tr
                      key={pred.id}
                      onClick={() => setSelectedPrediction(pred)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-cyan-950/40 text-white font-medium border-l-2 border-l-cyan-400'
                          : 'hover:bg-slate-800/40 text-slate-300'
                      }`}
                    >
                      <td className="p-2.5 text-cyan-300 font-semibold">{pred.flowId}</td>
                      <td className="p-2.5 font-bold text-white">
                        {pred.predictedClass.replace('_', ' ')}
                      </td>
                      <td className="p-2.5 text-right text-emerald-400 font-bold">
                        {(pred.confidence * 100).toFixed(1)}%
                      </td>
                      <td className="p-2.5 text-right text-slate-400">{pred.inferenceLatencyMs} ms</td>
                      <td className="p-2.5 text-center">
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800">
                          ESP
                        </span>
                      </td>
                      <td className="p-2.5 text-center">
                        {pred.isAnomaly ? (
                          <span className="px-1.5 py-0.5 rounded text-[10px] bg-rose-950 text-rose-300 border border-rose-800">
                            ANOMALY
                          </span>
                        ) : (
                          <span className="text-slate-500 text-[11px]">&mdash;</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* SHAP Feature Importance */}
        <div>
          <ChartCard
            title="XGBoost Feature Importance"
            subtitle="SHAP contributions to prediction"
            badge="Model Explainability"
          >
            <FeatureImportanceChart />
          </ChartCard>
        </div>
      </div>

      {/* Selected Prediction Probability Distribution */}
      {selectedPrediction && (
        <div className="rounded-lg border border-slate-800 bg-[#0f1422] p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <BrainCircuit className="h-4 w-4 text-cyan-400" />
              <h3 className="text-xs font-mono font-bold text-slate-200 uppercase">
                Multiclass Probability Distribution: {selectedPrediction.flowId}
              </h3>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold">
              Predicted: {selectedPrediction.predictedClass.replace('_', ' ')} (
              {(selectedPrediction.confidence * 100).toFixed(1)}%)
            </span>
          </div>

          <div className="space-y-2.5 font-mono text-xs">
            {Object.entries(selectedPrediction.probabilities).map(([cls, prob]) => (
              <div key={cls} className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className={cls === selectedPrediction.predictedClass ? 'text-white font-bold' : 'text-slate-400'}>
                    {cls.replace('_', ' ')}
                  </span>
                  <span className={cls === selectedPrediction.predictedClass ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                    {(prob * 100).toFixed(2)}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      cls === selectedPrediction.predictedClass
                        ? 'bg-gradient-to-r from-emerald-500 to-cyan-400'
                        : 'bg-slate-600'
                    }`}
                    style={{ width: `${Math.max(1, prob * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
