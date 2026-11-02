import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const featureImportanceData = [
  { feature: 'Packet Length Entropy', importance: 0.88, fill: '#00f0ff' },
  { feature: 'Mean Inter-Arrival Time (IAT)', importance: 0.76, fill: '#3b82f6' },
  { feature: 'Forward/Backward Byte Ratio', importance: 0.69, fill: '#10b981' },
  { feature: 'Burstiness Factor', importance: 0.61, fill: '#f59e0b' },
  { feature: 'Max Packet Length (MTU)', importance: 0.54, fill: '#8b5cf6' },
  { feature: 'IAT Standard Deviation', importance: 0.42, fill: '#ec4899' },
];

export const FeatureImportanceChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        layout="vertical"
        data={featureImportanceData}
        margin={{ top: 5, right: 30, left: 70, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
        <XAxis
          type="number"
          domain={[0, 1]}
          stroke="#64748b"
          tick={{ fill: '#64748b', fontSize: 10, fontFamily: 'monospace' }}
          tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
        />
        <YAxis
          type="category"
          dataKey="feature"
          stroke="#64748b"
          tick={{ fill: '#cbd5e1', fontSize: 10, fontFamily: 'monospace' }}
          width={130}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#0f1422',
            borderColor: '#334155',
            borderRadius: '6px',
            fontFamily: 'monospace',
            fontSize: '11px',
            color: '#e2e8f0',
          }}
          formatter={(val: any) => [`${(Number(val) * 100).toFixed(1)}%`, 'Weight / SHAP Importance']}
        />
        <Bar dataKey="importance" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};
