import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { BarChart2 } from 'lucide-react';
import { formatTimestamp } from '../utils/sensorUtils';

export default function FillLevelChart({ historyData = [] }) {
  const chartData = historyData.map((item) => ({
    time: formatTimestamp(item.timestamp),
    rawTime: item.timestamp,
    bin1: item.bin1 ?? 0,
    bin2: item.bin2 ?? 0,
    bin3: item.bin3 ?? 0,
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="neu-card-sm p-3 font-mono text-xs space-y-1.5 min-w-[160px] shadow-lg border border-white">
          <p className="text-slate-500 font-bold border-b border-slate-300/60 pb-1">
            Time: {label}
          </p>
          <div className="flex items-center justify-between text-sky-700 font-bold">
            <span>Bin 01 (Plastic):</span>
            <span>{payload[0]?.value}%</span>
          </div>
          <div className="flex items-center justify-between text-amber-700 font-bold">
            <span>Bin 02 (Recyclable):</span>
            <span>{payload[1]?.value}%</span>
          </div>
          <div className="flex items-center justify-between text-emerald-700 font-bold">
            <span>Bin 03 (Organic):</span>
            <span>{payload[2]?.value}%</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="neu-card p-4 sm:p-5 space-y-3">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-300/40">
        <div className="flex items-center gap-2.5">
          <div className="neu-button p-2 text-emerald-700 flex items-center justify-center">
            <BarChart2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-black text-slate-800 tracking-wide uppercase font-mono">
              Bin Fill Level History
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500">
              ThingSpeak historical feed telemetry
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 text-[11px] font-mono">
          <span className="flex items-center gap-1 text-sky-700 font-bold">
            <span className="w-2 h-2 rounded-full bg-sky-500"></span> Bin 01
          </span>
          <span className="flex items-center gap-1 text-amber-700 font-bold">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Bin 02
          </span>
          <span className="flex items-center gap-1 text-emerald-700 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span> Bin 03
          </span>
        </div>
      </div>

      {/* Inset Chart Well */}
      <div className="neu-inset p-3 w-full h-56 sm:h-64">
        {chartData.length === 0 ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 font-mono text-xs">
            <span>Awaiting historical telemetry records...</span>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="colorBin1Neu" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0284c7" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#0284c7" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorBin2Neu" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#d97706" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#d97706" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorBin3Neu" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16a34a" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" opacity={0.6} />
              
              <XAxis
                dataKey="time"
                stroke="#64748b"
                fontSize={10}
                tickLine={false}
                fontFamily="JetBrains Mono, monospace"
              />
              
              <YAxis
                stroke="#64748b"
                fontSize={10}
                domain={[0, 100]}
                tickFormatter={(val) => `${val}%`}
                tickLine={false}
                fontFamily="JetBrains Mono, monospace"
              />

              <Tooltip content={<CustomTooltip />} />

              <ReferenceLine y={80} stroke="#d97706" strokeDasharray="3 3" label={{ value: '80%', fill: '#d97706', fontSize: 9, position: 'insideTopLeft' }} />
              <ReferenceLine y={95} stroke="#e11d48" strokeDasharray="3 3" label={{ value: '95%', fill: '#e11d48', fontSize: 9, position: 'insideTopRight' }} />

              <Area
                type="monotone"
                dataKey="bin1"
                name="Bin 01 (Plastic)"
                stroke="#0284c7"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorBin1Neu)"
              />
              <Area
                type="monotone"
                dataKey="bin2"
                name="Bin 02 (Recyclable)"
                stroke="#d97706"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorBin2Neu)"
              />
              <Area
                type="monotone"
                dataKey="bin3"
                name="Bin 03 (Organic)"
                stroke="#16a34a"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorBin3Neu)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
