import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const packetSizeData = [
  { bin: '64-128B (ACKs)', count: 4200, fill: '#3b82f6' },
  { bin: '129-256B (VoIP)', count: 9500, fill: '#10b981' },
  { bin: '257-512B (IKE)', count: 850, fill: '#f59e0b' },
  { bin: '513-1024B (HTTP)', count: 1840, fill: '#6366f1' },
  { bin: '1025-1442B (MTU)', count: 18920, fill: '#2563eb' },
];

export const PacketSizeDistributionChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={packetSizeData} margin={{ top: 10, right: 10, left: -15, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
        <XAxis
          dataKey="bin"
          stroke="#94a3b8"
          tick={{ fill: '#64748b', fontSize: 10 }}
          angle={-10}
          textAnchor="end"
          interval={0}
        />
        <YAxis
          stroke="#94a3b8"
          tick={{ fill: '#64748b', fontSize: 11 }}
          tickLine={{ stroke: '#cbd5e1' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#ffffff',
            borderColor: '#e2e8f0',
            borderRadius: '6px',
            fontSize: '12px',
            color: '#1e293b',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
          formatter={(val: any) => [`${val.toLocaleString()} packets`, 'Volume']}
        />
        <Bar dataKey="count" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};
