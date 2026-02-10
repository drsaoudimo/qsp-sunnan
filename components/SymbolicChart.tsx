
import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { QSPVariable } from '../types';

interface Props {
  data: QSPVariable[];
}

export const SymbolicChart: React.FC<Props> = ({ data = [] }) => {
  if (!data || data.length === 0) {
    return (
      <div className="h-[300px] w-full flex items-center justify-center bg-slate-900/50 rounded-xl border border-slate-700 text-slate-500">
        لا توجد بيانات متاحة للتمثيل البياني
      </div>
    );
  }

  return (
    <div className="h-full w-full min-h-[300px] flex flex-col items-center justify-center bg-slate-900/50 rounded-xl border border-slate-700 p-4">
      <h3 className="text-emerald-400 font-bold mb-4 font-mono text-lg">
        Ω_H: خريطة الحالة الحضارية
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#334155" />
          <PolarAngleAxis 
            dataKey="symbol" 
            tick={{ fill: '#94a3b8', fontSize: 14, fontWeight: 'bold' }} 
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="QSP Metrics"
            dataKey="value"
            stroke="#10b981"
            strokeWidth={3}
            fill="#10b981"
            fillOpacity={0.3}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', color: '#f1f5f9' }}
            itemStyle={{ color: '#10b981' }}
            formatter={(value: number) => [value, 'القيمة']}
            labelFormatter={(label) => {
                const item = data.find(d => d.symbol === label);
                return item ? `${item.symbol} - ${item.name}` : label;
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap gap-2 justify-center mt-4">
        {data.map((item, idx) => (
            <div key={idx} className="flex items-center gap-1 text-xs text-slate-400">
                <span className="font-bold text-emerald-500 font-mono">{item.symbol}</span>
                <span>= {item.name}</span>
            </div>
        ))}
      </div>
    </div>
  );
};
