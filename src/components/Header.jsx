import React from 'react';
import { Layers, RefreshCw, Radio, Wifi, WifiOff, AlertTriangle } from 'lucide-react';
import { formatTimestamp } from '../utils/sensorUtils';

export default function Header({ connectionStatus, lastUpdated, isRefreshing, onRefresh, channelId }) {
  const getStatusBadge = () => {
    switch (connectionStatus) {
      case 'LIVE':
        return (
          <div className="neu-inset-sm flex items-center gap-1.5 px-3 py-1.5 text-emerald-800 text-xs font-bold tracking-wide">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
            </span>
            <span className="font-mono">LIVE</span>
          </div>
        );
      case 'CONNECTING':
        return (
          <div className="neu-inset-sm flex items-center gap-1.5 px-3 py-1.5 text-sky-800 text-xs font-bold tracking-wide animate-pulse">
            <Radio className="w-3 h-3 animate-spin text-sky-600" />
            <span className="font-mono">CONNECTING</span>
          </div>
        );
      case 'OFFLINE':
        return (
          <div className="neu-inset-sm flex items-center gap-1.5 px-3 py-1.5 text-amber-800 text-xs font-bold tracking-wide">
            <WifiOff className="w-3 h-3 text-amber-600" />
            <span className="font-mono">OFFLINE</span>
          </div>
        );
      case 'ERROR':
      default:
        return (
          <div className="neu-inset-sm flex items-center gap-1.5 px-3 py-1.5 text-rose-800 text-xs font-bold tracking-wide">
            <AlertTriangle className="w-3 h-3 text-rose-600" />
            <span className="font-mono">ERROR</span>
          </div>
        );
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#ebf2ec]/90 backdrop-blur-lg border-b border-white/60 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-3">
          
          {/* Logo & Main Title */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <div className="neu-button p-2.5 sm:p-3 text-emerald-700 flex items-center justify-center flex-shrink-0">
              <Layers className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-2xl font-black tracking-tight text-slate-800 font-mono flex items-center gap-1">
                  SmartBin <span className="text-emerald-700">AI</span>
                </h1>
                <span className="hidden sm:inline px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 shadow-sm">
                  Digital Twin
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium line-clamp-1">
                AI Waste Segregation & IoT Safety Monitoring
              </p>
            </div>
          </div>

          {/* Right Status Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Live Telemetry Badge */}
            {getStatusBadge()}

            {/* Channel Info badge */}
            <div className="hidden sm:flex neu-inset-sm items-center gap-1.5 px-3 py-1.5 text-slate-700 text-xs font-mono">
              <Wifi className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-slate-500">Ch:</span>
              <span className="font-bold text-emerald-800">#{channelId || '3470506'}</span>
            </div>

            {/* Last Updated Timestamp */}
            <div className="hidden md:flex neu-inset-sm items-center gap-1.5 px-3 py-1.5 text-slate-600 text-xs font-mono">
              <span className="text-slate-400">Sync:</span>
              <span className="font-semibold text-slate-800">{formatTimestamp(lastUpdated)}</span>
            </div>

            {/* Manual Refresh / Sync Button */}
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              title="Refresh IoT Telemetry"
              className="neu-button flex items-center justify-center gap-1.5 px-3.5 py-2 text-emerald-800 hover:text-emerald-900 text-xs font-bold font-mono transition-all active:scale-95 disabled:opacity-50 touch-target"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-emerald-600 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Sync</span>
            </button>

          </div>
        </div>
      </div>
    </header>
  );
}
