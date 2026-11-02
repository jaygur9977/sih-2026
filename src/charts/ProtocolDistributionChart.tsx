import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface ProtocolDistributionChartProps {
  data?: Array<{ name: string; value: number; color: string }>;
}

const defaultData = [
  { name: 'ESP (Proto 50 Encrypted)', value: 88, color: '#2563eb' },
  { name: 'IKEv2 (Port 500/4500)', value: 6, color: '#0284c7' },
  { name: 'ICMP Inside Tunnel', value: 4, color: '#10b981' },
  { name: 'Raw Handshake / DNS', value: 2, color: '#f59e0b' },
];

export const ProtocolDistributionChart: React.FC<ProtocolDistributionChartProps> = ({
  data = defaultData,
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="45%"
          innerRadius={45}
          outerRadius={70}
          paddingAngle={3}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} stroke="#ffffff" strokeWidth={2} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: '#ffffff',
            borderColor: '#e2e8f0',
            borderRadius: '6px',
            fontSize: '12px',
            color: '#1e293b',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
          formatter={(value: any) => [`${value}%`, 'Share']}
        />
        <Legend
          verticalAlign="bottom"
          height={36}
          formatter={(value) => (
            <span className="text-[11px] text-slate-600 font-medium">{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};
