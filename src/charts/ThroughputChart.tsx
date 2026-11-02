import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface ThroughputChartProps {
  data: Array<{
    timestamp: string;
    throughputMbps: number;
    packetRate: number;
    encryptedEspBytes: number;
  }>;
}

export const ThroughputChart: React.FC<ThroughputChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorThroughput" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
        <XAxis
          dataKey="timestamp"
          stroke="#94a3b8"
          tick={{ fill: '#64748b', fontSize: 11 }}
          tickLine={{ stroke: '#cbd5e1' }}
        />
        <YAxis
          stroke="#94a3b8"
          tick={{ fill: '#64748b', fontSize: 11 }}
          tickLine={{ stroke: '#cbd5e1' }}
          unit="M"
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
          formatter={(value: any, name: any) => [
            name === 'throughputMbps' ? `${value} Mbps` : `${value} pps`,
            name === 'throughputMbps' ? 'Bandwidth' : 'Packet Rate',
          ]}
        />
        <Area
          type="monotone"
          dataKey="throughputMbps"
          stroke="#2563eb"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorThroughput)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
