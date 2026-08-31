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
import { Wind } from 'lucide-react';
import { formatTimestamp } from '../utils/sensorUtils';

export default function SmokeChart({ historyData = [] }) {
  const chartData = historyData.map((item) => ({
    time: formatTimestamp(item.timestamp),
    smoke: item.smoke ?? 0,
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const val = payload[0]?.value ?? 0;
      return (
        <div className="neu-card-sm p-3 font-mono text-xs space-y-1 min-w-[140px] shadow-lg border border-white">
          <p className="text-slate-500 font-bold border-b border-slate-300/60 pb-1">
            Time: {label}
          </p>
          <div className="flex items-center justify-between text-slate-800">
            <span>Gas Reading:</span>
            <span className="font-bold text-emerald-700">{val} PPM</span>
          </div>
          <p className={`text-[10px] font-bold ${val >= 800 ? 'text-rose-600' : val >= 600 ? 'text-orange-600' : val >= 300 ? 'text-amber-600' : 'text-emerald-600'}`}>
            Status: {val >= 800 ? 'DANGER' : val >= 600 ? 'HIGH' : val >= 300 ? 'MODERATE' : 'SAFE'}
          </p>
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
          <div className="neu-button p-2 text-amber-600 flex items-center justify-center">
            <Wind className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-black text-slate-800 tracking-wide uppercase font-mono">
              Smoke & Gas History
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500">
              MQ-2 air quality PPM readings over time
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono text-slate-500 flex-wrap">
          <span className="flex items-center gap-1 text-emerald-700 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> &lt;300 Safe
          </span>
          <span className="flex items-center gap-1 text-amber-700 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> 300+ Mod
          </span>
          <span className="flex items-center gap-1 text-rose-600 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span> ≥800 Danger
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
                <linearGradient id="colorSmokeNeu" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
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
                domain={[0, 1000]}
                tickFormatter={(val) => `${val}`}
                tickLine={false}
                fontFamily="JetBrains Mono, monospace"
              />

              <Tooltip content={<CustomTooltip />} />

              <ReferenceLine y={300} stroke="#d97706" strokeDasharray="3 3" label={{ value: '300', fill: '#d97706', fontSize: 9, position: 'insideTopLeft' }} />
              <ReferenceLine y={800} stroke="#e11d48" strokeDasharray="3 3" label={{ value: '800', fill: '#e11d48', fontSize: 9, position: 'insideTopRight' }} />

              <Area
                type="monotone"
                dataKey="smoke"
                name="Smoke / Gas (PPM)"
                stroke="#d97706"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorSmokeNeu)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
