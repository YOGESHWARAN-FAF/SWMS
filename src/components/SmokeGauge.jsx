import React from 'react';
import { Wind, Radio } from 'lucide-react';
import { getSmokeStatus } from '../utils/sensorUtils';

export default function SmokeGauge({ smokeValue = 0, rawFieldValue, isOnline = true }) {
  const value = Math.max(0, typeof smokeValue === 'number' ? smokeValue : Number.parseFloat(smokeValue) || 0);
  const status = getSmokeStatus(value);

  // Gauge calculation: Max gauge scale 20% so 10% alarm threshold sits clearly in upper danger arc
  const maxScale = 20;
  const clampedVal = Math.min(maxScale, value);
  const radius = 75;
  const strokeWidth = 12;
  const circumference = Math.PI * radius;
  const strokeDashoffset = circumference - (clampedVal / maxScale) * circumference;

  return (
    <div className={`neu-card p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 ${
      status.severity === 'danger' ? 'border-2 border-rose-400 shadow-neu-rose animate-pulse' : ''
    }`}>
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-300/40">
          <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
            FIELD 05 • MQ-2 GAS
          </span>
          <span className="neu-inset-sm flex items-center gap-1 text-[10px] font-mono uppercase px-2.5 py-1 text-slate-700">
            <Radio className="w-2.5 h-2.5 text-emerald-600 animate-pulse" />
            {isOnline ? 'ONLINE' : 'OFFLINE'}
          </span>
        </div>

        <h3 className="text-base sm:text-lg font-black text-slate-800 tracking-wide mt-2.5 flex items-center gap-2 font-mono">
          <Wind className="w-5 h-5 text-emerald-600" />
          GAS / SMOKE SENSOR
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Air particulate & smoke concentration (Alarm: ≥10%)
        </p>

        {/* Semi-Circular Radial SVG Gauge */}
        <div className="neu-inset relative my-3 p-3 flex flex-col items-center justify-center">
          <svg className="w-48 h-28 overflow-visible" viewBox="0 0 190 105">
            <defs>
              <linearGradient id="gaugeGradientNeu" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="30%" stopColor="#22c55e" />
                <stop offset="40%" stopColor="#f59e0b" />
                <stop offset="50%" stopColor="#e11d48" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>
            </defs>

            {/* Background Arc Track */}
            <path
              d="M 20 95 A 75 75 0 0 1 170 95"
              fill="none"
              stroke="#cbd5e1"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />

            {/* Colored Active Arc */}
            <path
              d="M 20 95 A 75 75 0 0 1 170 95"
              fill="none"
              stroke="url(#gaugeGradientNeu)"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>

          {/* Reading Display */}
          <div className="absolute top-8 flex flex-col items-center text-center">
            <span className="text-[9px] uppercase font-mono tracking-widest text-slate-500 font-bold">
              Reading
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-black text-slate-800 font-mono tracking-tight">
                {Math.round(value)}
              </span>
              <span className="text-xs font-mono text-slate-500">%</span>
            </div>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border mt-1 ${status.badgeClass}`}>
              {status.level}
            </span>
          </div>

          {/* Scale Labels */}
          <div className="w-full flex justify-between px-2 text-[9px] font-mono text-slate-500 mt-1">
            <span>0% (Safe)</span>
            <span>5%</span>
            <span>8%</span>
            <span className="text-rose-600 font-bold">≥10% (Alarm)</span>
          </div>
        </div>
      </div>

      {/* Threshold Status Description */}
      <div className="pt-2 border-t border-slate-300/40 flex items-center justify-between text-[11px] font-mono">
        <span className="text-slate-500">Status: <strong className="text-slate-700 font-bold">{status.level}</strong></span>
        <span className="text-slate-500 text-right truncate max-w-[150px] font-semibold">{status.description}</span>
      </div>
    </div>
  );
}
