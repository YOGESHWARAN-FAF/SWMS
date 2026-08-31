import React from 'react';
import { AlertTriangle, Radio, AlertOctagon } from 'lucide-react';
import { getBinStatus, getCollectionAction } from '../utils/sensorUtils';

export default function DigitalTwinBin({
  config,
  fillPercentage = 0,
  rawFieldValue,
  isOnline = true,
}) {
  const percent = Math.min(100, Math.max(0, typeof fillPercentage === 'number' ? fillPercentage : Number.parseFloat(fillPercentage) || 0));
  const status = getBinStatus(percent);
  const collection = getCollectionAction(percent);

  // Gradient themes per bin for Neumorphic styling
  const colorConfig = {
    bin1: {
      primary: '#0284c7',
      gradient: 'from-sky-400 via-blue-500 to-indigo-500',
      badge: 'text-sky-800 bg-sky-50 border-sky-200',
      indicator: 'bg-sky-500',
    },
    bin2: {
      primary: '#d97706',
      gradient: 'from-amber-400 via-orange-400 to-amber-500',
      badge: 'text-amber-800 bg-amber-50 border-amber-200',
      indicator: 'bg-amber-500',
    },
    bin3: {
      primary: '#16a34a',
      gradient: 'from-emerald-400 via-green-500 to-teal-600',
      badge: 'text-emerald-800 bg-emerald-50 border-emerald-200',
      indicator: 'bg-emerald-600',
    },
  }[config.id] || {
    primary: '#16a34a',
    gradient: 'from-emerald-400 to-teal-500',
    badge: 'text-emerald-800 bg-emerald-50 border-emerald-200',
    indicator: 'bg-emerald-600',
  };

  return (
    <div className={`neu-card p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 ${
      status.isFull ? 'border-2 border-rose-400 shadow-neu-rose' : status.isWarning ? 'border-amber-300' : ''
    }`}>
      
      {/* Top Header Information */}
      <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-300/40">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-mono font-black tracking-wider text-slate-500 uppercase">
              {config.name}
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-400"></span>
            <span className="text-[10px] font-mono text-emerald-800 font-bold px-2 py-0.5 rounded-full neu-inset-sm">
              {config.field.toUpperCase()}
            </span>
          </div>
          <h3 className="text-sm sm:text-base font-black text-slate-800 tracking-wide mt-0.5 font-mono">
            {config.category}
          </h3>
        </div>

        {/* Ultrasonic Sensor Status */}
        <div className="flex flex-col items-end">
          <span className="neu-inset-sm flex items-center gap-1 px-2.5 py-1 text-[10px] font-mono font-bold uppercase text-slate-700">
            <Radio className="w-2.5 h-2.5 text-emerald-600 animate-pulse" />
            {isOnline ? 'ONLINE' : 'OFFLINE'}
          </span>
          <span className="text-[10px] text-slate-500 font-mono mt-1 font-semibold">
            Raw: {rawFieldValue !== undefined && rawFieldValue !== null ? `${rawFieldValue}` : '--'}
          </span>
        </div>
      </div>

      {/* 3D Physical Digital Twin Bin Cylinder Graphic */}
      <div className="relative my-4 sm:my-5 flex flex-col items-center justify-center">
        
        {/* Bin Outer Inset Chamber */}
        <div className="neu-inset relative w-44 sm:w-48 h-56 sm:h-64 p-2.5 flex flex-col justify-end overflow-hidden group">
          
          {/* Subtle Grid Matrix Background */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)',
              backgroundSize: '16px 16px',
            }}
          ></div>

          {/* Top Sensor Bracket */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-3.5 rounded-full neu-button flex items-center justify-center gap-2 z-20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-[8px] font-mono font-bold text-slate-600 uppercase tracking-wider">
              HC-SR04 SENSOR
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          </div>

          {/* Level Markings */}
          <div className="absolute inset-y-7 right-2.5 flex flex-col justify-between items-end text-[9px] font-mono text-slate-400 z-20 pointer-events-none">
            <span className="flex items-center gap-1 font-bold text-rose-500">
              100% <span className="w-2 h-[1px] bg-rose-400"></span>
            </span>
            <span className="flex items-center gap-1 font-semibold text-amber-500">
              75% <span className="w-1.5 h-[1px] bg-amber-400"></span>
            </span>
            <span className="flex items-center gap-1">
              50% <span className="w-1.5 h-[1px] bg-slate-300"></span>
            </span>
            <span className="flex items-center gap-1">
              25% <span className="w-1.5 h-[1px] bg-slate-300"></span>
            </span>
          </div>

          {/* 80% and 95% Reference Lines */}
          <div className="absolute bottom-[80%] left-2 right-2 border-b border-dashed border-amber-400/60 z-10 pointer-events-none"></div>
          <div className="absolute bottom-[95%] left-2 right-2 border-b border-dashed border-rose-400/60 z-10 pointer-events-none"></div>

          {/* Dynamic Fluid / Waste Volume Fill */}
          <div
            className={`w-full rounded-2xl relative transition-all duration-1000 ease-out flex flex-col justify-start overflow-hidden bg-gradient-to-t ${colorConfig.gradient} shadow-md`}
            style={{
              height: `${Math.max(4, percent)}%`,
            }}
          >
            {/* Fluid surface meniscus highlight */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-white/60 shadow-sm"></div>
            
            {/* Subtle animated wave shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-wave-fill pointer-events-none"></div>
          </div>

          {/* Center Telemetry Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20">
            <div className="neu-card-sm px-3.5 py-2 flex flex-col items-center text-center shadow-md">
              <span className="text-[9px] uppercase tracking-wider text-slate-500 font-mono font-bold">
                Fill Level
              </span>
              <span className="text-2xl sm:text-3xl font-black text-slate-800 font-mono tracking-tight">
                {percent}%
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* Threshold Status & Collection Alerts */}
      <div className="space-y-2 pt-2 border-t border-slate-300/40">
        
        {/* Status Indicator */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">Status:</span>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider border ${status.badgeClass}`}>
            {status.label}
          </span>
        </div>

        {/* Collection Action Badge */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500 font-mono">Collection:</span>
          <span className={`font-mono font-bold flex items-center gap-1 ${collection.color}`}>
            {collection.urgent ? <AlertOctagon className="w-3.5 h-3.5 animate-bounce text-rose-600" /> : null}
            {collection.status}
          </span>
        </div>

        {/* Urgent Collection Warning Banner */}
        {status.isFull && (
          <div className="mt-1.5 p-2 rounded-2xl bg-rose-50 border border-rose-300 text-rose-700 text-xs font-bold flex items-center justify-center gap-1.5 animate-pulse shadow-sm">
            <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
            <span>COLLECTION REQUIRED (≥95%)</span>
          </div>
        )}

        {/* Warning Threshold Banner */}
        {!status.isFull && status.isWarning && (
          <div className="mt-1.5 p-1.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-800 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Capacity Warning: Near Max</span>
          </div>
        )}

      </div>

    </div>
  );
}
